!(function () {

    var huadialog = function (options) {
        //Ĭ������
        var defaultOptions = {
            theme: 'default',
            html:
            '<div data-hua="dialog" class="huadialog">' +
                '<table>' +
                    '<tr>' +
                        '<td data-hua="dialog-header" class="huadialog-header">' +
                            '<button data-hua="dialog-close" class="huadialog-close">&#215;</button>' +
                            '<div data-hua="dialog-title" class="huadialog-title"></div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td data-hua="dialog-body" class="huadialog-body">' +
                            '<div data-hua="dialog-content" class="huadialog-content"></div>' +
                        '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<td data-hua="dialog-footer" class="huadialog-footer">' +
                             '<div data-hua="dialog-status" class="huadialog-status"></div>' +
                             '<div data-hua="dialog-buttons" class="huadialog-buttons"></div>' +
                        '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>',


        };
    };


    return huadialog;
});