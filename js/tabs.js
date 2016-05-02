/**************************************************************************
*	@name		    Zozo UI Tabs
*	@descripton	    Create awesome tabbed content area
*	@version	    6.5
*   @Licenses: 	    http://codecanyon.net/licenses/
*   @requires       jQuery v1.7 or later
*	@copyright      Copyright (c) 2013 Zozo UI
*   @author         Zozo UI
*   @URL:           http://www.zozoui.com
* This files should be not used in production.
***************************************************************************/


/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 **/
; (function (a) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

; (function ($, window, document, undefined) {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };

    $.fn.extend({
        hasClasses: function (selectors) {
            var _base = this;
            for (i in selectors) {
                if ($(_base).hasClass(selectors[i]))
                    return true;
            }
            return false;
        }
    });

    $.zozo = {};
    $.zozo.core = {};
    $.zozo.core.console = {
        debug: false,
        log: function (message) {
            if ($("#zozo-console").length != 0) {
                $("<div/>")
                .css({ marginTop: -24 })
                .html(message)
                .prependTo("#zozo-console")
                .animate({ marginTop: 0 }, 300)
                .animate({ backgroundColor: "#ffffff" }, 800);
            }
            else {
                if (console && this.debug === true) {
                    console.log(message);
                }
            }
        }
    };


    $.zozo.core.content = {
        debug: false,
        video: function (_content) {
            if (_content) {
                _content.find("iframe").each(function () {
                    var _iframeSrc = $(this).attr('src');
                    var wmode = "wmode=transparent";
                    if (_iframeSrc && _iframeSrc.indexOf(wmode) === -1) {
                        if (_iframeSrc.indexOf('?') != -1) $(this).attr('src', _iframeSrc + '&' + wmode);
                        else $(this).attr('src', _iframeSrc + '?' + wmode);
                    }
                });
            }
        },
        check: function (_content) {
            this.video(_content);
        }
    };

    $.zozo.core.keyCodes = {
        tab: 9,
        enter: 13,
        esc: 27,

        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,

        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    $.zozo.core.debug = {
        startTime: new Date(),
        log: function (msg) {
            if (console) {
                console.log(msg);
            }
        },
        start: function () {
            this.startTime = +new Date();
            this.log("start: " + this.startTime);
        },
        stop: function () {
            var _end = +new Date();
            var _diff = _end - this.startTime;

            this.log("end: " + _end);
            this.log("diff: " + _diff);

            var Seconds_from_T1_to_T2 = _diff / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

            //this.log("diff s: " + Seconds_Between_Dates);
        }
    };

    $.zozo.core.support = {
        is_mouse_present: function () {
            return (('onmousedown' in window) && ('onmouseup' in window) && ('onmousemove' in window) && ('onclick' in window) && ('ondblclick' in window) && ('onmousemove' in window) && ('onmouseover' in window) && ('onmouseout' in window) && ('oncontextmenu' in window));
        },
        is_touch_device: function () {
            return (('ontouchstart' in window) ||   // html5 browsers
             (navigator.maxTouchPoints > 0) ||      // future IE
             (navigator.msMaxTouchPoints > 0)) &&   // current IE10
             (jQuery.browser.mobile);               // mobile browser
        },
        html5_storage: function () {
            try {//https://github.com/artberri/jquery-html5storage/blob/master/jquery.html5storage.js
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        },
        supportsCss: (function () {
            var div = document.createElement('div'), vendors = 'khtml ms o moz webkit'.split(' '), cssPre = false;
            return function (prop) {
                (prop in div.style) && (cssPre = prop)
                var propUp = prop.replace(/^[a-z]/, function (val) { return val.toUpperCase(); });
                $.each(vendors, function (index, value) {
                    (value + propUp in div.style) && (cssPre = '-' + value + '-' + prop);
                });
                return cssPre;
            };
        })(),
        css: {
            transition: false
        }
    };


    $.zozo.core.utils = {
        toArray: function (_object) {
            return $.map(_object, function (value, key) {
                return value;
            });
        },
        createHeader: function (_t, _c) {
            var _tab = $("<li><a>" + _t + "</a></li>");
            var _content = $("<div>" + _c + "</div>");

            return { tab: _tab, content: _content };
        },
        isEmpty: function (_str) {
            return (!_str || 0 === _str.length);
        },
        isNumber: function (_input) {
            return typeof _input === 'number' && isFinite(_input);
        },
        isEven: function (_number) {
            return _number % 2 === 0;
        },
        isOdd: function (_input) {
            return !(_number % 2 === 0);
        },
        animate: function (_base, _elem, _pre, _prop, _post, _hidePre) {
            var _duration = (_base.settings.animation.effects === "none") ? 0 : _base.settings.animation.duration;
            var _easing = _base.settings.animation.easing;
            var _transition = $.zozo.core.support.css.transition;

            if (_elem && _prop) {
                if (_pre) {
                    _elem.css(_pre);
                }

                /* moz transitions css transition fix*/
                var _prLeft = _elem.css("left");
                var _preTop = _elem.css("top");

                if (_base.settings.animation.type === "css") {
                    //pre animation
                    _prop[_transition] = "all " + _duration + "ms ease-in-out"

                    //animation
                    setTimeout(function () {
                        _elem.css(_prop);
                    });

                    //post animation                   
                    setTimeout(function () {
                        // _base.settings.animating = false;
                        if (_post) {
                            _elem.css(_post);
                        }
                        _elem.css(_transition, "");
                        //_container.removeClass(ANIMATINGCLASS);
                    }, _duration);
                }
                else {
                    //lem.show().animate(_prop, {
                    _elem.animate(_prop, {
                        duration: _duration,
                        easing: _easing,
                        complete: function () {
                            // _base.settings.animating = false;
                            if (_post) {
                                _elem.css(_post);
                            }
                            // _container.removeClass(ANIMATINGCLASS);
                            if (_hidePre) {
                                _elem.hide();
                            }
                        }
                    });
                }
            }

            return _base;
        }
    };

    $.zozo.core.plugins = {
        easing: function (_base) {
            var _exist = false;
            if (_base) {
                if (_base.settings) {
                    //set up a default value for easing
                    var _defEasing = 'swing';

                    // check for the existence of the easing plugin
                    if ($.easing.def) {
                        _exist = true;
                    }
                    else {
                        if (_base.settings.animation.easing != 'swing' && _base.settings.animation.easing != 'linear') {
                            _base.settings.animation.easing = _defEasing;
                        }
                    }
                }
            }
            return _exist;
        }
    };

    $.zozo.core.browser = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                           || this.searchVersion(navigator.appVersion)
                           || "an unknown version";

            $.zozo.core.console.log("init: " + this.browser + " : " + this.version);


            if (this.browser === "Explorer") {

                var _el = $("html");
                var version = parseInt(this.version);

                if (version === 6) {
                    _el.addClass("ie ie7");
                }
                else if (version === 7) {
                    _el.addClass("ie ie7");
                }
                else if (version === 8) {
                    _el.addClass("ie ie8");
                }
                else if (version === 9) {
                    _el.addClass("ie ie9");
                }
            }
        },
        isIE: function (_version) {
            if ($.zozo.core.utils.isNumber(_version)) {
                return (this.browser === "Explorer" && this.version <= _version)
            }
            else {
                return (this.browser === "Explorer")
            }
        },
        isChrome: function (_version) {
            if ($.zozo.core.utils.isNumber(_version)) {
                return (this.browser === "Chrome" && this.version <= _version)
            }
            else {
                return (this.browser === "Chrome")
            }
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1)
                return;
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            }, {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            }, {
                prop: window.opera,
                identity: "Opera"
            }, {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            }, {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            }
        ]
    };

    $.zozo.core.hashHelper = {
        mode: "single",
        separator: null,        
        all: function (_sep) {
            var hashArray = [];
            var hash = document.location.hash;

            if (!this.hasHash()) {
                return hashArray;
            }

            if (this.isSimple(_sep)) {
                return hash.substring(1);
            } else {
                hash = hash.substring(1).split('&');
                for (var i = 0; i < hash.length; i++) {
                    var match = hash[i].split(_sep);
                    //if (match.length != 2 || match[0] in hashArray) return undefined;
                    if (match.length != 2 || match[0] in hashArray) {
                        match[1] = "none";
                    }
                    hashArray[match[0]] = match[1];
                }
            }

            return hashArray;
        },
        get: function (key, _sep) {
            var all = this.all(_sep);
            if (this.isSimple(_sep)) {
                return all;
            } else {
                if (typeof all === 'undefined' || typeof all.length < 0) {
                    //self.log("get: undefined or null all");
                    return null;
                }
                else {
                    if (typeof all[key] !== 'undefined' && all[key] !== null) {
                        //self.log("get: exist key");
                        return all[key];
                    }
                    else {
                        //self.log("get: undefined or null key" + key);
                        return null;
                    }
                }
            }

        },
        set: function (key, value, _sep, _mod) {
            if (this.isSimple(_sep)) {
                document.location.hash = value;
            } else {
                if (_mod === "multiple") {                    
                    var all = this.all(_sep);
                    var hash = [];
                    all[key] = value;
                    for (var key in all) {
                        hash.push(key + _sep + all[key]);
                    }
                    document.location.hash = hash.join('&');
                } else {
                    document.location.hash = key + _sep + value;
                }
            }
        },
        isSimple: function (_sep) {
            if (!_sep  || _sep === "none") {
                return true;
            }
            else {
                return false;
            }
        },
        hasHash: function () {
            var hash = document.location.hash;
            if (hash.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };


    $.zozo.core.support.css.transition = $.zozo.core.support.supportsCss("transition");
    $.zozo.core.browser.init();

})(jQuery, window, document);

