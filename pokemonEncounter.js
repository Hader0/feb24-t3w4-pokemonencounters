
async function getPokemon() {
    console.log("Getting Pokemon now!");

    // HArdcoded for development, replace "pikachu" with a random number
    // Random number is ID from 1 to 1025
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
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
})