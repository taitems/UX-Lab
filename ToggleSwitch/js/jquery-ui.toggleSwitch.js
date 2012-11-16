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
                    toggleValue(self.parentNode, roundedVal);
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
            var labelIndex = ($(this).is(":first-child")) ? 0 : 1;
            toggleValue(this.parentNode, labelIndex);
        });

        function toggleValue(slideContain, index) {
            var $slideContain = $(slideContain), $parent = $slideContain.parent();
            /* if this option was already selected, then do nothing */
            if ($parent.find("option").eq(index).attr("selected")) {
                return;
            }
            $slideContain.find("label").eq(index).addClass("ui-state-active").siblings("label").removeClass("ui-state-active");
            $parent.find("option").attr("selected", false).eq(index).attr("selected", true);
            $parent.find("select").trigger("change");
            $slideContain.find(".ui-slider").slider("value", index * 100);
        }

        // initialise selected option
        $contain.find("label").eq(selectObj.selectedIndex).click();

        // add to DOM
        $(selectObj).parent().append($contain);

    }
};
