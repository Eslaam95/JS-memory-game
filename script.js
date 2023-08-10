let isFilppedCard = false,
  matchFull = 0,
  firstCard,
  secondCard,
  stopFlipping = false,
  mins = 0,
  secs = 0,
  totalMoves = 0,
  wrong = 0,
  cards;

const successAud = document.getElementById("success");
const successAudFull = document.getElementById("full_success");
const minsElm = document.getElementById("min");
const secsElm = document.getElementById("sec");
const wrongElm = document.getElementById("wrong");
const totalElm = document.getElementById("total");
const topScoreElm = document.getElementById("top");
const celebElm = document.getElementById("celebrate");
const tryAgainElm = document.getElementById("try-again");
const tryAgainBox = document.getElementById("again");

const overlayElm = document.getElementById("overlay");
let topScore = Number(localStorage.getItem("score"));
let currLevelElm = document.getElementById("curr");
topScoreElm.innerHTML = topScore;
const imgsArr = [
  "assets/B.svg",
  "assets/C.svg",
  "assets/angular.svg",
  "assets/vue.svg",
  "assets/react.svg",
  "assets/aurelia.svg",
  "assets/backbone.svg",
  "assets/ember.svg",
  "assets/vue.svg",
  "assets/aurelia.svg",
  "assets/backbone.svg",
  "assets/ember.svg",
  "assets/angular.svg",
  "assets/react.svg",
  "assets/C.svg",
  "assets/B.svg",
];
const cont = document.getElementById("cards-cont");
let level = 1,
  cardsNum;
overlayElm.style.display = "none";
celebElm.style.display = "none";
tryAgainBox.style.display = "none";
function handleLevel() {
  overlayElm.style.display = "none";
  celebElm.style.display = "none";
  tryAgainBox.style.display = "none";
  currLevelElm.innerHTML = level;
  if (level == 1) {
    cardsNum = 6;
    cont.classList.remove("level-3");
    cont.classList.add("level-1");
  }
  if (level == 2) {
    cardsNum = 12;
    cont.classList.remove("level-1");
    cont.classList.add("level-2");
  }
  if (level == 3) {
    cardsNum = 16;
    cont.classList.remove("level-2");
    cont.classList.add("level-3");
  }
  cont.innerHTML = "";
  matchFull = 0;
  for (let i = 0; i < cardsNum / 2; i++) {
    for (let j = 0; j < 2; j++) {
      let x = document.createElement("div");
      const att = i;
      x.setAttribute("data-match", String(i));
      x.classList.add("card");
      x.innerHTML += `    <img src="assets/js-badge.svg" alt="" class="front face" />
      <img src=${imgsArr[i]} alt="" class="back face" />`;
      cont.appendChild(x);
    }
  }
  cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
  suffleCard();
}
handleLevel();

let time = setInterval(() => {
  if (secs < 59) {
    ++secs;
  } else if (secs == 59) {
    secs = 0;
    ++mins;
  }
  secs < 10 ? (secsElm.innerHTML = "0" + secs) : (secsElm.innerHTML = secs);
  mins < 10 ? (minsElm.innerHTML = "0" + mins) : (minsElm.innerHTML = mins);
}, 1000);

function flipCard() {
  if (stopFlipping === true) return;
  if (this === firstCard) return;
  console.log("clicked first", firstCard);
  this.classList.add("flipped");
  /*first cards?*/
  if (!isFilppedCard) {
    firstCard = this;
    isFilppedCard = true;
  } else {
    /*check match*/
    isFilppedCard = false;
    secondCard = this;
    console.log("clicked second", secondCard);

    checkMatching();
  }
}

function checkMatching() {
  totalMoves++;

  totalElm.innerHTML = totalMoves;
  if (secondCard.dataset.match === firstCard.dataset.match) {
    console.log("match");
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    ++matchFull;

    if (matchFull === cards.length / 2) {
      successAudFull.play();

      level < 3 ? nextLevel() : celebrate();
    } else {
      successAud.play();
    }
    resetBoard();
  } else {
    stopFlipping = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      ++wrong;
      wrongElm.innerHTML = wrong;
      resetBoard();
    }, 700);
  }
}

function resetBoard() {
  [isFilppedCard, stopFlipping] = [false, false];
  firstCard = null;
  secondCard = null;
}

function suffleCard() {
  cards.forEach((card) => {
    let randOrder = Math.floor(Math.random() * cardsNum);
    card.style.order = randOrder;
  });
}
tryAgainElm.addEventListener("click", () => {
  level = 1;
  totalElm.innerHTML = "0";
  wrongElm.innerHTML = "0";
  clearInterval(time);
  handleLevel();
});
function celebrate() {
  topScore < 10 || totalMoves < topScore ? updateScore() : "";
  totalMoves = 0;
  wrong = 0;
  overlayElm.style.display = "block";
  celebElm.style.display = "block";
  tryAgainBox.style.display = "flex";
  clearInterval(time);
}
function nextLevel() {
  level++;
  setTimeout(handleLevel, 2000);
}
function updateScore() {
  localStorage.setItem("score", totalMoves);
  topScore = Number(localStorage.getItem("score"));
  topScoreElm.innerHTML = topScore;
}
