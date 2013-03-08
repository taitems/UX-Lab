jQuery.fn.toggleSwitch = function (params) {

    var defaults = {
        highlight: true,
        width: 25,
        change: null
    };

    var options = $.extend({}, defaults, params);

    return $(this).each(function (i, item) {
        generateToggle(item);
    });

    function generateToggle(selectObj) {

        // create containing element
        var $contain = $("<div />").addClass("ui-toggle-switch");

        // generate labels
        $(selectObj).find("option").each(function (i, item) {
            $contain.append("<label>" + $(item).text() + "</label>");
        }).end().addClass("ui-toggle-switch");
        
        $(selectObj).hide();
		// add pointer to the original object
		$contain.data("select", selectObj);

        // generate slider with established options
        var $slider = $("<div />").slider({
            min: 0,
            max: 100,
            animate: "fast",
            change: options.change,
            stop: function (e, ui) {
                var roundedVal = Math.round(ui.value / 100);
                var self = this;
                window.setTimeout(function () {
                    toggleValue(self.parentNode, roundedVal, false);
                }, 11);
            },
            range: (options.highlight && !$(selectObj).data("hideHighlight")) ? "max" : null
        }).width(options.width);

        // put slider in the middle
        $slider.insertAfter(
            $contain.children().eq(0)
		);

        // bind interaction
        $contain.delegate("label", "click", function () {
            if ($(this).hasClass("ui-state-active")) {
                return;
            }
            // prevent change for disabled objects
        	if($(selectObj).is(":disabled")) {
        		return;
        	}
        	
            var labelIndex = ($(this).is(":first-child")) ? 0 : 1;
            toggleValue(this.parentNode, labelIndex, false);
        });

        /**
         * @param slideContain {object} the slide container
         * @param index {number} the index to set
         * @param ignoreEqual {boolean} true if this is the initialization call (avoids qual check) 
         */
        function toggleValue(slideContain, index, ignoreEqual) {
            var $slideContain = $(slideContain), $parent = $($slideContain.data("select"));
            /* if this option was already selected, then do nothing */
            if (!ignoreEqual && $parent.find("option").eq(index).attr("selected")) {
                return;
            }
            $slideContain.find("label").eq(index).addClass("ui-state-active").siblings("label").removeClass("ui-state-active");
            $parent.find("option").attr("selected", false).eq(index).attr("selected", true);
            // avoid custom bubbling of events
            $parent.data().toggleValueChange = true;
            $parent.trigger("change");
            $parent.removeData("toggleValueChange");
            $slideContain.find(".ui-slider").slider("value", index * 100);
        }
        // check for disabled
    	if($(selectObj).is(":disabled")) {
    		$contain.find("label").addClass("ui-state-disabled");
    		$slider.addClass("ui-state-disabled");
    		$slider.slider( "option", "disabled", true );
    	}


        // initialise selected option
        var initialSelection = $contain.find("label").eq(selectObj.selectedIndex);
        toggleValue($contain, ($(initialSelection).is(":first-child")) ? 0 : 1, true);

        // add to DOM
        $(selectObj).before($contain);
        
        // toggle value on change of select
        $(selectObj).change(function(){
        	// check if we should ignore this change (because toggleValue called it)
        	if($(this).data().toggleValueChange)
        		return;
        	
            var selection = $contain.find("label").eq(this.selectedIndex);
            toggleValue($contain, ($(selection).is(":first-child")) ? 0 : 1, true);
            
            // update disable
        	if($(selectObj).is(":disabled")) {
        		$contain.find("label").addClass("ui-state-disabled");
        		$slider.addClass("ui-state-disabled");
        		$slider.slider( "option", "disabled", true );
        	} else {
        		$contain.find("label").removeClass("ui-state-disabled");
        		$slider.removeClass("ui-state-disabled");
        		$slider.slider( "option", "disabled", false );
        	}
        });

    }
};