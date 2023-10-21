/*
Game logic:
            1 = OK
            2 = Not OK
*/

const divBoard = document.getElementById('board');
var width = 5;
var height = 5;
var grid = [];
const rowHeadings = document.getElementsByClassName('rowHeading');
const colHeadings = document.getElementsByClassName('colHeading');

function generateBoard() {
    for (let a = 0; a < height + 1; a++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divBoard.appendChild(divRow);
        let subArray = new Array();
        for (let b = 0; b < width + 1; b++) {
            const tile = document.createElement('div');
            tile.classList.add('square');

            //Clickable tiles
            if (a !== 0 && b !== 0) {
                tile.classList.add('unclicked');

                if (Math.random() < .4) {
                    tile.innerHTML = 'OK';
                    subArray.push(1);
                } else {
                    tile.innerHTML = 'X'
                    subArray.push(0);
                }
            } else { //Number info tiles 
                if (a > 0) {
                    tile.classList.add('rowHeading');
                } else if (b > 0) {
                    tile.classList.add('colHeading');
                }
            }

            divRow.appendChild(tile);
        }

        if (a > 0) {
            grid.push(subArray);
        }
    }
}

function setHorizonalNumbers() {
    let horizontalNumber = 0;

    for (let a = 0; a < grid.length; a++) {
        const gridElement = grid[a];
        const rowHeading = rowHeadings[a];
        for (let b = 0; b < gridElement.length + 1; b++) {
            if (gridElement[b] === 1) {
                horizontalNumber += 1;
            } else if (horizontalNumber > 0) {
                rowHeading.innerHTML += horizontalNumber + ' ';
                horizontalNumber = 0;
            }
        }
    }
}

function setColumnNumbers() {
    let colNumber = 0;

    for (let a = 0; a < width; a++) {
        const colHeading = colHeadings[a];
        for (let b = 0; b < grid.length; b++) {
            const tile = grid[b][a];

            if (tile === 1) {
                colNumber += 1;
            }
            
            if ((tile === 0 || (b === grid.length -1 && tile === 1)) && colNumber > 0) {
                colHeading.innerHTML += colNumber;

                if (b !== grid.length - 1) {
                    colHeading.innerHTML += '<br />';
                }

                colNumber = 0;
            }
        }
    }
}