const gameOptions = ['5 X 5', '4 X 4'];

const selectGameOptions = document.getElementById('selectGameOptions');
const btnStartGame = document.getElementById('btnStartGame');
const divGameInfo = document.getElementById('gameInfo');
const pError = document.getElementById('error');
const divMainGame = document.getElementById('mainGame');
const divGameBoard = document.getElementById('gameBoard');

var width = 0;
var height = 0;

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
})

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

        for (let b = 0; b < width + 1; b++) {
            const divTitle = document.createElement('div');
            divTitle.classList.add('col-md-1', 'p-5', 'border', 'border-dark');

            if (a == 0 && b > 0) {
                divTitle.setAttribute('id', `col${b}`);
            }

            if (a > 0) {
                divTitle.setAttribute('id', `row${a}`)
            }

            if (a > 0 && b > 0) {
                divTitle.classList.add('bg-secondary');
            }

            divRow.appendChild(divTitle);
        }

        divGameBoard.appendChild(divRow);
    }
}