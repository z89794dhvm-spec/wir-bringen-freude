
const ADMIN_PASSWORD = "JGA";


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



const stats = [
    {
        key:"bier",
        name:"🍺 Bier"
    },
    {
        key:"mist",
        name:"😂 Mist"
    },
    {
        key:"punkte",
        name:"⭐ Punkte"
    },
    {
        key:"schlaege",
        name:"⛳ Schläge"
    }
];



let data =
JSON.parse(
localStorage.getItem("jgaData")
)
||
createDefault();







function createDefault(){

let obj={};


players.forEach(player=>{

obj[player]={

bier:0,
mist:0,
punkte:0,
schlaege:0

};

});


return obj;

}







function login(){


let password =
document.getElementById("password").value;



if(password !== ADMIN_PASSWORD){

alert("❌ Falsches Passwort");

return;

}



document
.getElementById("loginBox")
.style.display="none";



document
.getElementById("adminPanel")
.style.display="block";



renderAdmin();


}








function renderAdmin(){


const container =
document.getElementById("players");


let html="";



players.forEach(player=>{



html += `


<div class="player-admin">


<h3>
${player}
</h3>



${
stats.map(stat=>`


<div class="admin-row">


<span>

${stat.name}

</span>


<button onclick="
changeValue(
'${player}',
'${stat.key}',
-1
)
">

−

</button>



<div class="value">

${data[player][stat.key]}

</div>



<button onclick="
changeValue(
'${player}',
'${stat.key}',
1
)
">

+

</button>


</div>



`).join("")
}



</div>


`;



});



container.innerHTML=html;



}








function changeValue(
player,
stat,
amount
){


data[player][stat]+=amount;



if(data[player][stat]<0){

data[player][stat]=0;

}



renderAdmin();


}









function saveChanges(){


localStorage.setItem(
"jgaData",
JSON.stringify(data)
);


alert(
"✅ Änderungen gespeichert"
);


}








function resetGame(){


let confirmReset =
confirm(
"Wirklich alle Statistiken löschen?"
);



if(!confirmReset)
return;



data=createDefault();



saveChanges();


renderAdmin();


}








function exportData(){


const json =
JSON.stringify(
data,
null,
2
);



const blob =
new Blob(
[
json
],
{
type:"application/json"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download=
"Jonathan_JGA_Backup.json";


link.click();


URL.revokeObjectURL(url);


}








function importData(event){


const file =
event.target.files[0];


if(!file)
return;



const reader =
new FileReader();



reader.onload=function(e){


try{


data =
JSON.parse(
e.target.result
);



saveChanges();


renderAdmin();



alert(
"✅ Import erfolgreich"
);



}

catch{


alert(
"❌ Datei ungültig"
);


}



};



reader.readAsText(file);


}

function goBack(){

    window.location.href = "index.html";

}