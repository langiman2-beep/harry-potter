import { HPCharacter } from './types.js';

export class ApiService {
  // Наша запертая строка с правильным адресом сервера
  private readonly baseUrl: string =
    'https://hp-api.onrender.com/api/characters';

  private readonly clickSound = new Audio('assets/audio/magic-click.mp3');

  // Метод, который обещает вернуть массив магов
  async getAllCharacters(): Promise<HPCharacter[]> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }

    return await response.json();
  }

  playClick(): void {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
  }
}
