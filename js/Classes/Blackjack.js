class Blackjack {
 constructor(element) {
     //pass <div id='app'?</div> to a JS obj
    this.app = document.getElementById(element);

    let suits = ["Diamonds", "Hearts", "Spades", "Clubs"];
    let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
    this.deck = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            let numValue = values[j];
            if(typeof (values[j]) != "number"){
                if(values[j]=="Ace") {
                    numValue = 11
                } else {
                    numValue = 10
                } // ~. else
            } // ~. if(numVal)
            let card = {
                src: `${values[j]}-of-${suits[i]}.png`,
                value: values[j],
                numVal: numValue
            }
            this.deck.push(card);
        } // ~>for.values
    } // ~.for suits

    // Spread Operator - copies arrays
    // this.shoe = [...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck,]

     // **##** TEST **##**  Ace loaded Shoe  ***###***
     this.shoe = this.deck
     for (let index = 0; index < 52; index++) {
         this.shoe.push({ src: "Ace-of-Clubs.png", value: "Ace", numVal: 11 });

     }



    // --##-- randomly suffle the shoe
    this.shoe.sort((a, b) => {
         return 0.5 - Math.random() // built-in random function of .sort()
    });  // ~. this.shoe.sort

    // --##-- OR
    // --##--  Manual Shuffle
    // for (let i = 0; i < this.shoe.length; i++) {
    //     let tempItem = this.shoe[i]; //current item
    //     let randNum = Math.floor(Math.random()*this.shoe.length)
    //     this.shoe[i] = this.shoe[randNum]
    //     this.shoe[randNum] = tempItem;
    // }

     // **##** TEST **##** Insert specific cards into shoe ***###***
    //  this.shoe.push({ src: "Ace-of-Clubs.png", value: "Ace", numVal: 11 });
    //  this.shoe.push({ src: "Ace-of-Clubs.png", value: "Ace", numVal: 11 });
    //  this.shoe.push({ src: "3-of-Clubs.png", value: 3, numVal: 3 });
    //  this.shoe.push({ src: "3-of-Clubs.png", value: 3, numVal: 3 });
    //  this.shoe.push({ src: "3-of-Clubs.png", value: 3, numVal: 3 });
    //  this.shoe.push({ src: "3-of-Clubs.png", value: 3, numVal: 3 });


    // make the DOM elements
    this.header = document.createElement('header');
    //insertBefore takes two arguments, what is it inserting, and where
    document.body.insertBefore(this.header, document.body.firstChild) //this.app also works
    
    // make the DEAL, HIT, and STAND buttons
     this.btnDeal = document.createElement('button');
     this.btnDeal.innerHTML = "DEAL";
     this.btnDeal.addEventListener('click', this.deal.bind(this));
     this.header.appendChild(this.btnDeal)

     this.btnHit = document.createElement('button');
     this.btnHit.innerHTML = "HIT";
     this.btnHit.addEventListener('click', this.hit.bind(this));
     this.header.appendChild(this.btnHit)

     this.btnStand = document.createElement('button');
     this.btnStand.innerHTML = "STAND";
     this.btnStand.addEventListener('click', this.stand.bind(this));
     this.header.appendChild(this.btnStand)
     this.disableBtns()
     // make the div boxes, like above, or a for loop, like below
     this.messageBox = document.createElement('div');
     this.messageBox.id = 'messageBox';
     this.messageBox.innerHTML = "Click DEAL to begin"
     this.header.appendChild(this.messageBox);

     this.playerScoreBox = document.createElement('div');
     this.playerScoreBox.id = 'playerScoreBox';
     this.playerScoreBox.value = 0
     this.playerScoreBox.innerHTML = "Player: " + this.playerScoreBox.value
     this.header.appendChild(this.playerScoreBox);
     
     this.dealerScoreBox = document.createElement('div');
     this.dealerScoreBox.id = 'dealerScoreBox';
     this.dealerScoreBox.value = 0
     this.dealerScoreBox.innerHTML = "Dealer: "+this.dealerScoreBox.value
     this.header.appendChild(this.dealerScoreBox);

     this.moneyBox = document.createElement('div');
     this.moneyBox.id = 'moneyBox';
     this.money = 500;
     this.moneyBox.innerHTML = "$" + this.money
     this.header.appendChild(this.moneyBox);


     this.dealerCardBox = document.createElement('div');
     this.dealerCardBox.id = 'dealerCardBox';
     this.dealerCardBox.innerHTML = "dealerCardBox"
     this.app.appendChild(this.dealerCardBox);

     this.playerCardBox = document.createElement('div');
     this.playerCardBox.id = 'playerCardBox';
     this.playerCardBox.innerHTML = "playerCardBox"
     this.app.appendChild(this.playerCardBox);


    //  this.app.innerHTML = (this.shoe.map(e => e.src)).filter(e=>e.includes("Clubs"))

 } //  ~.constructorß

 // deal() method called on click of the deal button

 deal() {
     // deal 2 cards each to the player and dealer
     // Dealer's first card -- the hole card -- is face down
     // output the player score and dealer card value
     this.messageBox.innerHTML = "Good Luck!"
     this.dealerHand = [];
     this.playerHand = [];
     this.dealerHand.scoreBox = 0
     this.dealerHand.score = 0
     this.playerHand.score = 0
     this.playerCardBox.innerHTML = ""
     this.dealerCardBox.innerHTML = ""
     this.btnDeal.disabled=1
     this.btnDeal.style.color = "gray"
     this.btnDeal.style.backgroundColor = "lightgrey"
 

     setTimeout(this.cardPlayer.bind(this), 500)
     setTimeout(this.cardDealer.bind(this), 1000)
     setTimeout(this.cardPlayer.bind(this), 1500)
     setTimeout(this.cardDealer.bind(this), 2000)
     setTimeout(()=> {
     this.btnHit.disabled = 0
     this.btnHit.style.color = "black"
     this.btnHit.style.backgroundColor = "white"
     this.btnStand.disabled = 0
     this.btnStand.style.color = "black"
     this.btnStand.style.backgroundColor = "white"
     this.messageBox.innerHTML="HIT or STAND"
        if (this.dealerHand.score == 21 && this.playerHand.score == 21) {
            this.push()
            this.messageBox.innerHTML = "Double Backjacks!! Push!"
            this.endGame()
        } else if (this.playerHand.score == 21) {
           this.playerWins();
           this.messageBox.innerHTML = "Blackjack! Player Wins!";
           this.endGame()
        } else if (this.dealerHand.score == 21) {
            this.dealerWins();
            this.messageBox.innerHTML = "Blackjack! Dealer Wins!"
            this.endGame()
        } 
        

    },2500)

    
 }
 cardPlayer(){
     this.playerHand.push(this.shoe.pop());
     let i = this.playerHand.length-1
     let cardPic = new Image();
     cardPic.id = 'playerCard' + i;
     cardPic.src = `images/cards350px/${this.playerHand[i].src}`
     this.playerCardBox.appendChild(cardPic)
     this.playerHand.score = this.playerHand.reduce(((tot, e) => tot += e.numVal), 0)
     while ((this.playerHand.score) > 21 && (this.playerHand.map(e => e.numVal)).includes(11)) {
        this.ace(this.playerHand)
    }
     this.playerScoreBox.innerHTML = this.playerHand.score
     if (this.playerHand.score > 21) {
        this.bust("Player","Dealer");

     } 

    
 }
 cardDealer(){
     this.dealerHand.push(this.shoe.pop());
     let i = this.dealerHand.length-1
     let cardPic = new Image();
     cardPic.id = 'dealerCard' + i;
     this.dealerHand.score = this.dealerHand.reduce(((tot, e) => tot += e.numVal),0)
     while ((this.dealerHand.score) > 21 && (this.dealerHand.map(e => e.numVal)).includes(11)) {
         this.ace(this.dealerHand)
     }
     if(i == 1){
        cardPic.src = `images/cards350px/0-Back-of-Card-Red.png`
     } else {
        cardPic.src = `images/cards350px/${this.dealerHand[i].src}`
         this.dealerHand.scoreBox += this.dealerHand[i].numVal
     }
     this.dealerCardBox.appendChild(cardPic)
     this.dealerScoreBox.innerHTML = this.dealerHand.scoreBox
     if(this.dealerHand.score > 21) {
         this.bust("Dealer","Player")
     }


 }
 hit() {
     this.cardPlayer()
 }
 stand() {

     this.flipHole()

    while (this.dealerHand.score < 17 ) {
            //setTimeout(this.cardDealer.bind(this), 250)
            this.cardDealer()
        }
     if (this.dealerHand.score == 17 && (this.dealerHand.map(e => e.numVal)).includes(11)) {
         this.cardDealer()
     }
    
     this.dealerScoreBox.innerHTML = this.dealerHand.score
     if (this.dealerHand.score == this.playerHand.score) {
         this.push()
     }
    if(this.dealerHand.score <= 21 && this.playerHand.score <=21){
        if(this.playerHand.score > this.dealerHand.score){
            this.playerWins()
        }
        if (this.playerHand.score < this.dealerHand.score) {
            this.dealerWins()
        }
     } // ~. if 21 21
 }
 ace(hand) {
    let aceI = (hand.map(e => e.numVal)).indexOf(11)
    hand[aceI].numVal = 1
     hand.score = hand.reduce(((tot, e) => tot += e.numVal), 0)
 } // ~.ace

