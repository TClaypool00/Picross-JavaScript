/*
Game logic:
            1 = Filled in
            0 = Skipped
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

const pSuccess = document.getElementById('success');

/**
 * Select element that will be populated with option elements based heightOptions and widthOptions arrays
 */
const selectGameOptions = document.getElementById('selectGameOptions');

/**
 * Button element that calls the startGame method when clicks
 */
const btnStartGame = document.getElementById('btnStartGame');

const btnNewGame = document.getElementById('btnNewGame');

/**
 * Div that shows the selectGameOptions populates by options and btnStartGame
 */
const divGameInfo = document.getElementById('gameInfo');

/**
 * Placeholder for timer when game is being played.
 */
const divClock = document.getElementById('clock');

/**
 * Placeholder for percentage to show the user their score.
 */
const divPercent = document.getElementById('divPercent');

//#region Collections
/**
 * A collection of divs with a class of "rowHeading" attached to them. These divs show the user how many tiles per row need to be filled in example: "2 2"
 */
const rowHeadings = document.getElementsByClassName('rowHeading');
/**
 * A collection of divs elements with a class of "boardRow" attached to them.
 * 
 * The purpose of these divs is seperate the tiles per row 
 */
const divRows = document.getElementsByClassName('boardRow');

/**
 * A collection of divs with a class of "colHeading" attached to them. These divs show the user how many tiles per coloumn need to be filled in example: "2 2"
 */
const colHeadings = document.getElementsByClassName('colHeading');
/**
 * A span element to display the minute section of the timer when the game is being played.
 */
const spanMinutes = document.getElementById('minutes');
/**
 * A span element to display the second section of the timer when the game is being played.
 */
const spanSeconds = document.getElementById('seconds');

/**
 * A div element that serves as a placeholder for all the tiles, coloum headings, row headings, new game button, percentage div, and timer div.
 */
const divGame = document.getElementById('divGame');
//#endregion
//#endregion

//#region  Global variables
var width = 0; //Width set by the user based on selectGameOptions options
var height = 0; //Height set by the user based on selectGameOptions options
/**
 * Number of div elements that have been marked as "incorrect" to make sure that every row and coloumn has at least one div marked as "correct"
 */
var skippedSqures = 0;  //A number variable that serves as a way to ensure every row and coloumn has at least one tile marked as "filled in"
var randomNumber = 0; //to ensure that every row and coloumn has at least one tile marked as "filled in". The program will randomly select a number. This variable serves as a placeholder

var totalNumTiles = 0; //This variable is store the total number of tiles per game
var currentNumTiles = 0; //This variable is to the how the tiles the user has turned over
var wrongMoves = 0; // This variable is to store how many tiles the user has incorrectly marked
var timer; // This variable is set and clear the timer when the game is running
var seconds = 0; // This variable is increment and display the seconds as the timer has been running.
var minutes = 0; // This variable is increment and display the minutes as the timer has been running.
//#endregion

//#region  Global arrays
/**
 * Array to hold sub arrays which will be filled with either 1 (filled in) or 0 (skipped)
 */
var grid = [];

//#region Constant arrays
/**
 * Array to hold all options for the height
 */
const heightOptions = [5, 10, 10, 15, 15, 20, 20];

