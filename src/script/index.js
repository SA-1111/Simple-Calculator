import calculator from 'advanced-calculator';
import JSConfetti from 'js-confetti';

console.log(calculator.add(5, 3));  // Example usage


const canvas = document.getElementById('bob')
const jsConfetti = new JSConfetti({ canvas })

function boom() {
    jsConfetti.addConfetti({
        confettiColors: [
            '#000000'
        ],
        confettiRadius: 4,
        confettiNumber: 500,
    })
}

window.boom = boom;


document.addEventListener('DOMContentLoaded', () => {
    const spans = document.querySelectorAll('.special');
    spans.forEach((span, index) => {
        const delay = index * 500; // 500ms delay between each element
        span.style.animation = `rotate 4s linear infinite`;
        span.style.animationDelay = `${delay}ms`;
    })
})

