var z_box = document.getElementsByClassName('zombie')
var whack_button = document.getElementById('whack-btn');
var begin_button = document.getElementById('begin_button');
var play_section = document.getElementById('play')
var timer_parent = document.getElementsByClassName('timer')[0]
var top_text = document.getElementById('top_text')
var time = document.getElementById('time')
var whacked_text = document.getElementsByClassName('whacked')[0];

var retry_button = document.getElementById('retry_button_button');

var img_global;

var curr_idx = 0

const whacked_event = () => {
    whacked++
    whacked_text.innerText = whacked
    playAudio()
}

var count_interval, traverse_interval;

var storage = window.localStorage
var whacked = 0
var secs = 30

var path;
for(let cnt = 0; cnt < z_box.length; cnt++) {
    z_box[cnt].addEventListener('click', () => {
        setSelected(cnt)
    })
}

if (play_section != null) {
    play_section.style.display = 'none'
}

if (whack_button != null) {
    whack_button.addEventListener('click', () => {
        _whack()
    })
}

if (retry_button != null) {
    retry_button.addEventListener('click', () => {
        begin();
    })
}

function _whack() {
    path = document.getElementById('z-selected').children[0].getAttribute('src')
    storage.setItem('path', path)
    window.location.href = '/templates/play.html'
}

function setSelected(index) {
    for (let cnt = 0; cnt < z_box.length; cnt++) {
        if(z_box[cnt].id === 'z-selected') {
            z_box[cnt].removeAttribute('id')
        }
    }
    z_box[index].setAttribute('id', 'z-selected')
    whack_button.removeAttribute('disabled')
}

function begin() {

    secs != 30 ? secs = 30 : // 

    top_text.innerText = 'Whack a Zombie!!!'
    begin_button.classList.add('d-none')
    play_section.style.display = 'grid'
    timer_parent.classList.remove('d-none')

    retry_button.classList.add('d-none')

    path = storage.getItem('path')
    document.getElementsByClassName('whacked-timer')[0].style.display = "block"
    start()
}

function start() {
    beginTraversal()
    beginCount()
}

var count = () => {
    --secs
    time.innerText = secs+'s'

    if (secs === 10) {
        time.style.color = 'red'
    }

    if (secs === 0) { 
        time.style.color = 'black'
        time.innerText = 'oops!'
        finishSession()
     }
};

function finishSession() { 
    clearInterval(count_interval)
    clearInterval(traverse_interval)

    let last_box = document.getElementsByClassName('box')[curr_idx];

    last_box.removeChild(last_box.childNodes[0])

    curr_idx = 0
    play_section.style.display = 'none'
    top_text.innerText = 'Game Over!'

    document.getElementById('complete_whacked_text')
        .innerText = 'You whacked ' + whacked + ' zombies'
    document.getElementsByClassName('whacked')[0].style.display = 'none';

    retry_button.classList.remove('d-none')
}

var traverse = () => {

    document.getElementsByClassName('box')[curr_idx]
        .removeEventListener('click', whacked_event);

    let idx = parseInt(Math.random() * 15)
    curr_idx = idx
    let z_div = document.getElementsByClassName('box')[idx]

    z_div.addEventListener('click', whacked_event)
    z_div.append(img_global)
};

function beginCount() {
    count_interval = setInterval(count, 1000)
}

function beginTraversal() {
    img_global = document.createElement('img');
    img_global.classList.add('box-zombie')
    img_global.setAttribute('src', path)

    traverse_interval = setInterval(traverse, 1000)
}

function playAudio() {
    var audio = new Audio('../tunes/buzz.mp3')
    audio.play()
}


