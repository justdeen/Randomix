// Retrieves HTML elements from the HTML document using their IDs and stores them in a constant variable
const form = document.getElementById('form');
const startInput = document.getElementById('startRange');
const endInput = document.getElementById('endRange');
const resultElement = document.getElementById('result');
const generatedNumbers = document.getElementById('numbers')
const numbersContainer = document.getElementById('numbers-container')
const max = document.getElementById('max')
const hist = document.getElementById('hist')
const toggle = document.getElementById('toggle')
const check = document.getElementById('check')
const msg = document.getElementById('msg')

//declaring variables lexically
let count = 0;
hist.innerHTML = 'NO HISTORY' 
max.innerText = `${count}/20`
numbersContainer.style.top = numbersContainer.offsetTop + 'px'

//Eventlistener for changing the text content of the toggle button dynamically 
toggle.addEventListener('click', () => {
    if(check.checked){
        toggle.textContent = 'Expand'
    }
    else{
        toggle.textContent = 'Collapse'
    }    
})

// Listens for when the button is clicked, then executes the nested function
form.addEventListener('submit', (e) => {
    e.preventDefault();   // prevents the page from refreshing after the button is clicked

    if(isNaN(startInput.value) || isNaN(endInput.value)){
        alert('Input must be a value.')
        return;
    }
    
    const x = parseInt(startInput.value);  // Retrieves the value (string, number etc.) in the input field and converts it to a number
    const endOfRange = parseInt(endInput.value);    // Retrieves the value (string, number etc.) in the input field and converts it to a number
    const y = endOfRange - x;   // Logic for generating the random numbers 
    
    if(x>=endOfRange){    // condition for displaying an alert when start of range is lesser than end of range   
        alert('Start of range must be less than end of range.');
        return;
    }

    if(x>9999999999 || y>9999999999 || x<-9999999999 || y<-9999999999){    //max and min input values
        alert('Input cannot exceed 9999999999 or go below -9999999999');
        return;
    }
    
    const randomNumber = Math.floor(Math.random() * y + x)   // Further logic for generating the random numbers 
    resultElement.innerText = `Random Number = ${randomNumber}`   // Displays the random number within the specified range  
    
    //deleting the initial content inside the random number container
    hist.innerHTML = '' 
    
    //updating contents inside the random numbers container
    count += 1
    let maxNumbers = 20;

    if(count <= maxNumbers){
        generatedNumbers.innerHTML += `${randomNumber}<br>`
        max.innerText = `${count}/20`;
    }
}); 

//function for copying the generated numbers 
function copy(){
    navigator.clipboard.writeText(generatedNumbers.innerText)
    msg.innerHTML = "Copied!";
    setTimeout(() => {
        msg.innerHTML = "";
      }, 900);
}

//function for manually deleting the random numbers in the container
function del(){
    generatedNumbers.innerText = '';
    hist.innerHTML = 'NO HISTORY';
    count = 0;
    max.innerText = `${count=0}/20`;
}
