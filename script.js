const inputSlider =document.querySelector('[data-lengthSlider]');
const  lengthDisplay = document.querySelector('[data-lengthNumber]');

const  passwordDisplay = document.querySelector('[data-passwordDisplay]');
const  copyBtn = document.querySelector('[data-copy]');
const  copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck =document.querySelector('#uppercase');
const lowercaseCheck =document.querySelector('#lowercase');
const numberCheck =document.querySelector('#numbers');
const symbolCheck =document.querySelector('#symbols');
const  indicator = document.querySelector('[data-indicator]');
const  generateBtn = document.querySelector('.generateBtn');
const  allCheckBox = document.querySelectorAll('input[type=checkbox]');
const symbols = '~@#$%^&*()_{+=|:}"?/';
let password = "";
let passwordLength=10;
let checkCount =1;
//ste strength circle color to grey 
 
//set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

}



function setIndicator(color) {
    indicator.computedStyleMap.backgroundColor = color;
    //shadow  document.getElementById("foo").style["boxShadow"] = "0 0 5px #999999";
}

// get random integer
function getRndInteger(){
    return Math.floors(Math.random() * [max - min] ) + min ;
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase () {
    return String.fromCharCode(getRndInteger(97,123));
}


function generateUpperCase () {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbols () {
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}


function calcStrength () {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if (hasLower && hasUpper && (hasSym || hasNum) && passwordLength>=8) {
        setIndicator('#0f0');
    }
     else if ( (hasLower || hasUpper) && (hasSym || hasNum) && passwordLength >= 6 ) {
            setIndicator('#ff0');
     } 
     else {
        setIndicator('#f00');
     }

}



async function copyContent() {
    try {
      await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText = "Copied";
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      copyMsg.innerText = "Failed";
      /* Rejected - text failed to copy to the clipboard */
    }
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");

        },2000);
  }

function handleCheckBoxChange() {
    
}

allCheckBox.forEach((checkbox) => {
    checkBox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e) => {
    passwordLength.e.target.value;
    handleSlider();

}) 

copyBtn.addEventListener('click' , () => {
    if(passwordDisplay.value)
      copyContent();
})


generateBtn.addEventListener('click' , () => {

})