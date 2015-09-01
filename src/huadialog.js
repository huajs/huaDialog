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
     * 支持模块输出 commonjs
     * */
    if(define){
        define(function(require, exports, module) {
            module.exports=huadialog;
        });
    }


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

    /**
     * 提示（alert）弹出框
     * @param string   {String}   提示字符串
     * @param ok       {String | Function}   确定回调函数
     * @param cancel   {String | Function}   取消回调函数
     * @param isLocked {Boolean}  是否显示遮罩层,默认为true
     * @param zIndex   {Number}   弹层的zIndex值,默认为1024
     * @return {Boolean}   确定返回true,否则返回false
     */
    huadialog.prompt = function (string, ok, cancel, isLocked, zIndex) {
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

    //默认配置信息
    huadialog.defaultOptions = {
        //标题
        title: '消息',

        //内容
        content: '&nbsp;',

        //宽度
        width: 'auto',

        //高度
        height: 'auto',

        //弹框背景的背景色
        backdropBackground: '#000',

        //弹框背景的透明度
        backdropOpacity: '0.3',

        //是否显示弹框背景
        locked: false,

        //状态栏内容
        statusbar: '',

        //确认按钮回调方法
        //ok: null,

        //取消按钮回调方法
        //cancel: null,

        //确定按钮的值
        okValue: '确定',

        //取消按钮的值
        cancelValue: '取消',

        //是否显示关闭按钮
        closeBtn: true,

        //css 中 z-index值
        zIndex: 1024,

        //html结构码
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
        var options = huadialog.defaultOptions, popupBox, backDropBox, center, textInput,_$;
        //对话框居中函数
        center = function () {
            var top = ($(window).height() - popupBox.height()) / 2;
            var left = ($(window).width() - popupBox.width()) / 2;
            popupBox.css({top: top > 0 ? top : 0 + "px", left: left > 0 ? left : 0 + "px"});
        };
        //hua-dialog对象获取
        _$=function(ele){
                return typeof ele =='string' ? popupBox.find('[data-hua=dialog-'+ele+']'):popupBox.find('[data-hua=dialog]');
        };
        //弹框对象
        popupBox = $('<div>')
            .css({position: 'absolute', 'z-index': (userOptions.zIndex || 1024) + 1})
            .html(options.innderHTML).appendTo('body');


        if (userOptions.isLocked !== false) {
            //弹框背景对象
            backDropBox = $('<div>').addClass('huadialog-backbox').css({'z-index': (userOptions.zIndex || 1024)}).appendTo('body').show();
        }

        //弹框内容填充
        if (userOptions.type !== 'prompt') {
            _$('content').text(userOptions.string).css({minWidth: '300px'});

        }
        else {
            textInput = $('<input>').addClass('dialog-prompt-input').val(userOptions.string ? userOptions.string : "");
            var textInputWrap = $('<div>').append(textInput);
            _$('content').append(textInputWrap).css({minWidth: '300px'});
        }


        _$().addClass('huadialog-show');
        _$('title').text('提示');

        //隐藏取消按钮
        if (userOptions.type == 'alert') {
            _$('cancel').hide();
        }
        else {
            _$('cancel').text(options.cancelValue);
        }

        //确定按钮点击事件
        _$('ok').text(options.okValue)
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
        //取消按钮点击事件
        _$('cancel').on('click', function () {
                if (typeof userOptions.cancel == 'function') {
                    userOptions.cancel();
                }
                popupBox.remove();
                backDropBox.remove();
            });

        center();

        //窗口大小变化事件
        $(window).on('resize', function () {
            center();
        });

        //关闭按钮点击事件
        popupBox.find('[data-hua=dialog-close]').on('click', function () {
            popupBox.remove();
            backDropBox.remove();
        });
    };

    //自定义弹框对象
    huadialog.create = function (options) {
        var body,self;
        body = $('body');
        self=this;

        //获取配置信息
        this.options = options;

        //设置弹框对象
        this.popupBox = $('<div>')
            .css({position: 'absolute', 'z-index': (this.options.zIndex || 1024) + 1})
            .html(options.innderHTML).appendTo(body);

        //设置弹框背景对象
        this.backDropBox = $('<div>').addClass('huadialog-backbox').css({'z-index': (this.options.zIndex || 1024)})
            .appendTo(body);

        //定义事件列表
        this.event = {
            show: [],
            close: [],
            remove: [],
            okClick: [],
            cancelClick: []
        };

        //读取并使用配置信息
        $.each(options, function (key, value) {
            if (typeof self[key] === 'function') {
                self[key](value);
            }
        });

        //定义关闭按钮点击事件
        this._$('dialog-close').on('click', function () {
            self.close().remove();
        });

        //定义确定按钮点击事件
        this._$('dialog-ok').on('click', function () {
            if (self.triggerEvent('okClick') !== false)
                self.close().remove();
        });

        //定义取消按钮点击事件
        this._$('dialog-cancel').on('click', function () {
            if (self.triggerEvent('cancelClick') !== false)
                self.close().remove();
        });

        //定义窗口大小改变事件
        $(window).on('resize', function () {
            self.center();
        });
    };
    var prototype = huadialog.create.prototype;
    $.extend(prototype, {

        //显示弹框
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

        //设置弹框标题
        title: function (title) {
            if (typeof title === 'string') {
                this._$('dialog-title').text(title);
            }
        },

        //设置弹框内容,可以为字符串,也可以为html对象
        content: function (html) {
            if (typeof html === 'string')
                this._$('dialog-content').html(html);
            if (typeof html === 'object') {
                this._$('dialog-content').empty().append(html);
            }
        },

        //设置弹框宽度
        width: function (width) {
            this._$('dialog-content').width(width);
            return this;
        },

        //设置弹框高度
        height: function (height) {
            this._$('dialog-content').height(height);
            return this;
        },

        //设置状态信息,可以为字符串,也可以为html对象
        statusbar: function (html) {
            if (typeof html === 'string')
                this._$('dialog-status').html(html);
            if (typeof html === 'object') {
                this._$('dialog-status').empty().append(html);
            }
        },

        //设置弹框背景的背景色
        backdropBackground: function (color) {
            this.backDropBox.css({background: color});
            return this;
        },

        //设置弹框背景的透明度
        backdropOpacity: function (opacity) {
            var ie = "alpha(opacity=" + parseInt(opacity * 100) + ")";
            this.backDropBox.css({opacity: opacity, filter: ie});
            return this;
        },

        //设置是否显示关闭按钮
        closeBtn: function (value) {
            if (value) {
                this._$('dialog-close').show();
            }
            else {
                this._$('dialog-close').hide();
            }
            return this;
        },

        //为确定按钮添加事件监听
        ok: function (fn) {
            this.addEventListener('okClick', fn);
            return this;
        },

        //为取消按钮添加事件监听
        cancel: function (fn) {
            this.addEventListener('cancelClick', fn);
            return this;
        },

        //设置确定按钮的值
        okValue: function (value) {
            if (typeof value === 'string') {
                this._$('dialog-ok').text(value);
            }
            else {
                this._$('dialog-ok').text(huadialog.defaultOptions.okValue);
            }
            return this;
        },

        //设置取消按钮的值
        cancelValue: function (value) {
            if (typeof value === 'string') {
                this._$('dialog-cancel').text(value);
            }
            else {
                this._$('dialog-cancel').text(huadialog.defaultOptions.cancelValue);
            }
            return this;
        },

        //获取huadialog对象
        _$: function (value) {
            return this.popupBox.find('[data-hua=' + value + ']');
        },

        //关闭弹框
        close: function () {
            this.popupBox.hide();
            this.backDropBox.hide();
            this.triggerEvent('close');
            return this;
        },

        //移除弹框
        remove: function () {
            this.popupBox.remove();
            this.backDropBox.remove();
            this.triggerEvent('remove');
            return this;
        },

        //弹框居中
        center: function () {
            var top = ($(window).height() - this.popupBox.height()) / 2;
            var left = ($(window).width() - this.popupBox.width()) / 2;
            this.popupBox.css({top: top > 0 ? top : 0 + "px", left: left > 0 ? left : 0 + "px"});
            return this;
        },

        //添加自定义事件
        addEventListener: function (name, fn) {
            if (this.event[name] && $.isArray(this.event[name])) {
                this.event[name].push(fn);
            }
        },

        //触发自定义事件
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