/*global $*/

var flipNotify = (function() {

	"use strict";

	var defaults = {
		delay: 3000,
		icon: "none",
		sticky: false
	};
	
	var show = function(params) {
		var id = Math.round((+new Date()) * Math.random());
		var settings = $.extend({},defaults);
		if (typeof params === "string") {
			settings.message = params;
		} else {
			settings = $.extend(settings,params);
		}
		settings.id = id;
		_create(settings);
		return id;
	};

	var hide = function(id) {
		//$("#notify_" + id).removeClass("flip-fadeIn");
		$("#notify_" + id).addClass("flip-fadeOut");
		window.setTimeout(function() {
			$("#notify_" + id).remove();
		}, 350);
	};
	
	var _create = function(params) {

		var htmlString = 	'<div id="notify_{id}" class="flipNotify">'
		htmlString += 			'<div>';
		htmlString += 				'<span class="flip-icon-{icon}"></span>';
		htmlString += 				'<span class="message">{message}</span>';
		htmlString += 			'</div>';
		htmlString += 		'</div>';

		htmlString = htmlString.replace("{id}",params.id);
		htmlString = htmlString.replace("{icon}",params.icon);
		htmlString = htmlString.replace("{message}",params.message);

		var $notify = $(htmlString).appendTo(document.body);

		window.setTimeout(function() {
			$notify.addClass("flip-fadeIn");
		},1);

		if (!params.sticky) {
			window.setTimeout(function() {
				hide(params.id);
			},params.delay);
		}

	};

	return {
		show: show,
		hide: hide
	}

})();

$(function() {

	"use strict";

	$("#notify1").on("click", function(e) {
		flipNotify.show("Lorem ipsum dolor sit amet");
	});

	$("#notify2").on("click", function(e) {
		flipNotify.show({
			message: "Lorem ipsum dolor sit amet",
			icon: "tick"
		});
	});

	$("#notify3").on("click", function(e) {
		flipNotify.show({
			message: "I close after 7 seconds",
			delay: 7000
		});
	});

	$("#notify4").on("click", function(e) {
		flipNotify.show({
			message: "Lorem ipsum dolor sit amet",
			sticky: true
		});
	});

});