const playContainer = document.getElementById("playContainer");
const colNum = 19; //based on 5% gridBox width and 95% playArea width
const rowNum = 19; //based on 5% gridBox height and 95% playArea height

const wallColor = "black";
const pathColor = "white";

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
    let tempCell = document.getElementById(positionData);
    tempCell.style.background = wallColor;
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
        }
    }
}

function pathToEnd(direction, startPoint){
    let colDirection = getCol(direction);
    let rowDirection = getRow(direction);
    //makes a random number between 0 and (colDirection + rowDirection - 1)
    let randNum = Math.floor(Math.random() * (colDirection + Math.abs(rowDirection)));
    //console.log(colDirection + " " + rowDirection + " " + (colDirection + Math.abs(rowDirection)) + " " + randNum);
    if(randNum < colDirection){
        let nextCell = numberToStringID(getCol(startPoint) + 1 + ' ' + getRow(startPoint));
        colDirection--;
        cellToPath(nextCell);
        pathToEnd(colDirection + " " + rowDirection, nextCell);
    } else if(randNum < (colDirection + Math.abs(rowDirection))){
        let nextCell = numberToStringID(getCol(startPoint) + " " + (getRow(startPoint) + (rowDirection / Math.abs(rowDirection))));
        rowDirection = rowDirection - (rowDirection / Math.abs(rowDirection));
        cellToPath(nextCell);
        let temp = numberToStringID(colDirection + " " + rowDirection);
        pathToEnd(temp, nextCell);
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
    console.log(distance);
    if(getCol(distance) <= 2 && getRow(distance) <= 2){ //getCol is horizontal distance, getRow is vertical distance
        console.log("area too small");
        return;
    }

    let x = Math.floor(Math.random() * Number((getCol(bottomRight) -1) - (getCol(topLeft) + 1))) + (getCol(topLeft) + 1);
    let y = Math.floor(Math.random() * Number((getRow(bottomRight) -1) - (getRow(topLeft) + 1))) + (getRow(topLeft) + 1);
    return numberToStringID(x + " " + y);
}

function randomCellFromLine(top, bottom){
    if(getCol(top) == getCol(bottom)){
        let y = Math.floor(Math.random() * Number((getRow(bottom) -1) - (getRow(top) + 1))) + (getRow(top) + 1);
        return numberToStringID(getCol(top) + " " + y);
    } else if(getRow(bottom) == getRow(bottom)){
        let x = Math.floor(Math.random() * Number((getCol(bottom) -1) - (getCol(top) + 1))) + (getCol(top) + 1);
        return numberToStringID(x + " " + getRow(top));
    }
}

populateGrid(false);

const startBox = document.getElementById("00 10");
const endBox = document.getElementById("18 10");

//Need a way to mathmatically get area on either side
let firstWallCol = Math.floor(Math.random() * (colNum - 4)) + 2; //Chooses between index 2 and rowNum-2
let side1 = numberToStringID(firstWallCol + " " + 0);
let side2 = numberToStringID(firstWallCol + " " + (rowNum-1));
fillCells(side1, side2); //Initial wall
cellToPath(randomCellFromLine(side1, side2)); //Window

//pathToEnd(cellDistance(startBox.id, endBox.id), startBox.id);

//For testing only
startBox.style.background = "green";
startBox.dataset.isWall = false;
startBox.innerHTML = "start";

endBox.style.background = "red";
endBox.dataset.isWall = false;
endBox.innerHTML = "end";