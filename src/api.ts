import { HPCharacter } from './types.js';

export class ApiService {
  private readonly baseUrl: string =
    'https://hp-api.onrender.com/api/characters';
  private readonly clickSound: HTMLAudioElement = new Audio(
    './assets/audio/magic-click.mp3',
  );

  constructor() {
    // Вешаем слушатель на весь документ, чтобы ловить абсолютно любой клик на сайте
    document.addEventListener('click', (e: MouseEvent): void => {
      this.playClick();
    });
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
