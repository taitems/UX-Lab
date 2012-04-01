$(function() {

	var timer;

	var updater = function() {
		var firstHeight = $("#jsAccordion").find(".flapUp")[0];
		console.log(firstHeight,firstHeight.scrollHeight);
		$("#jsAccordion").children().not(".static").css({
			height: firstHeight.clientHeight
		});
	}

	$(".btn").on("click", function(e) {
		if ($(this).data("javascriptAssisted")) {
			console.log("js assisted");
			$(this).next().toggleClass("openJSAnimation");
			//timer = setInterval(updater,100);
		} else {
			$(this).next().toggleClass("openCSSAnimation");
		}
		e.preventDefault();
	});


});