; (function ($) {
    $.event.special.ztap = {
        // Abort tap if touch moves further than 10 pixels in any direction
        distanceThreshold: 10,
        // Abort tap if touch lasts longer than half a second
        timeThreshold: 500,
        //isTouchSupported: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch,
        isTouchSupported: jQuery.zozo.core.support.is_touch_device(),
        setup: function (_event) {

            var self = this, _base = $(self);
            var originalEvent = "click";
            if (_event) {
                if (_event.data) {
                    originalEvent = _event.data;
                }
            }
            if ($.event.special.ztap.isTouchSupported) {
                // Bind touch start
                _base.on('touchstart', function (startEvent) {
                    // Save the target element of the start event
                    var target = startEvent.target,
                      touchStart = startEvent.originalEvent.touches[0],
                      startX = touchStart.pageX,
                      startY = touchStart.pageY,
                      threshold = $.event.special.ztap.distanceThreshold,
                      timeout;

                    function clearTapHandler() {
                        clearTimeout(timeout);
                        _base.off('touchmove', moveHandler).off('touchend', tapHandler);
                    };

                    function tapHandler(endEvent) {
                        clearTapHandler();

                        // When the touch end event fires, check if the target of the
                        // touch end is the same as the target of the start, and if
                        // so, fire a click.
                        if (target == endEvent.target) {
                            $.event.simulate('ztap', self, endEvent);
                        }
                    };

                    // Remove tap and move handlers if the touch moves too far
                    function moveHandler(moveEvent) {
                        var touchMove = moveEvent.originalEvent.touches[0],
                          moveX = touchMove.pageX,
                          moveY = touchMove.pageY;

                        if (Math.abs(moveX - startX) > threshold ||
                            Math.abs(moveY - startY) > threshold) {
                            clearTapHandler();
                        }
                    };

                    // Remove the tap and move handlers if the timeout expires
                    timeout = setTimeout(clearTapHandler, $.event.special.ztap.timeThreshold);

                    // When a touch starts, bind a touch end and touch move handler
                    _base.on('touchmove', moveHandler).on('touchend', tapHandler);
                });
            }
            else {
                // Bind click               
                _base.on(originalEvent, function (endEvent) {                    
                    $.event.simulate('ztap', self, endEvent);
                });
            }
        }
    };



})(jQuery);


