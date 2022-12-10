"use strict"

// -----------------------------------------------------
// --------------------- Fonctions ---------------------
// -------------------------------------------------------
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let gameFinish = (isWin, index) => {
    if (isWin){
        document.querySelectorAll(".square").forEach((item) => {           
           
            item.style.background= "ForestGreen";
            item.style.color= "green";
            item.style.pointerEvent = "none";

            
            document.querySelectorAll(".dessinList").forEach((itemObj)=>{
                itemObj.style.display="none";
            })
            document.querySelector(".PapaPasNoel").style.display="block";            
        });
    }else{
        document.querySelectorAll(".square").forEach((item, ind) => {
            if (ind === index){
                //console.log(item);
                

                if (item.querySelector(".chiffres") != null){
                    item.querySelector(".chiffres").style.display="none";
                }
                

                document.querySelectorAll(".dessinList").forEach((itemObj)=>{
                    itemObj.style.display="none";
                })
                document.querySelector(".PapaPasNoel").style.display="block";

            }else{
                item.style.background= "black";
                item.style.color= "black";
                item.style.pointerEvent = "none";
            }
        
                  
        });
    }
}

function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2
    };
}
 
function getDistance(a, b) {
   const aPosition = getPositionAtCenter(a);
   const bPosition = getPositionAtCenter(b);
 
   return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
}

