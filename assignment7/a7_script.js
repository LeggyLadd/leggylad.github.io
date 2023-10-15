async function loadCardData() {
    try {
        const response = await fetch('cards.json');
        let data = await response.json();
        data = data.map((card, index) => ({ ...card, id: `card-${index}` }));
        return data;
    } catch (error) {
        console.error('Error loading card data:', error);
        return [];
    }
}

function createCards(cardData) {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    for (const card of cardData) {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = card.id;
        cardElement.style.backgroundImage = `url(${card.image})`;
        cardElement.draggable = !card.used;

        cardElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify(card));
        });

        cardContainer.appendChild(cardElement);
    }
}

function handleDrop(event) {
    event.preventDefault();
    const cardData = JSON.parse(event.dataTransfer.getData("text/plain"));

    if (!cardData.used) {
        const discardPile = document.getElementById("discardPile");

        const discardedCard = document.createElement("div");
        discardedCard.className = "card";
        discardedCard.style.backgroundImage = `url(${cardData.image})`;

        discardPile.appendChild(discardedCard);

        const originalCard = document.getElementById(cardData.id);
        if (originalCard) {
            originalCard.style.backgroundImage = 'none';
            originalCard.draggable = false;
        }

        cardData.used = true;
    }
}

function resetGame() {
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    const discardPile = document.getElementById("discardPile");
    discardPile.innerHTML = "";
}

function allowDrop(event) {
    event.preventDefault();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function dealCards() {
    loadCardData().then((cardData) => {
        shuffleArray(cardData);
        createCards(cardData);
        const discardPile = document.getElementById("discardPile");
        discardPile.innerHTML = "";
    });
}

document.getElementById("dealButton").addEventListener("click", dealCards);
document.getElementById("resetButton").addEventListener("click", resetGame);
