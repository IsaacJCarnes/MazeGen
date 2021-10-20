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
    }
    let tempCell = document.getElementById(positionData);
    //tempCell.style.background = wallColor;
    tempCell.style.background = wallColors[Math.floor(Math.random() * wallColors.length)];
    tempCell.dataset.isWall = true;
}

function populateGrid(allWalls){ //Makes grid have all black cells
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

function fillCells(startCell, finishCell){
    //Makes sure we are only filling a straight line
    if((getCol(startCell) != getCol(finishCell)) && (getRow(startCell) != getRow(finishCell))){
        return;
    }

    if(getCol(startCell) == getCol(finishCell)){ //Horizontal line
        for(i = getRow(startCell); i <= getRow(finishCell); i++){
            cellToWall(numberToStringID(getCol(startCell) + " " + i));
        }
    } else if (getRow(startCell) == getRow(finishCell)){ //Vertical line
        for(i = getCol(startCell); i <= getCol(finishCell); i++){
            cellToWall(numberToStringID(i + " " + getRow(startCell)));
        }
    }
}

function randomCellFromArea(topLeft, bottomRight){ //Picks a random cell between two points
    let distance = cellDistance(topLeft, bottomRight);
    if(getCol(distance) <= 2 && getRow(distance) <= 2){ //getCol is horizontal distance, getRow is vertical distance
        console.log("area too small");
        return;
    }

    let x = Math.floor(Math.random() * Number((getCol(bottomRight) -1) - (getCol(topLeft) + 1))) + (getCol(topLeft) + 1);
    let y = Math.floor(Math.random() * Number((getRow(bottomRight) -1) - (getRow(topLeft) + 1))) + (getRow(topLeft) + 1);
    return numberToStringID(x + " " + y);
}

function randomCellFromLine(top, bottom, withoutBounds){
    if(withoutBounds == true){ //Without bounds does not allows the first or last element to be selected
        if(getCol(top) == getCol(bottom)){
            let y = Math.floor(Math.random() * Number((getRow(bottom) -1) - (getRow(top) + 1))) + (getRow(top) + 1);
            return numberToStringID(getCol(top) + " " + y);
        } else if(getRow(bottom) == getRow(bottom)){
            let x = Math.floor(Math.random() * Number((getCol(bottom) -1) - (getCol(top) + 1))) + (getCol(top) + 1);
            return numberToStringID(x + " " + getRow(top));
        }
    } else {
        if(getCol(top) == getCol(bottom)){
            let y = Math.floor(Math.random() * Number(getRow(bottom) - getRow(top))) + getRow(top);
            return numberToStringID(getCol(top) + " " + y);
        } else if(getRow(bottom) == getRow(bottom)){
            let x = Math.floor(Math.random() * Number(getCol(bottom) - getCol(top))) + getCol(top);
            return numberToStringID(x + " " + getRow(top));
        }
    }
}

function addWallToArea(topLeft, bottomRight, vertical, lastWindow){ //string id, string id, boolean
    let dist = cellDistance(topLeft, bottomRight);
    if(getCol(dist) <= 1 || getRow(dist) <= 1){
        return;
    } else if(getCol(dist) < 3 && getRow < 3){
        return;
    }

    if(vertical == true){
        let wallCol = Math.floor(Math.random() * (getCol(bottomRight) - 4)) + getCol(topLeft) + 2; //Chooses between index first col + 2 and last col -2
        let time = 0;
        while(lastWindow != null && wallCol == getCol(lastWindow)){
            wallCol = Math.floor(Math.random() * (getCol(bottomRight) - 4)) + getCol(topLeft) + 2;
            time++;
            if(time > 5){
                break;
            }
        }
        let side1 = numberToStringID(wallCol + " " + getRow(topLeft));
        let side2 = numberToStringID(wallCol + " " + getRow(bottomRight));
        fillCells(side1, side2); //Initial wall
        let windowCell = randomCellFromLine(side1, side2, false);
        cellToPath(windowCell); //Window

        let firstTopLeft = numberToStringID(getCol(topLeft) + " " + getRow(topLeft));
        let firstBottomRight =  numberToStringID((getCol(side2) -1) + " " + getRow(side2));
        addWallToArea(firstTopLeft, firstBottomRight, false, windowCell);

        let secondTopLeft = numberToStringID((getCol(side1) + 1) + " " + getRow(side1));
        let secondBottomRight =  numberToStringID(getCol(bottomRight) + " " + (getRow(bottomRight)));
        addWallToArea(secondTopLeft, secondBottomRight, false, windowCell);
    } else {
        let wallRow = Math.floor(Math.random() * (getRow(bottomRight) - 4)) + getRow(topLeft) + 2; //Chooses between index first col + 2 and last col -2
        let time = 0;
        while(lastWindow != null && wallRow == getRow(lastWindow)){
            wallRow = Math.floor(Math.random() * (getRow(bottomRight) - 4)) + getRow(topLeft) + 2; 
            time++;
            if(time > 5){
                break;
            }
        }
        let side1 = numberToStringID(getCol(topLeft) + " " + wallRow);
        let side2 = numberToStringID(getCol(bottomRight) + " " + wallRow);
        fillCells(side1, side2); //Initial wall
        let windowCell = randomCellFromLine(side1, side2, false);
        cellToPath(windowCell); //Window

        let firstTopLeft = numberToStringID(getCol(topLeft) + " " + getRow(topLeft));
        let firstBottomRight =  numberToStringID(getCol(side2) + " " + (getRow(side2) - 1));
        addWallToArea(firstTopLeft, firstBottomRight, true, windowCell);

        let secondTopLeft = numberToStringID(getCol(side1) + " " + (getRow(side1) + 1));
        let secondBottomRight =  numberToStringID(getCol(bottomRight) + " " + (getRow(bottomRight)));
        addWallToArea(secondTopLeft, secondBottomRight, true, windowCell);
    }
}

populateGrid(true);

/*let areaPoint1 = "00 00";
let areaPoint2 = numberToStringID((colNum-1) + " " + (rowNum-1));
addWallToArea(areaPoint1, areaPoint2, true);*/

/////////////////////////////////////Presentation Mode
function mazeFromArray(mazeArray){
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

function randomMaze(){
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
    ['o', 'o', 'x', 'x', 'o','o', 'o', 'o', 'x', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x'],
    ['o', 'x', 'o', 'x', 'o','o', 'x', 'o', 'o', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'x', 'o'],
    ['o', 'o', 'o', 'o', 'x','o', 'x', 'o', 'x', 'o','x', 'o', 'x', 'x', 'o','x', 'o', 'x', 'o'],    
    ['o', 'x', 'o', 'o', 'o','o', 'x', 'o', 'x', 'o','x', 'o', 'o', 'o', 'o','x', 'o', 'o', 'x'],
    ['o', 'o', 'o', 'x', 'o','o', 'o', 'x', 'o', 'o','o', 'o', 'x', 'x', 'o','x', 'x', 'o', 'o']
];

var mazes = [fixedMaze1, fixedMaze2, fixedMaze3];
var mazesDone = [];
randomMaze();