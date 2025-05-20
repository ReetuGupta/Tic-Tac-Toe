let playerInfo = document.querySelector(".player");
let boxes = document.querySelectorAll(".box");
let button = document.querySelector("button");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initial();

function initial(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
//empty ui boxes
    boxes.forEach( (box, index) => {
        box.innerHTML = "";
        boxes[index].style.pointerEvents = "all";
        //initialize boxes with css properties again
        box.classList = `box box${index + 1}`;
    });

    button.classList.remove("active");
    playerInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] === ""){
            boxes[index].innerHTML = currentPlayer;
            gameGrid[index] = currentPlayer;
            boxes[index].style.pointerEvents = "none";
        // swap player
        swapPlayer();
        // check if wins
        checkGameOver();
    }
}

function swapPlayer(){
    if(currentPlayer === "X")
        currentPlayer = "O";
    else
    currentPlayer = "X";
//ui update
playerInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let ans = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and should have same value
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
    
            // check if x is winner
            if(gameGrid[position[0]] === "X")
                ans = "X";
            else
                ans = "O";

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //winner is known X/O
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    // we have winner
    if(ans !== ""){
        playerInfo.innerHTML = `${ans} WINS ! &#128512;`;
        button.classList.add("active");
        return;
    }

    //no winner found, let's check
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    //game is tie, board filled
    if(fillCount === 9){
        playerInfo.innerHTML = "Game Tied ! &#128528;";
        button.classList.add("active");
    }

}

button.addEventListener("click", initial);