let reset = (grid) => {
    grid.innerHTML = '';
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let isIntru = (squareCase) => {
    
    let children = squareCase.children;
    for(let i=0; i<children.length; i++){
        return children[i].classList.contains('PapaPasNoel')
    }
        
    
}


let play = (notThirdLevel, withClickLimit, gridSize) => {
    let score = 0;
    if(withClickLimit == true){
        score = 10;
        document.getElementById("LevelN").innerHTML = "Intermédiaire";
    }
    else{
        score = 0;
        document.getElementById("LevelN").innerHTML = "Facile";
    }
    if (notThirdLevel === false){
        score = 20;
    }


    let grid = document.getElementById("grid");

    grid.style.setProperty('grid-template-columns', 'repeat(8, 1fr)');
    grid.style.setProperty('grid-template-rows', 'repeat(8, 1fr)');

    grid.style.setProperty('width', '32vw');
    grid.style.setProperty('height', '32vw');
    
    let scoreObject = document.getElementById("Score");
    let isFinish = false;
    let whereistheintruinthegrid = getRandomInt(63);
    let ShuffleListGrid = [];

    for (let i=0; i<gridSize; i++){
        ShuffleListGrid.push(i);
    }


    let itemLePlusLoin = grid;


    ShuffleListGrid = shuffle(ShuffleListGrid);

    // -------------------------------------------------------
    // --------------------- Create Grid ---------------------
    // -------------------------------------------------------
    for (let i=0; i<gridSize; i++){


        // ---------- Variables ----------
        let parent = document.getElementById("grid");
        let sqrCase = document.createElement("div");
        
        sqrCase.classList.add("square");
        parent.appendChild(sqrCase);

        let papaNoyel = document.createElement("div");
        papaNoyel.classList.add("PapaNoel");

        let papaPASNoyel = document.createElement("div");
        papaPASNoyel.classList.add("PapaPasNoel");
        
        let Number = document.createElement("div");
        Number.classList.add("chiffres");

        let randomNumber = getRandomInt(30);

        let dessin = document.createElement("div");


        // Dessins aléatoires sur les cases
        if (randomNumber < 3){
            dessin.classList.add("dessinCerf");
            dessin.classList.add("dessinList");
            sqrCase.appendChild(dessin);
        }else if(randomNumber < 6){
            dessin.classList.add("dessinBoule");
            dessin.classList.add("dessinList");
            sqrCase.appendChild(dessin);
        }else if(randomNumber < 8){
            dessin.classList.add("dessinBonhommeDeNeige");
            dessin.classList.add("dessinList");
            sqrCase.appendChild(dessin);
        }else if(randomNumber < 10){
            dessin.classList.add("dessinPapaNoel");
            dessin.classList.add("dessinList");
            sqrCase.appendChild(dessin);
        }

        sqrCase.style.backgroundColor= "green";

        // Mettre l'intru en position aléatoire
        if (i === whereistheintruinthegrid){
            sqrCase.appendChild(papaPASNoyel);
            papaPASNoyel.style.setProperty('filter', 'grayscale(1)')

            sqrCase.addEventListener("click", (e) => {
                gameFinish(true, whereistheintruinthegrid);
                papaPASNoyel.style.display="block";
                Number.style.display="none";
                
                sqrCase.style.border= "solid 5px green";
                isFinish=true;

                return true;
            });

            
        }
        else{ // Remplir le reste des cases avec des papa noyel
            sqrCase.appendChild(papaNoyel);
        }
        

        // Nombres aléatoire sur les cases
        sqrCase.appendChild(Number);
        Number.innerHTML += ShuffleListGrid[i] + 1

        
        // Score
        scoreObject.innerHTML = "Score : " + score;

        sqrCase.style.color= "green";
        papaNoyel.style.display="none";
        papaPASNoyel.style.display="none";
       
        
        
        // Retourner les cases avec un clic
        sqrCase.addEventListener("click", (e) => {

            let thisItem = e.target;
            let targetItem = document.querySelector(".grid").childNodes.item(whereistheintruinthegrid);

            const distance = getDistance(
                thisItem,
                targetItem
            );
            
            


            if (Number.style.display!="none"){
                dessin.style.display = "none"
                if(isFinish!==true){
                    
                    if (withClickLimit) {
                        if(score < 2){
                            score--;
                            isFinish = true;
                            gameFinish(false, whereistheintruinthegrid);

                        }else{
                            score--;
                        }
                        
                    }else{
                        score++;
                    }
                    Number.style.display="none";
                    papaNoyel.style.display="block";

                    scoreObject.innerHTML = "Score : " + score;
                
                    sqrCase.style.display= "flex";
                    sqrCase.style.backgroundColor= "black";
                    sqrCase.style.border= "dotted 5px red";
                }
            }            
        });        
    }

    // Dégradé de couleur en fonction de la distance de la cible 
    if (notThirdLevel){
        for (let i=0; i<gridSize; i++){
            let targetItem = document.querySelector(".grid").childNodes.item(whereistheintruinthegrid);
            let currentItem = document.querySelector(".grid").childNodes.item(i);
    
            
    
            if (getDistance(currentItem, targetItem) > getDistance(itemLePlusLoin, targetItem)){
                itemLePlusLoin = currentItem;
            }
    
            let distPourcentage =getDistance(currentItem, targetItem) / getDistance(itemLePlusLoin, targetItem) * 100
    
    
            
    
            //hue-rotate(60deg) brightness(2) // = jaune
            //hue-rotate(50deg) brightness(1.3) // = orange
            //hue-rotate(100deg) brightness(1.3) // = vert
    
            if(i != whereistheintruinthegrid){
                if(distPourcentage > 50){
                    currentItem.querySelector(".PapaNoel").style.setProperty('filter', 'hue-rotate(0deg) brightness(1.3)')
                }else if(distPourcentage < 50 && distPourcentage > 30){
                    currentItem.querySelector(".PapaNoel").style.setProperty('filter', 'hue-rotate(50deg) brightness(2)')
                }else{
                    currentItem.querySelector(".PapaNoel").style.setProperty('filter', 'hue-rotate(60deg) brightness(3)')
                }
            }
            
    
            
        }
    }
}


// Bouton son

document.querySelector("#Song").addEventListener("click", (e) => {
    document.querySelectorAll('.music').forEach((item)=>{
        item.volume = 0;
    })
    document.querySelector("#noSong").style.display = "block";
    e.target.style.display = "none";

})

document.querySelector("#noSong").addEventListener("click", (e) => {
    document.querySelectorAll('.music').forEach((item)=>{
        item.volume = 1;
    })
    document.querySelector("#Song").style.display = "block";
    e.target.style.display = "none";
})
 
// -----------------------------------
// -------------- Neige --------------
// ----------------------------------- 

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let particlesOnScreen = 245;
let particlesArray = [];
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;


let randomized = (min, max) => {
    return min + Math.random() * (max - min + 1);
}

let clientResize = ev => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};
window.addEventListener("resize", clientResize);

