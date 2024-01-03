const inputText = document.querySelector("#input-text");
const lengIndicator = document.querySelector("#length");
const rangeIndicator = document.querySelector("#range-indi");
const UpperCase = document.querySelector("#upperCase");
const LowerCase = document.querySelector("#lowerCase");
const Number = document.querySelector("#numbers");
const Symbol = document.querySelector("#symbols");
const progessIndi = document.querySelector(".progress");
const passwordButton = document.querySelector("button");

let password = " ";
let length = 6;
let checkCount = 0;


handleSlider = ()=>{
    rangeIndicator.value = length;
    lengIndicator.innerText = length;

}
handleSlider();

// adding event listner on range indicator
rangeIndicator.addEventListener("input" , (e)=>{
    length = e.target.value;
    handleSlider();
});

// function to change the color and shadow of rangeIndicator
function setColor(color){
    progessIndi.style.backgroundColor = color;
    progessIndi.style.boxShadow = `0 0 12px 1px ${color}`;
}
// default color
setColor('#ccc');

// calculate Strength according to strength change the color of bulb

function calStrength () {
    let hasUpper  = false;
    let hasLower = false;
    let hasNum =  false;
    let hasSym= false;

    if(UpperCase.checked){
        hasUpper = true;
    }
    if(LowerCase.checked){
        hasLower=true;
    }
    if(Number.checked){
        hasNum = true;
    }
    if(Symbol.checked){
        hasSym = true;
    }

    if( hasUpper && hasLower && (hasNum|| hasSym) && length >= 8){
        setColor("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNum || hasSym)  && length >= 6){
        setColor("#ff0");
    }
    else{
        setColor("#f00");
    }
}

// function to copy the password
let copy = document.querySelector(".copy");
let copyimg = document.querySelector("img");

copyCont = async () => {
    try{
        await navigator.clipboard.writeText(inputText.value);
        copy.innerText = "Copied";
    }catch(e){
        copy.innerText = "failed";
    }

    copy.classList.add("active");

    setTimeout(()=>{
        copy.classList.remove("active");
        copy.innerText = "";
    }, 2000)
}

// adding event listeners for button
copyimg.addEventListener("click" , ()=>{
    // calling the function
    if(inputText.value){
        copyCont();
    }
});

// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
// Shuffle the array randomly - Fisher Yates Method
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


// --------------------------------------

// Generate Random Letters and Number and Symbols
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Random Lowercase Letter 
function generateRandomLowercase() {
    return String.fromCharCode(generateRandom(97, 123));
}

// Random Lowercase Letter 
function generateRandomUppercase() {
    return String.fromCharCode(generateRandom(65, 91));
}

// Random Number 
function generateRandomNumber() {
    return generateRandom(1, 10);
}

// Generate Symbol 
function generateRandomSymbol() {
    let index = generateRandom(0, symbol.length);
    return symbol[index];
}


// console.log(generateRandomLowercase());
// console.log(generateRandomUppercase());
// console.log(generateRandomNumber());
// console.log(generateRandomSymbol());


// password Generater
let checkBoxes = document.querySelectorAll("input[type=checkbox]");
console.log(checkBoxes);

// checkBox - handle

handleCheckBox = ()=>{
    checkCount = 0;
    for(i of checkBoxes){
        if(i.checked) checkCount++;
    }

    // special condition if password length is leass than checkCount
    if (length < checkCount ) {
        length = checkCount;
        handleSlider();
    }
}

checkBoxes.forEach((checkBox)=>{
    checkBox.addEventListener("change" , handleCheckBox);
});

passwordButton.addEventListener('click' , ()=>{
    if(checkCount <= 0){
        alert('Please select at least one type');
    }
    if(length < checkCount){
        length = checkCount;
        handleSlider();
    }

    // remove previous password
    password = "";

    let arr = [];

    if(UpperCase.checked){
        arr.push(generateRandomUppercase);
    }
    if(LowerCase.checked){
        arr.push(generateRandomLowercase);
    }
    if(Number.checked){
        arr.push(generateRandomNumber);
    }
    if(Symbol.checked){
        arr.push(generateRandomSymbol);
    }

    // compulsary addition
    for(let i=0; i<arr.length; i++){
        password += arr[i]();
    }

    console.log("Password: " + password);

    // adding the length denoted by length indicator
    for(let i=0; i<length-arr.length; i++){
        const randomIndex = generateRandom(0 , arr.length);

        password += arr[randomIndex]();
    }
    // shuffle password
    password = shuffle(Array.from(password));
    inputText.value = password;
    calStrength();
})
