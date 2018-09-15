var url = window.location.href;

var newBtn, newP, newSelect, newOption, newInput;
var formSelector = $('form');

var answer = ['Select an option', '1(Strongly Disagree)', '2', '3', '4', '5(Strongly Agree)'];
var inputs = ['name', 'picture'];

if(url.includes('/survey')){
	formSelector.empty();

	$.ajax({
		url: '/questions',
		method: 'GET'
	}).then(function(data){
		formSelector.attr({
			method : 'POST',
			action : '/add-answers'
		});

		newBtn = $('<button>').text('Submit').attr('class', 'btn btn-primary').css({
			'width' : '20%',
			'height' : '50%',
			'font-size' : '20px'
		});

		for(var i = 0; i < inputs.length; i++){
			newP = $('<p>').text(inputs[i].charAt(0).toUpperCase() + inputs[i].substring(1));
			newInput = $('<input>').attr({
				'name' : inputs[i]
			});

			formSelector.append(newP, newInput);
		}

		for(var i = 0; i < data.length; i++){
			newP = $('<p>').html((i+1) + '. ' + data[i].question);
			newSelect = $('<select name="answers">');
			for(var j = 0; j < answer.length; j++){
				newOption = $('<option>').attr({
					'value' : j,
					'placeholder' : 'Select an option'
				}).text(answer[j]);

				newSelect.append(newOption);
			}

			formSelector.append(newP, newSelect);
		}

		formSelector.append('<br><br>').append(newBtn);
	});	
}