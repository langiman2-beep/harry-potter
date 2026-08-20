import { ApiService } from './api.js';
import { CardRenderer } from './CardRenderer.js';
import { HPCharacter } from './types.js';

export class StudentsPage {
  private readonly api: ApiService = new ApiService();
  private readonly container: HTMLElement | null =
    document.getElementById('students-container');

  public async init(): Promise<void> {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="loading-message" style="color: #f9b50c; text-align: center; font-size: 20px; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
        🧙‍♂️ Завантаження магії... Зачекайте, будь ласка...
      </div>
    `;

    try {
      const allCharacters: HPCharacter[] = await this.api.getAllCharacters();
      const students: HPCharacter[] = allCharacters.filter(
        (char: HPCharacter) => char.hogwartsStudent === true,
      );

      this.container.innerHTML = '';

      students.forEach((char: HPCharacter) => {
        const cardHTML: string = CardRenderer.createHtml(char);
        this.container!.insertAdjacentHTML('beforeend', cardHTML);
      });

      this.setupGlobalClicks();
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

  private setupGlobalClicks(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const backBtn = target.closest(
        '.back-to-main-btn',
      ) as HTMLAnchorElement | null;
      if (backBtn) {
        e.preventDefault();
        this.api.playClick();
        setTimeout(() => {
          window.location.href = backBtn.href;
        }, 1700);
        return;
      }

      const card = target.closest('.student-card') as HTMLElement | null;
      if (card) {
        this.api.playClick();
        card.classList.toggle('is-flipped');
      }
    });
  }
}

const page: StudentsPage = new StudentsPage();
page.init();
