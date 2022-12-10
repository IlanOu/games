"use strict"

// ================
// ==  Variables ==
// ================
//#region 
let screen1 = document.getElementById("screen1");
let screen2 = document.getElementById("screen2");

let screen1Calc = document.getElementById("screen1Calc");
let screen2Calc = document.getElementById("screen2Calc");

let rocket1 = document.getElementById("rocket1");
let rocket2 = document.getElementById("rocket2");

let pageHeight = document.getElementById("cases");

let fireRocket1 = document.querySelector("#fireRocket1");
let fireRocket2 = document.querySelector("#fireRocket2");

let col = document.querySelectorAll(".col");

let heightS1 = 250
let heightS2 = 250
let step = 2.23;

let rocket1Top = 55;
let rocket2Top = 55;

let isPlaying = false;

let nbClicksR1 = 0;
let nbClicksR2 = 0;

let gameIsFinish = false;

let intervalP1 = 0;
let intervalP2 = 0;

let scoreRocket1 = 0;
let scoreRocket2 = 0;
//#endregion

// ================
// ==  Fonctions ==
// ================
//#region
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let maxCloud = randomInt(3, 6);
let maxStars = randomInt(30, 120);

let init = () => {
    // init les nuages
    

    for (let i = 0; i < maxCloud; i++) {
        let newCloud = document.createElement("div");
        newCloud.classList.add("Cloud");

        screen1Calc.appendChild(newCloud);
    }

    for (let i = 0; i < maxCloud; i++) {
        let newCloud = document.createElement("div");
        newCloud.classList.add("Cloud");

        screen1.appendChild(newCloud);
    }

    for (let i = 0; i < maxCloud; i++) {
        let newCloud = document.createElement("div");
        newCloud.classList.add("Cloud");

        screen2Calc.appendChild(newCloud);
    }

    for (let i = 0; i < maxCloud; i++) {
        let newCloud = document.createElement("div");
        newCloud.classList.add("Cloud");

        screen2.appendChild(newCloud);
    }


    document.querySelectorAll(".colonnesCalc .Cloud").forEach((item) => {
        let randomBottom = randomInt(5, 25);
        let randomLeft = randomInt(0, 85);
        let randomSize = randomInt(5, 15);

        item.style.setProperty("bottom", randomBottom + "%");
        item.style.setProperty("left", randomLeft + "%");
        item.style.setProperty("width", randomSize + "%");
    })

    document.querySelectorAll(".colonnes .Cloud").forEach((item) => {
        let randomBottom = randomInt(5, 25);
        let randomLeft = randomInt(0, 85);
        let randomSize = randomInt(15, 25);

        item.style.setProperty("bottom", randomBottom + "%");
        item.style.setProperty("left", randomLeft + "%");
        item.style.setProperty("width", randomSize + "%");
    })


    // init les étoiles

    for (let i = 0; i < maxStars; i++) {
        let newStar = document.createElement("div");
        newStar.classList.add("Star");

        screen1.appendChild(newStar);
        
    }
    for (let i = 0; i < maxStars; i++) {
        let newStar = document.createElement("div");
        newStar.classList.add("Star");

        screen2.appendChild(newStar);
        
    }

    document.querySelectorAll(".Star").forEach((item) => {
        let randomBottom = randomInt(40, 80);
        let randomLeft = randomInt(0, 100);
        let randomSize = randomInt(0.2, 5);

        item.style.setProperty("bottom", randomBottom + "%");
        item.style.setProperty("left", randomLeft + "%");
        item.style.setProperty("width", randomSize + "px");
        item.style.setProperty("height", randomSize + "px");
    })

    // init les screens

    screen1.style.setProperty("transform", "translateY(-" + heightS1 + "vh)");
    screen1Calc.style.setProperty("transform", "translateY(-" + heightS1*1.2 + "vh)");
    screen2.style.setProperty("transform", "translateY(-" + heightS2 + "vh)");
    screen2Calc.style.setProperty("transform", "translateY(-" + heightS2*1.2 + "vh)");

    document.querySelector("#rocketScore1").style.setProperty("left", "0%");
    document.querySelector("#rocketScore2").style.setProperty("left", "0%");
}
//#endregion

