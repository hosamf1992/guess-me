'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide();

    renderQuest();
    // TODO: show the quest section
    $('.quest').show();

}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {


        if (res === 'yes') {
            showModal('win');
            // TODO: improve UX
        } else {
            showModal('teach-me');
            // TODO: hide and show new-quest section

            $('.quest').hide();
            $('.new-quest').show();


        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(gLastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    var $elQuessInput = $('#newGuess').val();
    var $elQuestInput = $('#newQuest').val();
    addGuess($elQuestInput, $elQuessInput, gLastRes);

    onRestartGame();
}
function onStartAgain() {
    onRestartGame();
    $('.quest').hide();
    $('.modal-msg ').hide();

}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gCurrQuest = gQuestsTree;
}


function showModal(msg) {
   
    if (msg === 'win') {
        $('.modal-title').text('Yes, I knew it!');
        $('.mbtn').show();

    }
    if (msg === 'teach-me') {
        $('.modal-title').text('Mmm, Teach me!');
        $('.mbtn').hide();

        setTimeout(() => {
            $('.modal-msg ').hide();

        }, 2500);
    
        }

    $('.modal-msg ').show();
}
