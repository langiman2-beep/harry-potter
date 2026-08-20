export class ApiService {
    baseUrl = 'https://hp-api.onrender.com/api/characters';
    clickSound = new Audio('/assets/audio/magic-click.mp3');
    constructor() {
        // Вешаем слушатель на весь документ, чтобы ловить абсолютно любой клик на сайте
        document.addEventListener('click', (e) => {
            this.playClick();
        });
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
        this.clickSound.play().catch((err) => {
            console.log('Браузер заблокував автоаудіо до першої взаємодії:', err.message);
        });
    }
}
