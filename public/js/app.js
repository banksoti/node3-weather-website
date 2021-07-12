//response = require("../../node_modules/express")

//console.log('Client side js script is running okay.')

//fetch is not defined in JavaScript nor node, and thus would not run in theri scripts, except for a client-sidd JavaScript runtime
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

/* fetch('http://localhost:3000/weather?location=boston').then((response) => {
    response.json().then((data) => {//the .json() method used would convert the response which is a json object to a parsed object (non-json)
        if (data.error) {
            console.log(data.error)
        }
        else {
        console.log(data.forecast)
        console.log(data.location)
        }
    })
    
}) */


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'LOADING...'
    messageTwo.textContent = ''

    fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => { //the .json() method used would convert the response which is a json object to a parsed object (non-json)
        if (data.error) {
            return messageOne.textContent = data.error
            //console.log(data.error)
        }
        //else {
            const userMessage = data.forecast + '\n' + data.location
            messageOne.textContent = ''
            messageTwo.textContent = userMessage
        /* console.log(data.forecast)
        console.log(data.location)*/
        //}
    })
    
})
})