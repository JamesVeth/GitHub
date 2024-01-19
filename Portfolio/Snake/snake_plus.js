const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "rgb(175, 255, 229,0.8)";
const snakeColor = "lightgreen";
const snakeBorder = "white";
let lastColorChangeScore = 0; // random food colour

const foodBorder = "white";

const movementButtons = {
    btnUp: document.querySelector("#btnUp"),
    btnLeft: document.querySelector("#btnLeft"),
    btnDown: document.querySelector("#btnDown"),
    btnRight: document.querySelector("#btnRight")
};

const unitSize = 25;

let timeout = setTimeout; 

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

let snake = [

    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}

];



window.addEventListener("keydown", changeDirection);

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

resetBtn.addEventListener("click", resetGame);

movementButtons.btnUp.addEventListener('click', changeDirectionClick);
movementButtons.btnDown.addEventListener('click', changeDirectionClick);
movementButtons.btnLeft.addEventListener('click', changeDirectionClick);
movementButtons.btnRight.addEventListener('click', changeDirectionClick);



function displayIntro() {

    ctx.filter = 'none';
    // Draw the text on top
    ctx.font = "30px Consolas";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Click "Start" to Play!`, gameWidth / 2, gameHeight / 2);

}

displayIntro();

function gameStart(){

    running = true;
    scoreText.textContent = score;

    createFood();
    drawFood();
    nextTick();

};

function nextTick(){

    if(running){

        timeout(()=>{

            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            drawEfects();
            checkGameOver();
            nextTick();//recursively call

        }, 75);

    }

    else{

        displayGameOver();

    }

};



function clearBoard(){

    ctx.fillStyle = boardBackground;

    ctx.fillRect(0, 0, gameWidth, gameHeight);

};

function createFood(){

    function randomFood(min, max){

        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;

    }

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

};

function drawEfects(){

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color (black with 50% opacity)
    ctx.shadowBlur = 5; // Blur radius
    ctx.shadowOffsetX = 2; 
    ctx.shadowOffsetY = 2; 


    

}
function drawFood(){

    if (score > lastColorChangeScore && score % 5 === 0 && running) {
        foodColor = getRandomColor(); // Set foodColor to a new random color
        lastColorChangeScore = score; // Update the lastColorChangeScore
    } 

    ctx.fillStyle = foodColor;
    ctx.strokeStyle = foodBorder;

    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    ctx.strokeRect(foodX, foodY, unitSize, unitSize);
    
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function moveSnake(){

    
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    // continuously add to the snake

    snake.unshift(head);

    //if food is eaten

    if(snake[0].x == foodX && snake[0].y == foodY){

        score+=1;
        scoreText.textContent = score;
        createFood();

    }

    // else, pop from the snake; this prevents the tail continuaously adding to itself
    else{

        snake.pop();

    }     

};

function drawSnake(){

    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    snake.forEach(snakePart => {

        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })

};
// Separate function to handle clicks
function changeDirectionClick(event){

    const buttonClicked = event.target;
    
    const LEFT = movementButtons.btnLeft;
    const UP = movementButtons.btnUp;
    const RIGHT = movementButtons.btnRight;
    const DOWN = movementButtons.btnDown;



    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);



    switch(true){

        case(buttonClicked == LEFT && !goingRight):

            xVelocity = -unitSize;
            yVelocity = 0;

            break;

        case(buttonClicked == UP && !goingDown):

            xVelocity = 0;
            yVelocity = -unitSize;

            break;

        case(buttonClicked == RIGHT && !goingLeft):

            xVelocity = unitSize;
            yVelocity = 0;

            break;

        case(buttonClicked == DOWN && !goingUp):

            xVelocity = 0;
            yVelocity = unitSize;

            break;

    }

}

function changeDirection(event){

    const keyPressed = event.keyCode;
    
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;



    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);



    switch(true){

        case(keyPressed == LEFT && !goingRight):

            xVelocity = -unitSize;
            yVelocity = 0;

            break;

        case(keyPressed == UP && !goingDown):

            xVelocity = 0;
            yVelocity = -unitSize;

            break;

        case(keyPressed == RIGHT && !goingLeft):

            xVelocity = unitSize;
            yVelocity = 0;

            break;

        case(keyPressed == DOWN && !goingUp):

            xVelocity = 0;
            yVelocity = unitSize;

            break;

    }

};

function checkGameOver(){

    // True, so check as soon as function loads
    // check if hit wall

    switch(true){

        case (snake[0].x < 0):

            running = false;

            break;

        case (snake[0].x >= gameWidth):

            running = false;

            break;

        case (snake[0].y < 0):

            running = false;

            break;

        case (snake[0].y >= gameHeight):

                running = false;

                break;

    }

    // check if any parts of the snake are in the same location as any other parts in the snake array
    // check for overlapping snake parts

    for(let i = 1; i < snake.length; i+=1){

        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){

            running = false;

        }

    }

};

function gameOverBoard(){

    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, gameWidth, gameHeight); 
    ctx.globalAlpha = 1.0;

}

function displayGameOver(){

    document.getElementById('resetBtn').innerHTML = 'Retry';

    gameOverBoard();
    
    ctx.filter = 'blur(5px)';
    drawSnake();
    drawFood();
    // Reset the filter 
    ctx.filter = 'none';
    // Draw the text on top
    ctx.font = "50px Consolas";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    
    running = false;
   

};

function resetGame(){

    // Reset score and initial movement
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    foodColor = "red"

    snake = [

        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}

    ];

    clearTimeout(timeout);
    gameStart();

};