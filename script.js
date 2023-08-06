const inputSlider =document.querySelector('[data-length-slider]');
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
let passwordLength = 10;
let checkCount = 1;
handleSlider(); 
//ste strength circle color to grey 
 setIndicator('#ccc');
//set password length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = lengthSlider.min;
    const max = lengthSlider.max;
    lengthSlider.style.backgroundSize = ((passwordLength - min) * 100) / (max - min) + "% 100%";

}
// handleSlider();


function setIndicator(color) {
    indicator.style.backgroundColor = color;
    document.getElementById("foo").style["boxShadow"] = "0 0 5px #999999";
}

// get random integer
function getRndInteger(){
    return Math.floor(Math.random() * ( max - min) + min) ;
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

  function shufflePassword(array) {
    //fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        // find out random j
        const j = Math.floor(Math.random() * (i + 1));
        // swap 2 numbers
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      // array.forEach((el) => (str += el));
      str = array.join("");
      return str;
     
  }

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();
 
}) 

copyBtn.addEventListener('click' , () => {
    if(passwordDisplay.value)
      copyContent();
})


generateBtn.addEventListener('click' , () => {
        //none of the check box are selected
        if(checkCount <= 0) return;

        if(passwordLength < checkCount) {
            passwordLength = checkCount;
            handleSlider();
        }

        //let's start to the new journey

        //remove old password
        password = ""; 

        //add stuff mentioned by checkbox
        // if(uppercaseCheck.checked) {
        //     password += generateUpperCase();
        // }

        // if(lowercaseCheck.checked) {
        //     password += generateLowerCase();
        // }

        // if(numbersCheck.checked) {
        //     password += generateRandomNumber();
        // }

        // if(symbolCheck.checked) {
        //     password += generateSymbols();
        // }

        let funcArr = [];
        if(uppercaseCheck.checked){
            funcArr.push(generateUpperCase);
        }

        if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }

        if(numberCheck.checked){
            funcArr.push(generateRandomNumber);
        }

        if(symbolCheck.checked){
            funcArr.push(generateSymbols);
        }

        //compulsory addition
        for(let i=0;i<funcArr.length;i++) {
            password += funcArr[i]();
            
        }

        //remaining addition
        for(let i=0;i<passwordLength-funcArr.length;i++) {
            let ranIndex = getRndInteger(0, funcArr.length);
            password += funcArr[ranIndex]();
        }

        //shuffle the password
        password = shufflePassword(Array.from(password));

        //show in UI
        passwordDisplay.value = password;

        //calculate Strength
        calcStrength();



});