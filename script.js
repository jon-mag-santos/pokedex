async function onloadFunc() {
    loadingView();
    pkmList = await getPkms();
    await renderPkms();
    if (loadedPkms.length > 0) {
        loadPkmGrid();    
    } else {
        console.error("No pokemon loaded.");
    }
    loadingView();
}

async function reloadFunc() {
    if (OFFSET >= loadedPkms.length && OFFSET < pkmList.count) {
        loadingView();
        await renderPkms();
        loadPkmGrid();
        loadingView();
    }else {
        loadPkmGrid();
    }    
    window.scrollTo({ top: 0, behavior : 'instant'});
}

function showPkm(id){
    loadingView();
    document.getElementById("display-details").classList.remove("d-none");
    resetBgColor();
    document.body.classList.add("lock-scroll");
    
    let pkmImg = document.getElementById("pkm-details-img");
    pkmImg.src = (loadedPkms[id-1].sprites.other.dream_world.front_default != null) ? 
    loadedPkms[id-1].sprites.other.dream_world.front_default : getImage(id-1);
    
    let pkmType = loadedPkms[id-1].types[0].type.name;
    document.getElementById("pkm-img-bg-card").classList.add(pkmType);

    let pkmMain = document.getElementById("main");
    pkmMain.innerHTML = "";
    pkmMain.innerHTML += pkmMainDetails(id);

    pkmStatsDetails(id);

    loadEvolution(loadedPkms[id-1].species.url, loadedPkms[id-1].sprites.other.dream_world.front_default);
    loadingView();
}

//Function used to extract the id number from url. It helps to get the pokemon image.
function extractId(url) {
    return url.split('/').filter(Boolean).pop();
}

function loadPkmGrid() {
    let pokemonGrid = document.getElementById("pokemon-grid");
    pokemonGrid.innerHTML = "";
    for (let index = OFFSET; index < OFFSET + 20; index++) {
        if (index >= loadedPkms.length) {
            break;
        }
        const element = loadedPkms[index];
        pokemonGrid.innerHTML += pkmCard(index + 1, 
                                        element.id, 
                                        element.name.charAt(0).toUpperCase() + element.name.slice(1),
                                        element.types[0].type.name,
                                        getImage(index),
                                        getType(element.types));
    }
}

function getType(types){
    let pkmType = "";
    for (const element of types){
        pkmType += `<div class="type ${element.type.name}">${element.type.name.charAt(0).toUpperCase() +
                        element.type.name.slice(1)}</div>`
    }

    return pkmType;
}

function getImage(index){
    try {
        if (loadedPkms[index].sprites.other.dream_world.front_default){
            return loadedPkms[index].sprites.other.dream_world.front_default
        } else if (loadedPkms[index].sprites.front_default) {
            return loadedPkms[index].sprites.front_default;
        } else if (loadedPkms[index].sprites.other.home.front_default) {
            return loadedPkms[index].sprites.other.home.front_default;
        } else if (loadedPkms[index].sprites.other.showdown.front_default) {
            return loadedPkms[index].sprites.other.showdown.front_default;
        } else
            return getImage(extractId(loadedPkms[index].species.url) - 1);
    } catch (error) {
        try {
            return getImage(extractId(loadedPkms[index].species.url) - 1);
        } catch (error) {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index + 1}.png`;     
        } 
    }
     
}

function closeDisplay() {
    document.getElementById("display-details").classList.add("d-none");
    document.body.classList.remove("lock-scroll");
    resetContent();
}

function resetBgColor(){
    let bgColor = document.getElementById("pkm-img-bg-card");
    bgColor.className = "";
    bgColor.className = "pkm-img-bg-card";
}

function loadingView() {
    document.getElementById("loading-view").classList.toggle("d-none");
}

function loadPreviousPkms(){
    if (OFFSET >= 20){
        OFFSET -= 20;
        
        if(document.getElementById("btn-next").disabled){
            document.getElementById("btn-next").disabled = false;
            document.getElementById("btn-next").classList.remove("d-none");
        }

        if(OFFSET < 20) {
            document.getElementById("btn-previous").disabled = true;
            document.getElementById("btn-previous").classList.add("d-none");
        }
    } 
    reloadFunc();
}

function loadNextPkms(){
    OFFSET += 20;

    if(document.getElementById("btn-previous").disabled){
        document.getElementById("btn-previous").disabled = false;
        document.getElementById("btn-previous").classList.remove("d-none");
    }

    if (OFFSET >= pkmList.count - 20){
        document.getElementById("btn-next").disabled = true;
        document.getElementById("btn-next").classList.add("d-none");
    }
    reloadFunc();
}

function showContent(option, tab) {
    let contentsOption = document.querySelectorAll('.content, .option');
    contentsOption.forEach(function(content) {
        content.classList.remove('active');
    });

    document.getElementById(option).classList.add('active');
    document.getElementById(option + "-option").classList.add('active');

    currentTabIndex = tab;
}

function resetContent() {
    let contentsOption = document.querySelectorAll('.content, .option');
    contentsOption.forEach(function(content) {
        content.classList.remove('active');
    });

    document.getElementById("main").classList.add('active');
    document.getElementById("main-option").classList.add('active');
    currentTabIndex = 0;
}

function navigateTabs(direction) {
    document.querySelector('.content.active').classList.remove('active');
    document.querySelector('.option.active').classList.remove('active');

    currentTabIndex += direction;

    if (currentTabIndex < 0) {
        currentTabIndex = tabs.length - 1;
    } else if (currentTabIndex >= tabs.length) {
        currentTabIndex = 0;
    }

    document.getElementById(tabs[currentTabIndex]).classList.add('active');
    document.getElementById(`${tabs[currentTabIndex]}-option`).classList.add('active');
}
