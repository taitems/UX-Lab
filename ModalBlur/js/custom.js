$(function() {

	var filterMethod;

	$("#modal")
		.modal({
			show: false
		})
		.on("show", function() {
			$(document.body).addClass(filterMethod);
		})
		.on("hide", function() {
			$(document.body).removeClass(filterMethod);
		});

	$("#blurModal").on("click", function(e) {
		filterMethod = "modalBlur";
		$("#modal").modal("show");
	});

	$("#desaturateModal").on("click", function(e) {
		filterMethod = "modalDesaturate";
		$("#modal").modal("show");
	});

});