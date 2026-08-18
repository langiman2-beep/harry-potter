import { HPCharacter } from './types.js';
import { fetchData } from './api.js';

// Хранилище, куда мы один раз запишем ВСЕХ персонажей с сервера
let allCharacters: HPCharacter[] = [];

// Находим на странице блок, куда будем вставлять карточки магов
const container = document.getElementById('houses-container');

// 1. ГЛАВНАЯ ФУНКЦИЯ: Запускается при старте страницы
async function loadHousesData(): Promise<void> {
  if (!container) return;

  // Загружаем вообще всех персонажей (условие ()=>true значит "берём всех")
  const data = await fetchData(container, () => true);

  // Если сервер ничего не вернул — выходим
  if (data.length === 0) return;

  // Сохраняем магов в наше хранилище, чтобы не делать fetch при каждом клике
  allCharacters = data;

  // При первом заходе на страницу сразу показываем Гриффиндор
  filterAndRender('gryffindor');

  // Включаем кнопки факультетов (чтобы они начали слушать клики)
  setupTabs();
}

// 2. ФУНКЦИЯ ФИЛЬТРАЦИИ И ОТРИСОВКИ: Очищает экран и рисует нужный факультет
function filterAndRender(houseName: string): void {
  if (!container) return;

  // Очищаем контейнер от старых карточек
  container.innerHTML = '';

  // Ищем в нашем хранилище только тех магов, чей факультет совпал с нажатой кнопкой
  const filtered = allCharacters.filter(
    char => char.house.toLowerCase() === houseName.toLowerCase(),
  );

  // Перебираем отфильтрованных магов и создаем для каждого HTML-карточку
  filtered.forEach(char => {
    const characterImage = char.image ? char.image : 'https://placehold.co';
    const allAltNames =
      char.alternate_names.length > 0
        ? char.alternate_names.join(', ')
        : 'None';

    const cardHTML = `
      <div class="student-card">
        <img class="student-card__img" src="${characterImage}" alt="${char.name}">
        <div class="student-card__content">
          <h3 class="student-card__name">${char.name}</h3>
          <div class="student-card__info">
            <p class="student-card__text">The Boy Who Lived</p>
            <p class="student-card__text">${char.house || 'Unknown'}</p>
            <p class="student-card__text">${char.dateOfBirth || 'Unknown'}</p>
          </div>
          <a href="#" class="student-card__more">Більше інформації <span class="student-card__arrow">→</span></a>
        </div>
        <div class="student-card__hover">
          <p class="student-card__hover-line">Name: <span>${char.name}</span></p>
          <p class="student-card__hover-line">Alternate names: <span>${allAltNames}</span></p>
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

    // Вставляем готовую карточку в наш контейнер
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}

// 3. ФУНКЦИЯ НАСТРОЙКИ КНОПОК: Вешает клики на переключатели факультетов
function setupTabs(): void {
  // Находим все овальные кнопки факультетов на странице
  const buttons = document.querySelectorAll('.houses-filter__btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      const target = e.currentTarget as HTMLButtonElement;

      // Снимаем подсветку (класс активной кнопки) со всех кнопок
      buttons.forEach(b => b.classList.remove('is-active'));

      // Добавляем подсветку той кнопке, на которую нажали
      target.classList.add('is-active');

      // Берем имя факультета из атрибута кнопки data-house="..."
      const houseName = target.getAttribute('data-house');
      if (houseName) {
        // Перерисовываем карточки под выбранный факультет
        filterAndRender(houseName);
      }
    });
  });
}

// ЗАПУСК: Даем пинок всему файлу, чтобы магия сработала!
loadHousesData();
