const playContainer = document.getElementById("playContainer");
const colNum = 19; //based on 5% gridBox width and 95% playArea width
const rowNum = 19; //based on 5% gridBox height and 95% playArea height

const wallColor = "black";
const wallColors = ["black", "black", "black", "red", "pink", "yellow", "aqua", "lightgreen"];
const pathColor = "white";

playContainer.dataset.cols = colNum;
playContainer.dataset.rows = rowNum;

function getCol(positionData){ //Returns number data 
    return Number(positionData.split(' ')[0]);
}

function getRow(positionData){ //Returns number data
    return Number(positionData.split(' ')[1]);
}

function cellDistance(cell1, cell2){ //Returns number distance
    return (getCol(cell2) - getCol(cell1)) + " " + (getRow(cell2) - getRow(cell1));
}

function numberToStringID(numberID){ //Returns string id
    var split = numberID.split(' ', 2);
    var newId = '';
    if(split[0] < 10){ //Col
        newId = newId.concat('0' + split[0]);
    } else{
        newId = newId.concat(split[0]);
    }
    newId = newId.concat(' ');
    if(split[1] < 0){ //Row
        newId = newId.concat('-' + '0' + Math.abs(split[1]));
    } else if(split[1] < 10){
        newId = newId.concat('0' + split[1]);
    } else{
        newId = newId.concat(split[1]);
    }
    return newId;
}

function cellToPath(positionData){ //Adjusts the cell to be a path cell
    let tempCell = document.getElementById(positionData);
    tempCell.style.background = pathColor;
    tempCell.dataset.isWall = false;
}

function cellToWall(positionData){ //Adjusts the cell to be a path cell
    if(document.getElementById(positionData) === null){
        console.log("broken " + positionData);
        return;
    }
    let tempCell = document.getElementById(positionData);
    //tempCell.style.background = wallColor;
    tempCell.style.background = wallColors[Math.floor(Math.random() * wallColors.length)];
    tempCell.dataset.isWall = true;
}

function populateGrid(allWalls){ //Makes grid with div elements and IDs representing cell position
    for(i = 0; i < colNum; i++){
        for(j = 0; j < rowNum; j++){
            var box = document.createElement("div");
            playContainer.appendChild(box);
            if(i < 10 && j < 10){
                box.id = '0' + i + " " + '0'+ j;
            } else if (i < 10){
                box.id = '0' + i + " " + j;
            } else if(j < 10){
                box.id = i + " " + '0' + j;
            } else {
                box.id = i + " " + j;
            }

            if(allWalls ==  true){ //For maze carver function
                box.style.background = wallColor; //Wall color
                box.dataset.isWall = true;
            } else { //For maze builder function
                box.style.background = pathColor; //Wall color
                box.dataset.isWall = false;
            }

            box.style.color = "white";
            box.style.width = playContainer.clientWidth/rowNum; //5.25%
            box.style.height = "5.25%";
            box.style.margin = "0px"
            // box.style.display = "flex"
        }
    }
}

populateGrid(true);

function mazeFromArray(mazeArray){ //Fills maze based on array
    for(i = 0; i < mazeArray.length; i++){
        for(j = 0; j < mazeArray[i].length; j++){
            if(mazeArray[i][j] == 'x'){
                cellToWall(numberToStringID(j + " " + i));
            } else if(mazeArray[i][j] == 'o'){
                cellToPath(numberToStringID(j + " " + i));
            }
        } 
    }
}

function randomMaze(){ //Picks random maze from mazes array
    if(mazes.length > 0){
        let mazeChosen = Math.floor(Math.random() * mazes.length);
        mazeFromArray(mazes[mazeChosen]);
        mazesDone.push(mazes[mazeChosen]);
        mazes.splice(mazeChosen, 1);
        console.log(mazes.length);
        return 1;
    } else {
        return null;
    }
}

