let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let high_score = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game has started");
        started = true;

        levelUp();
    }
});

function flashBtn(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 100);
}

function userflashBtn(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 100);
}

function flashBg(btn){
    btn.classList.add('flashBg');
    setTimeout(function(){
        btn.classList.remove("flashBg");
    }, 100);
}

function levelUp(){
    level++;
    updateHighScore();
    userSeq = [];
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    
    // console.log(randIdx);
    
    gameSeq.push(btns[randIdx]);
    
    let selBtn = document.querySelector(`.${btns[randIdx]}`);
    flashBtn(selBtn);
}

function checkAns(Idx)
{
    if(userSeq[Idx] === gameSeq[Idx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
    }
    else
    {
        h2.innerText = `Game Over! Your score was ${level}. Press any key to start again.`;
        let bg = document.querySelector("body");
        flashBg(bg);
        reset();
    }
}

function btnPress(){
    userflashBtn(this);

    let userColor = this.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
    console.log(gameSeq);
    console.log(userSeq);
}

let allBtns = document.querySelectorAll(".btn"); // selected collection of divs
for(btn of allBtns)
{
    btn.addEventListener("click", btnPress);
}

function updateHighScore()
{
    if(high_score < level)
    {
        high_score = level;
        h3.innerText = `High Score: ${high_score}`;
    }
}

function reset()
{
    userSeq = [];
    gameSeq = [];
    level = 0;
    started = false;
}

// using recursion and setTimeout() we can make each btn of gameSeq blink in the same sequence