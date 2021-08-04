let cards = document.querySelectorAll(".card-container");
let politicianImages = document.querySelectorAll(".card-img");
let menuPage = document.querySelector(".menu");
let commonModal = document.querySelector(".modal");
let commonModalDescription = commonModal.children[2].children[0];
let commonModalTitle = commonModal.children[1];
let openedImages = [];
let staticDescription = {
  help: "This is simple game where you just need to click cards you will see in the screen.On Each Click you will see photos of Politican of Nepal.When you click two photos then this game will compare whether you have choose matched photos or not.If you didn't choose matched one then your both cards will flip and in next click you need to memorize the matching cards",
  about:
    "This is a pure HTML,CSS and JS project built by <cite>Sundar Gautam</cite> in order to show DOM manipulation skills through use of <cite>JS</cite>.If you deeply go through through source code you will  able to learn how to use objects,select DOM elements,performing operation to array,add ClassList to DOM,function reuseablity,CSS basic transition and Animation, EventListener and so on.If you are <b>HR or Any Company Man</b> looking for passionate developer and instructor please mail me at <a href='mailto:sundargautam6@gmail.com'>Mail Me </a> ",
};
function displayCard() {
  this.children[0].classList.toggle("show-img");
  this.classList.toggle("opened");
  cardOpen();
}

const resetAll =()=>{

}
const cardOpen = () => {
  openedImages = [...document.querySelectorAll(".opened")];
  let lengthOfOpenedImages = openedImages.length;
  if (lengthOfOpenedImages === 2) {
    if (openedImages[0].id === openedImages[1].id) {
      console.log("matched");
      openedImages.forEach((image) => image.classList.remove("opened"));
      openedImages.forEach((image) => image.classList.add("disabled"));
      checkGameOver();
      openedImages = [];
    } else {
      console.log("not matched");
      openedImages.forEach((image) => image.classList.remove("opened"));
      openedImages.forEach((image) => {
        setTimeout(() => {
          image.children[0].classList.remove("show-img");
        }, 1000);
      });
    }
  }
};
/* shuffle cardds */
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* till here */

/*start game */

function startGame() {
  //shuffle cards using the Fisher-Yates (aka Knuth) Shuffle function
  let shuffledImages = shuffle([...politicianImages]);
  for (i = 0; i < shuffledImages.length; i++) {
    //add the shuffled images to each card
    cards[i].appendChild(shuffledImages[i]);
    cards[i].id = `${shuffledImages[i].alt}`;
  }
  /* card clicking logic */
  cards.forEach((card) => card.addEventListener("click", displayCard));
}

const checkGameOver = () => {
  let allDisabled = document.querySelectorAll(".disabled");
  if (allDisabled.length === 12) {
    setTimeout(() => {
      menuPage.children[0].innerHTML = "GameOver";
      menuPage.classList.toggle("show");
      allDisabled.forEach(container=>{
        container.classList.remove("disabled");
      })
      politicianImages.forEach(image=>image.classList.toggle("show-img"));
    }, 1000);
  }
};

function start() {
  menuPage.classList.toggle("show");
  startGame();
}

const showModal = (e, option) => {
  if (option === 0) {
    commonModalTitle.innerHTML = "Help";
    commonModalDescription.innerHTML = staticDescription.help;
  } else {
    commonModalTitle.innerHTML = "About";
    commonModalDescription.innerHTML = staticDescription.about;
  }
  commonModal.classList.toggle("modal_show");
};
const closeModal = () => {
  commonModal.classList.remove("modal_show");
};
