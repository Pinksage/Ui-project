const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const content = document.querySelector('.content');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Fetch Harry Potter characters from the API
fetch('https://hp-api.onrender.com/api/characters')
    .then(response => response.json())
    .then(characters => {
        const menuList = document.querySelector('.menu');
        characters.slice(0, 13).forEach(character => {
            const menuItem = document.createElement('li');
            menuItem.textContent = character.name;
            menuItem.classList.add('menu-item');
            menuItem.setAttribute('data-character-id', character.id);
            menuList.appendChild(menuItem);
        });

        // Add click event listeners to menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', () => {
                const characterId = menuItem.getAttribute('data-character-id');
                const selectedCharacter = characters.find(character => character.id === characterId);

                // Display character information including image
                const characterInfo = document.querySelector('.character-info');
                const characterImage = document.querySelector('.character-image');
                const characterName = document.querySelector('.character-name');
                const characterHouse = document.querySelector('.character-house');
                const characterSpecies = document.querySelector('.character-species');
                const characterWand = document.querySelector('.character-wand');
                const characterPatronus = document.querySelector('.character-patronus');
                const characterBirth = document.querySelector('.character-birth');
                const characterActor = document.querySelector('.character-actor');

                characterImage.src = selectedCharacter.image;
                characterName.textContent = selectedCharacter.name;
                characterHouse.textContent = `House: ${selectedCharacter.house || "Unknown"}`;
                characterSpecies.textContent = `Species: ${selectedCharacter.species || "Unknown"}`;
                characterWand.textContent = `Wand: ${selectedCharacter.wand || "Unknown"}`;
                characterPatronus.textContent = `Patronus: ${selectedCharacter.patronus || "Unknown"}`;
                characterBirth.textContent = `Date of Birth: ${selectedCharacter.dateOfBirth || "Unknown"}`;
                characterActor.textContent = `Actor: ${selectedCharacter.actor || "Unknown"}`;

                // Close the menu
                menu.classList.remove('active');
            });
        });
    })
    .catch(error => {
        console.error("Error fetching character data:", error);
    });
