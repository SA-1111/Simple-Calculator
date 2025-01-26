console.log("confet");
import JSConfetti from 'js-confetti';

document.addEventListener('DOMContentLoaded', () => {
    

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
            emojis: [
                "🚫",
            ],
            emojiSize: 50,
            confettiNumber: 15,
        })
    }

    window.boom = boom;
    window.sadboom = sadboom;
    
    const spans = document.querySelectorAll('.special');
    spans.forEach((span, index) => {
        const delay = index * 500; // 500ms delay between each element
        span.style.animation = `rotate 4s linear infinite`;
        span.style.animationDelay = `${delay}ms`;
    })
})

