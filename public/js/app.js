console.log('From the javascript file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const address = search.value

    if(address === ''){
        return messageOne.textContent = 'You must submit a location'
    }

    fetch('/weather?address=' + address).then( (response) => {
        response.json().then( (data) => {
            if(data.err){
                return messageOne.textContent = data.err
            }
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.location
        } )
    } )
})