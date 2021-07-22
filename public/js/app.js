
/*
//fetch data from link and run the function associated with then
fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
*/


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From '
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ' '

    fetch("http://localhost:3000/weather?address=" + address).then((response) => {
     response.json().then((data) => {
    // Gives parsed data
    if (data.error) {
    //   console.log(data.error);
      messageOne.textContent = data.error
    } else {
    //   console.log(data.location);
    //   console.log(data.forecast);
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  });
});

})