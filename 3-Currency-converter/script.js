const API_KEY = "1fd1b90d10a9ab422b1b623ce6d561fe" //first one
// const API_KEY="f2b4eebd82f9485cab89565689f0231a"


const fromCurrency = document.querySelector(".from");
const toCurrency = document.querySelector(".to");
const search = document.querySelector(".search");
const convert = document.querySelector(".convert");
const selectOptions1 = document.querySelector(".selectOptions1");
const selectOptions2 = document.querySelector(".selectOptions2");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.querySelector(".result");
const errorMsg = document.querySelector(".error-box");
var resultFrom;
var resultTo;

// changing currency values
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
    console.log(event.target.value)
    console.log(resultFrom);
});
// console.log(resultFrom);

toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
    console.log(resultTo);
});

search.addEventListener('input', updateValue);

// function for updating value
function updateValue(e) {
    const searchValue = e.target.value;
}

// when user clicks, it calls function getresults
convert.addEventListener('click', getResults);

// function getresults
async function getJSON(url) {
   try{  const response = await fetch(url);
    const rate = await response.json();
    // console.log(rate)
    // console.log(Object.values(rate.quotes)[0]);
    const value = Object.values(rate.quotes)[0];
    // console.log(value);
    return value
   } catch (err)
   {
       console.log('Please provide Valid details');
       displayError();
       return;
   }
}
//display Error
function displayError()
{
finalAmount.style.display = "none";
errorMsg.style.display="block";
setTimeout(errTime,5000);
}
function errTime()
{
    errorMsg.style.display="none";

}
function apis() {
    
    const apis = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${resultTo}&source=${resultFrom}&format=1`
    console.log(apis);
    return apis;
}
async function getResults() {
    const api = apis();
    const val = await getJSON(api);
    // console.log(val);
    if (!val)
    {
        return;
    }
    displayResults(val);

}

// display results after convertion
function displayResults(value) {
    const amt = search.value;
    console.log(amt);
    finalValue.innerHTML = (value * amt).toFixed(2)+`  ${resultTo}`;
    finalAmount.style.display = "block";
}
const selectApi = `http://api.currencylayer.com/list?access_key=${API_KEY}`

fetch(selectApi).then(response => response.json()).then(list => {
    displayOptions(list.currencies)
})

function displayOptions(data) {
    const arr = [data];
    arr.forEach((el) => {
        generateMarkUp(Object.keys(el));
    })
}

function generateMarkUp(el) {
    el.forEach((val) =>
        selectOptions1.innerHTML += `<option value="${val}">${val}</option></br>`)
    el.forEach((val) =>
        selectOptions2.innerHTML += `<option value="${val}">${val}</option></br>`)
}