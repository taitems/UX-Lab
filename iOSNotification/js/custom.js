/*global $, ios*/
$(function() {

	"use strict";

	var cnt = 0;

	var conversation = [
		"I hope you like this quirky little script!",
		"Thanks for checking it out.",
		"Plenty more where this came from!"
	];

	$("#mailNotification").on("click", function(e) {
		ios.notify({
			title: "Tait Brown",
			message: conversation[cnt],
			url: "http://www.taitbrown.com/"
		});
		cnt++;
		if (cnt === conversation.length) {
			cnt = 0;
		}
		e.preventDefault();
	});

	$("#default").on("click", function(e) {
		ios.notify();
		e.preventDefault();
	});
	
    prettyPrint();

});