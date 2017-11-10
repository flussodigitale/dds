$(function() {
    /* Numero di campi */
    var fieldsetCount = $('#formElem').children().length;
    console.log(fieldsetCount);

    /* Posizione corrente */
	var current = 1;

    /* Sommo e Salvo le larghezze di ciascun campo e imposta la somma finale come larghezza totale dell'elemento step*/
    var stepsWidth = 0;
    var widths = new Array();

    $('#steps .step').each(function(i) {
            var $step = $(this);
        widths[i] = stepsWidth;
            stepsWidth += $step.width();
    });
    $('#steps').width(stepsWidth);

    /* Per evitare problemi con IE, imposto il focus sul primo elemento del form */
	// $('#formElem').children(':first').find(':input:first').focus();	
	
    /* Mostro la barra di navigazione */
    $('#navigation').show();
    
    /* Quando click su un link di navigazione, il form scorre verso il campo corrispondente */
    $('#navigation a').bind('click', function(e) {
		e.preventDefault();
		var $this = $(this);
        var prev = current;
        $this.closest('ul').find('li').removeClass('selected');
            $this.parent().addClass('selected');

        /* Salviamo la posizione del link nella variabile current */
		current = $this.parent().index() + 1;

		/* Animo la slide per il prossimo modulo. L'ordine dei links nella navigation corrisponde all'ordine dei fieldsets. Inoltre, dopo lo sliding, imposto il focus sul primo elemento dell'input del nuovo fieldset. Se clicco sull'ultimo link della navigation (conferma), effettuo la validazione di tutti i fieldsets, altrimenti effettuo la validazione del form precedente */
		$('#steps').stop().animate({
			marginLeft: '-' + widths[current-1] + 'px'
		}, 500, function() {
			if(current == fieldsetCount)
				validateSteps();
			else 
				validateStep(prev);
				$('#formElem').children(':nth-child(' + parseInt(current) + ')').find(':input:first').focus();
		});
		
		e.preventDefault();
	});
	
	/* Cliccando sul tasto tab (quando si è posizionati sull'ultimo elemento di ciascun fieldset), faccio in modo che avvenga lo slide del form al prossimo passo */
	$('#formElem > fieldset').each(function() {
		var $fieldset = $(this);
		$fieldset.children(':last').find(':input').keydown(function(e){
			if(e.which == 9 || e.which == 13) {
				$('#navigation li:nth-child(' + (parseInt(current) + 1) + ') a').click();
				/* forza il blur per la validazione */
				$(this).blur();
				e.preventDefault();
			}
		});
	});

	/* valida gli errori su tutti i fieldsets se il form ha degli errori dentro $('#formElem) */
	function validateSteps(){
		var FormErrors = false;
		for(var i = 1; i < fieldsetCount; ++i){
			var error = validateStep(i);
			if(error == -1)
				FormErrors = true;
		}
		$('#formElem').data('errors',FormErrors);	
	}
	

	
	/* valida un fieldset e ritorna -1 se viene riscontrato un errore e 1 se non ve ne è alcuno */
	function validateStep(step) {
		if(step == fieldsetCount) return;
		
		var error = 1;
		var hasError = false;
		$('#formElem').children(':nth-child('+ parseInt(step) +')').find(':input:not(button)').each(function(){
			var $this 		= $(this);
			var valueLength = jQuery.trim($this.val()).length;
			
			if(valueLength == ''){
				hasError = true;
				$this.css('border-bottom','5px solid #EF494F');
			}
			else
				$this.css('border-bottom','0');	
		});
		var $link = $('#navigation li:nth-child(' + parseInt(step) + ') a');
		$link.parent().find('.error,.checked').remove();
		
		var valclass = 'checked';
		if(hasError){
			error = -1;
			valclass = 'error';
		}
		$('<span class="'+valclass+'"></span>').insertAfter($link);
		
		return error;
	}


	/* se vi sono errori, non permetto all'utente di effettuare il submit */
	$('#send').bind('click' , function(){
		if($('#formElem').data('errors')) {
			alert('Ops! Non hai riempito i moduli nel modo corretto');
			return false;
		}
	});
})