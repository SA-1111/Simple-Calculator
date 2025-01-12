import JSConfetti from 'js-confetti';

const canvas = document.getElementById('bob')
const jsConfetti = new JSConfetti({ canvas })

function boom() {
    jsConfetti.addConfetti({
        confettiColors: [
            '#ffa500'
        ],
        confettiRadius: 10,
        confettiNumber: 100,
    })
}
function sadboom() {
    jsConfetti.addConfetti({
        emojis:[
            "😑",
        ],
        emojiSize: 50,
        confettiNumber: 1,
    })
}

window.boom = boom;
window.sadboom = sadboom;


document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.special');
    spans.forEach((span, index) => {
        const delay = index * 500; // 500ms delay between each element
        span.style.animation = `rotate 4s linear infinite`;
        span.style.animationDelay = `${delay}ms`;
    })
})

