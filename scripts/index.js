/*
Game logic:
            1 = OK
            2 = Not OK
*/

const divBoard = document.getElementById('board');
const pError = document.getElementById('error');
const rowHeadings = document.getElementsByClassName('rowHeading');
const colHeadings = document.getElementsByClassName('colHeading');
const selectGameOptions = document.getElementById('selectGameOptions');
const btnStartGame = document.getElementById('btnStartGame');
const divGameInfo = document.getElementById('gameInfo');
const divGridSpacing = document.getElementById('gridSpacing');
const divSquares = document.getElementsByClassName('sqaure');

var width = 0;
var height = 0;
var skippedSqures = 0;
var randomNumber = 0;

var totalNumTiles = 0;
var currentNumTiles = 0;

var grid = [];
const heightOptions = [5, 10, 10, 15, 15, 20, 20];
const widthOptions = [5, 5, 10, 10, 15, 15, 20];

function generateBoard() {
    for (let a = 0; a < height + 1; a++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divBoard.appendChild(divRow);
        let subArray = new Array();
        for (let b = 0; b < width + 1; b++) {
            const tile = document.createElement('div');
            tile.classList.add('square');

            if (width >= 10) {
                tile.style.padding = '4%';
                tile.style.width = '8%';
            }

            //Clickable tiles
            if (a !== 0 && b !== 0) {
                tile.classList.add('unclicked');

                if (Math.random() < .4) {
                    if (skippedSqures > 0) {
                        skippedSqures = 0;
                    }

                    subArray.push(1);
                    totalNumTiles += 1;
                } else {
                    skippedSqures += 1;
                    subArray.push(0);
                }
            } else { //Number info tiles 
                if (a > 0) {
                    tile.classList.add('rowHeading');
                } else if (b > 0) {
                    tile.classList.add('colHeading');
                } else {
                    tile.classList.add('firstCell');
                }
            }

            divRow.appendChild(tile);
        }

        if (skippedSqures === width) {
            randomNumber = Math.floor(Math.random() * width);
            subArray[randomNumber] = 1;
        }

        skippedSqures = 0;

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
    randomNumber = 0;
    skippedSqures = 0;

    for (let a = 0; a < width; a++) {
        const colHeading = colHeadings[a];
        for (let b = 0; b < grid.length; b++) {
            const tile = grid[b][a];

            if (tile === 1) {
                colNumber += 1;
            } else {
                skippedSqures += 1;
            }
            
            if ((tile === 0 || (b === grid.length -1 && tile === 1)) && colNumber > 0) {
                colHeading.innerHTML += colNumber;

                if (b !== grid.length - 1) {
                    colHeading.innerHTML += '<br />';
                }

                colNumber = 0;
            }
        }

        if (skippedSqures === height) {
            randomNumber = Math.floor(Math.random() * height);
            grid[a][randomNumber] = 1;
            colHeading.innerHTML = 1;

            randomNumber = 0;
            skippedSqures = 0;
        }
    }
}

function launchGame() {
    const defaultOption = document.createElement('option');
    defaultOption.text = 'Please select a value';
    defaultOption.value = '';
    defaultOption.selected = true;
    selectGameOptions.appendChild(defaultOption);

    for (let i = 0; i < widthOptions.length; i++) {
        const widthOption = widthOptions[i];
        const heightOption = heightOptions[i];
        let optionString = `${widthOption} X ${heightOption}`;

        const optionElement = document.createElement('option');
        optionElement.value = optionString;
        optionElement.text = optionString;
        optionElement.selected = false;
        
        selectGameOptions.appendChild(optionElement);
    }
}

function startGame() {
    if (selectGameOptions.value === '') {
        pError.innerHTML = 'Selected option is not valid';
        return;
    }

    if (pError.innerHTML !== '') {
        pError.innerHTML = '';
    }

    divGameInfo.style.display = 'none';
    divBoard.style.display = 'block';

    let optionString = selectGameOptions.value;
    let widthString = '';
    let heightString = '';
    let index = optionString.indexOf('X');

    if (index > 0) {
        for (let i = 0; i < index; i++) {
            if (!isNaN(optionString[i])) {
                widthString += optionString[i];
            } else {
                break;
            }
            
        }

        for (let j = index + 1; j < optionString.length; j++) {
            if (!isNaN(optionString[j])) {
                heightString += optionString[j];
            } else {
                break;
            }
        }

        width = Number(widthString);
        height = Number(heightString);
    } else {
        pError.innerHTML = 'An error happened on our part';
        return;
    }
    
    generateBoard();
    setColumnNumbers();
    setHorizonalNumbers();
}

btnStartGame.addEventListener('click', function(e) {
    e.preventDefault();

    startGame();
});

$(document).ready(function() {
    divBoard.style.display = 'none';

    launchGame();
});