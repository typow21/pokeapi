//input from the html search for
function getPokemonName(){
    var name;
    if(document.getElementById("pokemon").value == null){
        alert("Please fill in the search box.");
    }
    else{
        name = document.getElementById("pokemon").value;
        pokemonName = name;
    }
    pokemonName = pokemonName.toLowerCase();
    pokemonName = pokemonName.trim();
    console.log(pokemonName)
    fetchData(pokemonName);
}
function fetchData(pokemonName){
    let link = 'https://pokeapi.co/api/v2/pokemon/'+pokemonName;
    fetch(link)
        .then((reponse) => {
            if(reponse.ok){
                return reponse.json();
            }else{
                return Promise.reject('something went wrong!');
            }
        })
        .then((myJson) => {
            console.log(myJson);
            //pokemon name
            document.getElementById("name").innerHTML = myJson.name;
            // pokemonName = document.getElementByID("search").value;

            //image
            var pokeImage = document.createElement("img");
            pokeImage.onload = function(){
                document.getElementById("image").innerHTML="";
                document.getElementById("image").appendChild(pokeImage);
            }
            pokeImage.src = myJson.sprites.front_default;

            //attributes
            document.getElementById("weight").innerHTML = myJson.weight;
            document.getElementById("height").innerHTML = myJson.height;
            document.getElementById("type").innerHTML = myJson.types[0].type.name;
            console.log(myJson.sprites.front_default);

            //attack drilldown
            var attackArray = myJson.moves;
            var attack = null;
            var count = "0";
            var attackButtons = document.getElementById("attack_buttons");
            attackButtons.innerHTML = "";

            //use a fetch for the details

            console.log(attackArray);
            for(i = 0; i < attackArray.length;i++){
                    attack = attackArray[i];
                    var button = document.createElement("button");
                    button.style.color = 'blue';
                    button.innerHTML = attack.move.name;
                    count++;
                    button.id = attack.move.url; //buttons are all mapped to the same memory?
                    //button.id = "btnAttack";
                    // console.log("test: "+button.id);
                    // console.log("Test: "+ this.button);
                    button.addEventListener('click', getDetails)
                    attackButtons.appendChild(button)
            }
        })
}
function getDetails(){    
    var url = this.id;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((myJson) =>{
            console.log(myJson)
            document.getElementById("attack_name").innerHTML = myJson.name
            var flavorArr = myJson.flavor_text_entries //what is flavor text?
            document.getElementById("flavor_text").innerHTML = myJson.flavor_text_entries[2].flavor_text
            console.log("Flavor text: "+myJson.flavor_text_entries[2].flavor_text)
            document.getElementById("accuracy").innerHTML = myJson.accuracy;
            document.getElementById("pp").innerHTML = myJson.pp
            document.getElementById("power").innerHTML = myJson.power
            // console.log(myJson.type.name)
            document.getElementById("attack_type").innerHTML = myJson.type.name
        })
}

//$(document).on('click','#btnAttack',function(){console.log("button clicked!")})
//returns an array?

//do some html shit or somehting?

// soruce.inner();
// Automated testing

// fetch(link)

// Innerhtml that links to the myjson kinda 

// doc.getid (“speed”).innterHtml.stat[0].base_stat 
