const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response)
})
xhr.open('GET', 'https://supersimplebackend.dev'); //setup the message
xhr.send();



