import { HPCharacter } from './types.js';

export class ApiService {
  private readonly baseUrl: string =
    'https://hp-api.onrender.com/api/characters';
  private readonly clickSound = new Audio('/assets/audio/magic-click.mp3');

  constructor() {
    document.addEventListener('click', () => {
      this.clickSound.currentTime = 0;
      this.clickSound.play().catch(() => {});
    });
  }

  async getAllCharacters(): Promise<HPCharacter[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error(`Ошибка сети: ${response.status}`);
    return await response.json();
  }
}
