export class ApiService {
    baseUrl = 'https://hp-api.onrender.com/api/characters';
    clickSound = new Audio('/assets/audio/magic-click.mp3');
    constructor() {
        document.addEventListener('click', () => {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(() => { });
        });
    }
    async getAllCharacters() {
        const response = await fetch(this.baseUrl);
        if (!response.ok)
            throw new Error(`Ошибка сети: ${response.status}`);
        return await response.json();
    }
}
