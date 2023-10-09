// Function to load card data from the JSON file
async function loadCardData() {
    try {
        const response = await fetch('cards.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading card data:', error);
        return [];
    }
}

// Function to create cards based on the card data
function createCards(cardData) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    for (const card of cardData) {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.style.backgroundImage = `url(${card.image})`;
        cardElement.draggable = true;

        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify(card));
            cardElement.style.display = "none"; // Hide the card when dragged
        });

        cardContainer.appendChild(cardElement);
    }
}


let zIndexCounter = 1; // Initialize a counter for z-index

function handleDrop(event) {
    event.preventDefault();
    const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));

    if (!cardData.used) {
        const discardPile = document.getElementById("discardPile");
        const discardedCard = document.createElement("div");
        discardedCard.className = "card";
        discardedCard.style.backgroundImage = `url(${cardData.image})`;

        // Set the z-index for the discarded card
        discardedCard.style.zIndex = zIndexCounter;
        zIndexCounter++; // Increment the z-index counter

        discardPile.appendChild(discardedCard);

        // Mark the card as used
        cardData.used = true;
    }

    const cardContainer = document.getElementById("cardContainer");

    // Add a placeholder div for the used card's initial position
    const placeholder = document.createElement("div");
    placeholder.className = "card-placeholder";
    cardContainer.appendChild(placeholder);
}




function resetGame() {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    const discardPile = document.getElementById("discardPile");
    discardPile.innerHTML = "";

    dealtCards.length = 0; // Clear the dealtCards array
    zIndexCounter = 1; // Reset the z-index counter
}

// Function to allow dropping cards onto the discard pile
function allowDrop(event) {
    event.preventDefault();
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to deal cards
function dealCards() {
    loadCardData().then((cardData) => {
        shuffleArray(cardData);
        createCards(cardData);
    });
}

// Add event listeners
document.getElementById("dealButton").addEventListener("click", dealCards);
document.getElementById("resetButton").addEventListener("click", resetGame);

