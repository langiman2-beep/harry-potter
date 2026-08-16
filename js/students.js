const API_URL = 'https://hp-api.onrender.com/api/characters';
async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        const allCharacters = await response.json();
        const students = allCharacters.filter(char => char.hogwartsStudent === true);
        renderStudents(students);
    }
    catch (error) {
        console.error('Не вдалося завантажити студентів:', error);
    }
}
function renderStudents(characters) {
    const container = document.getElementById('students-container');
    if (!container)
        return;
    container.innerHTML = '';
    characters.forEach(char => {
        const characterImage = char.image ? char.image : 'https://placehold.co';
        const allAltNames = char.alternate_names.length > 0
            ? char.alternate_names.join(', ')
            : 'None';
        // ФОРМИРУЕМ СТРОГО ТВОЙ МАКЕТ
        const cardHTML = `
      <div class="student-card">
        <img class="student-card__img" src="${characterImage}" alt="${char.name}">
        
        <div class="student-card__content">
          <h3 class="student-card__name">${char.name}</h3>
          <div class="student-card__info">
            <!-- ВОЗВРАЩАЕМ ДИЗАЙН ИЗ МАКЕТА: строгая строка для всех -->
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
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
loadStudents();
export {};
