//noinspection BadExpressionStatementJS
!(function () {

    /*
    * 定义对话框对象
    * */
    var huadialog = function (options) {
        var options = $.extend(huadialog.defaultOptions, options);


        return new huadialog.create(options);
    };

    /**
     * 支持模块输出 requirejs,seajs
     * */
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = huadialog;
        }
        exports.huadialog = huadialog;
    }


    /**
     * 提示（alert）弹出框
     * @param string   {String}   提示字符串
     * @param isLocked {Boolean}  是否显示遮罩层,默认为true
     * @param zIndex   {Number}   弹层的zIndex值,默认为1024
     * @return 无返回值
     */
    huadialog.alert = function (string, isLocked, zIndex) {
        var options = {};
        if (typeof string === 'object') {
            options = string;
        }
        else {
            options.string = string;
            options.isLocked = isLocked;
            options.zIndex = zIndex;
        }
        options.type = 'alert';
        huadialog.express(options);
    };
    /**
     * 提示（alert）弹出框
     * @param string   {String}   提示字符串
     * @param ok       {String | Function}   确定回调函数
     * @param cancel   {String | Function}   取消回调函数
     * @param isLocked {Boolean}  是否显示遮罩层,默认为true
     * @param zIndex   {Number}   弹层的zIndex值,默认为1024
     * @return {Boolean}   确定返回true,否则返回false
     */
    huadialog.confirm = function (string, ok, cancel, isLocked, zIndex) {
        var options = {};
        if (typeof string === 'object') {
            options = string;
        }
        else {
            options.string = string;
            options.ok = ok;
            options.cancel = cancel;
            options.isLocked = isLocked;
            options.zIndex = zIndex;
        }
        options.type = 'confirm';
        huadialog.express(options);

    };
    huadialog.prompt = function (string, ok, cancel, defaultValue, isLocked, zIndex) {
        var options = {};
        if (typeof string === 'object') {
            options = string;
        }
        else {
            options.string = string;
            options.ok = ok;
            options.cancel = cancel;
            options.defaultValue = defaultValue;
            options.isLocked = isLocked;
            options.zIndex = zIndex;
        }
        options.type = 'prompt';
        huadialog.express(options);
    };

    huadialog.defaultOptions = {
        //璁剧疆瀵硅瘽妗嗘爣棰�
        title: '消息',

        //璁剧疆瀵硅瘽妗嗗唴瀹�
        content: '&nbsp;',

        //璁剧疆瀵硅瘽妗嗗搴�
        width: 'auto',

        //璁剧疆瀵硅瘽妗嗛珮搴�
        height: 'auto',

        //璁剧疆瀵硅瘽妗嗚儗鏅�
        backdropBackground: '#000',

        //璁剧疆瀵硅瘽妗嗚儗鏅�忔槑搴�
        backgropOpacity: '0.6',

        //鏄惁瀵硅瘽妗嗘樉绀鸿儗鏅�
        locked: false,

        //鐘舵�佹爮淇℃伅
        statusbar: '',

        //纭鎸夐挳鍥炴帀鍑芥暟
        ok: null,

        //鍙栨秷鎸夐挳鍥炴帀鍑芥暟
        cancel: null,

        //纭鎸夐挳鏂囨湰鍊�
        okValue: '确定',

        //鍙栨秷鎸夐挳鏂囨湰鍊�
        cancelValue: '取消',

        //鏄惁鏄剧ず鍏抽棴鎸夐挳
        closeBtn: true,

        //榛樿css鐨剒Index鍊�
        zIndex: 1024,
        //瀵硅瘽妗嗙粨鏋勪唬鐮�(涓嶅彲閰嶇疆)
        innderHTML: '<div data-hua="dialog" class="huadialog">' +
        '<table data-hua="dialog-table" class="huadialog-table">' +
        '<tr>' +
        '<td data-hua="dialog-header" class="huadialog-header">' +
        '<button data-hua="dialog-close" class="huadialog-close">&#215;</button>' +
        '<div data-hua="dialog-title" class="huadialog-title">&nbsp;</div>' +
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
        '<div data-hua="dialog-buttons" class="huadialog-buttons">' +
        '<button data-hua="dialog-ok" class="huadialog-buttons-ok"></button>' +
        '<button data-hua="dialog-cancel"></button>' +
        '</div>' +
        '</td>' +
        '</tr>' +
        '</table>' +
        '</div>'


    };
    huadialog.express = function (userOptions) {
        var options = huadialog.defaultOptions, popupBox, backDropBox, center, textInput;
        center = function () {
            var top = ($(window).height() - popupBox.height()) / 2;
            var left = ($(window).width() - popupBox.width()) / 2;
            popupBox.css({top: top > 0 ? top : 0 + "px", left: left > 0 ? left : 0 + "px"});
        };
        popupBox = $('<div>')
            .css({position: 'absolute', 'z-index': (userOptions.zIndex || 1024) + 1})
            .html(options.innderHTML).appendTo('body');

        if (userOptions.isLocked !== false) {
            backDropBox = $('<div>').addClass('huadialog-backbox').css({'z-index': (userOptions.zIndex || 1024)}).appendTo('body').show();
        }

        if (userOptions.type !== 'prompt') {
            popupBox.find('[data-hua=dialog-content]').text(userOptions.string).css({minWidth: '300px'});

        }
        else {
            textInput = $('<input>').addClass('dialog-prompt-input').val(userOptions.string ? userOptions.string : "");
            var textInputWrap = $('<div>').append(textInput);
            popupBox.find('[data-hua=dialog-content]').append(textInputWrap).css({minWidth: '300px'});
        }
        popupBox.find('[data-hua=dialog]').addClass('huadialog-show');
        popupBox.find('[data-hua=dialog-title]').text('提示');
        if (userOptions.type == 'alert') {
            popupBox.find('[data-hua=dialog-cancel]').hide();
        }
        else {
            popupBox.find('[data-hua=dialog-cancel]').text(options.cancelValue);
        }
        popupBox.find('[data-hua=dialog-ok]').text(options.okValue)
            .on('click', function () {
                if (typeof userOptions.ok == 'function') {
                    userOptions.ok(userOptions.type == 'prompt' ? textInput.val() : false);
                }
                if (typeof userOptions.cancel == 'function') {
                    userOptions.cancel();
                }

                popupBox.remove();
                backDropBox.remove();
            });

        center();
        $(window).on('resize', function () {
            center();
        });
        popupBox.find('[data-hua=dialog-close]').on('click', function () {
            popupBox.remove();
            backDropBox.remove();
        });
    };

    huadialog.create = function (options) {
        var body = $('body');
        var self = this;
        this.options = options;
        this.popupBox = $('<div>')
            .css({position: 'absolute', 'z-index': (this.options.zIndex || 1024) + 1})
            .html(options.innderHTML).appendTo(body);
        this.backDropBox = $('<div>').addClass('huadialog-backbox').css({'z-index': (this.options.zIndex || 1024)})
            .appendTo(body);
        this.event = {
            show: [],
            close: [],
            remove: [],
            okClick: [],
            cancelClick: []
        };
        $.each(options, function (key, value) {
            if (typeof self[key] === 'function') {
                self[key](value);
            }
        });

        this._$('dialog-close').on('click', function () {
            self.close().remove();
        });
        this._$('dialog-ok').on('click', function () {
            if (self.triggerEvent('okClick') !== false)
                self.close().remove();
        });
        this._$('dialog-cancel').on('click', function () {
            if (self.triggerEvent('cancelClick') !== false)
                self.close().remove();
        });
        $(window).on('resize', function () {
            self.center();
        });
    };
    var prototype = huadialog.create.prototype;
    $.extend(prototype, {

        show: function () {
            this.center();
            this.popupBox.show();
            if (this.options.locked) {
                this.backDropBox.show();
            }
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
        statusbar: function (html) {
            if (typeof html === 'string')
                this._$('dialog-status').html(html);
            if (typeof html === 'object') {
                this._$('dialog-status').empty().append(html);
            }
        },
        backdropBackground: function (color) {
            this.backDropBox.css({background: color});
            return this;
        },
        backdropOpacity: function (opacity) {
            var ie = "alpha(opacity=" + parseInt(opacity * 100) + ")";
            this.backDropBox.css({opacity: opacity, filter: ie});
            return this;
        },
        closeBtn: function (value) {
            if (value) {
                this._$('dialog-close').hide();
            }
            else {
                this._$('dialog-close').show();
            }
            return this;
        },
        ok: function (fn) {
            this.addEventListener('okClick', fn);
            return this;
        },
        cancel: function (fn) {
            this.addEventListener('cancelClick', fn);
            return this;
        },
        okValue: function (value) {
            if (typeof value === 'string') {
                this._$('dialog-ok').text(value);
            }
            else {
                this._$('dialog-ok').text(huadialog.defaultOptions.okValue);
            }
            return this;
        },
        cancelValue: function (value) {
            if (typeof value === 'string') {
                this._$('dialog-cancel').text(value);
            }
            else {
                this._$('dialog-cancel').text(huadialog.defaultOptions.cancelValue);
            }
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
        addEventListener: function (name, fn) {
            if (this.event[name] && $.isArray(this.event[name])) {
                this.event[name].push(fn);
            }
        },
        triggerEvent: function (name) {
            var reValue;
            $.each(this.event[name], function (key, value) {
                return reValue = value();
            });
            return reValue;
        }
    });

    window.huadialog = huadialog;
    return huadialog;
})();