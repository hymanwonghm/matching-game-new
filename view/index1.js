

const cards = document.getElementsByClassName('card');
let allImages = document.getElementsByClassName('card-image');
let movesDisplay = document.querySelector('.move-counter');
let toggledCardsArray = [];
let move = 0;
let winCount = 0;
const restart = document.getElementById('restart');
const loginContainer = document.getElementById('login-container');
const rankingContainer = document.getElementById('ranking-container');
const gameContainer = document.getElementById('dynamic-cards');
let userRecords = {
    easy: [],
    normal: [],
    hard: []
};
let currentUser = ''; // Store the current user's name
let currentDifficulty = ''; // Store the current difficulty
let selectedImages = []; // Keep track of selected images for matching

// Full images link array
const imagesLinkArray = [
    { id: "1", image: "./images/1.png", newAlt: "1" },
    { id: "2", image: "./images/1.png", newAlt: "1" },
    { id: "3", image: "./images/2.png", newAlt: "2" },
    { id: "4", image: "./images/2.png", newAlt: "2" },
    { id: "5", image: "./images/3.png", newAlt: "3" },
    { id: "6", image: "./images/3.png", newAlt: "3" },
    { id: "7", image: "./images/4.png", newAlt: "4" },
    { id: "8", image: "./images/4.png", newAlt: "4" },
    { id: "9", image: "./images/5.png", newAlt: "5" },
    { id: "10", image: "./images/5.png", newAlt: "5" },
    { id: "11", image: "./images/6.png", newAlt: "6" },
    { id: "12", image: "./images/6.png", newAlt: "6" },
    { id: "13", image: "./images/7.png", newAlt: "7" },
    { id: "14", image: "./images/7.png", newAlt: "7" },
    { id: "15", image: "./images/8.png", newAlt: "8" },
    { id: "16", image: "./images/8.png", newAlt: "8" },
    { id: "17", image: "./images/9.png", newAlt: "9" },
    { id: "18", image: "./images/9.png", newAlt: "9" },
    { id: "19", image: "./images/10.png", newAlt: "10" },
    { id: "20", image: "./images/10.png", newAlt: "10" },
    { id: "21", image: "./images/11.png", newAlt: "11" },
    { id: "22", image: "./images/11.png", newAlt: "11" },
    { id: "23", image: "./images/12.png", newAlt: "12" },
    { id: "24", image: "./images/12.png", newAlt: "12" },
    { id: "25", image: "./images/13.png", newAlt: "13" },
    { id: "26", image: "./images/13.png", newAlt: "13" },
    { id: "27", image: "./images/14.png", newAlt: "14" },
    { id: "28", image: "./images/14.png", newAlt: "14" },
    { id: "29", image: "./images/15.png", newAlt: "15" },
    { id: "30", image: "./images/15.png", newAlt: "15" },
    { id: "31", image: "./images/16.png", newAlt: "16" },
    { id: "32", image: "./images/16.png", newAlt: "16" },
    { id: "33", image: "./images/17.png", newAlt: "17" },
    { id: "34", image: "./images/17.png", newAlt: "17" },
    { id: "35", image: "./images/18.png", newAlt: "18" },
    { id: "36", image: "./images/18.png", newAlt: "18" },
    { id: "37", image: "./images/19.png", newAlt: "19" },
    { id: "38", image: "./images/19.png", newAlt: "19" },
    { id: "39", image: "./images/20.png", newAlt: "20" },
    { id: "40", image: "./images/20.png", newAlt: "20" },
    { id: "41", image: "./images/21.png", newAlt: "21" },
    { id: "42", image: "./images/21.png", newAlt: "21" },
];

// Get the start button and add an event listener
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    const usernameInput = document.getElementById('username').value.trim();
    if (usernameInput) {
        currentUser = usernameInput; // Store the username
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('difficulty-selection').style.display = 'flex'; // Show difficulty selection
    } else {
        alert('Please enter your name.');
    }
});

// Show login page
const showLoginPage = () => {
    loginContainer.style.display = 'flex';
    gameContainer.style.display = 'none';
    rankingContainer.style.display = 'none';
};

// Start the game
const startGame = (difficulty) => {
    currentDifficulty = difficulty; // Store the current difficulty
    loginContainer.style.display = 'none';
    gameContainer.style.display = 'block';
    setupGame(difficulty);
};

