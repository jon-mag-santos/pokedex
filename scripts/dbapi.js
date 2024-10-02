async function getPkms() {
    let response = await fetch(BASE_URL + PATH);
    return await response.json();    
}

async function loadSinglePkm(url) {
    let response = await fetch(url);
    return await response.json();
}

async function renderPkms() {
    for (let index = OFFSET; index < OFFSET + 20 && index < pkmList.count; index++) {
        const element = pkmList.results[index];
        let pkmResponse = await loadSinglePkm(element.url);
        if (pkmResponse != undefined){
            loadedPkms.push(pkmResponse);
        }   
    }
}


async function pkmEvolution(url){
    let speciesResponse = await fetch(url);
    let speciesResponseToJson = await speciesResponse.json();

    let evolutionChainResponse = await fetch(speciesResponseToJson.evolution_chain.url);
    let evolutionChainToJson = await evolutionChainResponse.json();
    return await evolutionChainToJson.chain;
}

async function loadEvolution(url){
    let evolutionChain = await pkmEvolution(url);
    let evoChainContent = document.getElementById("evo-chain-content");

    evoChainContent.innerHTML = "";

    evoChainContent.innerHTML += `<div class="pkm-evo-chain">
                            <img src="${getImage(extractId(evolutionChain.species.url) - 1)}" width="75px" height="75px" />
                            <span>${evolutionChain.species.name.charAt(0).toUpperCase() + evolutionChain.species.name.slice(1)}</span>
                          </div>`

    try {
        if (evolutionChain.evolves_to[0] != undefined) {
            evoChainContent.innerHTML += `<img class="arrow-double-right" src="./assets/img/winkel-doppelt-rechts.png">
                                <div class="pkm-evo-chain">
                                    <img src="${getImage(extractId(evolutionChain.evolves_to[0].species.url) - 1)}" width="75px" height="75px" />
                                    <span>${evolutionChain.evolves_to[0].species.name.charAt(0).toUpperCase() + evolutionChain.evolves_to[0].species.name.slice(1)}</span>
                                </div>`
        } 
    
        if (evolutionChain.evolves_to[0].evolves_to[0] != undefined) {
            evoChainContent.innerHTML += `<img class="arrow-double-right" src="./assets/img/winkel-doppelt-rechts.png">
                                <div class="pkm-evo-chain">
                                    <img src="${getImage(extractId(evolutionChain.evolves_to[0].evolves_to[0].species.url) - 1)}" width="75px" height="75px" />
                                    <span>${evolutionChain.evolves_to[0].evolves_to[0].species.name.charAt(0).toUpperCase() + evolutionChain.evolves_to[0].evolves_to[0].species.name.slice(1)}</span>
                                </div>`
        } 
        
    } catch (error) {
        
    }
}