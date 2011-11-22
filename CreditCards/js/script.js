$(function() {

	$("#cardNumber").bind("keyup", function() {
	
		var firstCharacter = this.value.charAt(0);
		
		var activeCard = null;
		
		switch (firstCharacter) {
		
			case "5":
				activeCard = "mastercard";
				break;
				
			case "4":
				activeCard = "visa";
				break;
				
			case "3":
				activeCard = "amex";
				break;
		
		}
		
		console.log(activeCard);
		
		if (activeCard !== null) {
		
			$("#"+activeCard).addClass("active").siblings().removeClass();
		
		} else {
		
			$("#cards div").removeClass();
		
		}
	
	});
	
});