let createSnowFlakes = () => {
    for(let i=0; i < particlesOnScreen; i++){
        particlesArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: randomized(-11, 11),
            speedY: randomized(7, 15),
            radius: randomized(0.4, 4.2),
        })
    }
}

let drawSnowFlakes = () => {
    for(let i=0; i< particlesArray.length; i++){
        let gradient = ctx.createRadialGradient(
            particlesArray[i].x,
            particlesArray[i].y,
            0,
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius
        );
        gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");
        gradient.addColorStop(0, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");
        gradient.addColorStop(0, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");
        
        ctx.beginPath();
        ctx.arc(
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius,
            0,
            Math.PI*2,
            false
        );
        ctx.fillStyle = gradient;
        ctx.fill();
    
    
    }
}

let moveSnowFlakes = () => {
    for(let i=0; i< particlesArray.length; i++){ 
        particlesArray[i].x += particlesArray[i].speedX / 2;
        particlesArray[i].y += particlesArray[i].speedY / 2;

        if (particlesArray[i].y > h){
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
    }
}

let moveSnowFlakesUp = () => {
    for(let i=0; i< particlesArray.length; i++){ 
        particlesArray[i].x += particlesArray[i].speedX / 10;
        particlesArray[i].y -= particlesArray[i].speedY / 10;

        if (particlesArray[i].y < 0){
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = h+50;
        }
    }
}

let updateSnowFall = () => {
    ctx.clearRect(0,0,w,h);
    drawSnowFlakes();
    moveSnowFlakes();
}

let updateSnowFallUp = () => {
    ctx.clearRect(0,0,w,h);
    drawSnowFlakes();
    moveSnowFlakesUp();
}

let resetSnowFall = () => {
    clearInterval(myInterval);
    particlesArray.length = 0;
}



// Init la neige

let myInterval = setInterval(updateSnowFall, 30);
createSnowFlakes();
document.getElementById("backSantaClaus").style.setProperty('transform', 'scaleX(1)');



// -------------------------------------
// -------------- Niveau 1 -------------
// -------------------------------------

document.querySelector("#level1Button").addEventListener("click", (e) => {

    
    // Audio

    document.getElementById('playerNormal').play();
    document.getElementById('playerTrap').pause();
    document.getElementById('playerEpic').pause();
    
    /* --------- Start Game --------- */

    reset(document.getElementById("grid"));    
    play(true, false, 64)

    /* --------- Change Style --------- */

    // Colonne 3

    e.target.innerHTML = "▶ Facile";
    document.getElementById("level2Button").innerHTML = "Intermédiaire";
    document.getElementById("level3Button").innerHTML = "Dieu";

    document.getElementById('instruction1').style.display = "flex";
    document.getElementById('instruction2').style.display = "none";
    document.getElementById('instruction3').style.display = "none";

    // Colonne 1

    document.getElementById("backSantaClaus").style.setProperty('transform', 'scaleX(1)');
    document.getElementById("backSantaClaus").style.setProperty('background-image', 'url("./Images/SantaDa.png")');
    document.getElementById("backSantaClaus").style.setProperty('margin-top', '0vh');
    document.getElementById("col1").style.setProperty('padding-top', '0');

    // Full page

    document.getElementById("all").style.setProperty('background', 'linear-gradient(#ff0000, #8b0000)');

    document.getElementById("snowBottom").style.setProperty('bottom', '-100vh');
    document.getElementById("stalactites").style.setProperty('top', '-20vh');

    

    /* Show Snow */

    resetSnowFall();
    myInterval = setInterval(updateSnowFall, 30);
    createSnowFlakes();

});

// -------------------------------------
// -------------- Niveau 2 -------------
// -------------------------------------

document.querySelector("#level2Button").addEventListener("click", (e) => {

    // Audio

    document.getElementById('playerNormal').pause();
    document.getElementById('playerTrap').play();
    document.getElementById('playerEpic').pause();

    /* --------- Start Game --------- */

    reset(document.getElementById("grid"));
    play(true, true, 64)

    /* --------- Change Style --------- */

    // Colonne 3

    document.getElementById("level1Button").innerHTML = "Facile";
    e.target.innerHTML = "▶ Intermédiaire";
    document.getElementById("level3Button").innerHTML = "Dieu";

    document.getElementById('instruction1').style.display = "none";
    document.getElementById('instruction2').style.display = "flex";
    document.getElementById('instruction3').style.display = "none";

    // Colonne 2

    document.getElementById("backSantaClaus").style.setProperty('transform', 'scaleX(-1)');
    document.getElementById("backSantaClaus").style.setProperty('background-image', 'url("./Images/PapaNoelFond.png")');
    document.getElementById("backSantaClaus").style.setProperty('margin-top', '40vh');
    document.getElementById("col1").style.setProperty('padding-top', '0');

    // Full page

    document.getElementById("all").style.setProperty('background', 'linear-gradient(#ee0000, #500000)');

    document.getElementById("snowBottom").style.setProperty('bottom', '-50vh');
    document.getElementById("stalactites").style.setProperty('top', '-20vh');
    
    

    /* Show Snow */

    resetSnowFall();
    myInterval = setInterval(updateSnowFall, 5);
    createSnowFlakes();

});

// -------------------------------------
// -------------- Niveau 3 -------------
// -------------------------------------

document.querySelector("#level3Button").addEventListener("click", (e) => {




    // Audio //

    document.getElementById('playerNormal').pause();
    document.getElementById('playerTrap').pause();
    document.getElementById('playerEpic').play();

    /* --------- Start Game --------- */
    
    reset(document.getElementById("grid"));
    play(false, true, 100);

    /* --------- Change Style --------- */

    // Colonne 3

    document.getElementById("level1Button").innerHTML = "Facile";
    document.getElementById("level2Button").innerHTML = "Intermédiaire";
    e.target.innerHTML = "▶ Dieu";

    document.getElementById('instruction1').style.display = "none";
    document.getElementById('instruction2').style.display = "none";
    document.getElementById('instruction3').style.display = "flex"

    
    
    // Colonne 2

    let grille = document.getElementById("grid");

    grille.style.setProperty('width', '40vw');
    grille.style.setProperty('height', '40vw');
    grille.style.setProperty('grid-template-rows', 'repeat(10, 1fr)');
    grille.style.setProperty('grid-template-columns', 'repeat(10, 1fr)');

    document.getElementById("LevelN").innerHTML = "Niveau Dieu";

  
    document.querySelectorAll(".square").forEach((itemObj)=>{
        itemObj.style.setProperty('background', 'repeating-conic-gradient(from 127deg at 50% 50%, #bB2611 1%, #901308 11%, #bB2611 21%, #901308 32%, #bB2611 42%, #901308 52%, #bB2611 63%, #901308 72%, #bB2611 82%, #901308 91%, #bB2611 99%)');
        itemObj.style.setProperty('border', 'solid 2px transparent');
        itemObj.style.setProperty('border-radius', '4px');

      
    })
    

    document.querySelectorAll(".dessinList").forEach((itemObj)=>{
        itemObj.style.display="none";
    })

    // Colonne 1

    let papaNoyel = document.getElementById("backSantaClaus");

    papaNoyel.style.setProperty('background-image', 'url("./Images/SantaClausA.png")');
    papaNoyel.style.setProperty('transform', 'scale(1.3)');
    papaNoyel.style.setProperty('margin-top', '35vh');
    document.getElementById("col1").style.setProperty('padding-top', '10vh');

    
    // Full page
    document.getElementById("all").style.setProperty('background', 'radial-gradient(75% 75% at 50% 100%, #FFC703A6 1%, #750000FF 60%, #460000FF 100%),linear-gradient(0deg, #7F0000FF 0%, #FF0000FF 99%)');

    document.getElementById("snowBottom").style.setProperty('bottom', '-50vh');
    document.getElementById("stalactites").style.setProperty('top', '0vh');

    

    

    /* Show Snow */

    resetSnowFall();
    myInterval = setInterval(updateSnowFallUp, 20);
    createSnowFlakes();



    // Changer tout toutes les 2 sec
    /*setTimeout(() => {
        const grid = document.querySelector("#grid");
        const items = document.querySelectorAll(".square");
        items.forEach((item) => {
            grid.insertBefore(item, grid.children[1 + getRandomInt(63)])
        })
    }, 2000);*/


    

        
    
        
        
    
});