let 
    isFilppedCard = false,
    matchFull=0,
    firstCard,
    secondCard,
    stopFlipping= false,
    mins=0,
    secs=0,
    wrong =0;

let cards = document.querySelectorAll('.card');
const successAud = document.getElementById('success');
const successAudFull = document.getElementById('full_success');
const minsElm = document.getElementById("min");
const secsElm = document.getElementById("sec");
const wrongElm = document.getElementById("wrong");
cards.forEach((card)=>{
    card.addEventListener('click', flipCard);
})

let time = setInterval(()=>{
    if(secs < 59) {++secs}else if(secs == 59){secs= 0; ++mins;}
    secs < 10 ? secsElm.innerHTML='0' + secs: secsElm.innerHTML= secs;
    mins < 10 ? minsElm.innerHTML="0"+mins:minsElm.innerHTML=mins;
},1000);


function flipCard(){
    if(stopFlipping === true )  return;
    if(this === firstCard )  return;
    this.classList.add('flipped');
    /*first cards?*/
    if(!isFilppedCard){
        firstCard = this;
        isFilppedCard = true;
    }else{
        /*check match*/
        isFilppedCard=false;
        secondCard=this;
        checkMatching();
    }
}


function checkMatching(){

    if(secondCard.dataset.match === firstCard.dataset.match){
        console.log("match");
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        ++matchFull;
        
       if( matchFull === cards.length /2 ){ successAudFull.play();clearInterval(time)}else{successAud.play();}
        resetBoard();
    } else{
       
        stopFlipping=true;
       setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            ++wrong;
            wrongElm.innerHTML= wrong;
            resetBoard();
        },700);
       
    }
}


function resetBoard(){
    [isFilppedCard, stopFlipping] = [false,false]
    firstCard = null;
    secondCard = null;
}


(function suffleCard(){
    cards.forEach((card) =>{
        let randOrder = Math.floor(Math.random()*12);
        card.style.order = randOrder;
    })
})();