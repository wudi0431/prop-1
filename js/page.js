define(['FFF'], function (FFF) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function Page() {
        Widget.apply(this, arguments);
    }

    Page.ATTRS = {
        boundingBox: {
            value: $('<div class="W_wx_page"></div>')
        }
    };


    F.extend(Page, Widget, {
        renderUI: function () {
            var that = this;

        },
        bindUI: function () {
            var that = this;


        }
    });

    return {
        Page: Page
    };
});