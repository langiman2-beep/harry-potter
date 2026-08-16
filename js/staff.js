const API_URL = 'https://hp-api.onrender.com/api/characters';
async function loadStaff() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Помилка сервера: ${response.status}`);
        }
        const allCharacters = await response.json();
        // Фильтруем базу, оставляя строго преподавателей
        const staff = allCharacters.filter(char => char.hogwartsStaff === true);
        renderStaff(staff);
    }
    catch (error) {
        console.error('Не вдалося завантажити викладачів:', error);
    }
}
function renderStaff(characters) {
    const container = document.getElementById('staff-container'); // Твой ID для сетки препов
    if (!container)
        return;
    container.innerHTML = '';
    characters.forEach(char => {
        const characterImage = char.image ? char.image : 'https://placehold.co';
        const allAltNames = char.alternate_names.length > 0
            ? char.alternate_names.join(', ')
            : 'None';
        const cardHTML = `
      <div class="staff-card">
        <img class="staff-card__img" src="${characterImage}" alt="${char.name}">
        
        <div class="staff-card__content">
          <h3 class="staff-card__name">${char.name}</h3>
          <div class="staff-card__info">
            <!-- Строгая строка как на макете Хогвартса -->
            <p class="staff-card__text">The Boy Who Lived</p>
            <p class="staff-card__text">${char.house || 'Unknown'}</p>
            <p class="staff-card__text">${char.dateOfBirth || 'Unknown'}</p>
          </div>
          <a href="#" class="staff-card__more">
            Більше інформації
            <span class="staff-card__arrow">→</span>
          </a>
        </div>

        <div class="staff-card__hover">
          <p class="staff-card__hover-line">Name: <span>${char.name}</span></p>
          <p class="staff-card__hover-line">Alternate names: <span>${allAltNames}</span></p>
          <p class="staff-card__hover-line">Species: <span>${char.species}</span></p>
          <p class="staff-card__hover-line">Gend: <span>${char.gender}</span></p>
          <p class="staff-card__hover-line">House: <span>${char.house || 'None'}</span></p>
          <p class="staff-card__hover-line">Date of birth: <span>${char.dateOfBirth || 'Unknown'}</span></p>
          <p class="staff-card__hover-line">Year of birth: <span>${char.yearOfBirth || 'Unknown'}</span></p>
          <p class="staff-card__hover-line">Wizard: <span>${char.wizard ? 'True' : 'False'}</span></p>
          <p class="staff-card__hover-line">Ancestry: <span>${char.ancestry || 'None'}</span></p>
          <p class="staff-card__hover-line">Eye colour: <span>${char.eyeColour || 'None'}</span></p>
          <p class="staff-card__hover-line">Hair colour: <span>${char.hairColour || 'None'}</span></p>
          <p class="staff-card__hover-line">Patronus: <span>${char.patronus || 'None'}</span></p>
          <p class="staff-card__hover-line">Actor: <span>${char.actor || 'Unknown'}</span></p>
          <p class="staff-card__hover-line">Alive: <span>${char.alive ? 'True' : 'False'}</span></p>
        </div>
      </div>
    `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}
loadStaff();
export {};
