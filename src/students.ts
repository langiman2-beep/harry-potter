import { ApiService } from './api.js';
import { HPCharacter } from './types.js';

export class StudentsPage {
  private api = new ApiService();
  private container = document.getElementById('students-container');

  async init(): Promise<void> {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="loading-message" style="color: #f9b50c; text-align: center; font-size: 20px; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
        🧙‍♂️ Завантаження магії... Зачекайте, будь ласка...
      </div>
    `;

    try {
      const allCharacters = await this.api.getAllCharacters();
      const students = allCharacters.filter(
        char => char.hogwartsStudent === true,
      );

      this.container.innerHTML = '';
      this.renderStudents(students);
      this.setupCardClicks();
    } catch (error) {
      this.container.innerHTML = `
        <div class="error-message" style="color: #ff4d4d; text-align: center; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
          <p style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">🔮 Ой-вей! Магічний зв'язок обірвався...</p>
          <span style="color: #aaa;">Не вдалося завантажити персонажів. Спробуйте оновити сторінку трохи пізніше.</span>
        </div>
      `;
      console.error('Помилка:', error);
    }
  }

  private renderStudents(characters: HPCharacter[]): void {
    if (!this.container) return;

    characters.forEach(char => {
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

      this.container!.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  private setupCardClicks(): void {
    if (!this.container) return;

    this.container.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      const card = target.closest('.student-card');
      if (!card) return;

      // Переключаем класс для мобильного тапа (показать/скрыть инфу)
      card.classList.toggle('is-flipped');
    });
  }
}

const page = new StudentsPage();
page.init();
