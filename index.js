let direction = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
	{ x: 13, y: 15 }
]
let food = { x: 6, y: 7 };


//Game Functions
function main(ctime) {
	window.requestAnimationFrame(main);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = ctime;
	musicSound.play();
	gameEngine();
}


function isCollide(snake) {
	//if you bump into yourself
	for (let i = 1; i < snakeArr.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			return true;
		}
	}
    //if you bump into wall
	if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
	}
	return false;

}


function gameEngine() {
	//part1. updatig snake array & food
	if (isCollide(snakeArr)) {
		gameOverSound.play();
		musicSound.pause();
		direction = { x: 0, y: 0 };
		alert("GAME OVER! Press any key to play again.");
		scoreBox.innerHTML="SCORE: 0";
		snakeArr = [{x:13, y:15}];
		musicSound.play();
		score = 0;
	}

	//if eaten food, incremnet score and regenerate food
	if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
		foodSound.play();
		score+=1;
		if(score>hiscoreval){
			hiscoreval=score;
			localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
			HighscoreBox.innerHTML = "HIGH-SCORE: "+hiscoreval;
		}
		scoreBox.innerHTML="SCORE: "+score;
		snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
		let a = 2;
		let b = 16;
		food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
	}

	//moving snake
	for (let i = snakeArr.length - 2; i >= 0; i--) {
		//const element = array[i];
		snakeArr[i + 1] = { ...snakeArr[i] };     //To make it point to new object hence new object is created
	}

	snakeArr[0].x += direction.x;
	snakeArr[0].y += direction.y;

    
	//part2. Display the snake and food
	//display the snake
//	let x = document.getElementsByClassName("board");
	board.innerHTML = "";
	snakeArr.forEach((e, index) => {
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
	//	snakeElement.classList.add('snake')
		if (index === 0) {
			snakeElement.classList.add('head');
		}
		else {
			snakeElement.classList.add('snake');
		}
		//document.querySelector('.board').appendChild(snakeElement);
			board.appendChild(snakeElement);
	});
	//display food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food')
	//document.querySelector('.board').appendChild(foodElement);
	board.appendChild(foodElement);
}


//Main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
	hiscoreval = 0;
	localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
	hiscoreval=JSON.parse(hiscore);
	HighscoreBox.innerHTML = "HIGH-SCORE: "+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
	direction = { x: 0, y: 1 }  //start the game
	moveSound.play();
	switch (e.key) {
		case "ArrowUp":
			console.log("ArrowUp");
			direction.x = 0;
			direction.y = -1;
			break;

		case "ArrowDown":
			console.log("ArrowDown");
			direction.x = 0;
			direction.y = 1;
			break;

		case "ArrowLeft":
			console.log("ArrowLeft");
			direction.x = -1;
			direction.y = 0;
			break;

		case "ArrowRight":
			console.log("ArrowRight");
			direction.x = 1;
			direction.y = 0;
			break;
		default:
			break;
	}
});