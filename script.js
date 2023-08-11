let isFilppedCard = false,
  matchFull = 0,
  firstCard,
  secondCard,
  stopFlipping = false,
  mins = 0,
  secs = 0,
  totalMoves = 0,
  wrong = 0,
  cards,
  level = 1,
  cardsNum,
  time;

/*image array*/
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
/*DOM selectors*/
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
let currLevelElm = document.getElementById("curr");
const cont = document.getElementById("cards-cont");
/*get top score*/
let topScore = Number(localStorage.getItem("score"));
topScoreElm.innerHTML = topScore;
resetCelebrationScreen();
handleLevel();

/*Every level settings*/
function handleLevel() {
  /*pre-level settings*/
  resetCelebrationScreen();
  currLevelElm.innerHTML = level;
  cont.innerHTML = "";
  matchFull = 0;
  /*determine lvel and cards number*/
  if (level == 1) {
    setTimer();
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
  /*Create and add cards*/
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

/*shuffer cards based on order*/
function suffleCard() {
  cards.forEach((card) => {
    let randOrder = Math.floor(Math.random() * cardsNum);
    card.style.order = randOrder;
  });
}

/*timer count function*/
function setTimer() {
  time = setInterval(() => {
    if (secs < 59) {
      ++secs;
    } else if (secs == 59) {
      secs = 0;
      ++mins;
    }
    secs < 10 ? (secsElm.innerHTML = "0" + secs) : (secsElm.innerHTML = secs);
    mins < 10 ? (minsElm.innerHTML = "0" + mins) : (minsElm.innerHTML = mins);
  }, 1000);
}
function clearTimer() {
  clearInterval(time);
  secs = 0;
  mins = 0;
  secsElm.innerHTML = "00";
  minsElm.innerHTML = "00";
}
/*Click 3d flip couple cards*/
function flipCard() {
  if (stopFlipping === true) return;
  if (this === firstCard) return;
  this.classList.add("flipped");
  /*first card?*/
  if (!isFilppedCard) {
    firstCard = this;
    isFilppedCard = true;
  } else {
    /*check match*/
    isFilppedCard = false;
    secondCard = this;
    checkMatching();
  }
}

function checkMatching() {
  /*increase moves*/
  totalMoves++;
  totalElm.innerHTML = totalMoves;
  if (secondCard.dataset.match === firstCard.dataset.match) {
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
/*reset every time clicking 2 cards*/
function resetBoard() {
  [isFilppedCard, stopFlipping] = [false, false];
  firstCard = null;
  secondCard = null;
}
/*reset game after clicking try-again button*/
tryAgainElm.addEventListener("click", () => {
  level = 1;
  totalElm.innerHTML = "0";
  wrongElm.innerHTML = "0";
  clearInterval(time);
  handleLevel();
});
/*celebration screen*/
function celebrate() {
  topScore < 10 || totalMoves < topScore ? updateScore() : "";
  totalMoves = 0;
  wrong = 0;
  overlayElm.style.display = "block";
  celebElm.style.display = "block";
  tryAgainBox.style.display = "flex";
  clearTimer();
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
function resetCelebrationScreen() {
  overlayElm.style.display = "none";
  celebElm.style.display = "none";
  tryAgainBox.style.display = "none";
}
