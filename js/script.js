(async () => {

    var pk; // pokemons
    var selectedPk; // Pokemon seleccionado...
    var count = 0; // Contador

    var tipos = {
        "a": "b"
    };


    // colapsables

    let init = async () => {
        let url = "https://pokeapi.co/api/v2/pokemon?limit=1200";
        pk = await fetch(url);
        pk = await pk.json();
        pk = pk.results;

    }
    await init();


    let showPk = async () => {
        let id = Math.floor(Math.random() * pk.length);
        document.querySelector("#pk-name").innerText = pk[id].name;
        document.querySelector("#title").innerText = pk[id].name;
        document.querySelector("#setModal").onclick = setModal;

        selectedPk = await fetch(pk[id].url);
        selectedPk = await selectedPk.json();

        if (!! selectedPk.sprites.front_default) 
            document.querySelector("#pk-img").src = selectedPk.sprites.front_default;
         else 
            document.querySelector("#pk-img").src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png';
        
        // tipo(s)
        document.querySelector('#type').innerHTML = '';
        selectedPk.types.forEach(async type => {
            type = type.type;
            type = await fetch(type.url);
            type = await type.json();

            let typeClass = type.name;

            type = type.names;


            type = type.filter((t) => {
                return t.language.name == "es";
            });


            type = type[0].name;
            console.log(type)

            document.querySelector('#type').innerHTML += `<li class= "${typeClass} types">${type}</li>`;
        });

        // skills
        document.querySelector('#skill').innerHTML = '';
        selectedPk.abilities.forEach(async (hab) => {
            let name = hab.ability.name;
            let desc = await fetch(hab.ability.url);
            desc = await desc.json();
            desc = desc.flavor_text_entries;
            let d;
            for (let i = 0; i < desc.length; i++) {

                if (desc[i].language.name == "es") 
                    d = desc[i].flavor_text;
            }
            document.querySelector('#skill').innerHTML += `<li><b>${name}:</b><ul><li>${d}</li></ul> </li>`;
        })
        // Moves
        document.querySelector('#moves').innerHTML = '';
        await selectedPk.moves.forEach(async (m) => {

            let desc = await fetch(m.move.url);
            desc = await desc.json();
            let details = desc.flavor_text_entries;
            let name = desc.names;

            details = details.filter((det) => {
                return det.language.name == 'es'
            });

            name = name.filter((nom) => {
                return nom.language.name == 'es'
            });

            // Tipo
            let type = desc.type;
            type = await fetch(type.url);
            type = await type.json();

            let typeClass = type.name;

            type = type.names;


            type = type.filter((t) => {
                return t.language.name == "es";
            });


            type = type[0].name;
            console.log(type)

            let d = `
                <b>Detalles:</b> ${
                details[0].flavor_text
            }<br>
                <b>Poder:</b> ${
                desc.power || "n/a"
            }<br>
                <b>PP:</b> ${
                desc.pp
            }<br>
                <b>Prioridad:</b> ${
                desc.priority
            }<br>
                <b>Tipo:</b> <div class="${
                typeClass
            } types">${
                type
            }</div>
            `;


            let div = document.createElement("div");
            div.className = 'body';
            div.innerHTML = d;

            let btn = document.createElement('button');
            btn.className = "col";
            btn.innerText = name[0].name;
            btn.onclick = () => {
                btn.classList.toggle("active");
                var content = btn.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            }

            document.querySelector('#moves').appendChild(btn);
            document.querySelector('#moves').appendChild(div);

            //Stats
            document.querySelector('#stats').innerHTML = ''
            selectedPk.stats.forEach(s=>{
                document.querySelector('#stats').innerHTML+= `
                    <b>${s.stat.name} : </b> ${s.base_stat}
                    <div class="bar" style="width:${s.base_stat/5}rem"></div>

                `;
            })
        });

    }

    let sleep = () => {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    let loop = async () => {
        await showPk();
        while (1) {
            await sleep();
            if (count > 29) {
                await showPk();
                count = 0;
            }
            count++;
        }
    }


    let setModal = async () => {

        console.log(selectedPk);


    }

    // _Funcion para poner el siguiente pokemon
    let nextPk = () => {
        showPk();
        count = 0;
    }

    document.querySelector("#next").onclick = nextPk;


    loop();


})();
