/*global $,jQuery*/

(function($) {

    "use strict";

    $.footnotes = function(element, selector) {

        var defaults = {
            selector: "sup"
        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element);

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults);

            if (selector) {
                plugin.settings.selector = selector;
            }

            if (!$element.length) {
                $element = $(plugin.settings.selector);
            }

            $element
                .addClass("bootstrap-footnote")
                .each(function(i,item) {
                    $(item).popover({
                        html: true,
                        title: null,
                        content: $(this).data("text"),
                        placement: "top"
                    });
                });


        };

        plugin.init();

    };

    $.fn.footnotes = function(options) {

        return this.each(function() {
            if (undefined === $(this).data('footnotes')) {
                var plugin = new $.footnotes(this, options);
                $(this).data('footnotes', plugin);
            }
        });

    };

})(jQuery);