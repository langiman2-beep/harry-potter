import { ApiService } from './api.js';
import { CardRenderer } from './CardRenderer.js';
export class HousesPage {
    api = new ApiService();
    container = document.getElementById('houses-container');
    allCharacters = [];
    async init() {
        if (!this.container)
            return;
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
        }
        catch (error) {
            this.container.innerHTML = `
        <div class="error-message" style="color: #ff4d4d; text-align: center; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
          <p style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">🔮 Ой-вей! Магічний зв'язок з факультетами обірвався...</p>
          <span style="color: #aaa;">Не вдалося завантажити дані. Спробуйте оновити сторінку трохи пізніше.</span>
        </div>
      `;
            console.error('Помилка:', error);
        }
    }
    filterAndRender(houseName) {
        if (!this.container)
            return;
        this.container.innerHTML = '';
        const filtered = this.allCharacters.filter((char) => char.house && char.house.toLowerCase() === houseName.toLowerCase());
        filtered.forEach((char) => {
            const cardHTML = CardRenderer.createHtml(char);
            this.container.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
    setupTabs() {
        const buttons = document.querySelectorAll('.houses-filter__btn');
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget;
                buttons.forEach((b) => b.classList.remove('is-active'));
                target.classList.add('is-active');
                this.api.playClick();
                const houseName = target.getAttribute('data-house');
                if (houseName) {
                    this.filterAndRender(houseName);
                }
            });
        });
    }
    setupGlobalClicks() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const backBtn = target.closest('.back-to-main-btn');
            if (backBtn) {
                e.preventDefault();
                this.api.playClick();
                setTimeout(() => {
                    window.location.href = backBtn.href;
                }, 1700);
                return;
            }
            const card = target.closest('.student-card');
            if (card) {
                this.api.playClick();
                card.classList.toggle('is-flipped');
            }
        });
    }
}
const page = new HousesPage();
page.init();
