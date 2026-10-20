let fname = "";

function greet() {
    let greetParagraph = document.getElementById("greet");

    fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let age = document.getElementById("age").value;

    greetParagraph.innerHTML = "Greetings" + age + "year old"
        + fname + "" + lname;
}

function trivia1() {
    let triviaAnswer = document.getElementById("trivia1-answer");
    
    // get values from form
    let chocolateSelected = document.getElementById("chocolate").checked;
    let tunaSelected = document.getElementById("tuna").checked;
    let honeySelected = document.getElementById("honey").checked;

    //give result based on what they selected
    if (chocolateSelected) {
        triviaAnswer.innerHTML = fname + ", you are wrong. Sweet tooth?"
    }
    else if (tunaSelected) {
        triviaAnswer.innerHTML = fname + ", you are wrong. Rotten tuna = yuck!"
    }
    else if (honeySelected) {
        triviaAnswer.innerHTML = fname + ", you are correct!"
    }
}

// NEW: Two Truths and a Lie game
function twoTruthsLie() {
    let ttlAnswer = document.getElementById("ttl-answer");

    // get values from form
    let statement1Selected = document.getElementById("statement1").checked;
    let statement2Selected = document.getElementById("statement2").checked;
    let statement3Selected = document.getElementById("statement3").checked;

    // statement3 is the lie
    if (statement1Selected) {
        ttlAnswer.innerHTML = fname + ", wrong! I really have been to Japan."
    }
    else if (statement2Selected) {
        ttlAnswer.innerHTML = fname + ", wrong! I really do speak German."
    }
    else if (statement3Selected) {
        ttlAnswer.innerHTML = fname + ", you got it! I am not a cat person."
    }
    else {
        ttlAnswer.innerHTML = "Pick an answer first!"
        return;
    }

    // they answered, so stop the timer and lock the answer
    clearInterval(timer);
    lockGame(true);
}

// NEW: countdown timer
let timeLimit = 10;
let timeLeft = timeLimit;
let timer;

function startTimer() {
    // reset everything so the game can be played again
    clearInterval(timer);
    timeLeft = timeLimit;
    document.getElementById("statement1").checked = false;
    document.getElementById("statement2").checked = false;
    document.getElementById("statement3").checked = false;
    document.getElementById("ttl-answer").innerHTML = "";
    document.getElementById("ttl-timer").innerHTML = "Time left: " + timeLeft;
    lockGame(false);

    // run countdown() every 1000 milliseconds (1 second)
    timer = setInterval(countdown, 500);
}

function countdown() {
    timeLeft = timeLeft - 1;
    document.getElementById("ttl-timer").innerHTML = "Time left: " + timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("ttl-timer").innerHTML = "Time's up!";

        // automatically submit whatever they picked
        twoTruthsLie();

        // if they didn't pick anything, tell them
        let anySelected = document.getElementById("statement1").checked
            || document.getElementById("statement2").checked
            || document.getElementById("statement3").checked;
        if (!anySelected) {
            document.getElementById("ttl-answer").innerHTML = fname + ", you ran out of time!"
        }

        lockGame(true);
    }
}

// locked = true disables the choices, locked = false enables them
function lockGame(locked) {
    document.getElementById("statement1").disabled = locked;
    document.getElementById("statement2").disabled = locked;
    document.getElementById("statement3").disabled = locked;
    document.getElementById("ttl-submit").disabled = locked;
}