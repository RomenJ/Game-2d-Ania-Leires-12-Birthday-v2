//alert('sad');

/**
 * Gracias a Ania Kobòw
 
 * https://www.youtube.com/watch?v=3KWEud12Pxo
 */
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
let currentPosition = userStart;
const ballDiameter = 20;
const boardWidth = 560;
let timerID;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
let XDirection = -2;
let YDirection = 2;
const boardHeight = 300;
let score = 0;


//create Block
class Block {

    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockWidth];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];

    }
}
//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)

]

//draw block
function addBlock() {

    for (let i = 0; i < blocks.length; i++) {

        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlock();

//Add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);
//user.style.left = currentPosition[0] + 'px';
//user.style.bottom = currentPosition[1] + 'px';
//draw user

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';

}
//draw the ball
function drawBall() {

    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

//Move user

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 15;
                drawUser();

            }
            break;

        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 15;
                drawUser();

            }
            break;


    }
}

document.addEventListener('keydown', moveUser);

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {


    //  ballCurrentPosition[0] += 2;
    ballCurrentPosition[0] += XDirection;
    ballCurrentPosition[1] += YDirection;
    drawBall();
    checkForCollisions();

} //36:47 del video
timerID = setInterval(moveBall, 20);

//Más difícil: timerID = setInterval(moveBall, 10);
//Más difícil: timerID = setInterval(moveBall, 20);
//Modo dios: timerID = setInterval(moveBall, 10);

//checkForCollisions();

function checkForCollisions() {
    //Check for block collisions, 50:51 

    for (let i = 0; i < blocks.length; i++) {

        if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])

        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            console.log(allBlocks);
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            //Check for win
            if (blocks.length === 0) {

                //scoreDisplay.innerHTML = "FELICIDADES SOBRINA, QUE SEAS MUY MUY FELIZ EN ESTE DÍA, Y TODOS LOS DÍAS";
                scoreDisplay.innerHTML = `
                <div style="text-align: center; height:400px">
                    <p style="font-size: 1.5em; margin-left: -14%;">FELICIDADES SOBRINA, QUE SEAS MUY MUY FELIZ EN ESTE DÍA, Y TODOS LOS DÍAS</p>
                    <img  style=" margin-bottom: 100px; width: 200px; height: auto; margin-top: 10px; float: left;" src="victory.jpg" alt="Game Over" style="width: 200px; height: auto; margin-top: 10px;">
                </div>
            `;


                clearInterval(timerID);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }


    //Check for wall collision
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] < 0) {
        changeDirection();
    }


    //Check for collision user

    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }


    //Check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerID);

        /*
        scoreDisplay.innerHTML = "Lo siento sobrina, vuelve a intentarlo¡";
        document.removeEventListener('keydown', moveUser);
        */
        scoreDisplay.innerHTML = `
        <div style="text-align: center; height:300px">
            <p style="font-size: 1.5em; margin-left: -24%;">No se trata de si van a derribarte, si no de si vas a levantarte cuando lo hagan</p>
            <img  style=" margin-bottom: 100px; width: 200px; height: auto; margin-top: 10px; float: left;" src="imagen.jpg" alt="Game Over" style="width: 200px; height: auto; margin-top: 10px;">
        </div>
    `;

    }


}

function changeDirection() {

    if (XDirection === 2 && YDirection === 2) {
        YDirection = -2;
        return
    }
    if (XDirection === 2 && YDirection === -2) {
        XDirection = -2;
        return
    }
    if (XDirection === -2 && YDirection === -2) {
        YDirection = 2;
        return
    }
    if (XDirection === -2 && YDirection === 2) {
        XDirection = 2;
        return

        //50:08
    }
}