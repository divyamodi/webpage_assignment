// $('.video').parent().click(function () {
//   if($(this).children(".video").get(0).paused){        $(this).children(".video").get(0).play();   $(this).children(".playpause").fadeOut();
//     }else{       $(this).children(".video").get(0).pause();
//   $(this).children(".playpause").fadeIn();
//     }
// });

// $(document).ready(function() {
// 	$('textarea').shiftenter();
// 	$("#comment-form").on('submit', function(event){
// 		event.preventDefault();
//     	alert($("#comment-box").text());
// 	});
// });


$(document).ready(function(){
	var nameArray = ["divya", "onil", "deepa"];
	var localStr = "webpage_assignment";
	if(localStorage.getItem(localStr) === null)
	{
		var name = nameArray[Math.floor(Math.random()*nameArray.length)];
		obj = {"name": name};
		localStorage.setItem(localStr, JSON.stringify(obj));
	}
	else
	{
		console.log(JSON.parse(localStorage.getItem(localStr)));
	}
});