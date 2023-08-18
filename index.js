/*

Game Logic: 

1 = OK
0 = Not OK

*/

const gameOptions = ['5 X 5', '4 X 4'];
var startingGrid = null;
var currentGrid = new Array();

const selectGameOptions = document.getElementById('selectGameOptions');
const btnStartGame = document.getElementById('btnStartGame');
const divGameInfo = document.getElementById('gameInfo');
const pError = document.getElementById('error');
const divMainGame = document.getElementById('mainGame');
const divGameBoard = document.getElementById('gameBoard');

var width = 0;
var height = 0;
var lives = 5;

window.onload = function() {
    for (let i = 0; i < gameOptions.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = gameOptions[i];

        selectGameOptions.appendChild(option);
    }

    divMainGame.style.display = 'none';
}

btnStartGame.addEventListener('click', function(e) {
    e.preventDefault();

    if (!validateDropDown()) {
        pError.innerHTML = 'You need to select an option';
        return;
    }

    if (pError.innerHTML !== '') {
        pError.innerHTML = '';
    }

    divGameInfo.style.display = 'none';
    divMainGame.style.display = 'block';

    setWidthAndHeight();
    generateBoard();
    randomizeBoard();
    generateUserButtons();
    getRowNumbers();
});

function validateDropDown() {
    return selectGameOptions.value !== '';
}

function setWidthAndHeight() {
    let optionId = selectGameOptions.value;
    let optionWord = gameOptions[optionId];

    width = Number(optionWord[0]);
    height = Number(optionWord[optionWord.length - 1]);
}

function generateBoard() {
    for (let a = 0; a < height + 1; a++) {
        const divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.setAttribute('id', `row${a}`)

        for (let b = 0; b < width + 1; b++) {
            const divTitle = document.createElement('div');
            divTitle.classList.add('col-md-1', 'p-5', 'border', 'border-dark');

            if (a == 0 && b > 0) {
                divTitle.setAttribute('id', `col${b}`);
            }

            if (a > 0 && b == 0) {
                divTitle.setAttribute('id', `rowHeading${a}`)
            }

            if (a > 0 && b > 0) {
                divTitle.classList.add('bg-secondary');
                divTitle.setAttribute('id', `title${a - 1} ${b - 1}`)
            }

            divRow.appendChild(divTitle);
        }

        divGameBoard.appendChild(divRow);
    }
}

function randomizeBoard() {
    let row = null;
    startingGrid = new Array();

    for (let i = 1; i < height + 1; i++) {
        row = document.getElementById(`row${i}`);
        let tiles = row.getElementsByTagName('div');
        let subArray = Array();

        for (let j = 1; j < tiles.length; j++) {
            let tile = tiles[j];

            if (Math.random() < .4) {
                tile.innerHTML = 1;
                subArray.push(1);
            } else {
                tile.innerHTML = 0;
                subArray.push(0);
            }
        }

        startingGrid.push(subArray);
    }

    currentGrid = startingGrid;
}

function userLeftClicksOK(title) {
    title.classList.remove('bg-secondary');
    title.classList.add('bg-success');
    title.removeEventListener('click');
}

function userLeftClickNotOK(title) {
    title.classList.remove('bg-secondary');
    title.classList.add('bg-danger');
    title.removeEventListener('click');
    lives -= 1;
}

function baseRightClickEvent(title) {
    title.innerHTML = "X";
}

function startNewGame() {
    divMainGame.style.display = 'none';
    divGameInfo.style.display = 'block';
    selectGameOptions.value = '';
}

function generateUserButtons() {
    if (document.getElementById('btnNewGame')) {
        return;
    }

    let row1 = divGameBoard.getElementsByClassName('row')[0];

    let divCol = document.createElement('div');
    divCol.classList.add('col-md-2');
    row1.appendChild(divCol);

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary', 'p-4');
    button.setAttribute('id', 'btnNewGame');
    button.innerHTML = 'Start a game';

    button.addEventListener('click', function (e) {
        e.preventDefault();

        startNewGame();
    })

    divCol.appendChild(button);
}

function getRowNumbers() {
    let rowHeading = null;

    for (let c = 0; c < startingGrid.length; c++) {
        const subGrid = startingGrid[c];
        rowHeading = document.getElementById(`rowHeading${c + 1}`);
        let dataNumber = 0;
        let dataNumberString = '';

        for (let d = 0; d < subGrid.length; d++) {
            const data = startingGrid[c][d];

            if (data === 1) {
                dataNumber += 1;
            } else if (data === 0 && dataNumber > 0) {
                dataNumberString += dataNumber + ' ';
                dataNumber = 0;
            }
        }
        rowHeading.innerHTML = dataNumberString;
    }
}