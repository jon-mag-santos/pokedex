function pkmMainDetails(id) {
    let pkmType = "<div>";
    loadedPkms[id-1].types.forEach(element => {
        pkmType += `<div class="type ${element.type.name}">${element.type.name.charAt(0).toUpperCase() +
                        element.type.name.slice(1)}</div>`
    });
    pkmType += "</div>"

    let pkmAbility = "";
    
    for (let index = 0; index < loadedPkms[id-1].abilities.length; index++) {
        const element = loadedPkms[id-1].abilities[index];
        pkmAbility += element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1);
        
        if (index + 1 < loadedPkms[id-1].abilities.length){
            pkmAbility += ", ";
        }
    }

    return detailsTable(loadedPkms[id-1].id,
                        loadedPkms[id-1].name.charAt(0).toUpperCase() + loadedPkms[id-1].name.slice(1),
                        pkmType,
                        loadedPkms[id-1].height,
                        loadedPkms[id-1].weight,
                        loadedPkms[id-1].base_experience,
                        pkmAbility);
}

function pkmStatsDetails(id){
    let hp = document.getElementById("hp");
    hp.style.width = `${loadedPkms[id-1].stats[0].base_stat}px`
    
    let attack = document.getElementById("attack");
    attack.style.width = `${loadedPkms[id-1].stats[1].base_stat}px`
    
    let defense = document.getElementById("defense");
    defense.style.width = `${loadedPkms[id-1].stats[2].base_stat}px`

    let specialAttack = document.getElementById("sp-attack");
    specialAttack.style.width = `${loadedPkms[id-1].stats[3].base_stat}px`

    let specialDefense = document.getElementById("sp-defense");
    specialDefense.style.width = `${loadedPkms[id-1].stats[4].base_stat}px`

    let speed = document.getElementById("speed");
    speed.style.width = `${loadedPkms[id-1].stats[5].base_stat}px`
}

function foundedPkmMainDetails(id) {
    let pkmType = "<div>";
    foundedPkms[id-1].types.forEach(element => {
        pkmType += `<div class="type ${element.type.name}">${element.type.name.charAt(0).toUpperCase() +
                        element.type.name.slice(1)}</div>`
    });
    pkmType += "</div>"

    let pkmAbility = "";
    
    for (let index = 0; index < foundedPkms[id-1].abilities.length; index++) {
        const element = foundedPkms[id-1].abilities[index];
        pkmAbility += element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1);
        
        if (index + 1 < foundedPkms[id-1].abilities.length){
            pkmAbility += ", ";
        }
    }

    return detailsTable(foundedPkms[id-1].id,
                        foundedPkms[id-1].name.charAt(0).toUpperCase() + loadedPkms[id-1].name.slice(1),
                        pkmType,
                        foundedPkms[id-1].height,
                        foundedPkms[id-1].weight,
                        foundedPkms[id-1].base_experience,
                        pkmAbility);
}

function foundedPkmStatsDetails(id){
    let hp = document.getElementById("hp");
    hp.style.width = `${foundedPkms[id-1].stats[0].base_stat}px`
    
    let attack = document.getElementById("attack");
    attack.style.width = `${foundedPkms[id-1].stats[1].base_stat}px`
    
    let defense = document.getElementById("defense");
    defense.style.width = `${foundedPkms[id-1].stats[2].base_stat}px`

    let specialAttack = document.getElementById("sp-attack");
    specialAttack.style.width = `${foundedPkms[id-1].stats[3].base_stat}px`

    let specialDefense = document.getElementById("sp-defense");
    specialDefense.style.width = `${foundedPkms[id-1].stats[4].base_stat}px`

    let speed = document.getElementById("speed");
    speed.style.width = `${foundedPkms[id-1].stats[5].base_stat}px`
}