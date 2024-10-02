function pkmCard(index, id, name, bgType, image, types){
    return `<div class="pkm-card" onclick="showPkm(${index})">
                <div class="pkm-card-title">
                    <span>${id}#</span>
                    <span>${name}</span>
                </div> 
                <div class="img-bg ${bgType}">
                    <img src="${image}">
                </div>
                <div class="pkm-card-type">
                    ${types}
                </div>           
            </div>`;
}

function foundedPkmCard(index, id, name, bgType, image, types){
    return `<div class="pkm-card" onclick="showFoundedPkm(${index})">
                <div class="pkm-card-title">
                    <span>${id}#</span>
                    <span>${name}</span>
                </div> 
                <div class="img-bg ${bgType}">
                    <img src="${image}">
                </div>
                <div class="pkm-card-type">
                    ${types}
                </div>           
            </div>`;
}

function detailsTable(id, name, pkmType, height, weight, base_experience, pkmAbility) {
    return `<table>
                <tr>
                    <td>ID</td>
                    <td>${id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>${pkmType}</td>
                </tr>
                <tr>
                    <td>Height/Weight</td>
                    <td>${height}m/${weight}kg</td>
                </tr>
                <tr>
                    <td>Base Experience</td>
                    <td>${base_experience}</td>
                </tr>
                <tr>
                    <td>Abilities</td>
                    <td>${pkmAbility}</td>
                </tr>
            </table>`
}

function noMatchPkm() {
    return `<div class="no-found-view">
                <img src="./assets/img/pokeball.png" class="no-rotate" width="200px" height="200px" />
                <span>No Pokémon matched your search!</span>
            </div>`
}