"use strict";

function start() {
    depart = new Date();
    f = setInterval(randevent, reste);

    setTimeout(function () {
        resetc.classList.add("hidden");
    }, 300000);

    pausec.disabled = false;
    playc.disabled = true;

    document.getElementById("race").classList.remove("hidden");
    divheure.innerHTML = heure;
    divminute.innerHTML = minute;
    divseconde.innerHTML = seconde;

    //Chrono
    e = setInterval(function () {
        if (seconde == 0) {
            seconde = 59;
            minute--;
            divheure.innerHTML = heure;
            divminute.innerHTML = minute;
            divseconde.innerHTML = seconde;
            if (minute <= 0) {
                heure--;
                minute = 59;
                divheure.innerHTML = heure;
                divminute.innerHTML = minute;
                divseconde.innerHTML = seconde;
            }
        } else {
            seconde--;
            divheure.innerHTML = heure;
            divminute.innerHTML = minute;
            divseconde.innerHTML = seconde;
        }

        if (heure == 0 && minute == 0 && seconde == 0) {
            clearInterval(e);
            clearInterval(f);
            alert("la course est finie !");
            endgame();
        }
    }, 1000);

    //pause chrono
    pausec.onclick = function () {
        clearInterval(e);
        reste = 1200000 - (new Date() - depart);
        clearInterval(f);
        pausec.disabled = true;
        playc.disabled = false;
    }

    //play chrono
    playc.onclick = function () {
        start();
        pausec.disabled = false;
        playc.disabled = true;
    }

    //Reset Chrono
    resetc.onclick = function () {
        console.log("RESET");
        heure = res;
        minute = 0;
        seconde = 0;
        clearInterval(e);
        resetc.classList.add("hidden");
        alert("Clique dès que les joueurs sont prêts !");
        historique.innerHTML = "";
        start();
    }
}

function randevent() {
    eplay.play();
    var randp = Math.floor(Math.random() * players.length);
    console.log(randp);
    var rande = Math.floor(Math.random() * event.length);
    console.log(rande);

    console.log(players[randp] + " doit " + event[rande]);
    historique.innerHTML = historique.innerHTML + "[" + new Date().getHours() + " h " + new Date().getMinutes() + "] " + players[randp] + " doit " + event[rande] + "<br>";

    clearInterval(e);
    clearInterval(f);
    pausec.disabled = true;
    playc.disabled = false;
    reste = 1200000;
}

function endgame() {
    var text = "Pokérace finie le " + new Date() + "\n" + "Effectuée sur " + document.getElementById("games").value + "\n" + "ROM randomisée : " + document.getElementById("random").value + "\n" + "Durée de la course : " + document.getElementById("time").value + " heure \n \n";

    text = text + "Liste des joueurs : \n"
    for (var j = 0; j <= players.length - 1; j++) {
        text = text + players[j] + "\n";
    }
    text = text + "\n \n";

    text = text + "Liste des événements : \n";

    for (var k = 0; k <= event.length - 1; k++) {
        text = text + event[k] + "\n";
    }

    text = text + "\n \n";

    text = text + "Historique des évènements \n \n" + historique.innerHTML;
    for (var i = 0; i <= text.length - 1; i++) {
        text = text.replace("<br>", "\n");
    }
    console.log(text);


    const textToBLOB = new Blob([text], {
        type: 'text/plain'
    });
    const sFileName = 'Historique Pokérace du ' + new Date() + '.txt';

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();

}
var players = [];
var event = [];

//TimeOut
var depart;
var reste = 1200000;
var e;
var f;

//Valeurs du chrono
var heure;
var minute;
var seconde;
var res;

//Div du Chrono
var divheure = document.getElementById("heure");
var divminute = document.getElementById("minute");
var divseconde = document.getElementById("seconde");

//Boutons du chrono
var pausec = document.getElementById("pausec");
var playc = document.getElementById("playc");
var resetc = document.getElementById("resetc");

//Historique
var historique = document.getElementById("history");

//Div de joueurs et event
var playerin = document.getElementById("addplayer");
var eventin = document.getElementById("addevent");

//Son
var eplay = new Audio("son/damage.mp3");

//Séléction du jeu
document.getElementById("first").onclick = function () {
    document.getElementById("jeux").classList.add("hidden");
    document.getElementById("preparation").classList.remove("hidden");

}

//ajout de joueurs
playerin.onclick = function () {
    var pname = document.getElementById('playerin').value;
    if (pname == "") {
        alert("Rentrez un nom de joueur");
    } else {
        document.getElementById('playerin').value = "";
        console.log("ajout de joueur : " + pname);
        players.push(pname);
        console.log(players);

        document.getElementById('playerlist').innerHTML = "";

        for (var i = 0; i < players.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = players[i] + " <button class='remplayer'>Retirer le joueur</button>";
            document.getElementById('playerlist').appendChild(li);
        }
    }
}

//Ajout d'evênements
eventin.onclick = function () {
    var ename = document.getElementById('eventin').value;
    if (ename == "") {
        alert("Rentrez un évènement");
    } else {
        document.getElementById('eventin').value = "";
        console.log("ajout d'évènement : " + ename);
        event.push(ename);
        console.log(event);

        document.getElementById('eventlist').innerHTML = "";

        for (var i = 0; i < event.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = event[i] + " <button class='remevent'>Supprimer évènement</button>";
            document.getElementById('eventlist').appendChild(li);
        }
    }
}

//Retirer un event
$(document).on('click', ".remevent", function (e) {
    var remevent = this.parentElement.innerHTML;
    remevent = remevent.replace(' <button class="remevent">Supprimer évènement</button>', "");
    console.log(remevent);

    for (var b = 0; b <= event.length - 1; b++) {
        if (event[b] == remevent) {
            event.splice(event.indexOf(remevent), 1);
            console.log(event);
            break;
        }
    }
    $(this).parent().remove();
});

//Retirer un joueur
$(document).on('click', ".remplayer", function (e) {
    var remplayer = this.parentElement.innerHTML;
    remplayer = remplayer.replace(' <button class="remplayer">Retirer le joueur</button>', "");
    console.log(remplayer);

    for (var b = 0; b <= players.length - 1; b++) {
        if (players[b] == remplayer) {
            players.splice(players.indexOf(remplayer), 1);
            console.log(players);
            break;
        }
    }
    $(this).parent().remove();
});

document.getElementById("begin").onclick = function () {
    if (players.length <= 1) {
        alert("Pas assez de joueurs");
    } else if (event.length <= 2) {
        alert("Pas assez d'évènements !");
    } else {
        alert("Tout commence et que le meilleur gagne !");
        document.getElementById("preparation").classList.add("hidden");

        switch (document.getElementById("time").value) {
            case "1":
                console.log(1);
                res = 1;
                heure = 1;
                minute = 0;
                seconde = 0;
                start();
                break;
            case "2":
                console.log(2);
                res = 2;
                heure = 2;
                minute = 0;
                seconde = 0;
                start();
                break;
            case "3":
                console.log(3);
                res = 3;
                heure = 3;
                minute = 0;
                seconde = 0;
                start();
                break;
            case "4":
                console.log(4);
                res = 4;
                heure = 4;
                minute = 0;
                seconde = 0;
                start();
                break;
            case "5":
                console.log(5);
                res = 5;
                heure = 5;
                minute = 0;
                seconde = 0;
                start();
                break;
        }
    }
}