// Setup game based on difficulty
const setupGame = (difficulty) => {
    let pairsCount;
    switch (difficulty) {
        case 'easy':
            pairsCount = 6; // 3 pairs (6 cards)
            break;
        case 'normal':
            pairsCount = 12; // 6 pairs (12 cards)
            break;
        case 'hard':
            pairsCount = 21; // 10 pairs (20 cards)
            break;
        default:
            pairsCount = 6; // Default to easy
    }

    // Select unique images based on pairsCount
    const uniqueImages = [...new Set(imagesLinkArray.map(img => img.image))]; // Get unique images
    selectedImages = uniqueImages.slice(0, pairsCount).flatMap(img => [{ image: img }, { image: img }]); // Create pairs
    selectedImages.sort(() => Math.random() - 0.5); // Shuffle images

    // Setup the cards with the selected images
    for (let i = 0; i < cards.length; i++) {
        if (i < selectedImages.length) {
            allImages[i].src = selectedImages[i].image;
            allImages[i].alt = selectedImages[i].newAlt;
            cards[i].style.display = 'block'; // Show only the selected cards
        } else {
            cards[i].style.display = 'none'; // Hide extra cards
        }
    }

    // Reset game state
    restartGame(); // Reset the game
};

const restartGame = () => {
    // Reset card classes
    for (let card of cards) {
        card.classList.remove("toggled", "matched");
        card.style.pointerEvents = 'auto'; // Enable clicks
    }

    // Clear toggled cards array
    toggledCardsArray.length = 0;

    // Reset moves and win count
    move = 0;
    winCount = 0;
    movesDisplay.innerText = `Moves: ${move}`;
};

// Add event listener to restart button
restart.addEventListener('click', restartGame);

// Save user record
const saveUserRecord = async (moves, difficulty) => {
    try {
        // 將用戶記錄插入資料庫
        await knex("rank").insert({ difficulty: difficulty, name: currentUser, mark: moves });

        // 從資料庫獲取排名
        const rankings = await knex("rank")
            .where({ difficulty: difficulty }) // 正確的過濾語法
            .orderBy('mark', 'asc'); // 按 moves 升序排列

        // 更新前端顯示排名
        displayRankings(rankings);
    } catch (error) {
        console.error("Error saving user record:", error);
    }
};

// Display rankings
const displayRankings = (rankings) => {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = ''; // 清空之前的排名

    if (rankings.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No rankings available for this difficulty.';
        rankingList.appendChild(li);
    } else {
        rankings.forEach(record => {
            const li = document.createElement('li');
            li.textContent = `${record.name}: ${record.mark} moves`;
            rankingList.appendChild(li);
        });
    }

    rankingContainer.style.display = 'block'; // 顯示排名容器
};

// Event listeners for difficulty buttons
document.getElementById('easy-button').addEventListener('click', () => {
    if (currentUser) {
        startGame('easy');
    } else {
        alert('Please enter your name.');
    }
});
document.getElementById('normal-button').addEventListener('click', () => {
    if (currentUser) {
        startGame('normal');
    } else {
        alert('Please enter your name.');
    }
});
document.getElementById('hard-button').addEventListener('click', () => {
    if (currentUser) {
        startGame('hard');
    } else {
        alert('Please enter your name.');
    }
});

// Get username on input change
document.getElementById('username').addEventListener('input', (e) => {
    currentUser = e.target.value.trim(); // Store the username
});

// Card click logic
const handleCardClick = (card) => {
    if (toggledCardsArray.length < 2 && !card.classList.contains("toggled") && !card.classList.contains("matched")) {
        card.classList.add("toggled");
        toggledCardsArray.push(card);

        if (toggledCardsArray.length === 2) {
            move++;
            movesDisplay.innerText = `Moves: ${move}`;
            const [firstCard, secondCard] = toggledCardsArray;

            if (firstCard.querySelector('.card-image').src === secondCard.querySelector('.card-image').src) {
                winCount++;
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                toggledCardsArray = []; // Clear the array after a successful match

                // Debugging: Check values
                console.log(`Matched! Current winCount: ${winCount}`);
                console.log(`Total pairs needed: ${selectedImages.length / 2}`);

                // Check win condition
                if (winCount === (selectedImages.length / 2)) {
                    setTimeout(() => {
                        alert(`Congratulations!!! You won the game in ${move} moves.`);
                        saveUserRecord(move, currentDifficulty); // Save the record

                        // Disable all cards
                        for (let card of cards) {
                            card.style.pointerEvents = 'none'; // Disable clicks
                        }
                    }, 300);
                }
            } else {
                setTimeout(() => {
                    firstCard.classList.remove("toggled");
                    secondCard.classList.remove("toggled");
                    toggledCardsArray = []; // Reset for the next turn
                }, 1000);
            }
        }
    }
};

// Add event listeners for each card
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        handleCardClick(this);
    });
}

// Show the login page on initial load
showLoginPage();