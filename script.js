// =========================================
// TEST MODE
// =========================================
//
// true  = 15 seconds testing
// false = real birthday
//

const TEST_MODE = false;


// =========================================
// FRIEND DOB
// =========================================

// 25 September 2003

const birthDate = new Date(
    2003,
    8,
    25,
    0,
    0,
    0
);


// =========================================
// REAL BIRTHDAY
// =========================================

// 25 September 2026
// 12:00 AM

const realBirthdayDate = new Date(
    2026,
    8,
    25,
    0,
    0,
    0
);


// =========================================
// HTML ELEMENTS
// =========================================

const startScreen =
    document.getElementById("startScreen");

const countdownScreen =
    document.getElementById("countdownScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const startBtn =
    document.getElementById("startBtn");

const touchBtn =
    document.getElementById("touchBtn");

const poemBox =
    document.getElementById("poemBox");

const bgMusic =
    document.getElementById("bgMusic");


// Countdown

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const lastSecondsElement =
    document.getElementById("lastSeconds");


// Age

const ageYears =
    document.getElementById("ageYears");

const ageMonths =
    document.getElementById("ageMonths");

const ageDays =
    document.getElementById("ageDays");

const ageHours =
    document.getElementById("ageHours");

const ageMinutes =
    document.getElementById("ageMinutes");

const ageSeconds =
    document.getElementById("ageSeconds");


// =========================================
// VARIABLES
// =========================================

let targetDate = null;

let countdownTimer = null;

let ageTimer = null;


// =========================================
// START BUTTON
// =========================================

startBtn.addEventListener(
    "click",
    function () {


        // =================================
        // START MUSIC
        // =================================

        bgMusic.volume = 0.35;

        bgMusic.play().catch(function (error) {

            console.log(
                "Music could not start:",
                error
            );

        });


        // =================================
        // TEST MODE
        // =================================

        if (TEST_MODE) {

            // 15 seconds from button click

            targetDate =
                new Date(
                    Date.now() + 15000
                );

        }


        // =================================
        // REAL MODE
        // =================================

        else {

            targetDate =
                realBirthdayDate;

        }


        // Hide start

        startScreen.classList.add("hidden");


        // Show countdown

        countdownScreen.classList.remove(
            "hidden"
        );


        // Start countdown

        updateCountdown();


        countdownTimer =
            setInterval(
                updateCountdown,
                1000
            );

    }
);


// =========================================
// COUNTDOWN
// =========================================

function updateCountdown() {


    const now =
        new Date();


    const difference =
        targetDate.getTime() -
        now.getTime();


    // =====================================
    // BIRTHDAY REACHED
    // =====================================

    if (difference <= 0) {

        clearInterval(
            countdownTimer
        );


        showBirthday();

        return;

    }


    // =====================================
    // CALCULATE
    // =====================================

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference /
                1000) % 60
        );


    // =====================================
    // DISPLAY
    // =====================================

    daysElement.textContent =
        String(days).padStart(2, "0");


    hoursElement.textContent =
        String(hours).padStart(2, "0");


    minutesElement.textContent =
        String(minutes).padStart(2, "0");


    secondsElement.textContent =
        String(seconds).padStart(2, "0");


    // =====================================
    // LAST 10 SECONDS
    // =====================================

    if (difference <= 10000) {

        lastSecondsElement.textContent =
            Math.ceil(
                difference / 1000
            );

    }

    else {

        lastSecondsElement.textContent =
            "";

    }

}


// =========================================
// SHOW BIRTHDAY
// =========================================

function showBirthday() {


    countdownScreen.classList.add(
        "hidden"
    );


    birthdayScreen.classList.remove(
        "hidden"
    );


    // Start age counter

    updateAge();


    ageTimer =
        setInterval(
            updateAge,
            1000
        );

}


// =========================================
// AGE CALCULATION
// =========================================

function updateAge() {


    const now =
        new Date();


    // =====================================
    // YEARS
    // =====================================

    let years =
        now.getFullYear() -
        birthDate.getFullYear();


    // =====================================
    // MONTHS
    // =====================================

    let months =
        now.getMonth() -
        birthDate.getMonth();


    // =====================================
    // DAYS
    // =====================================

    let days =
        now.getDate() -
        birthDate.getDate();


    // =====================================
    // CORRECT DAYS
    // =====================================

    if (days < 0) {

        months--;


        const previousMonthDays =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            ).getDate();


        days +=
            previousMonthDays;

    }


    // =====================================
    // CORRECT MONTHS
    // =====================================

    if (months < 0) {

        years--;

        months += 12;

    }


    // =====================================
    // LAST BIRTHDAY
    // =====================================

    let lastBirthday =
        new Date(
            now.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate(),
            0,
            0,
            0
        );


    if (now < lastBirthday) {

        lastBirthday =
            new Date(
                now.getFullYear() - 1,
                birthDate.getMonth(),
                birthDate.getDate(),
                0,
                0,
                0
            );

    }


    // =====================================
    // REMAINING TIME
    // =====================================

    const remainingTime =
        now.getTime() -
        lastBirthday.getTime();


    const hours =
        Math.floor(
            remainingTime /
            (1000 * 60 * 60)
        ) % 24;


    const minutes =
        Math.floor(
            remainingTime /
            (1000 * 60)
        ) % 60;


    const seconds =
        Math.floor(
            remainingTime /
            1000
        ) % 60;


    // =====================================
    // DISPLAY
    // =====================================

    ageYears.textContent =
        years;

    ageMonths.textContent =
        months;

    ageDays.textContent =
        days;

    ageHours.textContent =
        hours;

    ageMinutes.textContent =
        minutes;

    ageSeconds.textContent =
        seconds;

}


// =========================================
// TOUCH ME
// =========================================

touchBtn.addEventListener(
    "click",
    function () {


        poemBox.classList.remove(
            "hidden"
        );


        touchBtn.style.display =
            "none";


        // Smooth scroll to poem

        setTimeout(function () {

            poemBox.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 100);

    }
);