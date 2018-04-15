$('.video').parent().click(function () {
  if($(this).children(".video").get(0).paused){        $(this).children(".video").get(0).play();   $(this).children(".playpause").fadeOut();
    }else{       $(this).children(".video").get(0).pause();
  $(this).children(".playpause").fadeIn();
    }
});


function paintComment(name, message, date){
	message = message.replace(/(?:\r\n|\r|\n)/g, '<br />');
	var comment = '<div class="media">' + 
       '<p class="pull-right"><small>' + date + '</small></p>' + 
        '<a class="media-left" href="#">' + 
          	'<img class="commentor" src="http://via.placeholder.com/40x40">' + 
        '</a>' +
        '<div class="media-body">' +
        	'<h4 class="media-heading user_name">' + name + '</h4>' +
      		'<small>' + message + '</small>' + 
        '</div>' +
    '</div>';
    $("#comments-list").append(comment);
}

function paintWeather(name, date, temp, description){
	var comment = 	'<div class="media">' + 
       					'<p class="pull-right"><small>' + date + '</small></p>' + 
					        '<a class="media-left" href="#">' + 
					            '<img class="commentor" src="http://via.placeholder.com/40x40">' + 
					        '</a>' +
        					'<div class="media-body">' +
            					'<h4 class="media-heading user_name">' + name + '</h4>' +
          						'<div class="row display">' +
							        '<div class="col-sm-6">' +
							            '<i class="fa fa-skyatlas fa-5x" id="cloud"></i>' +
							            '<div class="detail">' +
							                '<h1 class="main">' + description + '</h1>' +
							                '<h4>Delhi</h4>' +
							            '</div>' +
							        '</div>' +
							        '<div class="col-sm-6">' +
							            '<span class="day">TODAY</span>' +
							            '<h1 class="temp">' + temp + '</h1>' +
							        '</div>' +
							    '</div>' +
							'</div>' +
				    '</div>';
    $("#comments-list").append(comment);	
}

function updateLocalStorage(key, obj){
	var arr = JSON.parse(localStorage.getItem(key));
	arr.push(obj);
	localStorage.setItem(key, JSON.stringify(arr));
}

function getWeather(key, name, dateTime){
	$.ajax({
		url: "weather_api_call.php",
		success: function(response){
			message = null;
 			paintWeather(name, dateTime, response.main.temp, response.weather[0].main);
 			updateLocalStorage(key, {"name": name, "message": message, "dateTime": dateTime, 
 				"weather": {"temp": response.main.temp, "description": response.weather[0].main}});
		},
		dataType: "json"
	});
}

$(document).ready(function(){
	$("#comment-box").shiftenter({"hint": ""});

	var nameArray = ["divya", "onil", "deepa"];
	var localStr = "webpage_assignment";
	if(localStorage.getItem(localStr) === null)
	{
		localStorage.setItem(localStr, JSON.stringify([]));
	}
	var existing_comments = JSON.parse(localStorage.getItem(localStr));
	$.each(existing_comments, function(index, element){
		if(element.weather === null){
			paintComment(element.name, element.message, element.dateTime);	
		}
		else{
			paintWeather(element.name, element.dateTime, element.weather.temp, element.weather.description);
		}
		
	});


	$(document).on("submit", "#comment-form", function(event){
		event.preventDefault();

		var message = $("#comment-box").val();
		var name = nameArray[Math.floor(Math.random()*nameArray.length)];
		var dateTime = new Date($.now());
		if($.trim(message) === "+weather")
		{
			getWeather(localStr, name, dateTime);
		}
		else
		{
			paintComment(name, message, dateTime);
			updateLocalStorage(localStr, {"name": name, "message": message, "dateTime": dateTime, 'weather': null});
		}
		$("#comment-box").val("");
	});
	
});