/**
 * Array to hold all options for the with
 */
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

            //Clickable tiles
            if (a !== 0 && b !== 0) {
                tile.classList.add('unclicked', 'tile');

                //To shorten the padding and with so the tiles still fit on one row depending on what the width is
                if (width === 10) {
                    tile.style.width = '4%';
                    tile.style.padding = '3%';
                } else if (width === 15) {
                    tile.style.width = '5.55%';
                    tile.style.padding = '2%';
                } else if (width === 20) {
                    tile.style.width = '4.2%';
                    tile.style.padding = '1.88%';
                }

                //Randomly selects 1 (filled in) or 0 (skipped). There is a 55% chance the program will select a one (filled in)
                if (Math.random() < .55) {
                    if (skippedSqures > 0) {
                        skippedSqures = 0;
                    }

                    subArray.push(1);

                    tile.addEventListener('click', function (e) {
                        e.preventDefault();
                        tileLeftClick(this, 1);
                    });

                    tile.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        tileRightClick(this, 1);
                    });
                } else {
                    skippedSqures += 1;
                    subArray.push(0);

                    tile.addEventListener('click', function (e) {
                        e.preventDefault();
                        tileLeftClick(this, 0);
                    });

                    tile.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        tileRightClick(this, 0);
                    });
                }

                totalNumTiles += 1;
            } else { //Number info tiles 
                if (a > 0) { //Row heading tiles
                    tile.classList.add('rowHeading');
                } else if (b > 0) { //Coloumn headings tiles
                    tile.classList.add('colHeading');

                    //To shorten the padding and with so the tiles still fit on one row depending on what the width is
                    if (width === 10) {
                        tile.style.width = '6.4%';
                        tile.style.padding = '3%';
                    } else if (width === 15) {
                        tile.style.width = '5%';
                        tile.style.padding = '2.75%';
                    } else if (width === 20) {
                        tile.style.width = '4.2%';
                        tile.style.padding = '1.88%';
                    }
                } else {
                    //First tile of the grid. Doesn't serve any purpose
                    /*
                    O X X X
                    X
                    X
                    X
                    */
                    tile.classList.add('firstCell');
                }
            }

            divRow.appendChild(tile);
        }

        //If there are no tiles in the current row being iterated
        if (skippedSqures === width) {
            //The program will randomly a number between 0 and the width
            randomNumber = Math.floor(Math.random() * width);
            //And change it to 1 (filled in)
            subArray[randomNumber] = 1;
        }

        //Resets skippedSqures variable per row
        skippedSqures = 0;

        //Pushes sub arry in to the grid array variable
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

        for (let b = 0; b < gridElement.length + 1; b++) {
            const number = gridElement[b];

            if (number === 1) {
                horizontalNumber += 1;
            } else if (horizontalNumber > 0) {
                rowHeading.innerHTML += horizontalNumber + ' ';
                horizontalNumber = 0;
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
    divGame.style.display = 'block';

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
    timer = setInterval(startPicrossTimer, 1000);
}
//#endregion

//#region  Tile click events
/**
 * This is method has logic that both the tileLeftClick and tileRightClick method use. Reduces code redundency
 * @param {*} tile HtmlDivelement that is currently being clicked on
 */
function baseTileClick(tile) {
    tile.classList.remove('unclicked');
    tile.classList.add('clicked');

    currentNumTiles += 1;
    if (currentNumTiles === totalNumTiles) {
        stopTimer();
        pSuccess.innerHTML = 'Congratulations, you won!';
    }
}

/**
 * This is method is to be called when the user clicks the left mouse button
 * @param {*} tile HtmlDivelement that is currently being clicked on
 */
function tileLeftClick(tile, number) {
    if (number === 0) {
        wrongMoves += 1;
        changePercentage();
        tile.innerHTML = 'x';
        tile.classList.add('text-danger', 'incorrect');
    } else {
        tile.classList.add('correct');
    }

    baseTileClick(tile);
}

/**
 * This is method is to be called when the user clicks the right mouse button
 * @param {*} tile HtmlDivelement that is currently being clicked on
 */
function tileRightClick(tile, number) {
    if (number === 1) {
        tile.innerHTML = 'x';
        wrongMoves += 1;
        changePercentage();
        tile.classList.add('text-danger', 'correct');
    } else {
        tile.classList.add('incorrect');
    }
    baseTileClick(tile);
}
//#endregion

/**
 * Function to be called when the the interval is set. This function is called every 1 second
 * 
 * Increments and displays the how many seconds and minutes have passed
 */
function startPicrossTimer() {
    seconds++;

    if (seconds <= 9) {
        spanSeconds.innerHTML = "0" + seconds;
    } else if (seconds >= 10) {
        spanSeconds.innerHTML = seconds;
    }

    //If seconds is greater than or equal to 60
    //The minutes variable increases by 1
    //And the seconds variable resets to 0
    if (seconds >= 60) {
        minutes++;
        spanMinutes.innerHTML  = "0" + minutes;
        seconds = 0;
        spanSeconds.innerHTML = "0" + 0;
    }

    if (minutes > 9) {
        spanMinutes.innerHTML = minutes;
    }
}

/**
 * Stops the timer by clearing the interval
 */
function stopTimer() {
    clearInterval(timer);
}

/**
 * Resets the game by stopping the timer, reseting all the drop down value back to the default value, resets the grid, width, height, etc.
 */
function newGame() {
    divBoard.innerHTML = '';
    divGameInfo.style.display = 'block';
    divGame.style.display = 'none';
    seconds = 0;
    minutes = 0;
    selectGameOptions.value = '';
    spanMinutes.innerHTML = '00';
    spanMinutes.innerHTML = '00';
    skippedSqures = 0; 
    randomNumber = 0;
    colHeadings.innerHTML = '';
    width = 0;
    height = 0;
    grid = [];

    totalNumTiles = 0;
    currentNumTiles = 0;
    seconds = 0;
    minutes = 0;
    pSuccess.innerHTML = '';
    
}

/**
 * To change and display the percentage. This function gets called when the user makes a wrong click
 */
function changePercentage() {
    divPercent.innerHTML = (100 * (totalNumTiles - wrongMoves)) / totalNumTiles + '%';
}
//#endregion

//#region Click event functions
btnStartGame.addEventListener('click', function(e) {
    e.preventDefault();

    startGame();
});

btnNewGame.addEventListener('click', function(e) {
    e.preventDefault();

    stopTimer();
    newGame();
});
//#endregion

//#region  JQuery functions
$(document).ready(function() {
    divGame.style.display = 'none';

    launchGame();
});
//#endregion