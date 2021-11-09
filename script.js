// dom element selection
const button = document.querySelector('#button');
const audio = document.querySelector('#audio');
const span = document.querySelector('.count');
const repeat = document.querySelector('#repeat');

// global variable
let joke;
let count = 0;

// toggle buttons
const toggleButtons = () => {
    button.disabled = !button.disabled;
    repeat.disabled = !repeat.disabled;
}

// extract the joke from api response
const tellJoke = (data) => {
    if (!data.joke) {
        joke = `${data.setup} - ${data.delivery}`;
    } else {
        joke = data.joke;
    }
}

// fetshing joke from joke api url
const getJoke = async () => {
    const ApiUrl = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const res = await fetch(ApiUrl);
        const jokes = await res.json();
        tellJoke(jokes);
    } catch (error) {
        console.log('there is some problem !',error);
    }
    
}

// for my love only
const alina = () => {
    if (count === 10) {
        joke = 'hey princess alina my boss sayad mudaser sayedi really loves you';
    }
}

// when joke teller button clicked
button.addEventListener('click', async () => {
    toggleButtons();
    count++;
    span.textContent = `Joke # ${count}`;
    await getJoke();
    await alina();
    VoiceRSS.speech({
        key: 'c193269816ac4f20b9f39a50f5018c34',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    repeat.hidden = false;
    console.log('joke number ',count,': ',joke);
});

// when audio is ended
audio.addEventListener('ended', toggleButtons);
// button to repeat the audio
repeat.addEventListener('click', () => {
    if (count > 0) {
        toggleButtons();
        audio.play();
    }
});