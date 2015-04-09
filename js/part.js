define(['FFF'], function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Part() {
        Widget.apply(this, arguments);
    }

    Part.ATTRS = {
        boundingBox: {
            value: $('<div class="W_Part"></div>')
        }
    };


    F.extend(Part, Widget, {
        renderUI: function () {
            var that = this;

        },
        bindUI: function () {
            var that = this;


        }
    });

    return {
        Part: Part
    };
});