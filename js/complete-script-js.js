document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const gameStartScreen = document.getElementById('game-start');
    const gameBoard = document.getElementById('game-board');
    const gameOverScreen = document.getElementById('game-over');
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart');
    const playAgainButton = document.getElementById('play-again');
    const movesCount = document.getElementById('moves-count');
    const timeElement = document.getElementById('time');
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    const difficultyButtons = document.querySelectorAll('.difficulty button');

    // Game variables
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matches = 0;
    let timer;
    let seconds = 0;
    let minutes = 0;
    let difficulty = 'easy';
    let totalPairs = 6; // Default for easy mode

    // Mystical symbols for cards (FontAwesome icons)
    const symbols = [
        { icon: '<i class="fas fa-moon"></i>', name: 'moon' },
        { icon: '<i class="fas fa-star"></i>', name: 'star' },
        { icon: '<i class="fas fa-sun"></i>', name: 'sun' },
        { icon: '<i class="fas fa-cloud"></i>', name: 'cloud' },
        { icon: '<i class="fas fa-bolt"></i>', name: 'bolt' },
        { icon: '<i class="fas fa-fire"></i>', name: 'fire' },
        { icon: '<i class="fas fa-gem"></i>', name: 'gem' },
        { icon: '<i class="fas fa-atom"></i>', name: 'atom' },
        { icon: '<i class="fas fa-meteor"></i>', name: 'meteor' },
        { icon: '<i class="fas fa-dragon"></i>', name: 'dragon' },
        { icon: '<i class="fas fa-hat-wizard"></i>', name: 'wizard' },
        { icon: '<i class="fas fa-magic"></i>', name: 'magic' }
    ];

    // Set difficulty
    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            difficultyButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            difficulty = button.getAttribute('data-difficulty');
            
            switch(difficulty) {
                case 'easy':
                    totalPairs = 6; // 4x3 grid (12 cards)
                    break;
                case 'medium':
                    totalPairs = 8; // 4x4 grid (16 cards)
                    break;
                case 'hard':
                    totalPairs = 12; // 6x4 grid (24 cards)
                    break;
            }
        });
    });

    // Initialize game
    function initGame() {
        resetGame();
        gameStartScreen.classList.add('hidden');
        gameBoard.classList.remove('hidden');
        generateCards();
        startTimer();
    }

    // Generate cards based on difficulty
    function generateCards() {
        gameBoard.innerHTML = '';
        
        // Set grid layout based on difficulty
        if (difficulty === 'easy') {
            gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (difficulty === 'medium') {
            gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
        } else if (difficulty === 'hard') {
            gameBoard.style.gridTemplateColumns = 'repeat(6, 1fr)';
        }
        
        // Create pairs of cards
        let selectedSymbols = symbols.slice(0, totalPairs);
        let cardPairs = [...selectedSymbols, ...selectedSymbols];
        cards = shuffleArray(cardPairs);
        
        // Create card elements
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-card-name', card.name);
            cardElement.setAttribute('data-index', index);
            
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        ${card.icon}
                    </div>
                    <div class="card-back"></div>
                </div>
            `;
            
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card function
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        
        this.classList.add('flipped');
        
        if (!firstCard) {
            // First card flipped
            firstCard = this;
            return;
        }
        
        // Second card flipped
        secondCard = this;
        lockBoard = true;
        
        // Increment moves
        moves++;
        movesCount.textContent = moves;
        
        // Check for match
        checkForMatch();
    }

    // Check for match function
    function checkForMatch() {
        const isMatch = firstCard.getAttribute('data-card-name') === secondCard.getAttribute('data-card-name');
        
        if (isMatch) {
            disableCards();
            matches++;
            
            // Check if all pairs are matched
            if (matches === totalPairs) {
                endGame();
            }
        } else {
            unflipCards();
        }
    }

    // Disable cards function (for matches)
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }

    // Unflip cards function (for non-matches)
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            resetBoard();
        }, 1000);
    }

    // Reset board after each turn
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // End game function
    function endGame() {
        clearInterval(timer);
        
        setTimeout(() => {
            finalMoves.textContent = moves;
            finalTime.textContent = timeElement.textContent;
            gameBoard.classList.add('hidden');
            gameOverScreen.classList.remove('hidden');
        }, 1000);
    }

    // Timer function
    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            
            // Update timer display
            timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Reset game function
    function resetGame() {
        clearInterval(timer);
        matches = 0;
        moves = 0;
        seconds = 0;
        minutes = 0;
        movesCount.textContent = moves;
        timeElement.textContent = '00:00';
        gameBoard.innerHTML = '';
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    // Shuffle array function (Fisher-Yates algorithm)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Event listeners
    startButton.addEventListener('click', initGame);
    restartButton.addEventListener('click', () => {
        resetGame();
        generateCards();
        startTimer();
    });
    playAgainButton.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        gameStartScreen.classList.remove('hidden');
    });
});
