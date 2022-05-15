$(function () {
  init();
});

function init() {
  //structure

  //données et variables globales
  intervalleRafraichissement = 20; 
  intervalleNouvelleBulle = 100;
  proportionBullesNoires = 5;
  tempsLimite = 100000;
  listeCouleurs = {"B": "#0000ff", "V": "#00c000", "N": "#555"};
  intervalleChangementVitesse = 1000;
  incrementVitesse = 5; 
  rayonBulleBleue = 5;
  rayonAutresBulles = 20;

  monCanvas = document.getElementById('dessin');
  if (monCanvas.getContext){
      ctx = monCanvas.getContext('2d');
      
      reinitialisation(); 

      //Mouvement souris
      monCanvas.addEventListener("mousemove", positionSouris, false);


      inter = setInterval(regles, intervalleRafraichissement);
      document.getElementById('boutonJouer').onclick = afficheEcranJeu;
      document.getElementById('boutonQuitter').onclick = function () {
        reinitialisation();
        afficheEcranAccueil();
      }; //Réinitialisation et affichage de l'écran d'accueil si bouton quitter ou rejouer ou acceuil
      document.getElementById('boutonRejouer').onclick = function () {
        reinitialisation();
        afficheEcranJeu();
      };
      document.getElementById('boutonAccueil').onclick = function () {
        reinitialisation();
        afficheEcranAccueil();
      };
      //affiche l'accueil
      afficheEcranAccueil();
  }
else{
     alert('canvas non supporté');
}
   // Ajout d'une illustration du jeu
    document.getElementById("image").innerHTML = '<img src="./jeu.png" alt="jeu">';
}

function regles() {
  if (ecranCourant === "ecranJeu") {
    // animation
    animer();
  }
}


function reinitialisation() {
  tempsJeu = 0;
  ecranCourant = null;
  niveauCourant = 1;
  score = 0;

  //coordonnées de la souris
  xSourisCanvas = monCanvas.width / 2;
  ySourisCanvas = monCanvas.height / 2;

  //nombre total de bulles
  nbBulles = 0;
    
  //liste des bulles
  listeBulles = [];


  //vitesse des bulles
  vitesse = 15;


  //nombre de vies
  nombreVies = 5;
}

function afficheEcranAccueil() {
  // Affiche l'écran d'accueil
  ecranCourant = "ecranAccueil";
  
  var ecranAccueil = document.getElementById("ecranAccueil");
  ecranAccueil.style.display = 'block';


  //Masque les autres écrans
  var ecranJeu = document.getElementById("ecranJeu");
  ecranJeu.style.display = 'none';
  var ecranBilan = document.getElementById("ecranBilan");
  ecranBilan.style.display = 'none';
}

function afficheEcranJeu() {
  // Affiche l'écran de jeu
  ecranCourant = "ecranJeu";

  var ecranJeu = document.getElementById("ecranJeu");
  ecranJeu.style.display = 'block';


  //Masque les autres écrans
  var ecranAccueil = document.getElementById("ecranAccueil");
  ecranAccueil.style.display = 'none';
  var ecranBilan = document.getElementById("ecranBilan");
  ecranBilan.style.display = 'none';
}

function afficheEcranBilan() {
  //Affiche score et le niveau final
  ecranCourant = "ecranBilan";

  
  document.getElementById("scoreFinal").innerHTML = "Score : " + (score);
  document.getElementById("niveauFinal").innerHTML = "Niveau : " + (niveauCourant);

  //Masque les autres écrans
  var ecranBilan = document.getElementById("ecranBilan");
  ecranBilan.style.display = 'block';


  var ecranAccueil = document.getElementById("ecranAccueil");
  ecranAccueil.style.display = 'none';
  var ecranJeu = document.getElementById("ecranJeu");
  ecranJeu.style.display = 'none';
}


function animer() {
  tempsJeu = tempsJeu + intervalleRafraichissement;

  if (tempsJeu % intervalleNouvelleBulle === 0) {
    //créer une nouvelle bulle
    if (listeBulles.length % proportionBullesNoires === 0 && listeBulles.length !== 0) {
      creeBulle("V");
    } else {
      creeBulle("N");
    }
  }

  
  var bulle;
  ctx.clearRect(0, 0, monCanvas.width, monCanvas.height);
  
  //on dessine les bulles de toute la liste
  for (var j = 0; j < listeBulles.length; j++) {
    bulle = listeBulles[j];
    dessineBulle(bulle, j);
  }

  //on dessine bulle bleue du joueur
  dessineBulle([xSourisCanvas, ySourisCanvas, "B", rayonBulleBleue, true], null);

  if (tempsJeu % intervalleChangementVitesse === 0) {
    
    vitesse += incrementVitesse;
    //niveau +=1
    niveauCourant++;
  }

  //On passe à l'écran de bilan si temps limite atteint ou nombre de vies 0 max
  if (tempsJeu > tempsLimite || nombreVies < 1) {
    afficheEcranBilan();
  }

  //Affichage
  document.getElementById("temps").innerHTML = "Temps de jeu : " + (tempsJeu / 1000) + "s"; //car on est en ms il faut revenir en secondes
  document.getElementById("score").innerHTML = "Score : " + (score);
  document.getElementById("vies").innerHTML = "Vies : " + (nombreVies);
  document.getElementById("niveau").innerHTML = "Niveau : " + (niveauCourant);
}


function positionSouris(e) {
  // On récupère les bonnes coordonnées selon le canvas et non pas la page web
  xSourisCanvas = e.pageX - monCanvas.offsetLeft;
  ySourisCanvas = e.pageY - monCanvas.offsetTop;
}

function creeBulle(couleur) {
  // Chaque bulle créée est positionnée aléatoirement sur l'axe des abscisses et es tde taille minimum 5 et maximum 5+Math.random() * rayonAutresBulles soit 25 ici
  var bulle = [Math.floor(Math.random() * monCanvas.width), 0, couleur, 5 + Math.floor(Math.random() * rayonAutresBulles), true]
  //une fois créée on l'ajoute à la liste des bulles
  listeBulles.push(bulle);
}


function dessineBulle(bulle, bleue) {
  //si on est doit dessiner la bulle :  
  if (bulle[4]) {
    //si la bulle n'est pas bleue
    if (bleue !== null) {
      // on récupère le code couleur approprié
      ctx.fillStyle = listeCouleurs[bulle[2]];
      ctx.beginPath();
      ctx.arc(bulle[0], bulle[1], bulle[3], 0, 2 * Math.PI);
      ctx.fill();

      //on vérifie si il y a collision avec la bulle bleue
      if (((xSourisCanvas - bulle[0]) ** 2 + (ySourisCanvas - bulle[1]) ** 2) < (rayonBulleBleue ** 2 + bulle[3] ** 2)) {
        //On met à jour le score en fonction de la couleur de la bulle touchée
        if (bulle[2] === "N") {
          nombreVies -= 1;
        } else {
          score += 1;
        }
        bulle[4] = false;
      }


      //La vitesse de la bulle augmente continuellement 
      //mais il s'agit aussi de la position en y qu'il faut garder à jour tous les intervalleRaffraichissement ms
      bulle[1] += vitesse * intervalleRafraichissement / 1000;
      // Suppression de la bulle quand elle descend en dessous du canvas
      if (bulle[1] > monCanvas.height) {
        bulle[4] = false;
      }
    }
      else { 
      //la bulle est bleue
      ctx.fillStyle = listeCouleurs[bulle[2]];
      ctx.beginPath();
      ctx.arc(bulle[0], bulle[1], bulle[3], 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}