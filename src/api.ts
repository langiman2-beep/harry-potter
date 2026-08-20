import { HPCharacter } from './types.js';

export class ApiService {
  private readonly baseUrl: string =
    'https://hp-api.onrender.com/api/characters';
  private readonly clickSound: HTMLAudioElement = new Audio(
    './assets/audio/magic-click.mp3',
  );

  constructor() {
    // Включаем звук ТОЛЬКО при клике на реальные интерактивные элементы
    document.addEventListener('click', (e: MouseEvent): void => {
      const target = e.target as HTMLElement;

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

  public playClick(): void {
    this.clickSound.currentTime = 0;

    // 🔥 Магия для мобилок: принудительно "взрываем" аудио-контекст
    const promise = this.clickSound.play();

    if (promise !== undefined) {
      promise.catch((err: Error): void => {
        console.log('Мобильный браузер всё ещё сопротивляется:', err.message);
      });
    }
  }

  // Метод строго возвращает промис с массивом персонажей HPCharacter
  public async getAllCharacters(): Promise<HPCharacter[]> {
    const response: Response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error(`Помилка мережі: ${response.status}`);
    }
    const data: HPCharacter[] = await response.json();
    return data;
  }

  // Публичный метод воспроизведения звука, возвращает void (ничего)
  public playClick(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch((err: Error): void => {
      console.log(
        'Браузер заблокував автоаудіо до першої взаємодії:',
        err.message,
      );
    });
  }
}
