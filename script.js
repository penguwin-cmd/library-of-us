/* ==========================================
   THE LIBRARY OF US
   SCRIPT V3.2
========================================== */

/* ==========================================
   ELEMENTS
========================================== */

const loadingScreen = document.getElementById("loading-screen");
const intro = document.getElementById("intro");
const transitionScene = document.getElementById("transition-scene");
const doorScene = document.getElementById("door-scene");
const library = document.getElementById("library");
const bookViewer = document.getElementById("book-viewer");
const chapterFrame = document.getElementById("chapter-frame");
const screenFade = document.getElementById("screen-fade");
const footer = document.querySelector("footer");


/* ==========================================
   BUTTONS
========================================== */

const beginStoryBtn = document.getElementById("begin-story");
const enterLibraryBtn = document.getElementById("enter-library");
const closeBookBtn = document.getElementById("close-book");




/* ==========================================
   AUDIO
========================================== */

const bgMusic = document.getElementById("bg-music");
const pageFlip = document.getElementById("page-flip");
const doorOpen = document.getElementById("door-open");
const fireplaceAudio = document.getElementById("fireplace-audio");


/* ==========================================
   SETTINGS
========================================== */

const SETTINGS = {

    loadingDuration: 1500,

    fadeDuration: 800,

    transitionDuration: 3000,

    musicVolume: 0.35,

    fireplaceVolume: 0.25

};
/* ==========================================
   HELPER FUNCTIONS
========================================== */

function playSound(audio) {

    if (!audio) return;

    audio.currentTime = 0;

    audio.play().catch(() => {});

}

function fadeIn(element, display = "block") {

    element.style.display = display;
    element.style.opacity = "0";

    requestAnimationFrame(() => {

        element.style.opacity = "1";

    });

}

function fadeOut(element) {

    element.style.opacity = "0";

    setTimeout(() => {

        element.style.display = "none";

    }, SETTINGS.fadeDuration);

}

function showScreenFade() {

    screenFade.style.pointerEvents = "auto";
    screenFade.style.opacity = "1";

}

function hideScreenFade() {

    screenFade.style.opacity = "0";
    screenFade.style.pointerEvents = "none";

}

function wait(time) {

    return new Promise(resolve => setTimeout(resolve, time));

}
/* ==========================================
   SCENE FUNCTIONS
========================================== */

function hideLoading() {

    fadeOut(loadingScreen);

}

function showTransition() {

    intro.style.display = "none";

    transitionScene.style.visibility = "visible";
    transitionScene.style.opacity = "1";

}

function showDoor() {

    transitionScene.style.opacity = "0";

    setTimeout(() => {

        transitionScene.style.visibility = "hidden";

        doorScene.style.display = "flex";

    }, SETTINGS.fadeDuration);

}

function showLibrary() {

    doorScene.style.display = "none";

    library.style.display = "block";

    footer.style.display = "block";

}

function startFireplace() {

    fireplaceAudio.volume = SETTINGS.fireplaceVolume;

    fireplaceAudio.play().catch(() => {});

}

function startMusic() {

    bgMusic.volume = SETTINGS.musicVolume;

    bgMusic.play().catch(() => {});

}
/* ==========================================
   BOOK FUNCTIONS
========================================== */

function openBook(book) {

    const shelf = document.querySelector(".bookshelf");

    shelf.classList.add("focus");

    book.classList.add("opening");

    playSound(pageFlip);

    showScreenFade();

    setTimeout(() => {

        chapterFrame.src = `chapters/${book.dataset.book}.html`;

        bookViewer.style.display = "flex";
        bookViewer.classList.add("opening");

        hideScreenFade();

    }, 600);
}

function closeBook() {

    playSound(pageFlip);

    showScreenFade();

    setTimeout(() => {

        chapterFrame.src = "";

        bookViewer.classList.remove("opening");

        bookViewer.style.display = "none";

        const openedBook = document.querySelector(".book.opening");

        if (openedBook) {

            openedBook.classList.remove("opening");

        }
        const shelf = document.querySelector(".bookshelf");
shelf.classList.remove("focus");

        hideScreenFade();

    }, SETTINGS.fadeDuration);

}
/* ==========================================
   EVENT LISTENERS
========================================== */

/* Loading */

window.addEventListener("load", () => {

    footer.style.display = "none";

    setTimeout(() => {

        hideLoading();

    }, SETTINGS.loadingDuration);

});


/* Begin Story */

beginStoryBtn.addEventListener("click", () => {

    playSound(pageFlip);

    startMusic();

    showScreenFade();

    setTimeout(() => {

        hideScreenFade();

        showTransition();

        setTimeout(() => {

            showDoor();

        }, SETTINGS.transitionDuration);

    }, SETTINGS.fadeDuration);

});


/* Enter Library */

enterLibraryBtn.addEventListener("click", () => {

    playSound(doorOpen);

    showScreenFade();

    setTimeout(() => {

        showLibrary();

        startFireplace();

        hideScreenFade();

    }, SETTINGS.fadeDuration);

});


/* Open Books */

document.querySelectorAll(".book").forEach((book) => {

    book.addEventListener("click", () => {

        if (!book.classList.contains("available")) return;

        openBook(book);

    });

});


/* Close Book */

closeBookBtn.addEventListener("click", () => {

    closeBook();

});
/* ==========================================
   LOCK READ BOOKS
========================================== */

window.addEventListener("load", () => {

    footer.style.display = "none";

    const today = new Date();

    /* 11th Monthsary — July 23, 2026 */
    const monthsaryUnlockDate = new Date(2026, 6, 23);

    const monthsary11 =
        document.querySelector('[data-book="monthsary11"]');


    if (today < monthsaryUnlockDate) {

        monthsary11.classList.remove("available");
        monthsary11.classList.add("locked");

    } else {

        monthsary11.classList.remove("locked");
        monthsary11.classList.add("available");

    }


    /* 1st Anniversary — August 23, 2026 */
    const anniversaryUnlockDate = new Date(2026, 7, 23);

    const anniversary =
        document.querySelector('[data-book="anniversary"]');


    if (today < anniversaryUnlockDate) {

        anniversary.classList.remove("available");
        anniversary.classList.add("locked");

    } else {

        anniversary.classList.remove("locked");
        anniversary.classList.add("available");

    }


    setTimeout(() => {

        hideLoading();

    }, SETTINGS.loadingDuration);

});
/* ==========================================
   LIVE GRANDFATHER CLOCK
========================================== */

function updateClock() {

    const hourHand = document.querySelector(".hour-hand");
    const minuteHand = document.querySelector(".minute-hand");

    if (!hourHand || !minuteHand) return;

    const now = new Date();

    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();

    const hourDegrees = (hours * 30) + (minutes * 0.5);
    const minuteDegrees = minutes * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
}

updateClock();

setInterval(updateClock, 1000);