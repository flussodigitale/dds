/* VARIABILI */
var fieldNumber = document.getElementsByTagName('fieldset').length;
var cursor = 1;

/* ======>  INIZIALIZZAZIONE <======= */
$(document).ready(function(){
    initialize();
});

/* FUNZIONI */
function initialize() {
    $("#next-field").addClass('hide');
    $('#prev-field').addClass("hide-prev-field");

    $(document).keydown(function(objEvent) {
        if (objEvent.keyCode == 9) {  // disabilito il tasto TAB per evitare problemi con il focus
            objEvent.preventDefault(); 
        }
    })
}

function start() {
    $("#domanda-" + cursor).addClass('selected-field');

    // Faccio un check e mostro i bottoni 'Vai Avanti' e 'Torna indietro'
    if( $('#next-field').hasClass("hide")) {
        $('#next-field').removeClass("hide");
    }
    if( $('#prev-field').hasClass("hide-prev-field")) {
        $('#prev-field').removeClass("hide-prev-field");
    }
}

function nextField() {
    $('#form-error').removeClass('show');
    cursor += 1;
    $("fieldset").removeClass('selected-field');
    $("#domanda-" + cursor).addClass('selected-field');
}

function prevField(e) {
    cursor = cursor - 1;
    $("fieldset").removeClass('selected-field');
    $("#domanda-" + cursor).addClass('selected-field');
}

function restart() {
    initialize();
    $("fieldset").removeClass('selected-field'); // rimuovo tutti i campi selezionati
    $("#trigger-form").removeClass('hide'); // mostro di nuovo il bottone per lo start
    $("#next-field").addClass('hide'); // oscuro il bottone 'Vai Avanti'
    $('#prev-field').removeClass('show-prev-field'); // oscuro il bottone 'Torna indietro'

    cursor = 1;
}

function error() {
    $('#form-error').addClass('show');
}

/* ======> ESECUZIONE E CONDIZIONI <======= */
// avvio la prima domanda
$("#trigger-form").click(function(e) {
    e.preventDefault();
    $(this).addClass('hide');
    
    if(cursor == 1) {
        start();
    }
});

// Evento: vai avanti
$("#next-field").click(function(e){
    e.preventDefault();
    var selectedInput = $(".selected-field input[id^='domanda-']");

    if(cursor >= 1 && cursor < fieldNumber) {
        validation(selectedInput);
    } else {
        restart();
    }
});

// Evento: torna indietro
$('#prev-field').click(function(e){
    e.preventDefault();

    if(cursor > 1 && cursor < fieldNumber) {
        prevField(); 
    } else {
        restart();
    }
})

// Evidenzia Label checkbox
$('#domanda-2 label').click(function() {
    $(this).toggleClass('selectedCheckbox');
});

// Evidenzia Label Radio button
$('#domanda-5 label').click(function() {
    $('#domanda-5 label').removeClass('selectedCheckbox');
    $(this).addClass('selectedCheckbox');
});

// ======> VALIDAZIONE <===== // 
function validation(selectedField){

    // Condizioni per i fieldset con un solo campo (text, email, number)
    if(selectedField[0].type == 'text' || selectedField[0].type == 'email' || selectedField[0].type == 'number') {
        if(selectedField.val() && selectedField.val().length > 4){
            nextField();
        } else {
            error();
        }
    }

    // Condizioni per i fieldset con più di un campo (checkbox e radio button)
    if(selectedField[0].type == 'checkbox' || selectedField[0].type == 'radio') {
        console.log(selectedField[0].type);
        var checkboxValid = false;

        for(var i = 0; i < selectedField.length; i++) { // controllo su tutti i campi se qualcuno viene ceckato
            if($(selectedField[i]).is(':checked')) {
                checkboxValid = true;
            }
        }

        if(checkboxValid) {
            nextField();;
        } else {
            error();
        }
    }
}