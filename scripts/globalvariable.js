BASE_URL = "https://pokeapi.co/api/v2/";
PATH = "pokemon?limit=10000&offset=0";
OFFSET = 0;

let pkmList = [];
let loadedPkms = [];
let foundedPkms = [];

let currentTabIndex = 0; // Start at "Main"
const tabs = ['main', 'stats', 'evo-chain'];