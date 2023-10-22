/*
Game logic:
            1 = Correct
            2 = Incorrect
*/

//#region HTML Elments constants
/**
 * Div where the game board is populated to.
 */
const divBoard = document.getElementById('board');

/**
 * Paragraph tag to output error messages, if there is any.
 */
const pError = document.getElementById('error');

/**
 * Select element that will be populated with option elements based heightOptions and widthOptions arrays
 */
const selectGameOptions = document.getElementById('selectGameOptions');

/**
 * Button element that calls the startGame method when clicks
 */
const btnStartGame = document.getElementById('btnStartGame');

/**
 * Div that shows the selectGameOptions populates by options and btnStartGame
 */
const divGameInfo = document.getElementById('gameInfo');

//#region Collections
const rowHeadings = document.getElementsByClassName('rowHeading');
const divRows = document.getElementsByClassName('boardRow');
const colHeadings = document.getElementsByClassName('colHeading');
//#endregion
//#endregion

//#region  Global variables
var width = 0; //Width set by the user based on selectGameOptions options
var height = 0; //Height set by the user based on selectGameOptions options
/**
 * Number of div elements that have been marked as "incorrect" to make sure that every row and coloumn has at least one div marked as "correct"
 */
var skippedSqures = 0; 
var randomNumber = 0;

var totalNumTiles = 0;
var currentNumTiles = 0;
//#endregion

//#region  Global arrays
var grid = [];

//#region Constant arrays
const heightOptions = [5, 10, 10, 15, 15, 20, 20];
const widthOptions = [5, 5, 10, 10, 15, 15, 20];
//#endregion
//#endregion

//#region  User defined functions

//#region  generateBoard method
/**
 * Creates multiple HTMLDivElement objects in 2 for loops based on the height and width defined by the user
 * 
 * Populates the grid multidemisoinal array
 */
function generateBoard() {
    for (let a = 0; a < height + 1; a++) {
        const divRow = document.createElement('div');

        if (a > 0) {
            divRow.classList.add('boardRow');
        }

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
                tile.classList.add('unclicked', 'tile');

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
//#endregion

/**
 * Addds numbers for how many "correct" divs in each row
 */
function setRowNumbers() {
    let horizontalNumber = 0;

    for (let a = 0; a < grid.length; a++) {
        const gridElement = grid[a];
        const rowHeading = rowHeadings[a];
        const row = divRows[a];

        const tiles = row.getElementsByClassName('tile');
        for (let b = 0; b < gridElement.length + 1; b++) {
            const number = gridElement[b];

            if (tiles.length !== 0) {
                const tile = tiles[b];
                
                if (tile !== undefined) {
                    tile.addEventListener('click', function (e) {
                        e.preventDefault();
                        tileLeftClick(this, number);
                    });

                    tile.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        tileRightClick(this, number);
                    });
                }
            }

            if (number === 1) {
                horizontalNumber += 1;
            } else {
                if (horizontalNumber > 0) {
                    rowHeading.innerHTML += horizontalNumber + ' ';
                    horizontalNumber = 0;
                }
            }
        }
    }
}

//#region  setColoumnNumbers
/**
 * Addds numbers for how many "correct" divs in each coloumn
 */
function setColumnNumbers() {
    let colNumber = 0;
    // randomNumber = 0;
    // skippedSqures = 0;

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

        // TODO: Logic to ensure at least one tile per coloumn is marked as "OK" does not work
        // if (skippedSqures === height) {
        //     randomNumber = Math.floor(Math.random() * height);
        //     grid[a][randomNumber] = 1;
        //     colHeading.innerHTML = 1;

        //     randomNumber = 0;
        //     skippedSqures = 0;
        // }
    }
}
//#endregion

//#region launchGame method
/**
 * This method populates selectGameOptions drop down based on the widthOptions and heightOptions arrays.
 * 
 * This is also the method that gets called when the page is first loaded
 */
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
//#endregion

//#region  startGame method
/**
 * This method gets called when the user clicks btnStartGame button. It validates the selectGameOptions's slection to make surer the user has
 * a correct option. Then it calls the generateBoard, setColumnNumbers, setRowNumbers
 */
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
    setRowNumbers();
}
//#endregion

//#region  Tile click events
function baseTileClick(tile) {
    tile.classList.remove('unclicked');
    tile.classList.add('clicked');
}

function tileLeftClick(tile, number) {
    if (number === 0) {
        tile.innerHTML = 'x';
        tile.classList.add('text-danger');
    }

    tile.classList.add('correct');
    baseTileClick(tile);
}

function tileRightClick(tile, number) {
    if (number === 1) {
        tile.innerHTML = 'x';
        tile.classList.add('text-danger');
    }

    tile.classList.add('incorrect');
    baseTileClick(tile);
}
//#endregion
//#endregion

btnStartGame.addEventListener('click', function(e) {
    e.preventDefault();

    startGame();
});

//#region  JQuery functions
$(document).ready(function() {
    divBoard.style.display = 'none';

    launchGame();
});
//#endregion