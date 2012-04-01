/*global $*/

var ios = (function() {

	"use strict";

	var defaults = {
		delay: 5000,
		sticky: false,
		className: "message",
		title: "Notification",
		message: "Lorem ipsum dolor sit amet.",
		url: null,
		click: null
	};

	var init = function() {
		$(document).bind("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function(e) {
			if (e.originalEvent.animationName === "slideUp") {
				$(e.target).remove();
			}
		});
		$(document).delegate(".notification","mousedown", function(e) {
			if (e.which === 2) {
				var notifyData = $(this).data("notify");
				if (notifyData.url) {
					window.open(notifyData.url);
				}
			}
		});
	};

	var notify = function(params) {

		var clonedDefaults = $.extend({},defaults);

		var settings = $.extend(clonedDefaults,params);

		var $notify = $('<div class="notification"><span class="icon" /><span class="notifyText"><span class="notifyTitle"></span><span class="notifyMessage"></span></span></div>');

		$notify
			.addClass(settings.className)
			.find(".notifyTitle").text(settings.title).end()
			.find(".notifyMessage").text(settings.message);

		if ($("#notificationWrapper").length === 0) {
			$('<div id="notificationWrapper" />').appendTo(document.body);
		}

		if (!settings.sticky) {
			setTimeout(function() {
				$notify.addClass("animateOut");
			},settings.delay);
		}

		if (settings.click) {
			$notify.on("click", settings.click);
			$notify.addClass("hasClick");
		} else if (settings.url) {
			$notify.on("click", function() {
				window.location = settings.url;
			});
			$notify.addClass("hasClick");
		}

		$notify.data("notify",settings);

		$("#notificationWrapper").append($notify);

		$notify.addClass("animateIn");

	};

	init();

	return {
		notify: notify
	};

})();