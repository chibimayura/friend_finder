var currentFriendPts = 0, lowestFriendPts = 100; //stores current friend points and the lowest friend points
var friendMatch, friendName, friendPicture; //selects which user at which index is the closest match
var container = $('.container');
var newImg, newH;

if(url.includes('/friend')){
	container.empty().css('text-align', 'center');
	container.append('<h1>Your Best Match</h1>');
	$.ajax({
		url: '/users',
		method: 'GET'
	}).then(function(data){
		//grabs the last user entry's answers as an array
		var friendSeekerData = data[data.length-1].answers.replace(/"/gi,'').replace('[','').replace(']','').split(',');

		for(var i = 0; i < data.length-1; i++){
			currentFriendPts = 0;

			var possibleFriend = data[i].answers.replace(/"/gi,'').replace('[','').replace(']','').split(',');

			for(var j = 0; j < possibleFriend.length; j++){

				currentFriendPts += Math.abs(possibleFriend[j] - friendSeekerData[j]);
			}

			if(currentFriendPts < lowestFriendPts){
				lowestFriendPts = currentFriendPts;
				friendMatch = i;
			}
		}
		friendName = data[friendMatch].name;
		friendPicture = data[friendMatch].picture;
		newImg = $('<img>').attr('src', friendPicture).css({
			'height' : '250px'
		});
		newH = $('<h2>').text(friendName);

		container.append(newH, newImg);
		
	});
}