import { ApiService } from './api.js';
import { CardRenderer } from './CardRenderer.js';
export class StudentsPage {
    api = new ApiService();
    container = document.getElementById('students-container');
    async init() {
        if (!this.container)
            return;
        this.container.innerHTML = `
      <div class="loading-message" style="color: #f9b50c; text-align: center; font-size: 20px; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
        🧙‍♂️ Завантаження магії... Зачекайте, будь ласка...
      </div>
    `;
        try {
            const allCharacters = await this.api.getAllCharacters();
            const students = allCharacters.filter((char) => char.hogwartsStudent === true);
            this.container.innerHTML = '';
            students.forEach((char) => {
                const cardHTML = CardRenderer.createHtml(char);
                this.container.insertAdjacentHTML('beforeend', cardHTML);
            });
            this.setupGlobalClicks();
        }
        catch (error) {
            this.container.innerHTML = `
        <div class="error-message" style="color: #ff4d4d; text-align: center; font-family: 'Inter', sans-serif; width: 100%; margin-top: 50px;">
          <p style="font-size: 22px; font-weight: bold; margin-bottom: 10px;">🔮 Ой-вей! Магічний зв'язок обірвався...</p>
          <span style="color: #aaa;">Не вдалося завантажити персонажів. Спробуйте оновити сторінку трохи пізніше.</span>
        </div>
      `;
            console.error('Помилка:', error);
        }
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
const page = new StudentsPage();
page.init();
