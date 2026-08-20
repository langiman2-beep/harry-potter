export class ApiService {
    // Наша запертая строка с правильным адресом сервера
    baseUrl = 'https://hp-api.onrender.com/api/characters';
    clickSound = new Audio('assets/audio/magic-click.mp3');
    // Метод, который обещает вернуть массив магов
    async getAllCharacters() {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }
        return await response.json();
    }
    playClick() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(() => { });
    }
}