// ================
// ===  Gravité ===
// ================ 
//#region 
let fallR1 = () => {

    if (isPlaying){
        if (heightS1 < 250){
            heightS1 += step;
            screen1.style.setProperty("transform", "translateY(-" + heightS1 + "vh)");
            screen1Calc.style.setProperty("transform", "translateY(-" + heightS1*1.2 + "vh)");
    
            rocket1.style.setProperty("top", "" + rocket1Top-0.5 + "%");
            rocket1Top += 0.5;
    
            nbClicksR1--;
    
            fireRocket1.style.setProperty("transform", "rotate(180deg) translateY(-"+(nbClicksR1+30)+"%) scale("+ nbClicksR1/50 +")");
        
            document.querySelector("#score1").innerHTML = nbClicksR1 + "%";
            document.querySelector("#rocketScore1").style.setProperty("left", (nbClicksR1/100)*90+"%");
        }
    }
}

let fallR2 = () => {

    if (isPlaying){
        if (heightS2 < 250){
            heightS2 += step;
            screen2.style.setProperty("transform", "translateY(-" + heightS2 + "vh)");
            screen2Calc.style.setProperty("transform", "translateY(-" + heightS2*1.2 + "vh)");
    
            rocket2.style.setProperty("top", "" + rocket2Top-0.5 + "%");
            rocket2Top += 0.5;
    
            nbClicksR2--;
    
            fireRocket2.style.setProperty("transform", "rotate(180deg) translateY(-"+(nbClicksR2+30)+"%) scale("+ nbClicksR2/50 +")");
        
            document.querySelector("#score2").innerHTML = nbClicksR2 + "%";
            document.querySelector("#rocketScore2").style.setProperty("left", (nbClicksR2/100)*90+"%");
        }
    }    
}
//#endregion

// ================
// ===== Jeu  =====
// ================
//#region
document.addEventListener('keyup', (e) => {


    if (isPlaying === true){

        // Joueur 1
        if (e.key === "w") {

            if (intervalP1 != undefined){
                clearInterval(intervalP1);
            }
            intervalP1 = setInterval(fallR1, '200');


            if (!gameIsFinish){
                nbClicksR1++;
                document.querySelector("#score1").innerHTML = nbClicksR1 + "%";
            }


            fireRocket1.style.setProperty("transform", "rotate(180deg) translateY(-"+(nbClicksR1+30)+"%) scale("+ nbClicksR1/50 +")");
            document.querySelector("#rocketScore1").style.setProperty("left", (nbClicksR1/100)*90+"%");


            if (nbClicksR1 < 100) {
                heightS1 -= step;
                screen1.style.setProperty("transform", "translateY(-" + heightS1 + "vh)");
                screen1Calc.style.setProperty("transform", "translateY(-" + heightS1*1.2 + "vh)");

                
                rocket1.style.setProperty("top", "" + rocket1Top-0.5 + "%");
                rocket1Top -= 0.5;
            }else{
                gameIsFinish = true;

                win(1);
            }

        }

        // Joueur 2
        if (e.key === "ArrowUp") {

            if (intervalP2 != undefined){
                clearInterval(intervalP2);
            }
            intervalP2 = setInterval(fallR2, '200');

            if (!gameIsFinish){
                nbClicksR2++;
                document.querySelector("#score2").innerHTML = nbClicksR2 + "%"
            }

        
            fireRocket2.style.setProperty("transform", "rotate(180deg) translateY(-"+(nbClicksR2+30)+"%) scale("+ nbClicksR2/50 +")");
            document.querySelector("#rocketScore2").style.setProperty("left", (nbClicksR2/100)*90+"%");


            if (nbClicksR2 < 100) {
                heightS2 -= step;
    
                screen2.style.setProperty("transform", "translateY(-" + heightS2 + "vh)");
                screen2Calc.style.setProperty("transform", "translateY(-" + heightS2*1.2 + "vh)");
    
                rocket2.style.setProperty("top", "" + rocket2Top-0.5 + "%");
                rocket2Top -= 0.5;
            }else{
                gameIsFinish = true;

                win(2);
            }
        }    
    }

    // Menu

    if (e.key === "Escape"){
        if (isPlaying){
            pause();
        }else{
            start();
        }
        
    }
    if (e.key === "Enter"){
        if (!isPlaying){
            start();
        }
    }
})
//#endregion

