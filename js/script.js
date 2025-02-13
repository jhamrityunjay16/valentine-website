document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
        });
});

document.addEventListener("DOMContentLoaded", function () {
    function calculateLoveDuration() {
        const startDate = new Date("2019-02-23T00:00:00"); // Start date
        function updateCounter() {
            const currentDate = new Date();
            let years = currentDate.getFullYear() - startDate.getFullYear();
            let months = currentDate.getMonth() - startDate.getMonth();
            let days = currentDate.getDate() - startDate.getDate();
            let hours = currentDate.getHours() - startDate.getHours();
            let minutes = currentDate.getMinutes() - startDate.getMinutes();
            let seconds = currentDate.getSeconds() - startDate.getSeconds();

            // Adjust for negative values
            if (seconds < 0) {
                minutes -= 1;
                seconds += 60;
            }
            if (minutes < 0) {
                hours -= 1;
                minutes += 60;
            }
            if (hours < 0) {
                days -= 1;
                hours += 24;
            }
            if (days < 0) {
                months -= 1;
                days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years -= 1;
                months += 12;
            }

            // Function to animate counter
            function animateCounter(element, target) {
                let start = 0;
                let speed = Math.floor(1000 / target);
                let step = Math.max(1, Math.floor(target / 100));

                let counter = setInterval(() => {
                    start += step;
                    if (start >= target) {
                        start = target;
                        clearInterval(counter);
                    }
                    element.innerText = start;
                }, speed);
            }

            // Apply animation (only once for static values)
            if (!document.getElementById("years").dataset.animated) {
                animateCounter(document.getElementById("years"), years);
                animateCounter(document.getElementById("months"), months);
                animateCounter(document.getElementById("days"), days);
                document.getElementById("years").dataset.animated = "true"; // Prevents re-animation
            }

            // Update time every second (without animation)
            document.getElementById("hours").innerText = hours;
            document.getElementById("minutes").innerText = minutes;
            document.getElementById("seconds").innerText = seconds;
        }

        // Update every second
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    calculateLoveDuration();
});

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    function revealTimeline() {
        timelineItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 50) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", revealTimeline);
    revealTimeline(); // Call once on load
});

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️"; // You can also use 💕 or ❣️
    
    // Random position and size
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 30 + 10 + "px";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed

    document.getElementById("floating-hearts").appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Generate hearts at intervals
setInterval(createHeart, 500);


function openGift() {
    let giftBox = document.getElementById("gift-box");
    let popup = document.getElementById("gift-popup");
    let popupContent = document.querySelector(".gift-popup-content");

    // Open lid effect
    giftBox.classList.add("open");

    // Show popup with a slight delay
    setTimeout(() => {
        popup.classList.add("show");
        setTimeout(() => {
            popupContent.classList.add("show");
        }, 100);
    }, 600);
}

function closeGift() {
    let popup = document.getElementById("gift-popup");
    let popupContent = document.querySelector(".gift-popup-content");

    // Hide popup smoothly
    popupContent.classList.remove("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 300);

    // Reset gift box animation after closing
    setTimeout(() => {
        document.getElementById("gift-box").classList.remove("open");
    }, 600);
}

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let constellationStars = [];

// Get position of names
function getPosition(element) {
    let rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

// Create random stars
function createStars(count) {
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.02
        });
    }
}

// Create heart-shaped constellation around the names
function createHeartConstellation() {
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    constellationStars = [
        { x: centerX, y: centerY - 100 }, // Top center
        { x: centerX - 80, y: centerY - 140 },
        { x: centerX - 140, y: centerY - 80 },
        { x: centerX - 150, y: centerY }, // Left curve
        { x: centerX - 120, y: centerY + 80 },
        { x: centerX - 80, y: centerY + 120 },
        { x: centerX - 5, y: centerY + 200 }, // Bottom point
        { x: centerX, y: centerY + 210 }, // Bottom tip of heart
        { x: centerX + 5, y: centerY + 200 },
        { x: centerX + 80, y: centerY + 120 },
        { x: centerX + 120, y: centerY + 80 },
        { x: centerX + 150, y: centerY }, // Right curve
        { x: centerX + 140, y: centerY - 80 },
        { x: centerX + 80, y: centerY - 140 },
        { x: centerX, y: centerY - 100 } // Connecting back to top center
    ];
}

// Draw stars and heart constellation
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw twinkling stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        ctx.closePath();

        // Twinkling effect
        star.alpha += star.speed;
        if (star.alpha >= 1 || star.alpha <= 0.2) star.speed *= -1;
    });

    // Draw heart constellation
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < constellationStars.length - 1; i++) {
        ctx.moveTo(constellationStars[i].x, constellationStars[i].y);
        ctx.lineTo(constellationStars[i + 1].x, constellationStars[i + 1].y);
    }
    ctx.stroke();

    // Draw glowing points on constellation
    constellationStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(animateStars);
}

// Resize listener
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    createStars(200);
    createHeartConstellation();
});

// Initialize everything
createStars(200);
createHeartConstellation();
animateStars();

document.addEventListener("DOMContentLoaded", function () {
    const blushButton = document.getElementById("blushButton");
    const blushMessage = document.getElementById("blushMessage");

    // Array of sweet messages
    const messages = [
        "You’re the most beautiful person inside and out! 💖",
        "Your smile is my favorite thing in the world! 😊",
        "You light up my life in the most magical way! ✨",
        "Every moment with you is a dream come true! 🌙",
        "You are my greatest adventure and sweetest love story! 💑",
        "The way your eyes sparkle makes my heart skip a beat! 😍",
        "You're my happy place, my safe haven, my forever! 💕",
        "I can't stop falling for you, over and over again! 🥰",
        "You're the best part of my every day! 🌸",
        "No words can describe how much you mean to me! ❤️"
    ];

    // Function to generate a random message
    blushButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * messages.length);
        blushMessage.innerText = messages[randomIndex];

        // Apply fade-in effect
        blushMessage.style.opacity = "0";
        setTimeout(() => {
            blushMessage.style.opacity = "1";
        }, 100);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = document.getElementById("bg-music");

    // Try to play the music when the page loads
    bgMusic.play().catch(error => {
        console.log("Autoplay blocked! User interaction needed.");
    });
});

fetch("footer.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("footer-placeholder").innerHTML = data;
            });