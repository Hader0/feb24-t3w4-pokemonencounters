
let pokemonRenderArea = document.getElementById("pokemonEncounterArea");

function renderPokemonData(pokemonData) {
    if (!pokemonData.name) {
        return;
    }

    pokemonRenderArea.innerText = pokemonData.name;

    let pokemonContainerDiv = document.createElement("div");
    pokemonContainerDiv.classList += "pokemonCardEntry";

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);

    let pokemonTypesHeading = document.createElement("h3");
    pokemonTypesHeading.innerText = "Types:";
    pokemonContainerDiv.appendChild(pokemonTypesHeading);

    let pokemonTypeList = document.createElement("ul");
    pokemonData.types.forEach((typeObject) => {
        // PokemonData.types is an array
        // Need to make one 'li' element per type
        // Append that to the 'ul' element

        let pokemonTypeListItem = document.createElement("li");
        pokemonTypeListItem.innerText = typeObject.type.name;
        pokemonTypeList.appendChild(pokemonTypeListItem);
    })

    pokemonContainerDiv.appendChild(pokemonTypeList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play Sound";
    pokemonAudioButton.addEventListener("click", () => {
        let pokemonAudioObject = new Audio(pokemonData.sound);
        pokemonAudioObject.play();
    });

    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
}

function getRandomPokemonId() {
    // Random number between 1 and 1025 inclusive
    return Math.floor(Math.random() * 1025) + 1;
}

async function getPokemon() {
    console.log("Getting Pokemon now!");

    // HArdcoded for development, replace "pikachu" with a random number
    // Random number is ID from 1 to 1025
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
    let apiData = await apiResponse.json();

    let pokemonName = apiData.name;

    // Name, Tyes, Image, Sound
    return {
        name: apiData.name,
        types: apiData.types,
        image: apiData.sprites.other.home.front_default,
        sound: apiData.cries.latest
    };
}

let encounterButton = document.getElementById("pokemonEncounterButton");
// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click",  async (event) => {
    console.log("Some block of code in the event listener");
    let pokemonResult = await getPokemon();
    console.log(pokemonResult);

    renderPokemonData(pokemonResult);
});

let encounterGroupButton = document.getElementById("pokemonGroupEncounter");

encounterGroupButton.addEventListener("click", async () => {

		let multiplePokemonResult = await Promise.all([
			getPokemon(),
			getPokemon(),
			getPokemon(),
			getPokemon(),
			getPokemon(),
			getPokemon(),
		]);

		console.log(multiplePokemonResult);

		multiplePokemonResult.forEach(renderPokemonData);
});