// ================
// Reinitialisation
// ================
//#region 
let reinit = () => {
    
    document.querySelectorAll(".colonnesCalc .Cloud").forEach((item) => {
        item.parentNode.removeChild(item);
    })
    document.querySelectorAll(".colonnes .Cloud").forEach((item) => {
        item.parentNode.removeChild(item);
    })
    document.querySelectorAll(".Star").forEach((item) => {
        item.parentNode.removeChild(item);
    })

    try {
        document.querySelectorAll(".Supporter").forEach((item) => {
            item.parentNode.removeChild(item);
        })
    } catch (error) {
        console.log("erreur");
    }

    
   
    
    init();

    heightS1 = 250
    heightS2 = 250
    
    rocket1Top = 55;
    rocket2Top = 55;

    isPlaying = false;

    nbClicksR1 = 0;
    nbClicksR2 = 0;

    gameIsFinish = false;

    intervalP1 = clearInterval(intervalP1);
    intervalP2 = clearInterval(intervalP2);

    for (let i = 1; i < intervalP1; i++) {
        window.clearInterval(i);
    }
    for (let i = 1; i < intervalP2; i++) {
        window.clearInterval(i);
    }

    window.stop();

    screen1.style.setProperty("transform", "translateY(-250vh)");
    screen1Calc.style.setProperty("transform", "translateY(-300vh)");
    rocket1.style.setProperty("top", "55%");
    fireRocket1.style.setProperty("transform", "rotate(180deg) scale(0)");

    screen2.style.setProperty("transform", "translateY(-250vh)");
    screen2Calc.style.setProperty("transform", "translateY(-300vh)");
    rocket2.style.setProperty("top", "55%");
    fireRocket2.style.setProperty("transform", "rotate(180deg) scale(0)");

    col.forEach((item) => {
        item.style.transform = "translateY(-250vh);";
        item.style.top = "35%";
    })



    for (let i = 0; i<scoreRocket1*1.5; i++){
        let newSupporter = document.createElement("div");
        newSupporter.classList.add("Supporter");

        document.querySelector("#solS1").appendChild(newSupporter);


        let randomLeft = randomInt(0, 100);
        newSupporter.style.setProperty("left", randomLeft + "%");

        let randomBottom = randomInt(5, 100);
        newSupporter.style.setProperty("bottom", randomBottom + "%");

        let randomSize = randomInt(4.5, 3);
        newSupporter.style.setProperty("width", randomSize + "vw");
        newSupporter.style.setProperty("height", randomSize + "vw");
    }

    for (let i = 0; i<scoreRocket2*1.5; i++){
        let newSupporter = document.createElement("div");
        newSupporter.classList.add("Supporter");

        document.querySelector("#solS2").appendChild(newSupporter);


        let randomLeft = randomInt(0, 90);
        newSupporter.style.setProperty("left", randomLeft + "%");

        let randomBottom = randomInt(5, 100);
        newSupporter.style.setProperty("bottom", randomBottom + "%");

        let randomSize = randomInt(4.5, 3);
        newSupporter.style.setProperty("width", randomSize + "vw");
        newSupporter.style.setProperty("height", randomSize + "vw");
    }

    

    
}

let start = () => {
    isPlaying = true;

    document.querySelectorAll(".Cloud").forEach((item) => {
        item.style.setProperty("display", "block");
    })
    document.querySelector(".menu").style.display = "none";

    document.querySelector("#rocketScore1").style.setProperty("left", "0%");
    document.querySelector("#rocketScore2").style.setProperty("left", "0%");

    document.querySelector("#score1").innerHTML = "0%";
    document.querySelector("#score2").innerHTML = "0%";
}

let pause = () => {
    isPlaying = false;

    document.querySelector(".menu").style.display = "flex";
}

let win = (player) => {
    isPlaying = false;
    

    
    document.querySelector(".menu").style.display = "flex";

    if (player === 1) {
        document.querySelector("#victory").innerHTML = "Bravo ! La fusée rouge est arrivée sur Mars en premier !";
        scoreRocket1++;
    }else{
        document.querySelector("#victory").innerHTML = "Bravo ! La fusée bleue est arrivée sur Mars en premier !";

        scoreRocket2++;
    }

    reinit();

    document.querySelector(".scorePoints").innerHTML = scoreRocket1+"-"+scoreRocket2;
    
}
//#endregion

// ================
// Intitialisation
// ================
init();
