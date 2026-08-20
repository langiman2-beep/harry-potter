export class ApiService {
  baseUrl = 'https://hp-api.onrender.com/api/characters';
  clickSound = new Audio('./assets/audio/magic-click.mp3');
  constructor() {
    // Включаем звук ТОЛЬКО при клике на реальные интерактивные элементы
    document.addEventListener('click', e => {
      const target = e.target;
      // Проверяем: кликнули на карточку, кнопку назад или кнопку фильтра
      if (
        target.closest('.student-card') ||
        target.closest('.back-to-main-btn') ||
        target.closest('.houses-filter__btn')
      ) {
        this.playClick();
      }
    });
  }
  playClick() {
    this.clickSound.currentTime = 0;
    // 🔥 Магия для мобилок: принудительно "взрываем" аудио-контекст
    const promise = this.clickSound.play();
    if (promise !== undefined) {
      promise.catch(err => {
        console.log('Мобильный браузер всё ещё сопротивляется:', err.message);
      });
    }
  }
  // Метод строго возвращает промис с массивом персонажей HPCharacter
  async getAllCharacters() {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error(`Помилка мережі: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  // Публичный метод воспроизведения звука, возвращает void (ничего)
  playClick() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(err => {
      console.log(
        'Браузер заблокував автоаудіо до першої взаємодії:',
        err.message,
      );
    });
  }
}
