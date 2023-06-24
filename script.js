let cards = document.querySelectorAll('.card');
let isFilppedCard = false, matchFull=0,
firstCard, secondCard, stopFlipping= false;
const successAud = document.getElementById('success');
const successAudFull = document.getElementById('full_success');

cards.forEach((card)=>{
    card.addEventListener('click', flipCard);
})




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
        
        matchFull === cards.length /2 ? successAudFull.play():successAud.play();
        resetBoard();
    } else{
       
        stopFlipping=true;
       setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            
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