var fixedMaze1 = [
    ['o', 'o', 'x', 'o', 'o','x', 'o', 'x', 'o', 'o','x', 'o', 'o', 'x', 'o','o', 'x', 'x', 'o'],
    ['x', 'o', 'x', 'o', 'x','x', 'o', 'x', 'o', 'x','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'o','o', 'o', 'x', 'o', 'o','o', 'o', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'x', 'o','x', 'o', 'x', 'o', 'o','x', 'x', 'o', 'x', 'o','o', 'o', 'o', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x', 'x','x', 'x', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','o', 'x', 'o', 'x', 'x','x', 'o', 'x', 'x', 'o','o', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'o', 'x', 'o','x', 'o', 'o', 'x', 'x','x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'x','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o'],
    ['x', 'x', 'o', 'x', 'x','o', 'x', 'x', 'x', 'o','x', 'x', 'o', 'x', 'o','x', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'x', 'x', 'o','x', 'o', 'o', 'x', 'o','x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'x','x', 'o', 'x', 'o', 'x','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o'],
    ['o', 'x', 'x', 'x', 'o','o', 'o', 'x', 'o', 'o','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'x', 'x', 'x','x', 'o', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'o', 'x', 'o','x', 'x', 'o', 'x', 'x','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'o', 'o','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'x', 'x', 'o','o', 'x', 'x', 'x', 'o','o', 'o', 'o', 'x', 'o','x', 'o', 'x', 'o']
];

var fixedMaze2 = [
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o', 'o','x', 'o', 'o', 'x', 'o','o', 'x', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'x', 'o', 'x','x', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o'],
    ['o', 'x', 'o', 'o', 'o','o', 'o', 'x', 'o', 'o','o', 'o', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'x', 'x','x', 'o', 'x', 'x', 'o','x', 'x', 'o', 'o', 'o','o', 'o', 'x', 'x'],
    ['o', 'x', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x', 'x','o', 'x', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','o', 'o', 'o', 'x', 'x','x', 'o', 'x', 'x', 'o','o', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'x','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'x','x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o'],
    ['x', 'x', 'o', 'x', 'x','o', 'x', 'x', 'x', 'o','x', 'x', 'o', 'x', 'o','x', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'o', 'x', 'o','x', 'o', 'o', 'x', 'x','x', 'o', 'o', 'o'],
    ['o', 'x', 'o', 'o', 'o','x', 'x', 'o', 'o', 'o','x', 'o', 'x', 'x', 'o','x', 'x', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'x','x', 'o', 'o', 'o', 'x','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o'],
    ['o', 'x', 'x', 'o', 'o','o', 'o', 'x', 'o', 'o','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'x', 'x', 'x','x', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'o', 'x', 'o','x', 'x', 'o', 'x', 'x','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','x', 'x', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'o', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'o', 'o','x', 'x', 'x', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'x'],
    ['o', 'o', 'x', 'x', 'o','o', 'o', 'x', 'o', 'o','o', 'o', 'o', 'x', 'o','o', 'o', 'o', 'o']
];

var fixedMaze3 = [
    ['o', 'x', 'o', 'x', 'o','o', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x', 'x','o', 'x', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'x','x', 'x', 'o', 'o', 'x','x', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o', 'o','o', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'x', 'o', 'x', 'o','o', 'o', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'o', 'o','x', 'o', 'o', 'x', 'x','o', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'o','o', 'o', 'o', 'o', 'x','o', 'o', 'x', 'x', 'o','o', 'o', 'x', 'o'],
    ['x', 'x', 'o', 'x', 'x','x', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'x','x', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o','o', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','o', 'o', 'x', 'o'],
    ['o', 'x', 'x', 'x', 'x','o', 'x', 'x', 'x', 'o','x', 'x', 'x', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'o', 'x', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'o'],
    ['o', 'x', 'o', 'o', 'o','x', 'x', 'o', 'o', 'o','x', 'o', 'x', 'x', 'x','x', 'x', 'x', 'o'],
    ['x', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o', 'x','x', 'x', 'o', 'o', 'o','o', 'o', 'x', 'o'],
    ['x', 'x', 'o', 'o', 'o','o', 'o', 'x', 'o', 'o','o', 'x', 'o', 'x', 'o','x', 'x', 'x', 'o'],
    ['o', 'o', 'o', 'x', 'o','x', 'x', 'x', 'x', 'x','x', 'o', 'o', 'x', 'o','o', 'o', 'o', 'o'],
    ['o', 'o', 'x', 'x', 'o','o', 'o', 'o', 'x', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'o'],
    ['o', 'x', 'o', 'x', 'o','o', 'x', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'x','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'o'],    
    ['o', 'x', 'o', 'o', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o', 'o','o', 'o', 'x', 'x', 'o','x', 'x', 'o', 'o']
];

var mazes = [fixedMaze1, fixedMaze2, fixedMaze3];
var mazesDone = [];
randomMaze();