/**
 * TabControl : js 实现tab切换
 * @author richard chen
 * @date 2014-06-16
 * @version 1.0
 * @参数 opt{} 可选值
 *   tabBars：tab控制按钮
 *   tabPages：tab切换页面
 *   autoPlay：是否自动切换，默认false
 *   interval：自动切换时间间隔(ms)，默认3000
 *   switchEvent：切换触发事件[ hover | click ]
 *   before：切换前回调函数
 *   after：切换后回调函数
 *   index：当前选中的项，默认为0
 */
var TabControl = function(opt) {
    return new TabControl.prototype.init(opt);
};

TabControl.prototype = {
    constructor: TabControl,

    bindEvents: function() {
        var _this = this,
            i,
            len = this.tabBars.length,
            parent = this.tabBars[0].parentNode;

        for(i = 0; i < len; i++) {
            if(this.switchEvent == "hover") {
                (function(i) {
                    _this.addEvent(_this.tabBars[i], 'mouseover', function() {
                        _this.change(i);
                    });
                })(i);

            } else if(this.switchEvent == "click") {
                (function(i) {
                    _this.addEvent(_this.tabBars[i], 'click', function() {
                        _this.change(i);
                    });
                })(i);
            }
        }

        _this.addEvent(parent, 'mouseenter', function() {
            _this.stop();
        });

        _this.addEvent(parent, 'mouseleave', function() {
            _this.autoPlay && _this.startPlay();
        });
    },
    change: function (index) {
        var i,
            len = this.tabBars.length;

        this.before && this.before(index);

        for(i = 0; i < len; i++) {
            if(i == index) {
                this.addClass(this.tabBars[i], "active");
                this.tabPages[i].style.display = "block";
            } else {
                this.removeClass(this.tabBars[i], "active");
                this.tabPages[i].style.display = "none";
            }
            //设置当前选中的项
            this.index = index;
        }

        this.after && this.after(index);
    },
    startPlay: function () {
        var len = this.tabBars.length;
        var _this = this;

        this.timer = setInterval(function() {
            var i = _this.index  < len - 1 ? _this.index + 1 : 0 
            _this.change(i);
        }, this.interval);
    },
    stop: function() {
        clearInterval(this.timer);
    },
    extend: function(opt, target) {
        for(name in opt) {
            target[name] = opt[name];
        }
    },
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = hanlder;
        }
    },
    addClass: function(elem, value) {
        var cur = elem.className ? (" " + elem.className + " ") : " ";

        if(cur.indexOf(" " + value + " ") < 0) {
            cur += value + " ";
        }
        elem.className = this.trim(cur);
    },
    removeClass: function(elem, value) {
        var cur = elem.className ? (" " + elem.className + " ") : " ";

        if(cur.indexOf(" " + value + " ") >= 0) {
            cur = cur.replace(" " + value + " ", " ");
        }
        elem.className = this.trim(cur);
    },
    trim: function(text) {
        return text.replace(/^\s|\s$/g, "");
    }
};

TabControl.prototype.init = function(opt) {
    // tab控制按钮
    this.tabBars = null;
    // tab切换页面
    this.tabPages = null;
    // 是否自动切换，默认false
    this.autoPlay = false;
    // 自动切换时间间隔(ms)，默认3000
    this.interval = 3000;
    // 切换触发事件[ hover | click ]
    this.switchEvent = 'hover';
    // 切换前回调函数
    this.before = null;
    // 切换后回调函数
    this.after = null;
    //当前选中的项，默认为0
    this.index = 0;
    //自动切换的计时器
    this.timer = null;

    this.extend(opt, this);

    this.bindEvents();
    
    this.change(this.index);

    this.autoPlay && this.startPlay();
};

TabControl.prototype.init.prototype = TabControl.prototype;