
(async()=>{

    var pk; //pokemons
    var selectedPk;//Pokemon seleccionado...
    var count =0;//Contador
    //let url = "https://pokeapi.co/api/v2/pokemon/"

    let init = async()=>{
        let url = "https://pokeapi.co/api/v2/pokemon?limit=1200";
        pk = await fetch(url);
        pk = await pk.json();
        pk = pk.results;
    }
    await init();
    

    let showPk = async()=>{
        let id = Math.floor(Math.random()*pk.length);
        document.querySelector("#pk-name").innerText = pk[id].name;
        document.querySelector("#title").innerText = pk[id].name;
        document.querySelector("#setModal").onclick = setModal;

        selectedPk = await fetch(pk[id].url);
        selectedPk = await selectedPk.json();
        
        if (!!selectedPk.sprites.front_default)
            document.querySelector("#pk-img").src = selectedPk.sprites.front_default;
        else
            document.querySelector("#pk-img").src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/0.png';
    }  

    let sleep = ()=> {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    let loop = async()=>{
        await showPk();
        while(1){
            await sleep();
            if (count>29){
                await showPk();
                count = 0;
            }
            count++;
        }   
    }

    
    let setModal = async()=>{
        
        console.log(selectedPk);
        

    }

    //_Funcion para poner el siguiente pokemon
    let nextPk = ()=>{
        showPk();
        count = 0;
    }

    document.querySelector("#next").onclick = nextPk;


    loop();
})();