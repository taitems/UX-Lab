$(function() {

    if (typeof prettyPrint === "function") {
        prettyPrint();
    }

    if (typeof jQuery.fn.toggleSwitch === "function") {

        $("#on-off").toggleSwitch();

        $("#gender").toggleSwitch({
            highlight: false
        });

    }

});