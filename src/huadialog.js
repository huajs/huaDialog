//noinspection BadExpressionStatementJS
!(function () {

    var huadialog = function (options) {
        var options = $.extend(huadialog.defaultOptions, options);


        return new huadialog.create(options);
    };
    huadialog.defaultOptions = {
        //设置对话框标题
        title: '消息',

        //设置对话框内容
        content: '&nbsp;',

        //设置对话框宽度
        width: 'auto',

        //设置对话框高度
        height: '',

        //设置对话框背景
        backdropBackground: '#000',

        //设置对话框背景透明度
        backgropOpacity: '0.6',

        //是否对话框显示背景
        locked: false,

        //状态栏信息
        statusbar: '',

        //确认按钮回掉函数
        ok: null,

        //取消按钮回掉函数
        cancel: null,

        //确认按钮文本值
        okValue: '确定',

        //取消按钮文本值
        cancelValue: '取消',

        //是否显示关闭按钮
        closeBtn: true,

        //默认css的zIndex值
        zIndex: 1024,
        //对话框结构代码(不可配置)
        innderHTML: '<div data-hua="dialog" class="huadialog">' +
        '<table data-hua="dialog-table" class="huadialog-table">' +
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
        '</div>'


    };

    huadialog.create = function (options) {
        var body = $('body');
        var self = this;
        huadialog.zIndex = options.zIndex || 1024;
        this.popupBox = $('<div>')
            .css({position: 'absolute', 'z-index': huadialog.zIndex + 1})
            .html(options.innderHTML).appendTo(body);
        this.backDropBox = $('<div>').addClass('huadialog-backbox').css({'z-index': huadialog.zIndex})
            .appendTo(body);

        $.each(options, function (key, value) {
            if (typeof self[key] === 'function') {
                self[key](value);
            }

        });
        this.event={
            show:[],
            close:[],
            remove:[]
        };

        this._$('dialog-close').on('click', function () {
            self.close().remove();
        });
    };
    var prototype = huadialog.create.prototype;
    $.extend(prototype, {

        show: function () {
            this.center();
            this.popupBox.show();
            this.backDropBox.show();
            this._$('dialog').addClass('huadialog-show');
            this.triggerEvent('show');

            return this;
        },
        title: function (title) {
            if (typeof title === 'string') {
                this._$('dialog-title').text(title);
            }
        },

        content: function (html) {
            if (typeof html === 'string')
                this._$('dialog-content').html(html);
            if (typeof html === 'object') {
                this._$('dialog-content').empty().append(html);
            }
        },
        width: function (width) {
            this._$('dialog-content').width(width);
            return this;
        },

        height: function (height) {
            this._$('dialog-content').height(height);
            return this;
        },
        _$: function (value) {
            return this.popupBox.find('[data-hua=' + value + ']');
        },
        close: function () {
            this.popupBox.hide();
            this.backDropBox.hide();
            this.triggerEvent('close');
            return this;
        },
        remove: function () {
            this.popupBox.remove();
            this.backDropBox.remove();
            this.triggerEvent('remove');
            return this;
        },
        center: function () {
            var top = ($(window).height() - this.popupBox.height()) / 2;
            var left = ($(window).width() - this.popupBox.width()) / 2;
            this.popupBox.css({top: top > 0 ? top : 0 + "px", left: left > 0 ? left : 0 + "px"});
            return this;
        },
        addEventListener:function(name,fn){
            if(this.event[name] && $.isArray(this.event[name])){
                this.event[name].push(fn);
            }
        },
        triggerEvent:function(name){
            $.each(this.event[name],function(key,value){
                value();
            });
        }
    });

    window.huadialog = huadialog;
    return huadialog;
})();