const toogleBtn = document.getElementsByClassName('ham-icon')[0]
const navLinks = document.getElementsByClassName('nav-default-screen')[0]

toogleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})


const target2 = document.getElementsByClassName("category__cards--card2")[0]
const TailClass2 = document.getElementsByClassName('card2__tail')[0]

const target1 = document.getElementsByClassName("category__cards--card1")[0]
const TailClass1 = document.getElementsByClassName('card1__tail')[0]

const target3 = document.getElementsByClassName("category__cards--card3")[0]
const TailClass3 = document.getElementsByClassName('card3__tail')[0]

const target4 = document.getElementsByClassName("category__cards--card4")[0]
const TailClass4 = document.getElementsByClassName('card4__tail')[0]

target1.addEventListener("mouseover", () => {
    TailClass1.classList.add('card1_tail-active')
    console.log('afsdsadc')
});

target1.addEventListener("mouseout", () => {
    TailClass1.classList.remove('card1_tail-active')
    console.log('afsdsadc')
});

target2.addEventListener("mouseover", () => {
    TailClass2.classList.add('card2_tail-active')
    console.log('afsdsadc')
});

target2.addEventListener("mouseout", () => {
    TailClass2.classList.remove('card2_tail-active')
    console.log('afsdsadc')
});

target3.addEventListener("mouseover", () => {
    TailClass3.classList.add('card3_tail-active')
    console.log('afsdsadc')
});

target3.addEventListener("mouseout", () => {
    TailClass3.classList.remove('card3_tail-active')
    console.log('afsdsadc')
});

target4.addEventListener("mouseover", () => {
    TailClass4.classList.add('card4_tail-active')
    console.log('afsdsadc')
});

target4.addEventListener("mouseout", () => {
    TailClass4.classList.remove('card4_tail-active')
    console.log('afsdsadc')
});