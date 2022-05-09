$(function(){
    init();
})

function init(){
    // structure 
    //ici vide

    //paramètres - variables globales
    let intervalleRafraichissement = 1;
    let intervalleNouvelleBulle = 1;
    let proportionBullesNoires = 1;
    let tempsLimite= 10000;
    let listeCouleurs = {"B":"#0000ff","V": "#00c000","N": "#555"} ;
    let intervalleChangementVitesse = 1;
    let incrementVitesse = 1;
    let rayonBulleBleue = 1;
    let rayonAutresBulles = 1;
    //toutes les valeurs restent à déterminer avec test etc..
   
    
    let monCanvas = document.getElementById("dessin");  
    if (monCanvas.getContext){
        let ctx = monCanvas.getContext('2d');
        let tempsJeu = document.getElementById("temps");
        let ecranAcceuil = document.getElementById("ecranAcceuil");
        let ecranJeu = document.getElementById("ecranJeu");
        let ecranBilan = document.getElementById("ecranBilan");
        let ecranCourant = null ;
        let niveauCourant = document.getElementById("niveau");
        let score = document.getElementById("score");
        let xSourisCanvas = monCanvas.width/2;
        let ySourisCanvas = monCanvas.heigth/2;
        let listeBulles = [];
        let nbBulles = 0;
        let vitesse = 10;
        let NombreVies = 3;
        let boutonJouer = document.getElementById("boutonJouer");

    }
    else{
        alert('canvas non supporté');
    }
    //gestionnaires
    boutonJouer.onclick = afficheEcranJeu;
    monCanvas.addEventListener("mousemove",positionSouris,false);
    inter = setInterval(regles, intervalleRafraichissement);

    //lancement : affichage de la page d'acceuil
    afficheEcranAcceuil();
}

function reinitialisation() {
    tempsJeu = 0;
    ecranCourant = null;
    niveauCourant = 1;
    score = 0;

    xSourisCanvas = monCanvas.width/2;
    ySourisCanvas = monCanvas.height/2;

    listeBulles = [];

    nbBulles = 0;

    vitesse = 10;

    nombreVies = 3;
}

function afficheEcranAcceuil(){
    ecranCourant=ecranAcceuil;
    ecranCourant.style.display = "block";
    ecranBilan.style.display = "none";
    ecranJeu.style.display = "none";
    
}

function afficheEcranJeu(){
    ecranCourant=ecranJeu;
    ecranCourant.style.display = "block";
    ecranBilan.style.display = "none";
    ecranAcceuil.style.display = "none";
    
}

function afficheEcranBilan(){
    ecranCourant=ecranBilan;
    ecranCourant.style.display = "block";
    ecranJeu.style.display = "none";
    ecranAcceuil.style.display = "none";
    
}

function regles(){
    if (ecranCourant === "ecranJeu"){
        //animation
        animer();
    }
}

function animer(){
    tempsJeu = tempsJeu + intervalleRafraichissement;

    if (tempsJeu % intervalleNouvelleBulle === 0){
        if (listeBulles.length % proportionBullesNoires === 0 && listeBulles.length !== 0){
            creeBulle("V");
        }
        else {
            creeBulle("N");
        }
    }
    ctx.clearRect(0,0, monCanvas.width,monCanvas.height);
    for (var j=0; j<listeBulles.length;j++){
        var bulle = listeBulles[j];
        dessineBulle(bulle, j);
    }
    dessineBulle([xSourisCanvas, ySourisCanvas, "B", rayonBulleBleue, true],null);
}

function creeBulle(A){
    var tab_aux = [xSourisCanvas,ySourisCanvas,A,rayonAutresBulles,false];

}

function positionSouris(event){
    xSourisCanvas = event.pageX;
    ySourisCanvas = event.pageY;
}