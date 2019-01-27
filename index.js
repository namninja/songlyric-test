'use strict';

const ENDPOINT = 'https://api.lyrics.ovh/v1/'

//construct url for the API
//use fetch API to make a request to the Lyrics API
function getLyrics(artist, title) {
    console.log('getLyrics ran')
    artist = encodeURIComponent(artist)
    title = encodeURIComponent(title)
    const url = ENDPOINT + artist + '/' + title
    console.log(url)
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#results').removeClass('hidden')
        $('#results').html(`<h3>Something went wrong: ${err.message}</h3>`)
    })
}
//reder the lyrics to the DOM
function displayResults(responseJson) {
    console.log('displayResults ran')
    console.log(responseJson)
    $('#results').removeClass('hidden')
    $('#results').html(`
    <h2>Let's sing happy songs together!!</h2>
    <p>${responseJson.lyrics}</p>
    `)
}


//listen for submit event
//store user's input selection
//pass the artist and title into the getLyrics function
function watchForm() {
    console.log('watchForm ran')
    $('.js-search-form').submit(event => {
        event.preventDefault()
        let artist = $('.js-query-artist').val()
        let title = $('.js-query-title').val()
        console.log(artist, title)
        getLyrics(artist, title)
    })
}

$(watchForm);

