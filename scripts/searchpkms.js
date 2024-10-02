async function searchPkm() {
    loadingView();
    const inputSearch = document.getElementById("search-pkm").value
    
    if (inputSearch.length >= 3){  
        let pokemonGrid = document.getElementById("pokemon-grid");
        let founded = 0;
        
        for (let index = 0; index < pkmList.results.length; index++) {
            const element = pkmList.results[index];
            if (element.name.includes(inputSearch.toLowerCase())){
                founded++;
                if (founded == 1) {
                    foundedPkms = [];
                }
                
                let pkmResponse = await loadSinglePkm(element.url);
                if (pkmResponse != undefined){
                    foundedPkms.push(pkmResponse);
                }
                
            }
            if (founded >= 20) {
                break;
            }
        }
        
        if (founded == 0) {
            pokemonGrid.innerHTML = noMatchPkm();
        } else {
            pokemonGrid.innerHTML = "";
            for (let index = 0; index < foundedPkms.length; index++) {
                const element = foundedPkms[index];
                pokemonGrid.innerHTML += foundedPkmCard(index + 1, 
                                                        element.id, 
                                                        element.name.charAt(0).toUpperCase() + element.name.slice(1),
                                                        element.types[0].type.name,
                                                        getFoundedPkmImage(index),
                                                        getType(element.types));
            }                      
        }

        if (!document.getElementById("btn-previous").disabled)
            document.getElementById("btn-previous").classList.add("d-none");

        if (!document.getElementById("btn-next").disabled)
            document.getElementById("btn-next").classList.add("d-none");

    }else{
        reloadFunc();
        if (!document.getElementById("btn-previous").disabled)
            document.getElementById("btn-previous").classList.remove("d-none");

        if (!document.getElementById("btn-next").disabled)
            document.getElementById("btn-next").classList.remove("d-none");

    }
    loadingView();
}

function showFoundedPkm(id){
    loadingView();
    document.getElementById("display-details").classList.remove("d-none");
    resetBgColor();
    document.body.classList.add("lock-scroll");
    
    let pkmImg = document.getElementById("pkm-details-img");
    pkmImg.src = (foundedPkms[id-1].sprites.other.dream_world.front_default != null) ? 
    foundedPkms[id-1].sprites.other.dream_world.front_default : getFoundedPkmImage(id-1);
    
    let pkmType = foundedPkms[id-1].types[0].type.name;
    document.getElementById("pkm-img-bg-card").classList.add(pkmType);

    let pkmMain = document.getElementById("main");
    pkmMain.innerHTML = "";
    pkmMain.innerHTML += foundedPkmMainDetails(id);

    foundedPkmStatsDetails(id);

    loadEvolution(foundedPkms[id-1].species.url, foundedPkms[id-1].sprites.other.dream_world.front_default);
    loadingView();
}

function getFoundedPkmImage(index){
    try {
        if (foundedPkms[index].sprites.other.dream_world.front_default){
            return foundedPkms[index].sprites.other.dream_world.front_default
        } else if (foundedPkms[index].sprites.front_default) {
            return foundedPkms[index].sprites.front_default;
        } else if (foundedPkms[index].sprites.other.home.front_default) {
            return foundedPkms[index].sprites.other.home.front_default;
        } else if (foundedPkms[index].sprites.other.showdown.front_default) {
            return foundedPkms[index].sprites.other.showdown.front_default;
        } else
            return getFoundedPkmImage(extractId(foundedPkms[index].species.url) - 1);
    } catch (error) {
        try {
            return getFoundedPkmImage(extractId(foundedPkms[index].species.url) - 1);
        } catch (error) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`;     
        } 
    }
     
}