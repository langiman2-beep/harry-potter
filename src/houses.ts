import { ApiService } from './api.js';
import { CardRenderer } from './CardRenderer.js';
import { HPCharacter } from './types.js';

export class HousesPage {
  private readonly api: ApiService = new ApiService();
  private readonly container: HTMLElement | null =
    document.getElementById('houses-container');
  private allCharacters: HPCharacter[] = [];

  public async init(): Promise<void> {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="loading-message" style="color: #f9b50c; text-align: center; font-size: 20px; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
        🧙‍♂️ Завантаження магії факультетів... Зачекайте, будь ласка...
      </div>
    `;

    try {
      this.allCharacters = await this.api.getAllCharacters();

      // При старте по умолчанию рендерим Гриффиндор
      this.filterAndRender('gryffindor');

      this.setupGlobalClicks();
      this.setupTabs();
    } catch (error) {
      this.container.innerHTML = `
        <div class="error-message" style="color: #ff4d4d; text-align: center; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
          <p style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">🔮 Ой-вей! Магічний зв'язок з факультетами обірвався...</p>
          <span style="color: #aaa;">Не вдалося завантажити дані. Спробуйте оновити сторінку трохи пізніше.</span>
        </div>
      `;
      console.error('Помилка:', error);
    }
  }

  private filterAndRender(houseName: string): void {
    if (!this.container) return;

    this.container.innerHTML = '';

    const filtered: HPCharacter[] = this.allCharacters.filter(
      (char: HPCharacter) =>
        char.house && char.house.toLowerCase() === houseName.toLowerCase(),
    );

    filtered.forEach((char: HPCharacter) => {
      const cardHTML: string = CardRenderer.createHtml(char);
      this.container!.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  private setupTabs(): void {
    const buttons = document.querySelectorAll('.houses-filter__btn');

    buttons.forEach((btn: Element) => {
      btn.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;

        buttons.forEach((b: Element) => b.classList.remove('is-active'));
        target.classList.add('is-active');

        this.api.playClick();

        const houseName: string | null = target.getAttribute('data-house');
        if (houseName) {
          this.filterAndRender(houseName);
        }
      });
    });
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

const page: HousesPage = new HousesPage();
page.init();
