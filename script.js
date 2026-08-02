
const players = [
    "Jonathan",
    "Roy",
    "David",
    "Jan",
    "Julian",
    "Simon",
    "Anton",
    "Philip",
    "Joel"
];


const defaultData = {};

players.forEach(player => {

    defaultData[player] = {

        bier:0,
        mist:0,
        punkte:0,
        schlaege:0

    };

});



let data =
JSON.parse(localStorage.getItem("jgaData"))
||
defaultData;



let currentStat = "bier";

let previousLeader = null;



const statConfig = {

    bier:{
        title:"🍺 Meistes Bier",
        icon:"🍺",
        reverse:true
    },


    mist:{
        title:"😂 Meiste Mistgeschicke",
        icon:"😂",
        reverse:true
    },


    punkte:{
        title:"⭐ Meiste Punkte",
        icon:"⭐",
        reverse:true
    },


    schlaege:{
        title:"⛳ Wenigste Schläge",
        icon:"⛳",
        reverse:false
    }

};





function save(){

    localStorage.setItem(
        "jgaData",
        JSON.stringify(data)
    );

}






function showStat(stat){

    currentStat = stat;

    render();

}







function addPoint(player){

    data[player][currentStat]++;

    save();


    createEmoji(
        statConfig[currentStat].icon
    );


    if(navigator.vibrate){

        navigator.vibrate(40);

    }


    checkLeader();


    render();

}









function sortedPlayers(){

    let list =
    Object.entries(data);


    list.sort((a,b)=>{


        let valueA =
        a[1][currentStat];


        let valueB =
        b[1][currentStat];


        if(statConfig[currentStat].reverse){

            return valueB-valueA;

        }


        return valueA-valueB;


    });


    return list;

}








function render(){


    const ranking =
    document.getElementById("ranking");


    if(!ranking)
    return;



    let html = `

    <h2 class="stat-title">
    ${statConfig[currentStat].title}
    </h2>

    `;



    let list =
    sortedPlayers();


    let max =
    Math.max(
        ...list.map(
            x=>x[1][currentStat]
        ),
        1
    );




    list.forEach((item,index)=>{


        let player =
        item[0];


        let value =
        item[1][currentStat];



        let medal =
        "";


        if(index===0)
        medal="🥇";


        if(index===1)
        medal="🥈";


        if(index===2)
        medal="🥉";



        let first =
        index===0
        ?
        "first-place"
        :
        "";



        let percent =
        value/max*100;



        html += `


        <div class="
        player-card
        ${first}
        ">


            <div class="player-header">


                <span class="rank">
                ${medal}
                ${index+1}.
                </span>


                <span>
                ${player}
                </span>


                <span class="score">
                ${value}
                </span>


            </div>



            <div class="progress">

                <div
                class="progress-bar"
                style="
                width:${percent}%
                ">
                </div>

            </div>



            <div class="actions">


                <button
                class="plus"
                onclick="
                addPoint('${player}')
                "
                >

                +

                </button>


            </div>



        </div>



        `;


    });



    ranking.innerHTML = html;


    renderPodium();

}








function renderPodium(){


    const podium =
    document.getElementById("podium");


    if(!podium)
    return;



    let list =
    sortedPlayers();



    let top =
    list.slice(0,3);



    podium.innerHTML = `


    ${
    top[1]
    ?
    podiumCard(
        top[1],
        "🥈",
        "podium-second"
    )
    :
    ""
    }


    ${
    top[0]
    ?
    podiumCard(
        top[0],
        "🥇",
        "podium-first"
    )
    :
    ""
    }


    ${
    top[2]
    ?
    podiumCard(
        top[2],
        "🥉",
        "podium-third"
    )
    :
    ""
    }


    `;

}







function podiumCard(player,medal,className){


return `


<div class="
podium-card
${className}
">


<div style="font-size:35px">
${medal}
</div>


<strong>
${player[0]}
</strong>


<br>


${player[1][currentStat]}


</div>


`;


}









function createEmoji(icon){


let element =
document.createElement("div");


element.className =
"float-effect";


element.innerHTML =
icon;



element.style.left =
Math.random()*80+10+"%";



document
.getElementById("floatingEffects")
.appendChild(element);



setTimeout(()=>{

element.remove();

},1200);


}









function checkLeader(){


let leader =
sortedPlayers()[0][0];


if(
previousLeader
&&
previousLeader!==leader
){

    launchConfetti();


}



previousLeader =
leader;


}









function launchConfetti(){


for(
let i=0;
i<40;
i++
){


let c =
document.createElement("div");


c.className =
"confetti-piece";


c.innerHTML =
"🎉";



c.style.left =
Math.random()*100+"%";


c.style.animationDelay =
Math.random()+"s";



document
.getElementById("confetti")
.appendChild(c);



setTimeout(()=>{

c.remove();

},3000);



}


}









render();