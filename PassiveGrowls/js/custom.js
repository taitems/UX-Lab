/*global $*/

$(function() {

	"use strict";

	var cnt = 0;
	var idleText = "Active";
	var storedVal = window.localStorage.getItem("growlMode");
	$.idleTimer(2500);




	$(document).bind("idle.idleTimer", function(){
		// fired when the user becomes inactive
		if (!storedVal || storedVal === "sticky") {
			$.jGrowl.defaults.sticky = true;
		} else {
			$.jGrowl.defaults.beforeOpen = function(a,b,c) {
				var growl = $("<div />", {
					html: b
				});
				$("#modalContainer").append(growl).dialog({
					title: "Notification Centre",
					modal: true,
					show: "fade",
					hide: "fade",
					beforeClose: function() {
						$("#modalContainer").empty();
					}
				});
				return false;
			};
		}
		$("#idleStatus").text("Idle").removeClass().addClass("idle");
		idleText = "Idle";
	});




	$(document).bind("active.idleTimer", function(){
		// fired when the user becomes active again
		$.jGrowl.defaults.sticky = false;
		$.jGrowl.defaults.beforeOpen = function() {};
		$("#idleStatus").text("Active").removeClass().addClass("active");
		idleText = "Active";
	});




	// button binding and initialisation
	$("#sticky, #push").click(function() {
		window.localStorage.setItem("growlMode",$(this).attr("id"));
		document.location = document.location;
	});
	if (!storedVal || storedVal === "sticky") {
		$("#sticky").attr("disabled","disabled");
	} else {
		$("#push").attr("disabled","disabled");
	}




	// repeating jGrowls
	window.setInterval(function() {
		$.jGrowl("Created while: <b>" + idleText + "</b>", {
			header: "jGrowl " + cnt++
		});
	}, 5000);

});