disableBtns() {
    this.btnHit.disabled = 1
    this.btnHit.style.color = "gray"
    this.btnHit.style.backgroundColor = "lightgrey"
    this.btnStand.disabled = 1
    this.btnStand.style.color = "gray"
    this.btnStand.style.backgroundColor = "lightgrey"
}
enableDeal() {
    this.btnDeal.disabled=0;
    this.btnDeal.style.color = "black"
    this.btnDeal.style.backgroundColor = "white"
}
playerWins() {
    this.messageBox.innerHTML = "Player Wins!"
    this.money += 10
    this.endGame()
}
dealerWins() {
    this.flipHole()
    this.messageBox.innerHTML = "Dealer Wins!"
    this.money -= 10
    this.endGame()
}
push() {
    this.flipHole()
    this.messageBox.innerHTML = "PUSH!"
    this.endGame();
}
bust(lose, win) {
    this.messageBox.innerHTML = `${lose} BUSTS! ${win} WINS!`
    if(lose = "Player"){
        this.money -= 10
    } else {
        this.money += 10
    }
    this.endGame()
}
endGame() {
    this.disableBtns();
    this.enableDeal(); 
    this.moneyBox.innerHTML = "$" + this.money
}
flipHole() {
    let holeCard = document.getElementById('dealerCard1')
    holeCard.src = `images/cards350px/${this.dealerHand[1].src}`
}
} // ~.class