;(function ($, window, document, undefined) {    

    if (window.zozo == null) {
        window.zozo = {};
    }

    var ZozoTabs = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = (this.$elem.data("options")) ? this.$elem.data("options") : {};
        this.attrdata = (this.$elem.data()) ? this.$elem.data() : {};
        this.tabID;
        this.$tabGroup;
        this.$mobileNav;
        this.$mobileDropdownArrow;
        this.$tabs;
        this.$container;
        this.$contents;
        this.autoplayIntervalId;
        this.resizeWindowIntervalId;
        this.currentTab;
        this.BrowserDetection = $.zozo.core.browser;
        this.Deeplinking = $.zozo.core.hashHelper;
        this.lastWindowHeight;
        this.lastWindowWidth;
        this.responsive;
    };

    var zozo = {
        pluginName: "zozoTabs",
        elementSpacer: "<span class='z-tab-spacer' style='clear: both;display: block;'></span>",
        commaRegExp: /,/g,
        space: " ",
        responsive: {
            largeDesktop: 1200,
            desktop: 960,
            tablet: 720,
            phone: 480
        },
        modes: {
            tabs: "tabs",
            stacked: "stacked",
            menu: "menu",
            slider: "slider"
        },
        states:{
            closed: "z-state-closed",
            open: "z-state-open",
            active: "z-state-active"
        },
        events: {
            click: "click",
            mousover: "mouseover",
            touchend: "touchend",
            touchstart: "touchstart",
            touchmove: "touchmove"
        },
        animation: {
            effects:{               
                fade: "fade",                
                none: "none",
                slideH: "slideH",
                slideV: "slideV",
                slideLeft: "slideLeft",
                slideRight: "slideRight",
                slideUp: "slideUp",
                slideUpDown: "slideUpDown",
                slideDown: "slideDown"
            },
            types: {
                css: "css",
                jquery: "jquery"
            }
        },
        classes: {
            prefix: "z-",
            wrapper: "z-tabs",
            tabGroup: "z-tabs-nav",
            tab: "z-tab",
            first: "z-first",
            last: "z-last",
            left: "z-left",
            right: "z-right",
            firstCol: "z-first-col",
            lastCol: "z-last-col",
            firstRow: "z-first-row",
            lastRow: "z-last-row",
            active: "z-active",
            link: "z-link",
            container: "z-container",
            content: "z-content",
            shadows: "z-shadows",
            bordered: "z-bordered",
            dark: "z-dark",
            spaced: "z-spaced",            
            rounded: "z-rounded",
            themes: [
                "gray",
                "black",
                "blue",
                "crystal",
                "green",
                "silver",
                "red",
                "orange",
                "deepblue",
                "white"
            ],
            flatThemes: [               
                "flat-turquoise",//1
                "flat-emerald",
                "flat-peter-river",
                "flat-amethyst",
                "flat-wet-asphalt",
                "flat-green-sea",//2
                "flat-nephritis",
                "flat-belize-hole",
                "flat-wisteria",
                "flat-midnight-blue",
                "flat-sun-flower",//3
                "flat-carrot",
                "flat-alizarin",                
                "flat-graphite",
                "flat-concrete",
                "flat-orange",//4
                "flat-pumpkin",
                "flat-pomegranate",
                "flat-silver",
                "flat-asbestos",
                "flat-zozo-red"
            ],
            styles: [
                 "contained",
                 "pills",
                 "underlined",
                 "clean",
                 "minimal"
            ],
            orientations: [
                "vertical",
                "horizontal"
            ],
            sizes: [
                "mini",
                "small",
                "medium",
                "large",
                "xlarge",
                "xxlarge"
            ],
            positions: {
                top: "top",
                topLeft: "top-left",
                topCenter: "top-center",
                topRight: "top-right",
                topCompact: "top-compact",
                bottom: "bottom",
                bottomLeft: "bottom-left",
                bottomCenter: "bottom-center",
                bottomRight: "bottom-right",
                bottomCompact: "bottom-compact"
            }
        }
    },
    FLATCLASS = "flat",
    READY = "ready",
    ERROR = "error",
    SELECT = "select",
    ACTIVATE = "activate",
    DEACTIVATE = "deactivate",
    HOVERCLASS = "hover",
    BEFORESEND = "beforeSend",
    CONTENTLOAD = "contentLoad",
    CONTENTURL = "contentUrl",
    CONTENTTYPE = "contentType",
    DISABLED = "disabled",
    MENUICONCLASS = "z-icon-menu",
    DISABLEDCLASS = "z-disabled",
    STACKEDCLASS = "z-stacked",
    LIGHTICONCLASS = "z-icons-light",
    DARKICONCLASS = "z-icons-dark",
    AJAXSPINNERCLASS = "z-spinner",
    UNDERLINEDCLASS = "underlined",
    CONTAINEDCLASS = "contained",
    CLEANCLASS = "clean",
    PILLS = "pills",
    VERTICALCLASS = "vertical",
    HORIZONTALCLASS = "horizontal",
    TOPLEFTCLASS = "top-left",
    TOPRIGHTCLASS = "top-right",
    TOPCLASS = "top",
    BOTTOMCLASS = "bottom",
    BOTTOMRIGHTCLASS = "bottom-right",
    BOTTOMLEFTCLASS = "bottom-left",
    MOBILECLASS = "mobile",
    MULTILINECLASS = "z-multiline",
    TRANSITION = "transition",
    ANIMATINGCLASS = "z-animating",
    MOBILEDROPDOWNARROWCLASS = "z-dropdown-arrow",
    RESPONSIVECLASS = "responsive",
    CONTENTINNERCLASS = "z-content-inner";
    
    ZozoTabs.prototype = {
        defaults: {
            delayAjax:50,
            animation: { duration: 600, effects: "slideH", easing: "easeInQuad", type: "css", mobileDuration: 00 },
            autoContentHeight:true,
            autoplay: { interval: 0, smart: true },
            bordered: true,            
            dark: false,
            cacheAjax: true,
            contentUrls: null,
            deeplinking: false,
            deeplinkingAutoScroll:false,
            deeplinkingMode: "single",
            deeplinkingPrefix: null,
            deeplinkingSeparator: "",
            defaultTab: "tab1",
            event: zozo.events.click,
            maxRows: 3,
            minWidth: 200,            
            minWindowWidth: 480,            
            mobileAutoScrolling: null,//{navTopOffset:-10, contentTopOffset: -10},
            mobileNav: true,
            mobileMenuIcon: null,
            mode: zozo.modes.tabs,
            multiline:false,
            hashAttribute: "data-link",            
            position: zozo.classes.positions.topLeft,
            orientation: HORIZONTALCLASS,
            ready: function () { },
            responsive: true,
            responsiveDelay: 0,
            rounded: false,
            shadows: true,
            theme: "silver",            
            scrollToContent: false,            
            select: function () { },
            spaced: false,
            deactivate: function () { },
            beforeSend: function () { },
            contentLoad: function () { },
            next: null,
            prev:null,
            error: function () { },
            noTabs: false,
            rememberState:false,
            size: "medium",
            style: CONTAINEDCLASS,
            tabRatio: 1.03,
            tabRatioCompact: 1.031,
            original:{
                itemWidth: 0,
                itemMinWidth: null,
                itemMaxWidth: null,
                groupWidth: 0,
                initGroupWidth: 0,
                itemD: 0,
                itemM: 0,
                firstRowWidth: 0,
                lastRowItems:0,
                count:0,
                contentMaxHeight: null,
                contentMaxWidth: null,
                navHeight: null,
                position: null,
                bottomLeft: null,
                tabGroupWidth:0
            },
            animating: false
        },
        init: function () {
            var _base = this;
            //setTimeout( function(){
                _base.settings = $.extend(true,{}, _base.defaults, _base.options, _base.metadata, _base.attrdata);
            
                _base.$elem.find(">." + AJAXSPINNERCLASS).remove(); _base.$elem.removeClass("z-tabs-loading");

                if (_base.settings.contentUrls != null) {
                    _base.$elem.find("> div > div").each(function (index, item) {
                        $(item).data(CONTENTURL, _base.settings.contentUrls[index]);
                    });
                }
           
                

                methods.initAnimation(_base,true);                 
                methods.updateClasses(_base);
                methods.checkWidth(_base, true);
                methods.bindEvents(_base);
                methods.initAutoPlay(_base);

                $.zozo.core.plugins.easing(_base);

                /*load tab state from html5 local storage*/              
                if (_base.settings.rememberState === true && $.zozo.core.support.html5_storage()) {
                    var tab = localStorage.getItem(_base.tabID + "_defaultTab");                    
                    if (methods.tabExist(_base, tab)) {
                        _base.settings.defaultTab = tab;
                    }
                }

                // check if Deeplinking is enabled
                if (_base.settings.deeplinking === true) {
                    var _prefix = (_base.settings.deeplinkingPrefix) ? _base.settings.deeplinkingPrefix : _base.tabID;
                    if (document.location.hash) {
                        var tab = _base.Deeplinking.get(_prefix, _base.settings.deeplinkingSeparator);
                        if (methods.tabExist(_base, tab)) {
                            methods.showTab(_base, tab);
                            //scroll to top   
                            if (_base.settings.deeplinkingAutoScroll === true) {
                                $('html, body').animate({ scrollTop: _base.$elem.offset().top - 150 }, 2000);
                            }
                        }
                        else {                        
                            methods.showTab(_base, _base.settings.defaultTab);
                        }
                    }
                    else {
                        methods.showTab(_base, _base.settings.defaultTab);
                    }

                    // bind the event hashchange, using jquery-hashchange-plugin
                    if (typeof ($(window).hashchange) != "undefined") {
                        $(window).hashchange(function () {                      
                            var _newTab = _base.Deeplinking.get(_prefix, _base.settings.deeplinkingSeparator);
                            if (!_base.currentTab || _base.currentTab.attr(_base.settings.hashAttribute) !== _newTab) {
                                methods.showTab(_base, _newTab);
                            }                        
                        });
                    }
                    else {
                        // Bind the event hashchange, using jquery event binding, not supported (IE6, IE7) 
                        $(window).bind('hashchange', function () {                        
                            var _newTab = _base.Deeplinking.get(_prefix, _base.settings.deeplinkingSeparator);
                            if (!_base.currentTab || _base.currentTab.attr(_base.settings.hashAttribute) !== _newTab) {
                                methods.showTab(_base, _newTab);
                            }                        
                        });
                    }
                }
                else {
                    if (_base.settings.noTabs === true) {
                        methods.showContent(_base, methods.getActive(_base, 0));
                    }
                    else {
                        methods.showTab(_base, _base.settings.defaultTab);
                    }
                }

                

                methods.checkWidth(_base);

                //fire ready event
                _base.$elem.trigger(READY, _base.$elem);                       

                return _base;
            //}, 2000); 
        },
        setOptions: function (_option) {
            var _base = this;
           
            _base.settings = $.extend(true, _base.settings, _option);

            
           methods.initAnimation(_base);
            methods.updateClasses(_base, true);
          //version 5.0 methods.initTransition(_base, _base.$tabs.index(_base.currentTab));
           methods.checkWidth(_base, false, true);
            methods.initAutoPlay(_base);


            return _base;
        },        
        add: function (item, content, tabID) {
            var _base = this;            
            var tabOjb = {};
            if (item != null && typeof item === 'object') {
                if (item.tab) {
                    tabOjb.tab = $(item.tab);
                    (item.tabID && _base.settings.deeplinking === true) && (tabOjb.tab.attr(_base.settings.hashAttribute, item.tabID));
                }

                if (item.content) {
                    tabOjb.content = $(item.content);
                }
            }
            else if (item && content) {
                tabOjb.tab = $("<li><a>" + item + "</a></li>");
                tabOjb.content = $("<div>" + content + "</div>");
                (tabID && _base.settings.deeplinking === true) && (tabOjb.tab.attr(_base.settings.hashAttribute, tabID));
            }

            if (tabOjb.tab && tabOjb.content) {
                tabOjb.tab.appendTo(_base.$tabGroup).hide().fadeIn(300).css("display", "");
                tabOjb.content.appendTo(_base.$container);

                methods.updateClasses(_base);
                methods.bindEvent(_base, tabOjb.tab);

                setTimeout(function () {
                    methods.checkWidth(_base, false, true);
                }, 350);
            }
            
            return _base;
        },
        insertAfter: function (_t, _c, _d) {
            var _base = this;

            return _base;
        },
        insertBefore: function (_t, _c, _d) {
            var _base = this;

            return _base;
        },
        remove: function (_i) {            
            var _base = this;
            var _index = (_i - 1);
            var _tabToRemove = _base.$tabs.eq(_index);
            var _contentToRmove = _base.$contents.eq(_index);

            _contentToRmove.remove();
            _tabToRemove.fadeOut(300, function () {
                $(this).remove();
                methods.updateClasses(_base);
            });

            setTimeout(function () {
                methods.checkWidth(_base, false, true);
            }, 350);

            return _base;
        },
        enable: function (_i) {
            var _base = this;
            var _tabToEnable = _base.$tabs.eq(_i);
            //var _contentToEnable= _base.$contents.eq(_i);

            if (_tabToEnable.length)
            {
                _tabToEnable.removeClass(DISABLEDCLASS);
                _tabToEnable.data(DISABLED,false);
            }
            return _base;
        },
        disable: function (_i) {
            var _base = this;
            var _tabToDisable = _base.$tabs.eq(_i);
            //var _contentToDisable = _base.$contents.eq(_i);

            if (_tabToDisable.length) {
                _tabToDisable.addClass(DISABLEDCLASS);
                _tabToDisable.data(DISABLED, true);
            }
            return _base;
        },
        select: function (_i) {           
            var _base = this;
            if (_base.settings.animating !== true) {
                if (_base.settings.noTabs === true) {
                    methods.showContent(_base, methods.getActive(_base, _i));
                }
                else {
                    methods.changeHash(_base, _base.$tabs.eq(_i).attr(_base.settings.hashAttribute));
                }
            }
            return _base;
        },
        first: function () {
            var _base = this;
            _base.select(methods.getFirst());
            return _base;
        },
        prev: function () {
            var _base = this;
            var _currentIndex = methods.getActiveIndex(_base)
            if (_currentIndex <= methods.getFirst(_base)) {
                _base.select(methods.getLast(_base));
            }
            else {
                _base.select(_currentIndex - 1);
                $.zozo.core.debug.log("prev tab : " + (_currentIndex - 1));
            }
            return _base;
        },
        next: function (_base) {
            _base = (_base) ? _base : this;
            var _currentIndex = methods.getActiveIndex(_base);
            var _count = parseInt(methods.getLast(_base));                      
            if (_currentIndex >= _count) {
                _base.select(methods.getFirst());
            }
            else {                
                _base.select(_currentIndex + 1);                
                $.zozo.core.debug.log("next tab : " + (_currentIndex + 1));
            }
            return _base;
        },
        last: function () {
            var _base = this;
            _base.select(methods.getLast(_base));
            return _base;
        },
        play: function (interval) {
            var _base = this;
            if (interval == null || interval < 0) {
                interval = 2000;
            }
            _base.settings.autoplay.interval = interval;
            _base.stop();
            _base.autoplayIntervalId = setInterval(function () { _base.next(_base); }, _base.settings.autoplay.interval);

            return _base;
        },
        stop: function (_base) {
            _base = (_base) ? _base : this;
            clearInterval(_base.autoplayIntervalId);
            return _base;
        },
        refresh: function () {
            var _base = this;                       
            _base.$contents.filter(".z-active").css({ "display": "block" }).show();
            methods.checkWidth(_base);
            return _base;
        }      
    };
   
    var methods = {
        initAnimation: function (_base, _init) {
            var _effects = $.zozo.core.utils.toArray(zozo.animation.effects);
            if ($.inArray(_base.settings.animation.effects, _effects) < 0) {
                _base.settings.animation.effects = zozo.animation.effects.slideH;
            }

            if (jQuery.browser.mobile) {
                //_base.settings.event = zozo.events.touchend;
                _base.settings.shadows = false;
            }

            if ($.zozo.core.support.css.transition === false) {
                _base.settings.animation.type = zozo.animation.types.jquery;
                if (jQuery.browser.mobile) {
                    _base.settings.animation.duration = 0;
                }
            }

            if (_base.settings.animation.effects === zozo.animation.effects.none && _init ===true) {
                _base.settings.animation.duration = 0;
            }
        },
        updateClasses: function (_base, _options) {
            _base.$elem.find('*').stop(true, true);

            _base.tabID = _base.$elem.attr("id");
            _base.$tabGroup = _base.$elem.find("> ul").addClass(zozo.classes.tabGroup).not(".z-tabs-mobile").addClass("z-tabs-desktop");
            _base.$tabs = _base.$tabGroup.find("> li");
            _base.$container = _base.$elem.find("> div");
            _base.$contents = _base.$container.find("> div");

            if (_base.$tabGroup.length<=0) {
                _base.settings.noTabs = true;
            }

            var _transition = $.zozo.core.support.css.transition;
            var _noTabs = _base.settings.noTabs;
                        
            //update container and content classes 
            _base.$container.addClass(zozo.classes.container).css({_transition:""});
            _base.$contents.addClass(zozo.classes.content);


            _base.$contents.each(function (index, item) {
                var _cont = $(item);
                _cont.css({ "left": "", "top": "", "opacity": "", "display": "", _transition: "" });
                (_cont.hasClass(zozo.classes.active)) && _cont.show().css({ "display": "block", _transition: "" });
            });

            if (_noTabs != true) {                
                _base.$tabs.each(function (index, item) {
                    var _tab =$(item);
                    _tab
                        .removeClass(zozo.classes.first)
                        .removeClass(zozo.classes.last)
                        .removeClass(zozo.classes.left)
                        .removeClass(zozo.classes.right)
                        .removeClass(zozo.classes.firstCol)
                        .removeClass(zozo.classes.lastCol)
                        .removeClass(zozo.classes.firstRow)
                        .removeClass(zozo.classes.lastRow)
                        .css({ "width": "", "float": "" })
                        .addClass(zozo.classes.tab)
                        .find("a")
                        .addClass(zozo.classes.link);

                    (methods.isTabDisabled(_tab)) && (_base.disable(index));                                                               
                    (_base.settings.deeplinking === false) && $(item).attr(_base.settings.hashAttribute, "tab" + (index + 1))
                });

                _base.$tabs.filter("li:first-child").addClass(zozo.classes.first);
                _base.$tabs.filter("li:last-child").addClass(zozo.classes.last);
            }

            var _positions = $.zozo.core.utils.toArray(zozo.classes.positions);
          
            _base.$elem
                .removeClass(zozo.classes.wrapper)
                .removeClass(zozo.classes.rounded)
                .removeClass(zozo.classes.shadows)
                .removeClass(zozo.classes.spaced)                
                .removeClass(zozo.classes.bordered)
                .removeClass(zozo.classes.dark)
                .removeClass(MULTILINECLASS)
                .removeClass(LIGHTICONCLASS)
                .removeClass(DARKICONCLASS)
                .removeClass(STACKEDCLASS)
                .removeClass(FLATCLASS)
                .removeClass(zozo.classes.styles.join(zozo.space))
                .removeClass(zozo.classes.orientations.join(zozo.space))
                .removeClass(_positions.join().replace(zozo.commaRegExp, zozo.space))
                .removeClass(zozo.classes.sizes.join(zozo.space))
                .removeClass(zozo.classes.themes.join(zozo.space))
                .removeClass(zozo.classes.flatThemes.join(zozo.space))               
                .addClass(HOVERCLASS)
                .addClass(_base.settings.style)
                .addClass(_base.settings.size)
                .addClass(_base.settings.theme);

            //console.log(zozo.classes.themes.join(zozo.space));
           // console.log(zozo.classes.flatThemes.join(zozo.space));

            //light or dark icons
            (methods.isFlatTheme(_base)) && _base.$elem.addClass(FLATCLASS);
            (methods.isLightTheme(_base)) ? _base.$elem.addClass(DARKICONCLASS): _base.$elem.addClass(LIGHTICONCLASS);                       
            (_base.settings.rounded === true) && _base.$elem.addClass(zozo.classes.rounded);                            
            (_base.settings.shadows === true) && _base.$elem.addClass(zozo.classes.shadows);
            (_base.settings.bordered === true) && _base.$elem.addClass(zozo.classes.bordered);
            (_base.settings.dark === true) && _base.$elem.addClass(zozo.classes.dark);
            (_base.settings.spaced === true) && _base.$elem.addClass(zozo.classes.spaced);            
            (_base.settings.multiline === true) && _base.$elem.addClass(MULTILINECLASS);
                                   
            methods.checkPosition(_base);

            if (_base.$elem.find("> ul." + "z-tabs-mobile").length) {
                _base.$mobileNav = _base.$elem.find("> ul." + "z-tabs-mobile");
            } else {
                _base.$mobileNav = $("<ul class='z-tabs-nav z-tabs-mobile'><li><a class='z-link' style='text-align: left;'><span class='z-title'>Overview</span><span class='z-arrow'></span></a></li></ul>");
            }


            if (_base.$mobileNav) {
                _base.$tabGroup.before(_base.$mobileNav);
                if (_base.$elem.find("> i." + MOBILEDROPDOWNARROWCLASS).length) {
                    _base.$mobileDropdownArrow = _base.$elem.find("> i." + MOBILEDROPDOWNARROWCLASS);
                } else {
                    _base.$mobileDropdownArrow = $("<i class='z-dropdown-arrow'></i>");
                }
                _base.$tabGroup.before(_base.$mobileDropdownArrow);
            }

            //remove hover class for touch
            (jQuery.browser.mobile) && (_base.$elem.removeClass(HOVERCLASS));                           
        },
        checkPosition: function (_base) {
            _base.$container.appendTo(_base.$elem);
            _base.$tabGroup.prependTo(_base.$elem);
            _base.$elem.find("> span.z-tab-spacer").remove();
            _base.$elem.addClass(zozo.classes.wrapper);
            
            var _isTop = methods.isTop(_base);
            //set calculate and container height
            _base.$contents.each(function (index, item) {
                var _content = $(item);
                var _contentClass = CONTENTINNERCLASS;
                if (!_content.find("> div." + CONTENTINNERCLASS).length) {
                    if (_content.hasClass("z-row")) {
                        _content.removeClass("z-row");
                        _contentClass = "z-row " + CONTENTINNERCLASS;
                    }
                    _content.wrapInner("<div class='" + _contentClass + "'></div>");
                    $.zozo.core.content.check(_content);
                }                
            });

            if (_base.settings.orientation === VERTICALCLASS) {
               if (_base.settings.position !== TOPRIGHTCLASS) {
                   _base.settings.position = TOPLEFTCLASS;
               }
            }
            else {
                _base.settings.orientation = HORIZONTALCLASS;
                if (_isTop === false) {
                    _base.$tabGroup.appendTo(_base.$elem);
                    $(zozo.elementSpacer).appendTo(_base.$elem);
                    _base.$container.prependTo(_base.$elem);
                }
            }

            _base.$elem.addClass(_base.settings.orientation);
            _base.$elem.addClass(_base.settings.position);

            if (_isTop) {
                _base.$elem.addClass(TOPCLASS);
            } else {
                _base.$elem.addClass(BOTTOMCLASS);
            }            
        },
        bindEvents: function (_base) {         
            //main tab events
            var _duration = (_base.settings.animation.effects === zozo.animation.effects.none) ? 0 : _base.settings.animation.duration;            
            _base.$tabs.each(function () {                
                var _tab = $(this);        
                var href = _tab.find("a").attr("href");
                var target = _tab.find("a").attr("target");
                if (!$.trim(href).length) {
                    methods.bindEvent(_base, _tab);
                } else {
                    _tab.on('ztap', { data: _base.settings.event }, function (_event) {                                      
                         ($.trim(target).length) ? window.open(href, target) :window.location = href;                        
                         _event.preventDefault();
                    });
                }
            });
                 
            /*
            $(window).resize(function () {               
                clearInterval(_base.resizeWindowIntervalId);             
                _base.resizeWindowIntervalId = setTimeout(function () {
                  methods.checkWidth(_base);                     
                }, 200)
            });

            */
            $(window).resize(function () {
                if (/*_base.lastWindowHeight !== $(window).height() ||*/ _base.lastWindowWidth !== $(window).width()) {
                    clearInterval(_base.resizeWindowIntervalId);
                    _base.resizeWindowIntervalId = setTimeout(function () {
                        _base.lastWindowHeight = $(window).height();
                        _base.lastWindowWidth = $(window).width();
                        //console.log("resizing " + $(window).width());
                        methods.checkWidth(_base);
                    }, _base.settings.responsiveDelay);
                }
            });
            
            //bind next event
            var _nextButton = _base.settings.next;            
            if (_nextButton != null)
            {
                $(_nextButton).on(zozo.events.click, function (_event) {
                    _event.preventDefault();
                    _base.next();
                });
            }


            //bind prve event            
            var _prevButton = _base.settings.prev;
            if (_prevButton != null) {
                $(_prevButton).on(zozo.events.click, function (_event) {
                    _event.preventDefault();
                    _base.prev();
                });
            }

            //mobile dropdown menu event
            if (_base.$mobileNav) {
                _base.$mobileNav.find("li").on('ztap', { data: _base.settings.event }, function (_event) {
                    //_base.$mobileNav.find("li").on(_base.settings.event, function (_event) {                
                    _event.preventDefault();
                    if (_base.$mobileNav.hasClass(zozo.states.closed)) {                        
                        _base.$mobileNav.removeClass(zozo.states.closed);                        
                        _base.$tabGroup.removeClass("z-hide-menu");                        

                        methods.mobileNavAutoScroll(_base);
                    }
                    else {                                    
                        _base.$mobileNav.addClass(zozo.states.closed);
                        _base.$tabGroup.addClass("z-hide-menu");                        
                    }
                    methods.refreshParents(_base, _duration);
                });
            }


            _base.lastWindowHeight = $(window).height();
            _base.lastWindowWidth = $(window).width();

            _base.$elem.bind(READY, _base.settings.ready);
            _base.$elem.bind(SELECT, _base.settings.select);            
            _base.$elem.bind(DEACTIVATE, _base.settings.deactivate);

            _base.$elem.bind(ERROR, _base.settings.error);
            _base.$elem.bind(CONTENTLOAD, _base.settings.contentLoad);
        },
        bindEvent: function (_base, _tab) {
            _tab.on('ztap', { data: _base.settings.event }, function (_event) {
                _event.preventDefault();
                //stop autoplay if smart is true
                if (_base.settings.autoplay !== false && _base.settings.autoplay != null) {
                    if (_base.settings.autoplay.smart === true) {
                        _base.stop();
                    }
                }
                methods.changeHash(_base, _tab.attr(_base.settings.hashAttribute));

                if (methods.allowAutoScrolling(_base) === true && methods.isMobile(_base)) {
                    $(window.opera ? 'html' : 'html, body').animate({
                        scrollTop: _base.$elem.offset().top +_base.settings.mobileAutoScrolling.contentTopOffset
                    }, 0);
                }
            });
        },
        mobileNavAutoScroll: function (_base) {
            if (methods.allowAutoScrolling(_base) === true) {                
                $(window.opera ? 'html' : 'html, body').animate({
                    scrollTop: _base.$mobileNav.offset().top + _base.settings.mobileAutoScrolling.navTopOffset
                }, 0);
            }
            return _base;
        },
        showTab: function (_base, tab) {
            if (methods.tabExist(_base, tab) && tab != null && _base.settings.animating !== true) {
                
                var nextTab = _base.$tabs.filter("li[" + _base.settings.hashAttribute + "='" + tab + "']");
                var _nextIndex = _base.$tabs.index(nextTab);
                var _tabElement = methods.getActive(_base, _nextIndex);
               
              

                if (_tabElement.enabled && _tabElement.preIndex !== _tabElement.index && _base.settings.noTabs !== true) {
                    //_base.settings.animating = true

                    //set current tab
                    _base.currentTab = nextTab;

                    //update classes
                    _base.$tabs.removeClass(zozo.classes.active);
                    _base.currentTab.addClass(zozo.classes.active);
                   
                    //save to local html5 storage                   
                    if (_base.settings.rememberState === true && $.zozo.core.support.html5_storage()) {
                        localStorage.setItem(_base.tabID + "_defaultTab", nextTab.data("link"));
                    }

                    methods.mobileNav(_base, false, _tabElement.index);
                    
                    if (_tabElement.contentUrl) {
                        if (_tabElement.preIndex === -1) {
                            //transition.init(_base, _tabElement);
                            _tabElement.content.css({ "opacity": "", "left": "", "top": "", "position": "relative" }).show();
                        }
                                             
                        if (_tabElement.contentType === "iframe") {
                            methods.iframeContent(_base, _tabElement);
                        }
                        else {
                            methods.ajaxRequest(_base, _tabElement);
                        }

                    } else {
                        methods.showContent(_base, _tabElement);
                    }
                }
            }
        },        
        getActiveIndex: function (_base) {
            var _index;
            if (_base.settings.noTabs === true) {
                _index = _base.$container.find(">div." + zozo.classes.active).index();
            } else {
                if (_base.currentTab)
                {
                   _index  = parseInt(_base.currentTab.index());
                } else {
                    _index = _base.$tabGroup.find("li." + zozo.classes.active).index();
                }                
            }
            return _index;
        },
        getActive: function (_base, _index) {
            var _preIndex = methods.getActiveIndex(_base);            
            var _nextContent = _base.$contents.eq(_index);
            var _nextTab = _base.$tabs.eq(_index);
            var _preTab = _base.$tabs.eq(_preIndex);
            var _transition = $.zozo.core.support.css.transition;
            var _duration = (_base.settings.animation.effects === zozo.animation.effects.none) ? 0 : _base.settings.animation.duration;
     
            var _tabElement = {
                index: _index,
                tab: _nextTab,
                content: _nextContent,
                contentInner: _nextContent.find("> .z-content-inner"),
                enabled: methods.isTabDisabled(_nextTab)===false,
                contentUrl: _nextContent.data(CONTENTURL),
                contentType: _nextContent.data(CONTENTTYPE),
                noAnimation: false,
                transition: _transition,
                duration: _duration,
                preIndex: _preIndex,
                preTab: _preTab,
                preContent: _base.$contents.eq(_preIndex)
            };

            return _tabElement;
        },
        iframeContent: function (_base, _tabElement) {                     
            var _iframe = _tabElement.contentInner.find("> div >.z-iframe");           
            if (!_iframe.length) {
                methods.showLoading(_base);          
                _tabElement.contentInner.append('<div class="z-video"><iframe src="' + _tabElement.contentUrl + '" frameborder="0" scrolling="auto" height="1400" class="z-iframe"></iframe></div>');               
                console.log("add iframe");
            } else {
                methods.hideLoading(_base);
            }

            methods.showContent(_base, _tabElement);

            _tabElement.contentInner.find(".z-iframe").load(function () { methods.hideLoading(_base); });

            return _base;
        },
        showLoading: function (_base) {
            _base.$container.append('<span class="' + AJAXSPINNERCLASS + '"></span>');
            return _base;
        },
        hideLoading: function (_base) {
            _base.$container.find(">." + AJAXSPINNERCLASS).remove();
            return _base;
        },
        ajaxRequest: function (_base, _tabElement) {
            var data = {};
            var callbackOjb = { tab: _tabElement.tab, content: _tabElement.contentInner, index: _tabElement.index, xhr: null, message: "" };

            $.ajax({
                type: "GET",
                cache: (_base.settings.cacheAjax === true),
                url: _tabElement.contentUrl,
                dataType: "html",
                data: data,
                beforeSend: function (xhr, settings) {
                    //return fire(element, 'ajax:beforeSend', [xhr, settings]);
                    methods.showLoading(_base);
                    _base.settings.animating = true;
                },
                error: function (xhr, status, error) {                    
                    if (xhr.status == 404) {
                        callbackOjb.message = "<h4 style='color:red;'>Sorry, error: 404 - the requested content could not be found.</h4>";
                    }
                    else {
                        callbackOjb.message = "<h4 style='color:red;'>An error occurred: " + status + "\nError: " + xhr + " code: " + xhr.status + "</h4>";
                    }                    
                    callbackOjb.xhr = xhr;
                    (_base.settings.error && typeof (_base.settings.error) == typeof (Function)) && _base.$elem.trigger(ERROR, callbackOjb);
                    _tabElement.contentInner.html(callbackOjb.message);
                },
                complete: function (xhr, status) {
                    
                    //_base.$elem.trigger('ajax:complete', [xhr, status]);
                    setTimeout(function () {
                        _base.settings.animating = false;
                        //methods.setContentHeight(_base, _tabElement.content);
                        methods.showContent(_base, _tabElement);

                        methods.hideLoading(_base);                        
                    }, _base.settings.delayAjax);
                },
                success: function (data, status, xhr) {                        
                    setTimeout(function () {
                        _tabElement.contentInner.html(data);
                        callbackOjb.xhr = xhr;
                        _base.$elem.trigger(CONTENTLOAD, callbackOjb);
                    }, _base.settings.delayAjax);
                }
            });
            
            return _base;
        },        
        showContent: function (_base, _tabElement) {            
            if (_tabElement.preIndex !== _tabElement.index && _base.settings.animating !== true) {
                _base.settings.animating = true;

                _base.$contents.removeClass(zozo.classes.active);
                _tabElement.content.addClass(zozo.classes.active);

                if (_tabElement.preIndex === -1) {
                    transition.init(_base, _tabElement);
                }
                else {
                    var _effects = _base.settings.animation.effects;

                    //var _preSize = methods.getElementSize(_tabElement.preContent).height;
                    //var _nextSize = methods.getElementSize(_tabElement.content).height;
                    //var _largest = methods.getContentHeight(_base, null, true).height; 

                    var _preSize = methods.getContentHeight(_base, _tabElement.preContent, true).height;
                    var _nextSize = methods.getContentHeight(_base, _tabElement.content,true).height;                                       
                    var _largest = methods.isLarger(_preSize, _nextSize);
                 

                    if (_base.settings.orientation === HORIZONTALCLASS && _base.settings.autoContentHeight === true) {
                        _largest = (_preSize > _nextSize) ? _preSize : _nextSize
                    }

                    var _width = (_effects === zozo.animation.effects.slideH
                        || _effects === zozo.animation.effects.slideLeft
                        || _effects === zozo.animation.effects.slideRight) ? _base.$container.width() : _width = _largest;

                    if (_tabElement.preIndex < _tabElement.index && _effects === zozo.animation.effects.slideV) {                        
                        var _vHeight = methods.isLarger(_preSize, _nextSize);
                        (_vHeight > _width) && (_width = _vHeight);                        
                    }

                    var _prevValue = -_width;
                    var _nextValue = _width;
                    if (_tabElement.preIndex > _tabElement.index) {
                        _prevValue = _width;
                        _nextValue = -_width;
                    }
                   
                    transition.before(_base, _tabElement);
                                              
                    switch(_effects)
                    {
                        case zozo.animation.effects.slideV:
                            methods.animate(_base, _tabElement.preContent,null, { "left": 0, "top": _prevValue + "px" });
                            methods.animate(_base, _tabElement.content, {"left": 0, "top": _nextValue + "px"}, { "top": 0});
                            break;
                        case zozo.animation.effects.slideUp:                                                   
                            methods.animate(_base, _tabElement.preContent, { "opacity": 1 }, { "left": 0, "top": (-_width) + "px"});
                            methods.animate(_base, _tabElement.content, { "left": 0, "top": (_width * 1) + "px" }, { "top": 0 });
                            break;
                        case zozo.animation.effects.slideDown:
                            methods.animate(_base, _tabElement.preContent, { "opacity": 1 }, { "left": 0, "top": (_width) + "px" });
                            methods.animate(_base, _tabElement.content, { "left": 0, "top": (-_width) + "px"}, { "top": 0 });
                            break;
                        case zozo.animation.effects.slideUpDown:
                            methods.animate(_base, _tabElement.preContent, { "opacity": 1 }, { "left": 0, "top": (-_width*1) + "px" });
                            methods.animate(_base, _tabElement.content, { "left": 0, "top": (-(_width * 2)) + "px" }, { "top": 0 });
                            break;
                        case zozo.animation.effects.slideH:
                            methods.animate(_base, _tabElement.preContent, null, { "left": _prevValue + "px" });
                            methods.animate(_base, _tabElement.content, { "left": _nextValue + "px" }, { "left": 0});
                            break;
                        case zozo.animation.effects.slideRight:
                            methods.animate(_base, _tabElement.preContent, { "opacity": 1 }, { "top": 0, "left": (_width) + "px"});
                            methods.animate(_base, _tabElement.content, { "top": 0, "left": (-_width) + "px" }, { "top": 0, "left": 0});
                            break;
                        case zozo.animation.effects.slideLeft:
                            methods.animate(_base, _tabElement.preContent, { "opacity": 1 }, { "top": 0, "left": (-_width) + "px" });
                            methods.animate(_base, _tabElement.content, { "top": 0, "left": (_width) + "px" }, { "top": 0, "left": 0 });
                            break;
                        case zozo.animation.effects.fade:
                            methods.animate(_base, _tabElement.preContent, { "display": "block" }, { "opacity": 0 });
                            methods.animate(_base, _tabElement.content, {  "display": "block", "opacity": 0 }, { "opacity": 1 });
                            break;
                        case zozo.animation.effects.none:
                            _base.$contents.css({ "position": "absolute", "left": 0, "top": 0 }).removeClass(zozo.classes.active).hide()
                             .eq(_tabElement.index).addClass(zozo.classes.active).css({ "position": "relative" }).show();
                            break;
                        default:
                           
                    }
    
                    transition.after(_base, _tabElement);
                }
            }
        },
        refreshParents: function (_base, _duration) {
            setTimeout(function () {
                _base.$elem.parents(".z-tabs").each(function (index, item) {
                    $(item).data('zozoTabs').refresh();                    
                });                                        
            }, _duration);
        },
        animate: function (_base, _elem, _pre, _prop, _post, _hidePre) {            
            $.zozo.core.utils.animate(_base, _elem, _pre, _prop, _post, _hidePre);            
        },
        mobileNav: function (_base, _show, _nextIndex) {
            if (_nextIndex !== null && _base.$mobileNav) {
                _base.$mobileNav.find("> li > a > span.z-title").html(_base.$tabs.eq(_nextIndex).find("a").html());
            }

            if (_show === true) {                              
                setTimeout(function () {
                    _base.$mobileNav.removeClass(zozo.states.closed); 
                }, _base.settings.animation.mobileDuration);

                _base.$tabGroup.removeClass("z-hide-menu");;
            } else {             
                (_base.$mobileNav) && _base.$mobileNav.addClass(zozo.states.closed);
                _base.$tabGroup.addClass("z-hide-menu");
            }                      
        },
        setResponsiveDimension: function (_base, _groupWidth, _rec) {
            var _container = _base.$container;
            _base.settings.original.count = parseInt(_base.$tabs.size());


            if (!_rec) {
                _base.settings.original.itemD = parseInt(_container.width() / _base.settings.original.itemWidth);
                _base.settings.original.itemM = _base.settings.original.itemWidth + _base.settings.original.itemM;
            }

            _base.settings.original.firstRowWidth = (_base.settings.original.itemWidth / (parseInt(_base.settings.original.itemD) * _base.settings.original.itemWidth) * 100);
            _base.settings.original.itemCount = parseInt(_base.settings.original.itemD) * parseInt(_base.settings.original.count / (parseInt(_base.settings.original.itemD)));
            _base.settings.original.lastItem = 100 / (parseInt(_base.settings.original.count) - parseInt(_base.settings.original.itemCount));
            _base.settings.original.navHeight = _base.settings.original.itemD * (parseInt(_base.$tabs.eq(0).innerHeight())) + ((_base.settings.original.itemM > 0 ? _base.$tabs.eq(0).innerHeight() : 0));
            _base.settings.original.bottomLeft = _base.settings.original.count - (_base.settings.original.count - _base.settings.original.itemCount);
            _base.settings.original.rows = _base.settings.original.count > _base.settings.original.itemCount ? parseInt(_base.settings.original.itemCount / _base.settings.original.itemD) + 1 : parseInt(_base.settings.original.itemCount / _base.settings.original.itemD);
            _base.settings.original.lastRowItems = _base.settings.original.count - (_base.settings.original.itemCount * (_base.settings.original.rows - 1));
            _base.settings.original.itemsPerRow = _base.settings.original.itemCount / _base.settings.original.rows;

            if (_container.width() > _groupWidth && !_rec) {
                _base.settings.original.itemD = _base.settings.original.count;
                _base.settings.original.itemM = 0;
                _base.settings.original.rows = 1;
                _base.settings.original.itemCount = _base.settings.original.count;
            }
            return _base;
        },
        checkWidth: function (_base, _init, _options) {
            var _groupWidth = 0;            
            var _container = _base.$container;
            var _isCompact = methods.isCompact(_base);
            var _heightTotal = 0;
            var _tabR = _base.settings.tabRatio;
            var _tabRC = _base.settings.tabRatioCompact;
            _base.$tabs.each(function (index) {
                var _itemTempWidth = $(this).outerWidth(true) * _tabR;
                (_isCompact) && (_itemTempWidth = (_itemTempWidth * _tabRC));
                if (_init === true) {
                    if (_itemTempWidth > _base.settings.original.itemWidth) {
                        _base.settings.original.itemWidth = _itemTempWidth;
                        _base.settings.original.itemMaxWidth = _itemTempWidth;
                    }

                    if (_itemTempWidth < _base.settings.original.itemMinWidth) {
                        _base.settings.original.itemMinWidth = _itemTempWidth;
                    }
                }
                _heightTotal = _heightTotal + $(this).innerHeight();
                _groupWidth = _groupWidth + _itemTempWidth;
            });
                                
            if (_init === true)
            {
                _groupWidth = _groupWidth + (_base.settings.original.itemWidth * 0);
            }
 
            _base.settings.original.count = parseInt(_base.$tabs.size());
            _base.settings.original.groupWidth = _groupWidth;            

            methods.setResponsiveDimension(_base, _base.settings.original.groupWidth);

            if (_base.settings.original.count > 3 && _base.settings.original.lastRowItems === 1) {                               
                _base.settings.original.itemD = _base.settings.original.itemD - 1;
                _base.settings.original.itemM = _container.width() % _base.settings.original.itemWidth;
               
                methods.setResponsiveDimension(_base, _base.settings.original.groupWidth,true);
            }
            
            if (_init === true || _options === true) {
                _base.settings.original.initGroupWidth = _base.settings.original.groupWidth;
                if (methods.isCompact(_base)) {
                    var _percent = 100 / _base.settings.original.count;
                    _base.$tabs.each(function () { $(this).css({ "width": _percent + "%" }) });
                }

                _base.settings.original.position = _base.settings.position;
            }
            
            if (_base.settings.responsive === true) {
                methods.responsive(_base, _init);
            }

           

            var _isResORCompact = ( (methods.isCompact(_base) && !methods.isMobile(_base)));
            var _css = (methods.isResponsive(_base) && _base.BrowserDetection.isIE(7)) ? { "float": "none", "width": "auto" } : { "float": "" }; //version 5.1 removed float right
            var _hasResponsiveClass = _base.$elem.hasClass(RESPONSIVECLASS);

            _base.$tabs.each(function (index) {
                if (((_hasResponsiveClass === true && (index + 1) === _base.settings.original.itemD) || (index + 1) === _base.settings.original.count) && _isResORCompact) {
                    $(this).css(_css);
                }
                else {
                    $(this).css({ "float": "" });
                }
            });
           
            if (_base.settings.orientation === VERTICALCLASS) {
                methods.setContentHeight(_base, null, true);
            }
        },
        checkModes:function (_base) {
            var _isCompact = methods.isCompact(_base);
            if (_base.settings.mode === zozo.modes.stacked) {
                _base.$elem.addClass(STACKEDCLASS);
                _base.$elem.addClass(RESPONSIVECLASS);
                _base.$tabs.css({ "width": "" });
                (_base.$mobileNav) && _base.$mobileNav.hide();
            } else {
                if (_isCompact) {
                    var _percent = 100 / _base.settings.original.count
                    _base.$tabs.each(function () { $(this).css({ "float": "", "width": _percent + "%" }) });
                } else {
                    _base.$tabs.each(function () { $(this).css({ "float": "", "width": "" }) });
                }
            }
        },
        getContentHeight: function (_base, _contentElement, _noAnimation) {                      
            var _autoContentHeight = _base.settings.autoContentHeight;                        
            var _size = { width: 0, height: 0 };

            if (_autoContentHeight != true) {
                _base.$contents.each(function (index, item) {
                    var _content = $(item);
                    var contentSize = methods.getElementSize(_content);

                    (contentSize.height > _size.height) && (_size.height = contentSize.height);
                    (contentSize.width > _size.width) && (_size.width = contentSize.width);
                });
            } else {
                var _activeContent = _base.$elem.find("> .z-container > .z-content.z-active");                              

                if (_contentElement != null) {
                    _activeContent = _contentElement;
                }

                _size.height = methods.getElementSize(_activeContent).height;
            }

            if (_base.settings.orientation === VERTICALCLASS && !methods.isMobile(_base)) {
                var _containerSize = 0;
                _base.$tabs.each(function (index) {
                    _containerSize = _containerSize + parseInt($(this).height()) + parseInt($(this).css("border-top-width")) + parseInt($(this).css("border-bottom-width"));
                });

                _size.height = methods.isLarger(_size.height, _base.$tabGroup.innerHeight());
                _size.height = methods.isLarger(_size.height, _containerSize);
            }
            return _size;
        },
        setContentHeight: function (_base, _contentElement, _noAnimation) {
            //_heightOption: auto, largest,
            var _size = methods.getContentHeight(_base,_contentElement,_noAnimation);
            _base.settings.original.contentMaxHeight = _size.height;
            _base.settings.original.contentMaxWidth = _size.width;

            var _duration = (_base.settings.animation.effects === zozo.animation.effects.none || _noAnimation === true) ? 0 : _base.settings.animation.duration;
            var _autoContentHeight = _base.settings.autoContentHeight;

     
            var _transition = $.zozo.core.support.css.transition;
            var _cssProperties = { _transition: "none",  'min-height': _base.settings.original.contentMaxHeight + "px" };
            //var _cssProperties = { _transition: "none", "height": _base.settings.original.contentMaxHeight + "px", 'min-height': _base.settings.original.contentMaxHeight + "px" };
            if (_noAnimation === true) {
                _base.$container.css(_cssProperties);              
            }
            else {
                methods.animate(_base, _base.$container, null, _cssProperties, {});
            }
            return _base;
        },
        responsive: function (_base, _init) {            
            var _windowSize = $(window).width();
            var _isTop = methods.isTop(_base);
            var _isCompact = methods.isCompact(_base);
            var _isContentLarger = _base.settings.original.initGroupWidth >= _base.$container.width();            
            var _maxRowsExecuted = _base.settings.original.rows > _base.settings.maxRows;
            var _minWidthExecuted = _windowSize <= _base.settings.minWindowWidth;
            var _enableMobileNav = (!_base.BrowserDetection.isIE(8) && _base.settings.mobileNav === true && _base.$mobileNav!=null);            
            var _count = _base.settings.original.count;
            var _itemCount = _base.settings.original.itemCount;
            var _itemD = _base.settings.original.itemD;
            var _rows = _base.settings.original.rows;

            _base.$elem.removeClass(STACKEDCLASS);
            _base.$tabs.removeClass(zozo.classes.left).removeClass(zozo.classes.right).removeClass(zozo.classes.firstCol).removeClass(zozo.classes.lastCol).removeClass(zozo.classes.firstRow).removeClass(zozo.classes.lastRow)

            if (_base.settings.orientation === HORIZONTALCLASS) {
                
                var _compactResp = (_isCompact && (parseInt(_base.settings.original.count * _base.settings.original.itemWidth) >= _base.$container.width()))
                var _normalResp = (!_isCompact && _isContentLarger);
                var _isHorizontalResponsive = _compactResp || _normalResp;
                
                if (_isHorizontalResponsive) {
                    (_rows === _count || (_base.settings.mode === zozo.modes.stacked)) && (_base.$elem.addClass(STACKEDCLASS));
                   _base.$tabs.each(function (index) {
                       var _item = $(this);
                       var _currentIndex = (index + 1);

                       if (_base.settings.original.itemM > 0) {
                           if (_currentIndex <= _itemCount) {
                               _item.css({ "float": "", "width": _base.settings.original.firstRowWidth + "%" });
                           }
                           else {
                               _item.css({ "float": "", "width": _base.settings.original.lastItem + "%" });
                           }
                                                       
                           if (_isTop ===true) {
                               (index === (_itemD - 1)) ? _item.addClass(zozo.classes.right) : _item.removeClass(zozo.classes.right);
                           }
                           else{
                               (_currentIndex === _count) && (_item.addClass(zozo.classes.right));
                               (index === _base.settings.original.bottomLeft) && (_item.addClass(zozo.classes.left));
                           }

                           //console.log("_currentIndex: " + _currentIndex + " _itemD: " + _itemD + " _itemCount: " + _itemCount + " _rows: " + _rows + " _count: " + _count);
                           if (_rows > 1 && _itemD!==1) {
                               (_currentIndex === 1 || (_currentIndex > _itemD && (_currentIndex % _itemD === 1))) && (_item.addClass(zozo.classes.firstCol));
                               (_currentIndex === _count || (_currentIndex >= _itemD && (_currentIndex % _itemD === 0))) && (_item.addClass(zozo.classes.lastCol));

                               (_currentIndex <= _itemD) && (_item.addClass(zozo.classes.firstRow));
                               (_currentIndex > (_itemD * (_rows - 1))) && (_item.addClass(zozo.classes.lastRow));
                           }                         
                        }
                   });
                  
                   methods.switchResponsiveClasses(_base, true);                 
                } else {
                    if (_isCompact) {
                        var _percent = 100 / _base.settings.original.count;
                        _base.$tabs.each(function () { $(this).css({ "float": "", "width": _percent + "%" }) });
                    } else {
                        _base.$tabs.each(function () { $(this).css({ "float": "", "width": "" }) });
                    }
                    methods.switchResponsiveClasses(_base, false);
                }
                                              
                if (_windowSize >= 1200 && _base.responsive != zozo.responsive.largeDesktop) {                    
                    _base.responsive = zozo.responsive.largeDesktop;
                    methods.switchMenu(_base, false); 
                }
                 if (_base.responsive != zozo.responsive.phone && _enableMobileNav && ((_minWidthExecuted) || ((_maxRowsExecuted)))) {
                    _base.responsive = 'auto';
                    _base.$elem.removeClass(RESPONSIVECLASS)
                    _base.$tabs.each(function () { $(this).css({ "width": "" }) });
                    _base.$tabs.filter("li:first-child").addClass(zozo.classes.first);
                    _base.$tabs.filter("li:last-child").addClass(zozo.classes.last);
                    methods.switchMenu(_base, true);                    
                }               
            }
            else {
                // if (_enableMobileNav === true && (_windowSize <= zozo.responsive.phone || parseInt(_base.$elem.width() - _base.settings.original.itemWidth) < _base.settings.minWidth)) {  
                if (_enableMobileNav === true && (_minWidthExecuted || parseInt(_base.$elem.width() - _base.settings.original.itemWidth) < _base.settings.minWidth)) {
                    methods.switchMenu(_base, true);
                } else {                    
                    methods.switchMenu(_base, false);
                }                
            }            
            methods.refreshParents(_base, 0);
        },
        switchResponsiveClasses:function (_base, _resp) {               
            var _isTop = methods.isTop(_base);
            var _oriPos = _base.settings.original.position;
            var _topLeft = zozo.classes.positions.topLeft;
            var _bLeft = zozo.classes.positions.bottomLeft;
            if (_resp === true)
            {
                _base.$elem.addClass(RESPONSIVECLASS);
                methods.switchMenu(_base, false);
                _base.$elem.removeClass(_oriPos);
            }
            else {
                (_isTop === true) ? _base.$elem.removeClass(_topLeft).addClass(_oriPos) : _base.$elem.removeClass(_bLeft).addClass(_oriPos);
                methods.switchMenu(_base, false);
                _base.$elem.removeClass(RESPONSIVECLASS);                
               _base.$tabs.removeClass(zozo.classes.last).filter("li:last-child").addClass(zozo.classes.last);
            }
        },
        switchMenu: function (_base, _isMobile) {
            var _themes = zozo.classes.themes;
            var _sizes = zozo.classes.sizes;
            var _positions = $.zozo.core.utils.toArray(zozo.classes.positions);
          
            _base.$elem.removeClass(_themes.join(zozo.space));

            if (_isMobile === true) {                
                (_base.$mobileNav) && _base.$mobileNav.addClass(zozo.states.closed).show();
                _base.$tabGroup.addClass("z-hide-menu");
                _base.$elem.addClass(MOBILECLASS);
                _base.$elem.removeClass(_base.settings.orientation);
                _base.$elem.removeClass(_base.settings.position);

                (_base.settings.style === UNDERLINEDCLASS) ? _base.$elem.addClass("m-" + _base.settings.theme) : _base.$elem.addClass(_base.settings.theme);
            } else {                        
                _base.$elem.addClass(_base.settings.orientation);
                _base.$elem.addClass(_base.settings.theme);
                _base.$elem.addClass(_base.settings.position);

                (_base.$mobileNav) && _base.$mobileNav.removeClass(zozo.states.closed);
                _base.$tabGroup.removeClass("z-hide-menu");
                _base.$tabs.filter("li:first-child").addClass(zozo.classes.first);
                _base.$elem.removeClass(MOBILECLASS);
                (_base.$mobileNav) && _base.$mobileNav.hide();
            }
        },
        initAutoPlay: function (_base) {
            if (_base.settings.autoplay !== false && _base.settings.autoplay != null) {
                if (_base.settings.autoplay.interval > 0) {
                    _base.stop();
                    _base.autoplayIntervalId = setInterval(function () { _base.next(_base); }, _base.settings.autoplay.interval);
                } else {
                    _base.stop();
                }
            }
            else {
                _base.stop();
            }
        },
        changeHash: function (_base, tab) {
            var _prefix = (_base.settings.deeplinkingPrefix) ? _base.settings.deeplinkingPrefix : _base.tabID;
            if (_base.settings.animating !== true) {                
                if (_base.settings.deeplinking === true) {
                    if (typeof ($(window).hashchange) != "undefined") {
                        //window.zozo.debug.start();
                       
                        _base.Deeplinking.set(_prefix, tab, _base.settings.deeplinkingSeparator, _base.settings.deeplinkingMode);
                        //window.zozo.debug.stop();
                    }
                    else {
                        if (_base.BrowserDetection.isIE(7)) {
                            //IE and browsers that don't support hashchange                            
                            methods.showTab(_base, tab);
                        }
                        else {
                            //modern browsers                        
                            _base.Deeplinking.set(_prefix, tab, _base.settings.deeplinkingSeparator, _base.settings.deeplinkingMode);
                        }
                    }
                }
                else {
                    methods.showTab(_base, tab);
                }
            }
        },
        getFirst: function (_base) {
            return 0;
        },
        getLast: function (_base) {
            if (_base.settings.noTabs === true) {
                return parseInt(_base.$container.children("div").size()-1);
            }
            return parseInt(_base.$tabGroup.children("li").size()-1);
        },       
        isCompact: function (_base) {
            return (_base.settings.position === zozo.classes.positions.topCompact || _base.settings.position === zozo.classes.positions.bottomCompact)
        },
        isTop: function (_base) {           
            if (_base.settings.original.position === null)
            {
                _base.settings.original.position = _base.settings.position;
            }            
           return  (_base.settings.original.position.indexOf("top") >= 0);
        },
        isLightTheme: function (_base) {
            var _lightThemes = ["red", "deepblue", "blue", "green", "orange", "black"];
            var _isLight = true;
            var _isFlat = methods.isFlatTheme(_base);
            if (_base.settings.style !== UNDERLINEDCLASS) {
                ($.inArray(_base.settings.theme, _lightThemes) > -1) && (_isLight = false);
               (_isFlat) && (_isLight = false);
            }
            return _isLight;
        },
        isFlatTheme: function (_base) {
            return (_base.settings.theme.indexOf("flat") >= 0);
        },
        isResponsive: function (_base) {
            return (_base.$elem.hasClass(RESPONSIVECLASS) === true)
        },
        tabExist: function (_base, tab) {
            return (_base.$tabs.filter("li[" + _base.settings.hashAttribute + "='" + tab + "']").length> 0)
        },
        isMobile: function (_base) {
            return (_base.$elem.hasClass(MOBILECLASS) === true)
        },
        isTabDisabled:function (_tab) {
            return (_tab.hasClass(DISABLEDCLASS) || _tab.data(DISABLED) === true);
        },
        allowAutoScrolling: function (_base) {
            return (_base.settings.mobileAutoScrolling != null && _base.settings.mobileAutoScrolling != false)
        },
        getElementSize: function (_content) {
            var _size = { width: 0, height: 0 };
            if (_content == null || _content.length == 0) {
                return _size;
            }
         
            if (_content.is(":visible") === false) {
                _size.height = _content.show().find(">.z-content-inner").innerHeight();
                _size.width = _content.show().find(">.z-content-inner").outerWidth();
                if (_size.height >= 0) {
                    //_size.height = _content.height();
                }
                _content.hide();
            } else {
                _size.height = _content.find(">.z-content-inner").innerHeight();
                _size.width = _content.find(">.z-content-inner").outerWidth();

                if (_size.height >= 0) {
                    //_size.height = _content.height();
                }
            }
            (_content.hasClass("z-video") && ( _size.height= _content.innerHeight()));
          
            return _size;
        },
        getWidth: function (object) {
            if (object == null || object.length == 0) {
                return 0;
            }

            object = object.find("a");

            var value = object.outerWidth();
            //value += parseInt(object.css("padding-left"), 10) + parseInt(object.css("padding-right"), 10); //Total Padding Width
            value += parseInt(object.css("margin-left"), 10) + parseInt(object.css("margin-right"), 10); //Total Margin Width
            value += parseInt(object.css("borderLeftWidth"), 10) + parseInt(object.css("borderRightWidth"), 10); //Total Border Width
            return value;
        },
        isLarger: function (_small, _large) {
            var _r = _small;
            if (_small < _large)
            {
                _r = _large;
            }
            return _r;
        }
    };

    var transition = {
        init: function (_base, _tabElement) {           
            _base.$contents.hide()
            _tabElement.content.css({ "opacity": "", "left": "", "top": "", "position": "relative" }).show();
            setTimeout(function () {
                _base.$container.find(".z-tabs").each(function (index, item) {$(item).data('zozoTabs').refresh();});
                _base.$elem.trigger(SELECT, { tab: _tabElement.tab, content: _tabElement.content, index: _tabElement.index });

                _base.settings.animating = false;
            }, _tabElement.duration >= 0 ? 200 : _tabElement.duration);

            if (_base.settings.orientation === VERTICALCLASS) {
                /*set content height for animation*/                
                methods.setContentHeight(_base, _tabElement.content,true);
            }

            return _base;
        },
        before: function (_base, _tabElement) {
            setTimeout(function () {
                _tabElement.content.find(".z-tabs").each(function (index, item) { $(item).data('zozoTabs').refresh(); });
            }, 50);

            if (_base.settings.animation.effects !== zozo.animation.effects.none) {
                /*set content height for animation*/
                methods.setContentHeight(_base, _tabElement.preContent, true);
                methods.setContentHeight(_base, _tabElement.content);
            }
           
            _base.$container.addClass(ANIMATINGCLASS);
            _tabElement.preContent.css({ "position": "absolute", "display": "block", "left": 0, "top": 0 });
            _tabElement.content.css({ "position": "absolute", "display": "block" });

            return _base;
        },
        after: function (_base, _tabElement) {
            setTimeout(function () {
                _tabElement.content.css({ "position": "relative" });
                _tabElement.preContent.css({ "display": "none" });
            }, _tabElement.duration);

            /*hide all other tab contents*/
            _base.$contents.each(function (index, item) {                
                if (_tabElement.index != index && _tabElement.preIndex != index) {
                    $(item).css({ _transition: "", "position": "", "display": "", "left": "", "top": "" });
                }
            });

            setTimeout(function () {
                _base.$elem.trigger(SELECT, { tab: _tabElement.tab, content: _tabElement.content, index: _tabElement.index });
                _base.$elem.trigger(DEACTIVATE, { tab: _tabElement.preTab, content: _tabElement.preContent, index: _tabElement.preIndex });
              
                var _cssProperties = (_base.settings.orientation === VERTICALCLASS) ? { "height": "" } : { "height": "", "min-height": "", "overflow": "" };
                /*remove content height and set relative positioning*/

               _base.$container.css(_cssProperties);
               _base.$container.removeClass(ANIMATINGCLASS);
                             
                setTimeout(function () {
                    _base.$contents.removeClass(zozo.classes.active).eq(_tabElement.index).addClass(zozo.classes.active);
                    _base.settings.animating = false;
                    _base.$contents.stop(true, true);
                });
            }, _tabElement.duration+50);

            return _base;
        }
    };

    ZozoTabs.defaults = ZozoTabs.prototype.defaults;

    $.fn.zozoTabs = function (options) {
        return this.each(function () {
            if (undefined == $(this).data(zozo.pluginName)) {
                var zozoTabs = new ZozoTabs(this, options).init();
                $(this).data(zozo.pluginName, zozoTabs);
            }
        });
    };

    window.zozo.tabs = ZozoTabs;
  
    $(document).ready(function () {
        $("[data-role='z-tabs']").each(function (index, item) {
            if (!$(item).zozoTabs()) {
                $(item).zozoTabs();
            }
        });
    });
})(jQuery, window, document);