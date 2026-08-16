import { HPCharacter } from './types.js';

const API_URL = 'https://hp-api.onrender.com/api/characters';
let allCharacters: HPCharacter[] = []; // Создаём глобальное хранилище для магов

async function loadHousesData(): Promise<void> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    // Сохраняем всех персонажей в наше хранилище
    allCharacters = await response.json();
    console.log('База данных для факультетов загружена!');

    // Так как при старте активна кнопка Gryffindor, сразу отрисуем его студентов!
    filterAndRender('gryffindor');

    // Настраиваем клики по кнопкам
    setupTabs();
  } catch (error) {
    console.error('Не вдалося завантажити дані для факультетів:', error);
  }
}

// Функция, которая вешает клики на овальные кнопки
function setupTabs(): void {
  const buttons = document.querySelectorAll('.houses-filter__btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      const target = e.currentTarget as HTMLButtonElement;

      // 1. Убираем класс активности у всех кнопок
      buttons.forEach(b => b.classList.remove('is-active'));

      // 2. Добавляем класс активности нажатой кнопке
      target.classList.add('is-active');

      // 3. Вытаскиваем название факультета из data-house (например: "slytherin")
      const houseName = target.getAttribute('data-house');
      if (houseName) {
        // 4. Запускаем фильтрацию и отрисовку именно этого факультета!
        filterAndRender(houseName);
      }
    });
  });
}

// Функция, которая фильтрует базу по выбранному дому и рисует карточки
function filterAndRender(house: string): void {
  const container = document.getElementById('houses-container');
  if (!container) return;

  container.innerHTML = ''; // Очищаем прошлый факультет

  // Фильтруем: ищем персонажей, у которых поле house совпадает (приводим к одному регистру)
  const filtered = allCharacters.filter(
    char => char.house.toLowerCase() === house.toLowerCase(),
  );

  // Рисуем карточки (переиспользуем нашу красивую БЭМ-разметку)
  filtered.forEach(char => {
    const characterImage = char.image ? char.image : 'https://placehold.co';
    const altNames =
      char.alternate_names.length > 0
        ? char.alternate_names.join(', ')
        : 'None';

    // В ТЗ сказано: «в залежності від обраної функції відмальовувати результат».
    // СТРОГО ПО МАКЕТУ ФИГМЫ: убраны "Alternative name:", "House:", "Date of birth:"
    const cardHTML = `
      <div class="student-card">
        <img class="student-card__img" src="${characterImage}" alt="${char.name}">
        
        <div class="student-card__content">
          <h3 class="student-card__name">${char.name}</h3>
          <div class="student-card__info">
            <!-- Возвращаем каноничную текстовую строчку макета Хогвартса -->
            <p class="student-card__text">The Boy Who Lived</p>
            <p class="student-card__text">${char.house || 'Unknown'}</p>
            <p class="student-card__text">${char.dateOfBirth || 'Unknown'}</p>
          </div>
          <a href="#" class="student-card__more">
            Більше інформації
            <span class="student-card__arrow">→</span>
          </a>
        </div>

        <div class="student-card__hover">
          <p class="student-card__hover-line">Name: <span>${char.name}</span></p>
          <p class="student-card__hover-line">Alternate names: <span>${altNames}</span></p>
          <p class="student-card__hover-line">Species: <span>${char.species}</span></p>
          <p class="student-card__hover-line">Gend: <span>${char.gender}</span></p>
          <p class="student-card__hover-line">House: <span>${char.house || 'None'}</span></p>
          <p class="student-card__hover-line">Date of birth: <span>${char.dateOfBirth || 'Unknown'}</span></p>
          <p class="student-card__hover-line">Year of birth: <span>${char.yearOfBirth || 'Unknown'}</span></p>
          <p class="student-card__hover-line">Wizard: <span>${char.wizard ? 'True' : 'False'}</span></p>
          <p class="student-card__hover-line">Ancestry: <span>${char.ancestry || 'None'}</span></p>
          <p class="student-card__hover-line">Eye colour: <span>${char.eyeColour || 'None'}</span></p>
          <p class="student-card__hover-line">Hair colour: <span>${char.hairColour || 'None'}</span></p>
          <p class="student-card__hover-line">Patronus: <span>${char.patronus || 'None'}</span></p>
          <p class="student-card__hover-line">Actor: <span>${char.actor || 'Unknown'}</span></p>
          <p class="student-card__hover-line">Alive: <span>${char.alive ? 'True' : 'False'}</span></p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// Стартуем!
loadHousesData();
