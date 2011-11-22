var DuckHunt = (function() {

	var positions = [
		{ xPos: 50, occupied: false },
		{ xPos: 150, occupied: false },
		{ xPos: 250, occupied: false },
		{ xPos: 350, occupied: false },
		{ xPos: 450, occupied: false }
	];
	
	function randomPos() {
	
		// generate a random number between 0 and 4
		var possibleSpot = Math.round(Math.random() * 4);
		
		while (positions[possibleSpot].occupied) {
			// if a position is already occupied, keep trying
			possibleSpot = Math.round(Math.random() * 4);
		}
		
		return possibleSpot;
	}
	
	function hitDuck(obj) {
		var indexPos = $(obj).data("pos");
		
		$(obj).removeClass("create").addClass("hit");
		
		positions[indexPos].occupied = false;
		
		window.setTimeout(function() {
			$(obj).remove();
			createDuck();
		}, 1000);
	}
	
	function createDuck() {
		var indexPos = randomPos();
		var duckPos = positions[indexPos].xPos;
		positions[indexPos].occupied = true;
		
		$("<div class='duck' />")
			.data("pos",indexPos)
			.css("left", duckPos)
			.click(function() {
				DuckHunt.hitDuck(this);
			})
			.appendTo("#mask");
			
		window.setTimeout(function() {
			$(".duck:not(.create):not(.hit)").addClass("create");
		}, 1000);
		
	}
	
	function init() {
		
		// create the first 3 ducks		
		createDuck();
		createDuck();
		createDuck();
		
	}
	
	$(function() {
		// self initialise on DOM ready
		DuckHunt.init();
	});
	
	return {
		init: init,
		createDuck: createDuck,
		hitDuck: hitDuck
	}
	
})();