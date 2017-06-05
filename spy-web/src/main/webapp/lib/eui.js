var _easyui=function(jQuery) {
    //parser
    (function ($) {
        $.parser = {
            auto: true,
            onComplete: function (_1) {
            },
            plugins: ["draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form"],
            parse: function (_2) {
                var aa = [];
                for (var i = 0; i < $.parser.plugins.length; i++) {
                    var _3 = $.parser.plugins[i];
                    var r = $(".easyui-" + _3, _2);
                    if (r.length) {
                        if (r[_3]) {
                            r[_3]();
                        } else {
                            aa.push({name: _3, jq: r});
                        }
                    }
                }
                if (aa.length && window.easyloader) {
                    var _4 = [];
                    for (var i = 0; i < aa.length; i++) {
                        _4.push(aa[i].name);
                    }
                    easyloader.load(_4, function () {
                        for (var i = 0; i < aa.length; i++) {
                            var _5 = aa[i].name;
                            var jq = aa[i].jq;
                            jq[_5]();
                        }
                        $.parser.onComplete.call($.parser, _2);
                    });
                } else {
                    $.parser.onComplete.call($.parser, _2);
                }
            },
            parseValue: function (_6, _7, _8, _9) {
                _9 = _9 || 0;
                var v = $.trim(String(_7 || ""));
                var _a = v.substr(v.length - 1, 1);
                if (_a == "%") {
                    v = parseInt(v.substr(0, v.length - 1));
                    if (_6.toLowerCase().indexOf("width") >= 0) {
                        v = Math.floor((_8.width() - _9) * v / 100);
                    } else {
                        v = Math.floor((_8.height() - _9) * v / 100);
                    }
                } else {
                    v = parseInt(v) || undefined;
                }
                return v;
            },
            parseOptions: function (_b, _c) {
                var t = $(_b);
                var _d = {};
                var s = $.trim(t.attr("data-options"));
                if (s) {
                    if (s.substring(0, 1) != "{") {
                        s = "{" + s + "}";
                    }
                    _d = (new Function("return " + s))();
                }
                $.map(["width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight"], function (p) {
                    var pv = $.trim(_b.style[p] || "");
                    if (pv) {
                        if (pv.indexOf("%") == -1) {
                            pv = parseInt(pv) || undefined;
                        }
                        _d[p] = pv;
                    }
                });
                if (_c) {
                    var _e = {};
                    for (var i = 0; i < _c.length; i++) {
                        var pp = _c[i];
                        if (typeof pp == "string") {
                            _e[pp] = t.attr(pp);
                        } else {
                            for (var _f in pp) {
                                var _10 = pp[_f];
                                if (_10 == "boolean") {
                                    _e[_f] = t.attr(_f) ? (t.attr(_f) == "true") : undefined;
                                } else {
                                    if (_10 == "number") {
                                        _e[_f] = t.attr(_f) == "0" ? 0 : parseFloat(t.attr(_f)) || undefined;
                                    }
                                }
                            }
                        }
                    }
                    $.extend(_d, _e);
                }
                return _d;
            }
        };
        $(function () {
            var d = $("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
            $._boxModel = d.outerWidth() != 100;
            d.remove();
            if (!window.easyloader && $.parser.auto) {
                $.parser.parse();
            }
        });
        $.fn._outerWidth = function (_11) {
            if (_11 == undefined) {
                if (this[0] == window) {
                    return this.width() || document.body.clientWidth;
                }
                return this.outerWidth() || 0;
            }
            return this._size("width", _11);
        };
        $.fn._outerHeight = function (_12) {
            if (_12 == undefined) {
                if (this[0] == window) {
                    return this.height() || document.body.clientHeight;
                }
                return this.outerHeight() || 0;
            }
            return this._size("height", _12);
        };
        $.fn._scrollLeft = function (_13) {
            if (_13 == undefined) {
                return this.scrollLeft();
            } else {
                return this.each(function () {
                    $(this).scrollLeft(_13);
                });
            }
        };
        $.fn._propAttr = $.fn.prop || $.fn.attr;
        $.fn._size = function (_14, _15) {
            if (typeof _14 == "string") {
                if (_14 == "clear") {
                    return this.each(function () {
                        $(this).css({width: "", minWidth: "", maxWidth: "", height: "", minHeight: "", maxHeight: ""});
                    });
                } else {
                    if (_14 == "fit") {
                        return this.each(function () {
                            _16(this, this.tagName == "BODY" ? $("body") : $(this).parent(), true);
                        });
                    } else {
                        if (_14 == "unfit") {
                            return this.each(function () {
                                _16(this, $(this).parent(), false);
                            });
                        } else {
                            if (_15 == undefined) {
                                return _17(this[0], _14);
                            } else {
                                return this.each(function () {
                                    _17(this, _14, _15);
                                });
                            }
                        }
                    }
                }
            } else {
                return this.each(function () {
                    _15 = _15 || $(this).parent();
                    $.extend(_14, _16(this, _15, _14.fit) || {});
                    var r1 = _18(this, "width", _15, _14);
                    var r2 = _18(this, "height", _15, _14);
                    if (r1 || r2) {
                        $(this).addClass("easyui-fluid");
                    } else {
                        $(this).removeClass("easyui-fluid");
                    }
                });
            }
            function _16(_19, _1a, fit) {
                if (!_1a.length) {
                    return false;
                }
                var t = $(_19)[0];
                var p = _1a[0];
                var _1b = p.fcount || 0;
                if (fit) {
                    if (!t.fitted) {
                        t.fitted = true;
                        p.fcount = _1b + 1;
                        $(p).addClass("panel-noscroll");
                        if (p.tagName == "BODY") {
                            $("html").addClass("panel-fit");
                        }
                    }
                    return {width: ($(p).width() || 1), height: ($(p).height() || 1)};
                } else {
                    if (t.fitted) {
                        t.fitted = false;
                        p.fcount = _1b - 1;
                        if (p.fcount == 0) {
                            $(p).removeClass("panel-noscroll");
                            if (p.tagName == "BODY") {
                                $("html").removeClass("panel-fit");
                            }
                        }
                    }
                    return false;
                }
            };
            function _18(_1c, _1d, _1e, _1f) {
                var t = $(_1c);
                var p = _1d;
                var p1 = p.substr(0, 1).toUpperCase() + p.substr(1);
                var min = $.parser.parseValue("min" + p1, _1f["min" + p1], _1e);
                var max = $.parser.parseValue("max" + p1, _1f["max" + p1], _1e);
                var val = $.parser.parseValue(p, _1f[p], _1e);
                var _20 = (String(_1f[p] || "").indexOf("%") >= 0 ? true : false);
                if (!isNaN(val)) {
                    var v = Math.min(Math.max(val, min || 0), max || 99999);
                    if (!_20) {
                        _1f[p] = v;
                    }
                    t._size("min" + p1, "");
                    t._size("max" + p1, "");
                    t._size(p, v);
                } else {
                    t._size(p, "");
                    t._size("min" + p1, min);
                    t._size("max" + p1, max);
                }
                return _20 || _1f.fit;
            };
            function _17(_21, _22, _23) {
                var t = $(_21);
                if (_23 == undefined) {
                    _23 = parseInt(_21.style[_22]);
                    if (isNaN(_23)) {
                        return undefined;
                    }
                    if ($._boxModel) {
                        _23 += _24();
                    }
                    return _23;
                } else {
                    if (_23 === "") {
                        t.css(_22, "");
                    } else {
                        if ($._boxModel) {
                            _23 -= _24();
                            if (_23 < 0) {
                                _23 = 0;
                            }
                        }
                        t.css(_22, _23 + "px");
                    }
                }
                function _24() {
                    if (_22.toLowerCase().indexOf("width") >= 0) {
                        return t.outerWidth() - t.width();
                    } else {
                        return t.outerHeight() - t.height();
                    }
                };
            };
        };
    })(jQuery);
    //event
    (function ($) {
        var _25 = null;
        var _26 = null;
        var _27 = false;

        function _28(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (!_27) {
                _27 = true;
                dblClickTimer = setTimeout(function () {
                    _27 = false;
                }, 500);
            } else {
                clearTimeout(dblClickTimer);
                _27 = false;
                _29(e, "dblclick");
            }
            _25 = setTimeout(function () {
                _29(e, "contextmenu", 3);
            }, 1000);
            _29(e, "mousedown");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2a(e) {
            if (e.touches.length != 1) {
                return;
            }
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mousemove");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _2b(e) {
            if (_25) {
                clearTimeout(_25);
            }
            _29(e, "mouseup");
            if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
                e.preventDefault();
            }
        };
        function _29(e, _2c, _2d) {
            var _2e = new $.Event(_2c);
            _2e.pageX = e.changedTouches[0].pageX;
            _2e.pageY = e.changedTouches[0].pageY;
            _2e.which = _2d || 1;
            $(e.target).trigger(_2e);
        };
        if (document.addEventListener) {
            document.addEventListener("touchstart", _28, true);
            document.addEventListener("touchmove", _2a, true);
            document.addEventListener("touchend", _2b, true);
        }
    })(jQuery);
    //dragable
    (function ($) {
        function _2f(e) {
            var _30 = $.data(e.data.target, "draggable");
            var _31 = _30.options;
            var _32 = _30.proxy;
            var _33 = e.data;
            var _34 = _33.startLeft + e.pageX - _33.startX;
            var top = _33.startTop + e.pageY - _33.startY;
            if (_32) {
                if (_32.parent()[0] == document.body) {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 = e.pageX + _31.deltaX;
                    } else {
                        _34 = e.pageX - e.data.offsetWidth;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top = e.pageY + _31.deltaY;
                    } else {
                        top = e.pageY - e.data.offsetHeight;
                    }
                } else {
                    if (_31.deltaX != null && _31.deltaX != undefined) {
                        _34 += e.data.offsetWidth + _31.deltaX;
                    }
                    if (_31.deltaY != null && _31.deltaY != undefined) {
                        top += e.data.offsetHeight + _31.deltaY;
                    }
                }
            }
            if (e.data.parent != document.body) {
                _34 += $(e.data.parent).scrollLeft();
                top += $(e.data.parent).scrollTop();
            }
            if (_31.axis == "h") {
                _33.left = _34;
            } else {
                if (_31.axis == "v") {
                    _33.top = top;
                } else {
                    _33.left = _34;
                    _33.top = top;
                }
            }
        };
        function _35(e) {
            var _36 = $.data(e.data.target, "draggable");
            var _37 = _36.options;
            var _38 = _36.proxy;
            if (!_38) {
                _38 = $(e.data.target);
            }
            _38.css({left: e.data.left, top: e.data.top});
            $("body").css("cursor", _37.cursor);
        };
        function _39(e) {
            if (!$.fn.draggable.isDragging) {
                return false;
            }
            var _3a = $.data(e.data.target, "draggable");
            var _3b = _3a.options;
            var _3c = $(".droppable").filter(function () {
                return e.data.target != this;
            }).filter(function () {
                var _3d = $.data(this, "droppable").options.accept;
                if (_3d) {
                    return $(_3d).filter(function () {
                            return this == e.data.target;
                        }).length > 0;
                } else {
                    return true;
                }
            });
            _3a.droppables = _3c;
            var _3e = _3a.proxy;
            if (!_3e) {
                if (_3b.proxy) {
                    if (_3b.proxy == "clone") {
                        _3e = $(e.data.target).clone().insertAfter(e.data.target);
                    } else {
                        _3e = _3b.proxy.call(e.data.target, e.data.target);
                    }
                    _3a.proxy = _3e;
                } else {
                    _3e = $(e.data.target);
                }
            }
            _3e.css("position", "absolute");
            _2f(e);
            _35(e);
            _3b.onStartDrag.call(e.data.target, e);
            return false;
        };
        function _3f(e) {
            if (!$.fn.draggable.isDragging) {
                return false;
            }
            var _40 = $.data(e.data.target, "draggable");
            _2f(e);
            if (_40.options.onDrag.call(e.data.target, e) != false) {
                _35(e);
            }
            var _41 = e.data.target;
            _40.droppables.each(function () {
                var _42 = $(this);
                if (_42.droppable("options").disabled) {
                    return;
                }
                var p2 = _42.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + _42.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _42.outerHeight()) {
                    if (!this.entered) {
                        $(this).trigger("_dragenter", [_41]);
                        this.entered = true;
                    }
                    $(this).trigger("_dragover", [_41]);
                } else {
                    if (this.entered) {
                        $(this).trigger("_dragleave", [_41]);
                        this.entered = false;
                    }
                }
            });
            return false;
        };
        function _43(e) {
            if (!$.fn.draggable.isDragging) {
                _44();
                return false;
            }
            _3f(e);
            var _45 = $.data(e.data.target, "draggable");
            var _46 = _45.proxy;
            var _47 = _45.options;
            if (_47.revert) {
                if (_48() == true) {
                    $(e.data.target).css({
                        position: e.data.startPosition,
                        left: e.data.startLeft,
                        top: e.data.startTop
                    });
                } else {
                    if (_46) {
                        var _49, top;
                        if (_46.parent()[0] == document.body) {
                            _49 = e.data.startX - e.data.offsetWidth;
                            top = e.data.startY - e.data.offsetHeight;
                        } else {
                            _49 = e.data.startLeft;
                            top = e.data.startTop;
                        }
                        _46.animate({left: _49, top: top}, function () {
                            _4a();
                        });
                    } else {
                        $(e.data.target).animate({left: e.data.startLeft, top: e.data.startTop}, function () {
                            $(e.data.target).css("position", e.data.startPosition);
                        });
                    }
                }
            } else {
                $(e.data.target).css({position: "absolute", left: e.data.left, top: e.data.top});
                _48();
            }
            _47.onStopDrag.call(e.data.target, e);
            _44();
            function _4a() {
                if (_46) {
                    _46.remove();
                }
                _45.proxy = null;
            };
            function _48() {
                var _4b = false;
                _45.droppables.each(function () {
                    var _4c = $(this);
                    if (_4c.droppable("options").disabled) {
                        return;
                    }
                    var p2 = _4c.offset();
                    if (e.pageX > p2.left && e.pageX < p2.left + _4c.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _4c.outerHeight()) {
                        if (_47.revert) {
                            $(e.data.target).css({
                                position: e.data.startPosition,
                                left: e.data.startLeft,
                                top: e.data.startTop
                            });
                        }
                        $(this).trigger("_drop", [e.data.target]);
                        _4a();
                        _4b = true;
                        this.entered = false;
                        return false;
                    }
                });
                if (!_4b && !_47.revert) {
                    _4a();
                }
                return _4b;
            };
            return false;
        };
        function _44() {
            if ($.fn.draggable.timer) {
                clearTimeout($.fn.draggable.timer);
                $.fn.draggable.timer = undefined;
            }
            $(document).unbind(".draggable");
            $.fn.draggable.isDragging = false;
            setTimeout(function () {
                $("body").css("cursor", "");
            }, 100);
        };
        $.fn.draggable = function (_4d, _4e) {
            if (typeof _4d == "string") {
                return $.fn.draggable.methods[_4d](this, _4e);
            }
            return this.each(function () {
                var _4f;
                var _50 = $.data(this, "draggable");
                if (_50) {
                    _50.handle.unbind(".draggable");
                    _4f = $.extend(_50.options, _4d);
                } else {
                    _4f = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), _4d || {});
                }
                var _51 = _4f.handle ? (typeof _4f.handle == "string" ? $(_4f.handle, this) : _4f.handle) : $(this);
                $.data(this, "draggable", {options: _4f, handle: _51});
                if (_4f.disabled) {
                    $(this).css("cursor", "");
                    return;
                }
                _51.unbind(".draggable").bind("mousemove.draggable", {target: this}, function (e) {
                    if ($.fn.draggable.isDragging) {
                        return;
                    }
                    var _52 = $.data(e.data.target, "draggable").options;
                    if (_53(e)) {
                        $(this).css("cursor", _52.cursor);
                    } else {
                        $(this).css("cursor", "");
                    }
                }).bind("mouseleave.draggable", {target: this}, function (e) {
                    $(this).css("cursor", "");
                }).bind("mousedown.draggable", {target: this}, function (e) {
                    if (_53(e) == false) {
                        return;
                    }
                    $(this).css("cursor", "");
                    var _54 = $(e.data.target).position();
                    var _55 = $(e.data.target).offset();
                    var _56 = {
                        startPosition: $(e.data.target).css("position"),
                        startLeft: _54.left,
                        startTop: _54.top,
                        left: _54.left,
                        top: _54.top,
                        startX: e.pageX,
                        startY: e.pageY,
                        offsetWidth: (e.pageX - _55.left),
                        offsetHeight: (e.pageY - _55.top),
                        target: e.data.target,
                        parent: $(e.data.target).parent()[0]
                    };
                    $.extend(e.data, _56);
                    var _57 = $.data(e.data.target, "draggable").options;
                    if (_57.onBeforeDrag.call(e.data.target, e) == false) {
                        return;
                    }
                    $(document).bind("mousedown.draggable", e.data, _39);
                    $(document).bind("mousemove.draggable", e.data, _3f);
                    $(document).bind("mouseup.draggable", e.data, _43);
                    $.fn.draggable.timer = setTimeout(function () {
                        $.fn.draggable.isDragging = true;
                        _39(e);
                    }, _57.delay);
                    return false;
                });
                function _53(e) {
                    var _58 = $.data(e.data.target, "draggable");
                    var _59 = _58.handle;
                    var _5a = $(_59).offset();
                    var _5b = $(_59).outerWidth();
                    var _5c = $(_59).outerHeight();
                    var t = e.pageY - _5a.top;
                    var r = _5a.left + _5b - e.pageX;
                    var b = _5a.top + _5c - e.pageY;
                    var l = e.pageX - _5a.left;
                    return Math.min(t, r, b, l) > _58.options.edge;
                };
            });
        };
        $.fn.draggable.methods = {
            options: function (jq) {
                return $.data(jq[0], "draggable").options;
            }, proxy: function (jq) {
                return $.data(jq[0], "draggable").proxy;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).draggable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).draggable({disabled: true});
                });
            }
        };
        $.fn.draggable.parseOptions = function (_5d) {
            var t = $(_5d);
            return $.extend({}, $.parser.parseOptions(_5d, ["cursor", "handle", "axis", {
                "revert": "boolean",
                "deltaX": "number",
                "deltaY": "number",
                "edge": "number",
                "delay": "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.draggable.defaults = {
            proxy: null,
            revert: false,
            cursor: "move",
            deltaX: null,
            deltaY: null,
            handle: null,
            disabled: false,
            edge: 0,
            axis: null,
            delay: 100,
            onBeforeDrag: function (e) {
            },
            onStartDrag: function (e) {
            },
            onDrag: function (e) {
            },
            onStopDrag: function (e) {
            }
        };
        $.fn.draggable.isDragging = false;
    })(jQuery);
    //dropable
    (function ($) {
        function _5e(_5f) {
            $(_5f).addClass("droppable");
            $(_5f).bind("_dragenter", function (e, _60) {
                $.data(_5f, "droppable").options.onDragEnter.apply(_5f, [e, _60]);
            });
            $(_5f).bind("_dragleave", function (e, _61) {
                $.data(_5f, "droppable").options.onDragLeave.apply(_5f, [e, _61]);
            });
            $(_5f).bind("_dragover", function (e, _62) {
                $.data(_5f, "droppable").options.onDragOver.apply(_5f, [e, _62]);
            });
            $(_5f).bind("_drop", function (e, _63) {
                $.data(_5f, "droppable").options.onDrop.apply(_5f, [e, _63]);
            });
        };
        $.fn.droppable = function (_64, _65) {
            if (typeof _64 == "string") {
                return $.fn.droppable.methods[_64](this, _65);
            }
            _64 = _64 || {};
            return this.each(function () {
                var _66 = $.data(this, "droppable");
                if (_66) {
                    $.extend(_66.options, _64);
                } else {
                    _5e(this);
                    $.data(this, "droppable", {options: $.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), _64)});
                }
            });
        };
        $.fn.droppable.methods = {
            options: function (jq) {
                return $.data(jq[0], "droppable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).droppable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).droppable({disabled: true});
                });
            }
        };
        $.fn.droppable.parseOptions = function (_67) {
            var t = $(_67);
            return $.extend({}, $.parser.parseOptions(_67, ["accept"]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.droppable.defaults = {
            accept: null, disabled: false, onDragEnter: function (e, _68) {
            }, onDragOver: function (e, _69) {
            }, onDragLeave: function (e, _6a) {
            }, onDrop: function (e, _6b) {
            }
        };
    })(jQuery);
    //resizeable
    (function ($) {
        $.fn.resizable = function (_6c, _6d) {
            if (typeof _6c == "string") {
                return $.fn.resizable.methods[_6c](this, _6d);
            }
            function _6e(e) {
                var _6f = e.data;
                var _70 = $.data(_6f.target, "resizable").options;
                if (_6f.dir.indexOf("e") != -1) {
                    var _71 = _6f.startWidth + e.pageX - _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                }
                if (_6f.dir.indexOf("s") != -1) {
                    var _72 = _6f.startHeight + e.pageY - _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                }
                if (_6f.dir.indexOf("w") != -1) {
                    var _71 = _6f.startWidth - e.pageX + _6f.startX;
                    _71 = Math.min(Math.max(_71, _70.minWidth), _70.maxWidth);
                    _6f.width = _71;
                    _6f.left = _6f.startLeft + _6f.startWidth - _6f.width;
                }
                if (_6f.dir.indexOf("n") != -1) {
                    var _72 = _6f.startHeight - e.pageY + _6f.startY;
                    _72 = Math.min(Math.max(_72, _70.minHeight), _70.maxHeight);
                    _6f.height = _72;
                    _6f.top = _6f.startTop + _6f.startHeight - _6f.height;
                }
            };
            function _73(e) {
                var _74 = e.data;
                var t = $(_74.target);
                t.css({left: _74.left, top: _74.top});
                if (t.outerWidth() != _74.width) {
                    t._outerWidth(_74.width);
                }
                if (t.outerHeight() != _74.height) {
                    t._outerHeight(_74.height);
                }
            };
            function _75(e) {
                $.fn.resizable.isResizing = true;
                $.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
                return false;
            };
            function _76(e) {
                _6e(e);
                if ($.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
                    _73(e);
                }
                return false;
            };
            function _77(e) {
                $.fn.resizable.isResizing = false;
                _6e(e, true);
                _73(e);
                $.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
                $(document).unbind(".resizable");
                $("body").css("cursor", "");
                return false;
            };
            return this.each(function () {
                var _78 = null;
                var _79 = $.data(this, "resizable");
                if (_79) {
                    $(this).unbind(".resizable");
                    _78 = $.extend(_79.options, _6c || {});
                } else {
                    _78 = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), _6c || {});
                    $.data(this, "resizable", {options: _78});
                }
                if (_78.disabled == true) {
                    return;
                }
                $(this).bind("mousemove.resizable", {target: this}, function (e) {
                    if ($.fn.resizable.isResizing) {
                        return;
                    }
                    var dir = _7a(e);
                    if (dir == "") {
                        $(e.data.target).css("cursor", "");
                    } else {
                        $(e.data.target).css("cursor", dir + "-resize");
                    }
                }).bind("mouseleave.resizable", {target: this}, function (e) {
                    $(e.data.target).css("cursor", "");
                }).bind("mousedown.resizable", {target: this}, function (e) {
                    var dir = _7a(e);
                    if (dir == "") {
                        return;
                    }
                    function _7b(css) {
                        var val = parseInt($(e.data.target).css(css));
                        if (isNaN(val)) {
                            return 0;
                        } else {
                            return val;
                        }
                    };
                    var _7c = {
                        target: e.data.target,
                        dir: dir,
                        startLeft: _7b("left"),
                        startTop: _7b("top"),
                        left: _7b("left"),
                        top: _7b("top"),
                        startX: e.pageX,
                        startY: e.pageY,
                        startWidth: $(e.data.target).outerWidth(),
                        startHeight: $(e.data.target).outerHeight(),
                        width: $(e.data.target).outerWidth(),
                        height: $(e.data.target).outerHeight(),
                        deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(),
                        deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height()
                    };
                    $(document).bind("mousedown.resizable", _7c, _75);
                    $(document).bind("mousemove.resizable", _7c, _76);
                    $(document).bind("mouseup.resizable", _7c, _77);
                    $("body").css("cursor", dir + "-resize");
                });
                function _7a(e) {
                    var tt = $(e.data.target);
                    var dir = "";
                    var _7d = tt.offset();
                    var _7e = tt.outerWidth();
                    var _7f = tt.outerHeight();
                    var _80 = _78.edge;
                    if (e.pageY > _7d.top && e.pageY < _7d.top + _80) {
                        dir += "n";
                    } else {
                        if (e.pageY < _7d.top + _7f && e.pageY > _7d.top + _7f - _80) {
                            dir += "s";
                        }
                    }
                    if (e.pageX > _7d.left && e.pageX < _7d.left + _80) {
                        dir += "w";
                    } else {
                        if (e.pageX < _7d.left + _7e && e.pageX > _7d.left + _7e - _80) {
                            dir += "e";
                        }
                    }
                    var _81 = _78.handles.split(",");
                    for (var i = 0; i < _81.length; i++) {
                        var _82 = _81[i].replace(/(^\s*)|(\s*$)/g, "");
                        if (_82 == "all" || _82 == dir) {
                            return dir;
                        }
                    }
                    return "";
                };
            });
        };
        $.fn.resizable.methods = {
            options: function (jq) {
                return $.data(jq[0], "resizable").options;
            }, enable: function (jq) {
                return jq.each(function () {
                    $(this).resizable({disabled: false});
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    $(this).resizable({disabled: true});
                });
            }
        };
        $.fn.resizable.parseOptions = function (_83) {
            var t = $(_83);
            return $.extend({}, $.parser.parseOptions(_83, ["handles", {
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number",
                edge: "number"
            }]), {disabled: (t.attr("disabled") ? true : undefined)});
        };
        $.fn.resizable.defaults = {
            disabled: false,
            handles: "n, e, s, w, ne, se, sw, nw, all",
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000,
            edge: 5,
            onStartResize: function (e) {
            },
            onResize: function (e) {
            },
            onStopResize: function (e) {
            }
        };
        $.fn.resizable.isResizing = false;
    })(jQuery);
    //linkbutton
    (function ($) {
        function _84(_85, _86) {
            var _87 = $.data(_85, "linkbutton").options;
            if (_86) {
                $.extend(_87, _86);
            }
            if (_87.width || _87.height || _87.fit) {
                var btn = $(_85);
                var _88 = btn.parent();
                var _89 = btn.is(":visible");
                if (!_89) {
                    var _8a = $("<div style=\"display:none\"></div>").insertBefore(_85);
                    var _8b = {position: btn.css("position"), display: btn.css("display"), left: btn.css("left")};
                    btn.appendTo("body");
                    btn.css({position: "absolute", display: "inline-block", left: -20000});
                }
                btn._size(_87, _88);
                var _8c = btn.find(".l-btn-left");
                _8c.css("margin-top", 0);
                _8c.css("margin-top", parseInt((btn.height() - _8c.height()) / 2) + "px");
                if (!_89) {
                    btn.insertAfter(_8a);
                    btn.css(_8b);
                    _8a.remove();
                }
            }
        };
        function _8d(_8e) {
            var _8f = $.data(_8e, "linkbutton").options;
            var t = $(_8e).empty();
            t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
            t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + _8f.size);
            if (_8f.plain) {
                t.addClass("l-btn-plain");
            }
            if (_8f.outline) {
                t.addClass("l-btn-outline");
            }
            if (_8f.selected) {
                t.addClass(_8f.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            }
            t.attr("group", _8f.group || "");
            t.attr("id", _8f.id || "");
            var _90 = $("<span class=\"l-btn-left\"></span>").appendTo(t);
            if (_8f.text) {
                $("<span class=\"l-btn-text\"></span>").html(_8f.text).appendTo(_90);
            } else {
                $("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_90);
            }
            if (_8f.iconCls) {
                $("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_8f.iconCls).appendTo(_90);
                _90.addClass("l-btn-icon-" + _8f.iconAlign);
            }
            t.unbind(".linkbutton").bind("focus.linkbutton", function () {
                if (!_8f.disabled) {
                    $(this).addClass("l-btn-focus");
                }
            }).bind("blur.linkbutton", function () {
                $(this).removeClass("l-btn-focus");
            }).bind("click.linkbutton", function () {
                if (!_8f.disabled) {
                    if (_8f.toggle) {
                        if (_8f.selected) {
                            $(this).linkbutton("unselect");
                        } else {
                            $(this).linkbutton("select");
                        }
                    }
                    _8f.onClick.call(this);
                }
            });
            _91(_8e, _8f.selected);
            _92(_8e, _8f.disabled);
        };
        function _91(_93, _94) {
            var _95 = $.data(_93, "linkbutton").options;
            if (_94) {
                if (_95.group) {
                    $("a.l-btn[group=\"" + _95.group + "\"]").each(function () {
                        var o = $(this).linkbutton("options");
                        if (o.toggle) {
                            $(this).removeClass("l-btn-selected l-btn-plain-selected");
                            o.selected = false;
                        }
                    });
                }
                $(_93).addClass(_95.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
                _95.selected = true;
            } else {
                if (!_95.group) {
                    $(_93).removeClass("l-btn-selected l-btn-plain-selected");
                    _95.selected = false;
                }
            }
        };
        function _92(_96, _97) {
            var _98 = $.data(_96, "linkbutton");
            var _99 = _98.options;
            $(_96).removeClass("l-btn-disabled l-btn-plain-disabled");
            if (_97) {
                _99.disabled = true;
                var _9a = $(_96).attr("href");
                if (_9a) {
                    _98.href = _9a;
                    $(_96).attr("href", "javascript:void(0)");
                }
                if (_96.onclick) {
                    _98.onclick = _96.onclick;
                    _96.onclick = null;
                }
                _99.plain ? $(_96).addClass("l-btn-disabled l-btn-plain-disabled") : $(_96).addClass("l-btn-disabled");
            } else {
                _99.disabled = false;
                if (_98.href) {
                    $(_96).attr("href", _98.href);
                }
                if (_98.onclick) {
                    _96.onclick = _98.onclick;
                }
            }
        };
        $.fn.linkbutton = function (_9b, _9c) {
            if (typeof _9b == "string") {
                return $.fn.linkbutton.methods[_9b](this, _9c);
            }
            _9b = _9b || {};
            return this.each(function () {
                var _9d = $.data(this, "linkbutton");
                if (_9d) {
                    $.extend(_9d.options, _9b);
                } else {
                    $.data(this, "linkbutton", {options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), _9b)});
                    $(this).removeAttr("disabled");
                    $(this).bind("_resize", function (e, _9e) {
                        if ($(this).hasClass("easyui-fluid") || _9e) {
                            _84(this);
                        }
                        return false;
                    });
                }
                _8d(this);
                _84(this);
            });
        };
        $.fn.linkbutton.methods = {
            options: function (jq) {
                return $.data(jq[0], "linkbutton").options;
            }, resize: function (jq, _9f) {
                return jq.each(function () {
                    _84(this, _9f);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _92(this, false);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _92(this, true);
                });
            }, select: function (jq) {
                return jq.each(function () {
                    _91(this, true);
                });
            }, unselect: function (jq) {
                return jq.each(function () {
                    _91(this, false);
                });
            }
        };
        $.fn.linkbutton.parseOptions = function (_a0) {
            var t = $(_a0);
            return $.extend({}, $.parser.parseOptions(_a0, ["id", "iconCls", "iconAlign", "group", "size", {
                plain: "boolean",
                toggle: "boolean",
                selected: "boolean",
                outline: "boolean"
            }]), {
                disabled: (t.attr("disabled") ? true : undefined),
                text: $.trim(t.html()),
                iconCls: (t.attr("icon") || t.attr("iconCls"))
            });
        };
        $.fn.linkbutton.defaults = {
            id: null,
            disabled: false,
            toggle: false,
            selected: false,
            outline: false,
            group: null,
            plain: false,
            text: "",
            iconCls: null,
            iconAlign: "left",
            size: "small",
            onClick: function () {
            }
        };
    })(jQuery);
    //pagination deleted
    //tree deleted
    //progtess deleted
    //tooltip
    (function ($) {
        function init(_1eb) {
            $(_1eb).addClass("tooltip-f");
        };
        function _1ec(_1ed) {
            var opts = $.data(_1ed, "tooltip").options;
            $(_1ed).unbind(".tooltip").bind(opts.showEvent + ".tooltip", function (e) {
                $(_1ed).tooltip("show", e);
            }).bind(opts.hideEvent + ".tooltip", function (e) {
                $(_1ed).tooltip("hide", e);
            }).bind("mousemove.tooltip", function (e) {
                if (opts.trackMouse) {
                    opts.trackMouseX = e.pageX;
                    opts.trackMouseY = e.pageY;
                    $(_1ed).tooltip("reposition");
                }
            });
        };
        function _1ee(_1ef) {
            var _1f0 = $.data(_1ef, "tooltip");
            if (_1f0.showTimer) {
                clearTimeout(_1f0.showTimer);
                _1f0.showTimer = null;
            }
            if (_1f0.hideTimer) {
                clearTimeout(_1f0.hideTimer);
                _1f0.hideTimer = null;
            }
        };
        function _1f1(_1f2) {
            var _1f3 = $.data(_1f2, "tooltip");
            if (!_1f3 || !_1f3.tip) {
                return;
            }
            var opts = _1f3.options;
            var tip = _1f3.tip;
            var pos = {left: -100000, top: -100000};
            if ($(_1f2).is(":visible")) {
                pos = _1f4(opts.position);
                if (opts.position == "top" && pos.top < 0) {
                    pos = _1f4("bottom");
                } else {
                    if ((opts.position == "bottom") && (pos.top + tip._outerHeight() > $(window)._outerHeight() + $(document).scrollTop())) {
                        pos = _1f4("top");
                    }
                }
                if (pos.left < 0) {
                    if (opts.position == "left") {
                        pos = _1f4("right");
                    } else {
                        $(_1f2).tooltip("arrow").css("left", tip._outerWidth() / 2 + pos.left);
                        pos.left = 0;
                    }
                } else {
                    if (pos.left + tip._outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                        if (opts.position == "right") {
                            pos = _1f4("left");
                        } else {
                            var left = pos.left;
                            pos.left = $(window)._outerWidth() + $(document)._scrollLeft() - tip._outerWidth();
                            $(_1f2).tooltip("arrow").css("left", tip._outerWidth() / 2 - (pos.left - left));
                        }
                    }
                }
            }
            tip.css({
                left: pos.left,
                top: pos.top,
                zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : ""))
            });
            opts.onPosition.call(_1f2, pos.left, pos.top);
            function _1f4(_1f5) {
                opts.position = _1f5 || "bottom";
                tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + opts.position);
                var left, top;
                if (opts.trackMouse) {
                    t = $();
                    left = opts.trackMouseX + opts.deltaX;
                    top = opts.trackMouseY + opts.deltaY;
                } else {
                    var t = $(_1f2);
                    left = t.offset().left + opts.deltaX;
                    top = t.offset().top + opts.deltaY;
                }
                switch (opts.position) {
                    case "right":
                        left += t._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "left":
                        left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                        top -= (tip._outerHeight() - t._outerHeight()) / 2;
                        break;
                    case "top":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                    case "bottom":
                        left -= (tip._outerWidth() - t._outerWidth()) / 2;
                        top += t._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                        break;
                }
                return {left: left, top: top};
            };
        };
        function _1f6(_1f7, e) {
            var _1f8 = $.data(_1f7, "tooltip");
            var opts = _1f8.options;
            var tip = _1f8.tip;
            if (!tip) {
                tip = $("<div tabindex=\"-1\" class=\"tooltip\">" + "<div class=\"tooltip-content\"></div>" + "<div class=\"tooltip-arrow-outer\"></div>" + "<div class=\"tooltip-arrow\"></div>" + "</div>").appendTo("body");
                _1f8.tip = tip;
                _1f9(_1f7);
            }
            _1ee(_1f7);
            _1f8.showTimer = setTimeout(function () {
                $(_1f7).tooltip("reposition");
                tip.show();
                opts.onShow.call(_1f7, e);
                var _1fa = tip.children(".tooltip-arrow-outer");
                var _1fb = tip.children(".tooltip-arrow");
                var bc = "border-" + opts.position + "-color";
                _1fa.add(_1fb).css({
                    borderTopColor: "",
                    borderBottomColor: "",
                    borderLeftColor: "",
                    borderRightColor: ""
                });
                _1fa.css(bc, tip.css(bc));
                _1fb.css(bc, tip.css("backgroundColor"));
            }, opts.showDelay);
        };
        function _1fc(_1fd, e) {
            var _1fe = $.data(_1fd, "tooltip");
            if (_1fe && _1fe.tip) {
                _1ee(_1fd);
                _1fe.hideTimer = setTimeout(function () {
                    _1fe.tip.hide();
                    _1fe.options.onHide.call(_1fd, e);
                }, _1fe.options.hideDelay);
            }
        };
        function _1f9(_1ff, _200) {
            var _201 = $.data(_1ff, "tooltip");
            var opts = _201.options;
            if (_200) {
                opts.content = _200;
            }
            if (!_201.tip) {
                return;
            }
            var cc = typeof opts.content == "function" ? opts.content.call(_1ff) : opts.content;
            _201.tip.children(".tooltip-content").html(cc);
            opts.onUpdate.call(_1ff, cc);
        };
        function _202(_203) {
            var _204 = $.data(_203, "tooltip");
            if (_204) {
                _1ee(_203);
                var opts = _204.options;
                if (_204.tip) {
                    _204.tip.remove();
                }
                if (opts._title) {
                    $(_203).attr("title", opts._title);
                }
                $.removeData(_203, "tooltip");
                $(_203).unbind(".tooltip").removeClass("tooltip-f");
                opts.onDestroy.call(_203);
            }
        };
        $.fn.tooltip = function (_205, _206) {
            if (typeof _205 == "string") {
                return $.fn.tooltip.methods[_205](this, _206);
            }
            _205 = _205 || {};
            return this.each(function () {
                var _207 = $.data(this, "tooltip");
                if (_207) {
                    $.extend(_207.options, _205);
                } else {
                    $.data(this, "tooltip", {options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _205)});
                    init(this);
                }
                _1ec(this);
                _1f9(this);
            });
        };
        $.fn.tooltip.methods = {
            options: function (jq) {
                return $.data(jq[0], "tooltip").options;
            }, tip: function (jq) {
                return $.data(jq[0], "tooltip").tip;
            }, arrow: function (jq) {
                return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
            }, show: function (jq, e) {
                return jq.each(function () {
                    _1f6(this, e);
                });
            }, hide: function (jq, e) {
                return jq.each(function () {
                    _1fc(this, e);
                });
            }, update: function (jq, _208) {
                return jq.each(function () {
                    _1f9(this, _208);
                });
            }, reposition: function (jq) {
                return jq.each(function () {
                    _1f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _202(this);
                });
            }
        };
        $.fn.tooltip.parseOptions = function (_209) {
            var t = $(_209);
            var opts = $.extend({}, $.parser.parseOptions(_209, ["position", "showEvent", "hideEvent", "content", {
                trackMouse: "boolean",
                deltaX: "number",
                deltaY: "number",
                showDelay: "number",
                hideDelay: "number"
            }]), {_title: t.attr("title")});
            t.attr("title", "");
            if (!opts.content) {
                opts.content = opts._title;
            }
            return opts;
        };
        $.fn.tooltip.defaults = {
            position: "bottom",
            content: null,
            trackMouse: false,
            deltaX: 0,
            deltaY: 0,
            showEvent: "mouseenter",
            hideEvent: "mouseleave",
            showDelay: 200,
            hideDelay: 100,
            onShow: function (e) {
            },
            onHide: function (e) {
            },
            onUpdate: function (_20a) {
            },
            onPosition: function (left, top) {
            },
            onDestroy: function () {
            }
        };
    })(jQuery);
    //pannel
    (function ($) {
        $.fn._remove = function () {
            return this.each(function () {
                $(this).remove();
                try {
                    this.outerHTML = "";
                }
                catch (err) {
                }
            });
        };
        function _20b(node) {
            node._remove();
        };
        function _20c(_20d, _20e) {
            var _20f = $.data(_20d, "panel");
            var opts = _20f.options;
            var _210 = _20f.panel;
            var _211 = _210.children(".panel-header");
            var _212 = _210.children(".panel-body");
            var _213 = _210.children(".panel-footer");
            if (_20e) {
                $.extend(opts, {
                    width: _20e.width,
                    height: _20e.height,
                    minWidth: _20e.minWidth,
                    maxWidth: _20e.maxWidth,
                    minHeight: _20e.minHeight,
                    maxHeight: _20e.maxHeight,
                    left: _20e.left,
                    top: _20e.top
                });
            }
            _210._size(opts);
            _211.add(_212)._outerWidth(_210.width());
            if (!isNaN(parseInt(opts.height))) {
                _212._outerHeight(_210.height() - _211._outerHeight() - _213._outerHeight());
            } else {
                _212.css("height", "");
                var min = $.parser.parseValue("minHeight", opts.minHeight, _210.parent());
                var max = $.parser.parseValue("maxHeight", opts.maxHeight, _210.parent());
                var _214 = _211._outerHeight() + _213._outerHeight() + _210._outerHeight() - _210.height();
                _212._size("minHeight", min ? (min - _214) : "");
                _212._size("maxHeight", max ? (max - _214) : "");
            }
            _210.css({height: "", minHeight: "", maxHeight: "", left: opts.left, top: opts.top});
            opts.onResize.apply(_20d, [opts.width, opts.height]);
            $(_20d).panel("doLayout");
        };
        function _215(_216, _217) {
            var opts = $.data(_216, "panel").options;
            var _218 = $.data(_216, "panel").panel;
            if (_217) {
                if (_217.left != null) {
                    opts.left = _217.left;
                }
                if (_217.top != null) {
                    opts.top = _217.top;
                }
            }
            _218.css({left: opts.left, top: opts.top});
            opts.onMove.apply(_216, [opts.left, opts.top]);
        };
        function _219(_21a) {
            $(_21a).addClass("panel-body")._size("clear");
            var _21b = $("<div class=\"panel\"></div>").insertBefore(_21a);
            _21b[0].appendChild(_21a);
            _21b.bind("_resize", function (e, _21c) {
                if ($(this).hasClass("easyui-fluid") || _21c) {
                    _20c(_21a);
                }
                return false;
            });
            return _21b;
        };
        function _21d(_21e) {
            var _21f = $.data(_21e, "panel");
            var opts = _21f.options;
            var _220 = _21f.panel;
            _220.css(opts.style);
            _220.addClass(opts.cls);
            _221();
            _222();
            var _223 = $(_21e).panel("header");
            var body = $(_21e).panel("body");
            var _224 = $(_21e).siblings(".panel-footer");
            if (opts.border) {
                _223.removeClass("panel-header-noborder");
                body.removeClass("panel-body-noborder");
                _224.removeClass("panel-footer-noborder");
            } else {
                _223.addClass("panel-header-noborder");
                body.addClass("panel-body-noborder");
                _224.addClass("panel-footer-noborder");
            }
            _223.addClass(opts.headerCls);
            body.addClass(opts.bodyCls);
            $(_21e).attr("id", opts.id || "");
            if (opts.content) {
                $(_21e).panel("clear");
                $(_21e).html(opts.content);
                $.parser.parse($(_21e));
            }
            function _221() {
                if (opts.noheader || (!opts.title && !opts.header)) {
                    _20b(_220.children(".panel-header"));
                    _220.children(".panel-body").addClass("panel-body-noheader");
                } else {
                    if (opts.header) {
                        $(opts.header).addClass("panel-header").prependTo(_220);
                    } else {
                        var _225 = _220.children(".panel-header");
                        if (!_225.length) {
                            _225 = $("<div class=\"panel-header\"></div>").prependTo(_220);
                        }
                        if (!$.isArray(opts.tools)) {
                            _225.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
                        }
                        _225.empty();
                        var _226 = $("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_225);
                        if (opts.iconCls) {
                            _226.addClass("panel-with-icon");
                            $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_225);
                        }
                        var tool = $("<div class=\"panel-tool\"></div>").appendTo(_225);
                        tool.bind("click", function (e) {
                            e.stopPropagation();
                        });
                        if (opts.tools) {
                            if ($.isArray(opts.tools)) {
                                $.map(opts.tools, function (t) {
                                    _227(tool, t.iconCls, eval(t.handler));
                                });
                            } else {
                                $(opts.tools).children().each(function () {
                                    $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                                });
                            }
                        }
                        if (opts.collapsible) {
                            _227(tool, "panel-tool-collapse", function () {
                                if (opts.collapsed == true) {
                                    _245(_21e, true);
                                } else {
                                    _238(_21e, true);
                                }
                            });
                        }
                        if (opts.minimizable) {
                            _227(tool, "panel-tool-min", function () {
                                _24b(_21e);
                            });
                        }
                        if (opts.maximizable) {
                            _227(tool, "panel-tool-max", function () {
                                if (opts.maximized == true) {
                                    _24e(_21e);
                                } else {
                                    _237(_21e);
                                }
                            });
                        }
                        if (opts.closable) {
                            _227(tool, "panel-tool-close", function () {
                                _239(_21e);
                            });
                        }
                    }
                    _220.children("div.panel-body").removeClass("panel-body-noheader");
                }
            };
            function _227(c, icon, _228) {
                var a = $("<a href=\"javascript:void(0)\"></a>").addClass(icon).appendTo(c);
                a.bind("click", _228);
            };
            function _222() {
                if (opts.footer) {
                    $(opts.footer).addClass("panel-footer").appendTo(_220);
                    $(_21e).addClass("panel-body-nobottom");
                } else {
                    _220.children(".panel-footer").remove();
                    $(_21e).removeClass("panel-body-nobottom");
                }
            };
        };
        function _229(_22a, _22b) {
            var _22c = $.data(_22a, "panel");
            var opts = _22c.options;
            if (_22d) {
                opts.queryParams = _22b;
            }
            if (!opts.href) {
                return;
            }
            if (!_22c.isLoaded || !opts.cache) {
                var _22d = $.extend({}, opts.queryParams);
                if (opts.onBeforeLoad.call(_22a, _22d) == false) {
                    return;
                }
                _22c.isLoaded = false;
                $(_22a).panel("clear");
                if (opts.loadingMessage) {
                    $(_22a).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
                }
                opts.loader.call(_22a, _22d, function (data) {
                    var _22e = opts.extractor.call(_22a, data);
                    $(_22a).html(_22e);
                    $.parser.parse($(_22a));
                    opts.onLoad.apply(_22a, arguments);
                    _22c.isLoaded = true;
                }, function () {
                    opts.onLoadError.apply(_22a, arguments);
                });
            }
        };
        function _22f(_230) {
            var t = $(_230);
            t.find(".combo-f").each(function () {
                $(this).combo("destroy");
            });
            t.find(".m-btn").each(function () {
                $(this).menubutton("destroy");
            });
            t.find(".s-btn").each(function () {
                $(this).splitbutton("destroy");
            });
            t.find(".tooltip-f").each(function () {
                $(this).tooltip("destroy");
            });
            t.children("div").each(function () {
                $(this)._size("unfit");
            });
            t.empty();
        };
        function _231(_232) {
            $(_232).panel("doLayout", true);
        };
        function _233(_234, _235) {
            var opts = $.data(_234, "panel").options;
            var _236 = $.data(_234, "panel").panel;
            if (_235 != true) {
                if (opts.onBeforeOpen.call(_234) == false) {
                    return;
                }
            }
            _236.stop(true, true);
            if ($.isFunction(opts.openAnimation)) {
                opts.openAnimation.call(_234, cb);
            } else {
                switch (opts.openAnimation) {
                    case "slide":
                        _236.slideDown(opts.openDuration, cb);
                        break;
                    case "fade":
                        _236.fadeIn(opts.openDuration, cb);
                        break;
                    case "show":
                        _236.show(opts.openDuration, cb);
                        break;
                    default:
                        _236.show();
                        cb();
                }
            }
            function cb() {
                opts.closed = false;
                opts.minimized = false;
                var tool = _236.children(".panel-header").find("a.panel-tool-restore");
                if (tool.length) {
                    opts.maximized = true;
                }
                opts.onOpen.call(_234);
                if (opts.maximized == true) {
                    opts.maximized = false;
                    _237(_234);
                }
                if (opts.collapsed == true) {
                    opts.collapsed = false;
                    _238(_234);
                }
                if (!opts.collapsed) {
                    _229(_234);
                    _231(_234);
                }
            };
        };
        function _239(_23a, _23b) {
            var opts = $.data(_23a, "panel").options;
            var _23c = $.data(_23a, "panel").panel;
            if (_23b != true) {
                if (opts.onBeforeClose.call(_23a) == false) {
                    return;
                }
            }
            _23c.stop(true, true);
            _23c._size("unfit");
            if ($.isFunction(opts.closeAnimation)) {
                opts.closeAnimation.call(_23a, cb);
            } else {
                switch (opts.closeAnimation) {
                    case "slide":
                        _23c.slideUp(opts.closeDuration, cb);
                        break;
                    case "fade":
                        _23c.fadeOut(opts.closeDuration, cb);
                        break;
                    case "hide":
                        _23c.hide(opts.closeDuration, cb);
                        break;
                    default:
                        _23c.hide();
                        if(_23c.children('.panel-body')[0].hasAttribute('dynamic')){
                            _23c.next('.window-shadow').next('.window-mask').remove() &&_23c.next('.window-shadow').remove() &&_23c.remove();
                        }else{
                            _23c.removeClass('animated');
                        }
                        top.hideMask();
                        cb();
                }
            }
            function cb() {
                opts.closed = true;
                opts.onClose.call(_23a);
            };
        };
        function _23d(_23e, _23f) {
            var _240 = $.data(_23e, "panel");
            var opts = _240.options;
            var _241 = _240.panel;
            if (_23f != true) {
                if (opts.onBeforeDestroy.call(_23e) == false) {
                    return;
                }
            }
            $(_23e).panel("clear").panel("clear", "footer");
            _20b(_241);
            opts.onDestroy.call(_23e);
        };
        function _238(_242, _243) {
            var opts = $.data(_242, "panel").options;
            var _244 = $.data(_242, "panel").panel;
            var body = _244.children(".panel-body");
            var tool = _244.children(".panel-header").find("a.panel-tool-collapse");
            if (opts.collapsed == true) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeCollapse.call(_242) == false) {
                return;
            }
            tool.addClass("panel-tool-expand");
            if (_243 == true) {
                body.slideUp("normal", function () {
                    opts.collapsed = true;
                    opts.onCollapse.call(_242);
                });
            } else {
                body.hide();
                opts.collapsed = true;
                opts.onCollapse.call(_242);
            }
        };
        function _245(_246, _247) {
            var opts = $.data(_246, "panel").options;
            var _248 = $.data(_246, "panel").panel;
            var body = _248.children(".panel-body");
            var tool = _248.children(".panel-header").find("a.panel-tool-collapse");
            if (opts.collapsed == false) {
                return;
            }
            body.stop(true, true);
            if (opts.onBeforeExpand.call(_246) == false) {
                return;
            }
            tool.removeClass("panel-tool-expand");
            if (_247 == true) {
                body.slideDown("normal", function () {
                    opts.collapsed = false;
                    opts.onExpand.call(_246);
                    _229(_246);
                    _231(_246);
                });
            } else {
                body.show();
                opts.collapsed = false;
                opts.onExpand.call(_246);
                _229(_246);
                _231(_246);
            }
        };
        function _237(_249) {
            var opts = $.data(_249, "panel").options;
            var _24a = $.data(_249, "panel").panel;
            var tool = _24a.children(".panel-header").find("a.panel-tool-max");
            if (opts.maximized == true) {
                return;
            }
            tool.addClass("panel-tool-restore");
            if (!$.data(_249, "panel").original) {
                $.data(_249, "panel").original = {
                    width: opts.width,
                    height: opts.height,
                    left: opts.left,
                    top: opts.top,
                    fit: opts.fit
                };
            }
            opts.left = 0;
            opts.top = 0;
            opts.fit = true;
            _20c(_249);
            opts.minimized = false;
            opts.maximized = true;
            opts.onMaximize.call(_249);
        };
        function _24b(_24c) {
            var opts = $.data(_24c, "panel").options;
            var _24d = $.data(_24c, "panel").panel;
            _24d._size("unfit");
            _24d.hide();
            opts.minimized = true;
            opts.maximized = false;
            opts.onMinimize.call(_24c);
        };
        function _24e(_24f) {
            var opts = $.data(_24f, "panel").options;
            var _250 = $.data(_24f, "panel").panel;
            var tool = _250.children(".panel-header").find("a.panel-tool-max");
            if (opts.maximized == false) {
                return;
            }
            _250.show();
            tool.removeClass("panel-tool-restore");
            $.extend(opts, $.data(_24f, "panel").original);
            _20c(_24f);
            opts.minimized = false;
            opts.maximized = false;
            $.data(_24f, "panel").original = null;
            opts.onRestore.call(_24f);
        };
        function _251(_252, _253) {
            $.data(_252, "panel").options.title = _253;
            $(_252).panel("header").find("div.panel-title").html(_253);
        };
        var _254 = null;
        $(window).unbind(".panel").bind("resize.panel", function () {
            if (_254) {
                clearTimeout(_254);
            }
            _254 = setTimeout(function () {
                var _255 = $("body.layout");
                if (_255.length) {
                    _255.layout("resize");
                    $("body").children(".easyui-fluid:visible").each(function () {
                        $(this).triggerHandler("_resize");
                    });
                } else {
                    $("body").panel("doLayout");
                }
                _254 = null;
            }, 100);
        });
        $.fn.panel = function (_256, _257) {
            if (typeof _256 == "string") {
                return $.fn.panel.methods[_256](this, _257);
            }
            _256 = _256 || {};
            return this.each(function () {
                var _258 = $.data(this, "panel");
                var opts;
                if (_258) {
                    opts = $.extend(_258.options, _256);
                    _258.isLoaded = false;
                } else {
                    opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), _256);
                    $(this).attr("title", "");
                    _258 = $.data(this, "panel", {options: opts, panel: _219(this), isLoaded: false});
                }
                _21d(this);
                if (opts.doSize == true) {
                    _258.panel.css("display", "block");
                    _20c(this);
                }
                if (opts.closed == true || opts.minimized == true) {
                    _258.panel.hide();
                } else {
                    _233(this);
                }
            });
        };
        $.fn.panel.methods = {
            options: function (jq) {
                return $.data(jq[0], "panel").options;
            }, panel: function (jq) {
                return $.data(jq[0], "panel").panel;
            }, header: function (jq) {
                return $.data(jq[0], "panel").panel.children(".panel-header");
            }, footer: function (jq) {
                return jq.panel("panel").children(".panel-footer");
            }, body: function (jq) {
                return $.data(jq[0], "panel").panel.children(".panel-body");
            }, setTitle: function (jq, _259) {
                return jq.each(function () {
                    _251(this, _259);
                });
            }, open: function (jq, _25a) {
                return jq.each(function () {
                    _233(this, _25a);
                });
            }, close: function (jq, _25b) {
                return jq.each(function () {
                    _239(this, _25b);
                });
            }, destroy: function (jq, _25c) {
                return jq.each(function () {
                    _23d(this, _25c);
                });
            }, clear: function (jq, type) {
                return jq.each(function () {
                    _22f(type == "footer" ? $(this).panel("footer") : this);
                });
            }, refresh: function (jq, href) {
                return jq.each(function () {
                    var _25d = $.data(this, "panel");
                    _25d.isLoaded = false;
                    if (href) {
                        if (typeof href == "string") {
                            _25d.options.href = href;
                        } else {
                            _25d.options.queryParams = href;
                        }
                    }
                    _229(this);
                });
            }, resize: function (jq, _25e) {
                return jq.each(function () {
                    _20c(this, _25e);
                });
            }, doLayout: function (jq, all) {
                return jq.each(function () {
                    _25f(this, "body");
                    _25f($(this).siblings(".panel-footer")[0], "footer");
                    function _25f(_260, type) {
                        if (!_260) {
                            return;
                        }
                        var _261 = _260 == $("body")[0];
                        var s = $(_260).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function (_262, el) {
                            var p = $(el).parents(".panel-" + type + ":first");
                            return _261 ? p.length == 0 : p[0] == _260;
                        });
                        s.each(function () {
                            $(this).triggerHandler("_resize", [all || false]);
                        });
                    };
                });
            }, move: function (jq, _263) {
                return jq.each(function () {
                    _215(this, _263);
                });
            }, maximize: function (jq) {
                return jq.each(function () {
                    _237(this);
                });
            }, minimize: function (jq) {
                return jq.each(function () {
                    _24b(this);
                });
            }, restore: function (jq) {
                return jq.each(function () {
                    _24e(this);
                });
            }, collapse: function (jq, _264) {
                return jq.each(function () {
                    _238(this, _264);
                });
            }, expand: function (jq, _265) {
                return jq.each(function () {
                    _245(this, _265);
                });
            }
        };
        $.fn.panel.parseOptions = function (_266) {
            var t = $(_266);
            var hh = t.children(".panel-header,header");
            var ff = t.children(".panel-footer,footer");
            return $.extend({}, $.parser.parseOptions(_266, ["id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
                cache: "boolean",
                fit: "boolean",
                border: "boolean",
                noheader: "boolean"
            }, {collapsible: "boolean", minimizable: "boolean", maximizable: "boolean"}, {
                closable: "boolean",
                collapsed: "boolean",
                minimized: "boolean",
                maximized: "boolean",
                closed: "boolean"
            }, "openAnimation", "closeAnimation", {
                openDuration: "number",
                closeDuration: "number"
            },]), {
                loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined),
                header: (hh.length ? hh.removeClass("panel-header") : undefined),
                footer: (ff.length ? ff.removeClass("panel-footer") : undefined)
            });
        };
        $.fn.panel.defaults = {
            id: null,
            title: null,
            iconCls: null,
            width: "auto",
            height: "auto",
            left: null,
            top: null,
            cls: null,
            headerCls: null,
            bodyCls: null,
            style: {},
            href: null,
            cache: true,
            fit: false,
            border: true,
            doSize: true,
            noheader: false,
            content: null,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            collapsed: false,
            minimized: false,
            maximized: false,
            closed: false,
            openAnimation: false,
            openDuration: 400,
            closeAnimation: false,
            closeDuration: 400,
            tools: null,
            footer: null,
            header: null,
            queryParams: {},
            method: "get",
            href: null,
            loadingMessage: "Loading...",
            loader: function (_267, _268, _269) {
                var opts = $(this).panel("options");
                if (!opts.href) {
                    return false;
                }
                $.ajax({
                    type: opts.method,
                    url: opts.href,
                    cache: false,
                    data: _267,
                    dataType: "html",
                    success: function (data) {
                        _268(data);
                    },
                    error: function () {
                        _269.apply(this, arguments);
                    }
                });
            },
            extractor: function (data) {
                var _26a = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
                var _26b = _26a.exec(data);
                if (_26b) {
                    return _26b[1];
                } else {
                    return data;
                }
            },
            onBeforeLoad: function (_26c) {
            },
            onLoad: function () {
            },
            onLoadError: function () {
            },
            onBeforeOpen: function () {
            },
            onOpen: function () {
            },
            onBeforeClose: function () {
            },
            onClose: function () {
            },
            onBeforeDestroy: function () {
            },
            onDestroy: function () {
            },
            onResize: function (_26d, _26e) {
            },
            onMove: function (left, top) {
            },
            onMaximize: function () {
            },
            onRestore: function () {
            },
            onMinimize: function () {
            },
            onBeforeCollapse: function () {
            },
            onBeforeExpand: function () {
            },
            onCollapse: function () {
            },
            onExpand: function () {
            }
        };
    })(jQuery);
    //window
    (function ($) {
        function _26f(_270, _271) {
            var _272 = $.data(_270, "window");
            if (_271) {
                if (_271.left != null) {
                    _272.options.left = _271.left;
                }
                if (_271.top != null) {
                    _272.options.top = _271.top;
                }
            }
            $(_270).panel("move", _272.options);
            if (_272.shadow) {
                _272.shadow.css({left: _272.options.left, top: _272.options.top});
            }
        };
        function _273(_274, _275) {
            var opts = $.data(_274, "window").options;
            var pp = $(_274).window("panel");
            var _276 = pp._outerWidth();
            if (opts.inline) {
                var _277 = pp.parent();
                opts.left = Math.ceil((_277.width() - _276) / 2 + _277.scrollLeft());
            } else {
                opts.left = Math.ceil(($(window)._outerWidth() - _276) / 2 + $(document).scrollLeft());
            }
            if (_275) {
                _26f(_274);
            }
        };
        function _278(_279, _27a) {
            var opts = $.data(_279, "window").options;
            var pp = $(_279).window("panel");
            var _27b = pp._outerHeight();
            if (opts.inline) {
                var _27c = pp.parent();
                opts.top = Math.ceil((_27c.height() - _27b) / 2 + _27c.scrollTop());
            } else {
                opts.top = Math.ceil(($(window)._outerHeight() - _27b) / 2 + $(document).scrollTop());
            }
            if (_27a) {
                _26f(_279);
            }
        };
        function _27d(_27e) {
            var _27f = $.data(_27e, "window");
            var opts = _27f.options;
            var win = $(_27e).panel($.extend({}, _27f.options, {
                border: false,
                doSize: true,
                closed: true,
                cls: "window",
                headerCls: "window-header",
                bodyCls: "window-body " + (opts.noheader ? "window-body-noheader" : ""),
                onBeforeDestroy: function () {
                    if (opts.onBeforeDestroy.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.remove();
                    }
                    if (_27f.mask) {
                        _27f.mask.remove();
                    }
                },
                onClose: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    opts.onClose.call(_27e);
                },
                onOpen: function () {
                    if (_27f.mask) {
                        _27f.mask.css({display: "block", zIndex: $.fn.window.defaults.zIndex++});
                    }
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            display: "block",
                            zIndex: $.fn.window.defaults.zIndex++,
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    _27f.window.css("z-index", $.fn.window.defaults.zIndex++);
                    opts.onOpen.call(_27e);
                },
                onResize: function (_280, _281) {
                    var _282 = $(this).panel("options");
                    $.extend(opts, {width: _282.width, height: _282.height, left: _282.left, top: _282.top});
                    if (_27f.shadow) {
                        _27f.shadow.css({
                            left: opts.left,
                            top: opts.top,
                            width: _27f.window._outerWidth(),
                            height: _27f.window._outerHeight()
                        });
                    }
                    opts.onResize.call(_27e, _280, _281);
                },
                onMinimize: function () {
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                    if (_27f.mask) {
                        _27f.mask.hide();
                    }
                    _27f.options.onMinimize.call(_27e);
                },
                onBeforeCollapse: function () {
                    if (opts.onBeforeCollapse.call(_27e) == false) {
                        return false;
                    }
                    if (_27f.shadow) {
                        _27f.shadow.hide();
                    }
                },
                onExpand: function () {
                    if (_27f.shadow) {
                        _27f.shadow.show();
                    }
                    opts.onExpand.call(_27e);
                }
            }));
            _27f.window = win.panel("panel");
            if (_27f.mask) {
                _27f.mask.remove();
            }
            if (opts.modal == true) {
                _27f.mask = $("<div class=\"window-mask\"></div>").insertAfter(_27f.window);
                _27f.mask.css({
                    width: (opts.inline ? _27f.mask.parent().width() : _283().width),
                    height: (opts.inline ? _27f.mask.parent().height() : _283().height),
                    display: "none"
                });
            }
            if (_27f.shadow) {
                _27f.shadow.remove();
            }
            if (opts.shadow == true) {
                _27f.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(_27f.window);
                _27f.shadow.css({display: "none"});
            }
            if (opts.left == null) {
                _273(_27e);
            }
            if (opts.top == null) {
                _278(_27e);
            }
            _26f(_27e);
            if (!opts.closed) {
                win.window("open");
            }
        };
        function _284(_285) {
            var _286 = $.data(_285, "window");
            _286.window.draggable({
                handle: ">div.panel-header>div.panel-title",
                disabled: _286.options.draggable == false,
                onStartDrag: function (e) {
                    if (_286.mask) {
                        _286.mask.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    if (_286.shadow) {
                        _286.shadow.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                    _286.window.css("z-index", $.fn.window.defaults.zIndex++);
                    if (!_286.proxy) {
                        _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    }
                    _286.proxy.css({
                        display: "none",
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top
                    });
                    _286.proxy._outerWidth(_286.window._outerWidth());
                    _286.proxy._outerHeight(_286.window._outerHeight());
                    setTimeout(function () {
                        if (_286.proxy) {
                            _286.proxy.show();
                        }
                    }, 500);
                },
                onDrag: function (e) {
                    _286.proxy.css({display: "block", left: e.data.left, top: e.data.top});
                    return false;
                },
                onStopDrag: function (e) {
                    _286.options.left = e.data.left;
                    _286.options.top = e.data.top;
                    $(_285).window("move");
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
            _286.window.resizable({
                disabled: _286.options.resizable == false, onStartResize: function (e) {
                    if (_286.pmask) {
                        _286.pmask.remove();
                    }
                    _286.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(_286.window);
                    _286.pmask.css({
                        zIndex: $.fn.window.defaults.zIndex++,
                        left: e.data.left,
                        top: e.data.top,
                        width: _286.window._outerWidth(),
                        height: _286.window._outerHeight()
                    });
                    if (_286.proxy) {
                        _286.proxy.remove();
                    }
                    _286.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_286.window);
                    _286.proxy.css({zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
                }, onResize: function (e) {
                    _286.proxy.css({left: e.data.left, top: e.data.top});
                    _286.proxy._outerWidth(e.data.width);
                    _286.proxy._outerHeight(e.data.height);
                    return false;
                }, onStopResize: function (e) {
                    $(_285).window("resize", e.data);
                    _286.pmask.remove();
                    _286.pmask = null;
                    _286.proxy.remove();
                    _286.proxy = null;
                }
            });
        };
        function _283() {
            if (document.compatMode == "BackCompat") {
                return {
                    width: Math.max(document.body.scrollWidth, document.body.clientWidth),
                    height: Math.max(document.body.scrollHeight, document.body.clientHeight)
                };
            } else {
                return {
                    width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
                    height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
                };
            }
        };
        $(window).resize(function () {
            $("body>div.window-mask").css({width: $(window)._outerWidth(), height: $(window)._outerHeight()});
            setTimeout(function () {
                $("body>div.window-mask").css({width: _283().width, height: _283().height});
            }, 50);
        });
        $.fn.window = function (_287, _288) {
            if (typeof _287 == "string") {
                var _289 = $.fn.window.methods[_287];
                if (_289) {
                    return _289(this, _288);
                } else {
                    return this.panel(_287, _288);
                }
            }
            _287 = _287 || {};
            return this.each(function () {
                var _28a = $.data(this, "window");
                if (_28a) {
                    $.extend(_28a.options, _287);
                } else {
                    _28a = $.data(this, "window", {options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), _287)});
                    if (!_28a.options.inline) {
                        document.body.appendChild(this);
                    }
                }
                _27d(this);
                _284(this);
            });
        };
        $.fn.window.methods = {
            options: function (jq) {
                var _28b = jq.panel("options");
                var _28c = $.data(jq[0], "window").options;
                return $.extend(_28c, {
                    closed: _28b.closed,
                    collapsed: _28b.collapsed,
                    minimized: _28b.minimized,
                    maximized: _28b.maximized
                });
            }, window: function (jq) {
                return $.data(jq[0], "window").window;
            }, move: function (jq, _28d) {
                return jq.each(function () {
                    _26f(this, _28d);
                });
            }, hcenter: function (jq) {
                return jq.each(function () {
                    _273(this, true);
                });
            }, vcenter: function (jq) {
                return jq.each(function () {
                    _278(this, true);
                });
            }, center: function (jq) {
                return jq.each(function () {
                    _273(this);
                    _278(this);
                    _26f(this);
                });
            }
        };
        $.fn.window.parseOptions = function (_28e) {
            return $.extend({}, $.fn.panel.parseOptions(_28e), $.parser.parseOptions(_28e, [{
                draggable: "boolean",
                resizable: "boolean",
                shadow: "boolean",
                modal: "boolean",
                inline: "boolean"
            }]));
        };
        $.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {
            zIndex: 9000,
            draggable: true,
            resizable: true,
            shadow: true,
            modal: false,
            inline: false,
            title: "  ",
            collapsible: true,
            minimizable: true,
            maximizable: true,
            closable: true,
            closed: false
        });
    })(jQuery);
    //dialog
    (function ($) {
        function _28f(_290) {
            var opts = $.data(_290, "dialog").options;
            opts.inited = false;
            $(_290).window($.extend({}, opts, {
                onResize: function (w, h) {
                    if (opts.inited) {
                        _295(this);
                        opts.onResize.call(this, w, h);
                    }
                }
            }));
            var win = $(_290).window("window");
            if (opts.toolbar) {
                if ($.isArray(opts.toolbar)) {
                    $(_290).siblings("div.dialog-toolbar").remove();
                    var _291 = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
                    var tr = _291.find("tr");
                    for (var i = 0; i < opts.toolbar.length; i++) {
                        var btn = opts.toolbar[i];
                        if (btn == "-") {
                            $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                        } else {
                            var td = $("<td></td>").appendTo(tr);
                            var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                            tool[0].onclick = eval(btn.handler || function () {
                                });
                            tool.linkbutton($.extend({}, btn, {plain: true}));
                        }
                    }
                } else {
                    $(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
                    $(opts.toolbar).show();
                }
            } else {
                $(_290).siblings("div.dialog-toolbar").remove();
            }
            if (opts.buttons) {
                if ($.isArray(opts.buttons)) {
                    $(_290).siblings("div.dialog-button").remove();
                    var _292 = $("<div class=\"dialog-button\"></div>").appendTo(win);
                    for (var i = 0; i < opts.buttons.length; i++) {
                        var p = opts.buttons[i];
                        var _293 = $("<a href=\"javascript:void(0)\"></a>").appendTo(_292);
                        if (p.handler) {
                            _293[0].onclick = p.handler;
                        }
                        _293.linkbutton(p);
                    }
                } else {
                    $(opts.buttons).addClass("dialog-button").appendTo(win);
                    $(opts.buttons).show();
                }
            } else {
                $(_290).siblings("div.dialog-button").remove();
            }
            opts.inited = true;
            var _294 = opts.closed;
            win.show();
            $(_290).window("resize");
            if (_294) {
                win.hide();
            }
        };
        function _295(_296, _297) {
            var t = $(_296);
            var opts = t.dialog("options");
            var _298 = opts.noheader;
            var tb = t.siblings(".dialog-toolbar");
            var bb = t.siblings(".dialog-button");
            tb.insertBefore(_296).css({
                position: "relative",
                borderTopWidth: (_298 ? 1 : 0),
                top: (_298 ? tb.length : 0)
            });
            bb.insertAfter(_296).css({position: "relative", top: -1});
            tb.add(bb)._outerWidth(t._outerWidth()).find(".easyui-fluid:visible").each(function () {
                $(this).triggerHandler("_resize");
            });
            if (!isNaN(parseInt(opts.height))) {
                t._outerHeight(t._outerHeight() - tb._outerHeight() - bb._outerHeight());
            }
            var _299 = $.data(_296, "window").shadow;
            if (_299) {
                var cc = t.panel("panel");
                _299.css({width: cc._outerWidth(), height: cc._outerHeight()});
            }
        };
        $.fn.dialog = function (_29a, _29b) {
            if (typeof _29a == "string") {
                var _29c = $.fn.dialog.methods[_29a];
                if (_29c) {
                    return _29c(this, _29b);
                } else {
                    return this.window(_29a, _29b);
                }
            }
            _29a = _29a || {};
            return this.each(function () {
                var _29d = $.data(this, "dialog");
                if (_29d) {
                    $.extend(_29d.options, _29a);
                } else {
                    $.data(this, "dialog", {options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _29a)});
                }
                _28f(this);
            });
        };
        $.fn.dialog.methods = {
            options: function (jq) {
                var _29e = $.data(jq[0], "dialog").options;
                var _29f = jq.panel("options");
                $.extend(_29e, {
                    width: _29f.width,
                    height: _29f.height,
                    left: _29f.left,
                    top: _29f.top,
                    closed: _29f.closed,
                    collapsed: _29f.collapsed,
                    minimized: _29f.minimized,
                    maximized: _29f.maximized
                });
                return _29e;
            }, dialog: function (jq) {
                return jq.window("window");
            }
        };
        $.fn.dialog.parseOptions = function (_2a0) {
            var t = $(_2a0);
            return $.extend({}, $.fn.window.parseOptions(_2a0), $.parser.parseOptions(_2a0, ["toolbar", "buttons"]), {
                toolbar: (t.children(".dialog-toolbar").length ? t.children(".dialog-toolbar").removeClass("dialog-toolbar") : undefined),
                buttons: (t.children(".dialog-button").length ? t.children(".dialog-button").removeClass("dialog-button") : undefined)
            });
        };
        $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
            title: "New Dialog",
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            toolbar: null,
            buttons: null
        });
    })(jQuery);
    //messager
    (function ($) {
        function _2a1() {
            $(document).unbind(".messager").bind("keydown.messager", function (e) {
                if (e.keyCode == 27) {
                    $("body").children("div.messager-window").children("div.messager-body").each(function () {
                        $(this).window("close");
                    });
                } else {
                    if (e.keyCode == 9) {
                        var win = $("body").children("div.messager-window").children("div.messager-body");
                        if (!win.length) {
                            return;
                        }
                        var _2a2 = win.find(".messager-input,.messager-button .l-btn");
                        for (var i = 0; i < _2a2.length; i++) {
                            if ($(_2a2[i]).is(":focus")) {
                                $(_2a2[i >= _2a2.length - 1 ? 0 : i + 1]).focus();
                                return false;
                            }
                        }
                    }
                }
            });
        };
        function _2a3() {
            $(document).unbind(".messager");
        };
        function _2a4(_2a5) {
            var opts = $.extend({}, $.messager.defaults, {
                modal: false,
                shadow: false,
                draggable: false,
                resizable: false,
                closed: true,
                style: {
                    left: "",
                    top: "",
                    right: 0,
                    zIndex: $.fn.window.defaults.zIndex++,
                    bottom: -document.body.scrollTop - document.documentElement.scrollTop
                },
                title: "",
                width: 250,
                height: 100,
                showType: "slide",
                showSpeed: 600,
                msg: "",
                timeout: 4000
            }, _2a5);
            var win = $("<div class=\"messager-body\"></div>").html(opts.msg).appendTo("body");
            win.window($.extend({}, opts, {
                openAnimation: (opts.showType),
                closeAnimation: (opts.showType == "show" ? "hide" : opts.showType),
                openDuration: opts.showSpeed,
                closeDuration: opts.showSpeed,
                onOpen: function () {
                    win.window("window").hover(function () {
                        if (opts.timer) {
                            clearTimeout(opts.timer);
                        }
                    }, function () {
                        _2a6();
                    });
                    _2a6();
                    function _2a6() {
                        if (opts.timeout > 0) {
                            opts.timer = setTimeout(function () {
                                if (win.length && win.data("window")) {
                                    win.window("close");
                                }
                            }, opts.timeout);
                        }
                    };
                    if (_2a5.onOpen) {
                        _2a5.onOpen.call(this);
                    } else {
                        opts.onOpen.call(this);
                    }
                },
                onClose: function () {
                    if (opts.timer) {
                        clearTimeout(opts.timer);
                    }
                    if (_2a5.onClose) {
                        _2a5.onClose.call(this);
                    } else {
                        opts.onClose.call(this);
                    }
                    win.window("destroy");
                }
            }));
            win.window("window").css(opts.style);
            win.window("open");
            return win;
        };
        function _2a7(_2a8) {
            _2a1();
            var win = $("<div class=\"messager-body\"></div>").appendTo("body");
            win.window($.extend({}, _2a8, {
                doSize: false, noheader: (_2a8.title ? false : true), onClose: function () {
                    _2a3();
                    if (_2a8.onClose) {
                        _2a8.onClose.call(this);
                    }
                    setTimeout(function () {
                        win.window("destroy");
                    }, 100);
                }
            }));
            if (_2a8.buttons && _2a8.buttons.length) {
                var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
                $.map(_2a8.buttons, function (btn) {
                    $("<a href=\"javascript:void(0)\" style=\"margin-left:10px\"></a>").appendTo(tb).linkbutton(btn);
                });
            }
            win.window("window").addClass("messager-window");
            win.window("resize");
            win.children("div.messager-button").children("a:first").focus();
            return win;
        };
        $.messager = {
            show: function (_2a9) {
                return _2a4(_2a9);
            }, alert: function (_2aa, msg, icon, fn) {
                var opts = typeof _2aa == "object" ? _2aa : {title: _2aa, msg: msg, icon: icon, fn: fn};
                var cls = opts.icon ? "messager-icon messager-" + opts.icon : "";
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"" + cls + "\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, confirm: function (_2ab, msg, fn) {
                var opts = typeof _2ab == "object" ? _2ab : {title: _2ab, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(true);
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn(false);
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                return win;
            }, prompt: function (_2ac, msg, fn) {
                var opts = typeof _2ac == "object" ? _2ac : {title: _2ac, msg: msg, fn: fn};
                opts = $.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-icon messager-question\"></div>" + "<div>" + opts.msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>",
                    buttons: [{
                        text: $.messager.defaults.ok, onClick: function () {
                            win.window("close");
                            opts.fn(win.find(".messager-input").val());
                        }
                    }, {
                        text: $.messager.defaults.cancel, onClick: function () {
                            win.window("close");
                            opts.fn();
                        }
                    }]
                }, opts);
                var win = _2a7(opts);
                win.find("input.messager-input").focus();
                return win;
            }, progress: function (_2ad) {
                var _2ae = {
                    bar: function () {
                        return $("body>div.messager-window").find("div.messager-p-bar");
                    }, close: function () {
                        var win = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                        if (win.length) {
                            win.window("close");
                        }
                    }
                };
                if (typeof _2ad == "string") {
                    var _2af = _2ae[_2ad];
                    return _2af();
                }
                var opts = $.extend({}, {
                    title: "",
                    content: undefined,
                    msg: "",
                    text: undefined,
                    interval: 300
                }, _2ad || {});
                var win = _2a7($.extend({}, $.messager.defaults, {
                    content: "<div class=\"messager-progress\"><div class=\"messager-p-msg\">" + opts.msg + "</div><div class=\"messager-p-bar\"></div></div>",
                    closable: false,
                    doSize: false
                }, opts, {
                    onClose: function () {
                        if (this.timer) {
                            clearInterval(this.timer);
                        }
                        if (_2ad.onClose) {
                            _2ad.onClose.call(this);
                        } else {
                            $.messager.defaults.onClose.call(this);
                        }
                    }
                }));
                var bar = win.find("div.messager-p-bar");
                bar.progressbar({text: opts.text});
                win.window("resize");
                if (opts.interval) {
                    win[0].timer = setInterval(function () {
                        var v = bar.progressbar("getValue");
                        v += 10;
                        if (v > 100) {
                            v = 0;
                        }
                        bar.progressbar("setValue", v);
                    }, opts.interval);
                }
                return win;
            }
        };
        $.messager.defaults = $.extend({}, $.fn.window.defaults, {
            ok: "确定",
            cancel: "取消",
            width: 300,
            height: "auto",
            modal: true,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            resizable: false,
            fn: function () {
            }
        });
    })(jQuery);
    //accordion
    (function ($) {
        function _2b0(_2b1, _2b2) {
            var _2b3 = $.data(_2b1, "accordion");
            var opts = _2b3.options;
            var _2b4 = _2b3.panels;
            var cc = $(_2b1);
            if (_2b2) {
                $.extend(opts, {width: _2b2.width, height: _2b2.height});
            }
            cc._size(opts);
            var _2b5 = 0;
            var _2b6 = "auto";
            var _2b7 = cc.find(">.panel>.accordion-header");
            if (_2b7.length) {
                _2b5 = $(_2b7[0]).css("height", "")._outerHeight();
            }
            if (!isNaN(parseInt(opts.height))) {
                _2b6 = cc.height() - _2b5 * _2b7.length;
            }
            _2b8(true, _2b6 - _2b8(false) + 1);
            function _2b8(_2b9, _2ba) {
                var _2bb = 0;
                for (var i = 0; i < _2b4.length; i++) {
                    var p = _2b4[i];
                    var h = p.panel("header")._outerHeight(_2b5);
                    if (p.panel("options").collapsible == _2b9) {
                        var _2bc = isNaN(_2ba) ? undefined : (_2ba + _2b5 * h.length);
                        p.panel("resize", {width: cc.width(), height: (_2b9 ? _2bc : undefined)});
                        _2bb += p.panel("panel").outerHeight() - _2b5 * h.length;
                    }
                }
                return _2bb;
            };
        };
        function _2bd(_2be, _2bf, _2c0, all) {
            var _2c1 = $.data(_2be, "accordion").panels;
            var pp = [];
            for (var i = 0; i < _2c1.length; i++) {
                var p = _2c1[i];
                if (_2bf) {
                    if (p.panel("options")[_2bf] == _2c0) {
                        pp.push(p);
                    }
                } else {
                    if (p[0] == $(_2c0)[0]) {
                        return i;
                    }
                }
            }
            if (_2bf) {
                return all ? pp : (pp.length ? pp[0] : null);
            } else {
                return -1;
            }
        };
        function _2c2(_2c3) {
            return _2bd(_2c3, "collapsed", false, true);
        };
        function _2c4(_2c5) {
            var pp = _2c2(_2c5);
            return pp.length ? pp[0] : null;
        };
        function _2c6(_2c7, _2c8) {
            return _2bd(_2c7, null, _2c8);
        };
        function _2c9(_2ca, _2cb) {
            var _2cc = $.data(_2ca, "accordion").panels;
            if (typeof _2cb == "number") {
                if (_2cb < 0 || _2cb >= _2cc.length) {
                    return null;
                } else {
                    return _2cc[_2cb];
                }
            }
            return _2bd(_2ca, "title", _2cb);
        };
        function _2cd(_2ce) {
            var opts = $.data(_2ce, "accordion").options;
            var cc = $(_2ce);
            if (opts.border) {
                cc.removeClass("accordion-noborder");
            } else {
                cc.addClass("accordion-noborder");
            }
        };
        function init(_2cf) {
            var _2d0 = $.data(_2cf, "accordion");
            var cc = $(_2cf);
            cc.addClass("accordion");
            _2d0.panels = [];
            cc.children("div").each(function () {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                var pp = $(this);
                _2d0.panels.push(pp);
                _2d2(_2cf, pp, opts);
            });
            cc.bind("_resize", function (e, _2d1) {
                if ($(this).hasClass("easyui-fluid") || _2d1) {
                    _2b0(_2cf);
                }
                return false;
            });
        };
        function _2d2(_2d3, pp, _2d4) {
            var opts = $.data(_2d3, "accordion").options;
            pp.panel($.extend({}, {
                collapsible: true,
                minimizable: false,
                maximizable: false,
                closable: false,
                doSize: false,
                collapsed: true,
                headerCls: "accordion-header",
                bodyCls: "accordion-body"
            }, _2d4, {
                onBeforeExpand: function () {
                    if (_2d4.onBeforeExpand) {
                        if (_2d4.onBeforeExpand.call(this) == false) {
                            return false;
                        }
                    }
                    if (!opts.multiple) {
                        var all = $.grep(_2c2(_2d3), function (p) {
                            return p.panel("options").collapsible;
                        });
                        for (var i = 0; i < all.length; i++) {
                            _2dc(_2d3, _2c6(_2d3, all[i]));
                        }
                    }
                    var _2d5 = $(this).panel("header");
                    _2d5.addClass("accordion-header-selected");
                    _2d5.find(".accordion-collapse").removeClass("accordion-expand");
                }, onExpand: function () {
                    if (_2d4.onExpand) {
                        _2d4.onExpand.call(this);
                    }
                    opts.onSelect.call(_2d3, $(this).panel("options").title, _2c6(_2d3, this));
                }, onBeforeCollapse: function () {
                    if (_2d4.onBeforeCollapse) {
                        if (_2d4.onBeforeCollapse.call(this) == false) {
                            return false;
                        }
                    }
                    var _2d6 = $(this).panel("header");
                    _2d6.removeClass("accordion-header-selected");
                    _2d6.find(".accordion-collapse").addClass("accordion-expand");
                }, onCollapse: function () {
                    if (_2d4.onCollapse) {
                        _2d4.onCollapse.call(this);
                    }
                    opts.onUnselect.call(_2d3, $(this).panel("options").title, _2c6(_2d3, this));
                }
            }));
            var _2d7 = pp.panel("header");
            var tool = _2d7.children("div.panel-tool");
            tool.children("a.panel-tool-collapse").hide();
            var t = $("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
            t.bind("click", function () {
                _2d8(pp);
                return false;
            });
            pp.panel("options").collapsible ? t.show() : t.hide();
            _2d7.click(function () {
                _2d8(pp);
                return false;
            });
            function _2d8(p) {
                var _2d9 = p.panel("options");
                if (_2d9.collapsible) {
                    var _2da = _2c6(_2d3, p);
                    if (_2d9.collapsed) {
                        _2db(_2d3, _2da);
                    } else {
                        _2dc(_2d3, _2da);
                    }
                }
            };
        };
        function _2db(_2dd, _2de) {
            var p = _2c9(_2dd, _2de);
            if (!p) {
                return;
            }
            _2df(_2dd);
            var opts = $.data(_2dd, "accordion").options;
            p.panel("expand", opts.animate);
        };
        function _2dc(_2e0, _2e1) {
            var p = _2c9(_2e0, _2e1);
            if (!p) {
                return;
            }
            _2df(_2e0);
            var opts = $.data(_2e0, "accordion").options;
            p.panel("collapse", opts.animate);
        };
        function _2e2(_2e3) {
            var opts = $.data(_2e3, "accordion").options;
            var p = _2bd(_2e3, "selected", true);
            if (p) {
                _2e4(_2c6(_2e3, p));
            } else {
                _2e4(opts.selected);
            }
            function _2e4(_2e5) {
                var _2e6 = opts.animate;
                opts.animate = false;
                _2db(_2e3, _2e5);
                opts.animate = _2e6;
            };
        };
        function _2df(_2e7) {
            var _2e8 = $.data(_2e7, "accordion").panels;
            for (var i = 0; i < _2e8.length; i++) {
                _2e8[i].stop(true, true);
            }
        };
        function add(_2e9, _2ea) {
            var _2eb = $.data(_2e9, "accordion");
            var opts = _2eb.options;
            var _2ec = _2eb.panels;
            if (_2ea.selected == undefined) {
                _2ea.selected = true;
            }
            _2df(_2e9);
            var pp = $("<div></div>").appendTo(_2e9);
            _2ec.push(pp);
            _2d2(_2e9, pp, _2ea);
            _2b0(_2e9);
            opts.onAdd.call(_2e9, _2ea.title, _2ec.length - 1);
            if (_2ea.selected) {
                _2db(_2e9, _2ec.length - 1);
            }
        };
        function _2ed(_2ee, _2ef) {
            var _2f0 = $.data(_2ee, "accordion");
            var opts = _2f0.options;
            var _2f1 = _2f0.panels;
            _2df(_2ee);
            var _2f2 = _2c9(_2ee, _2ef);
            var _2f3 = _2f2.panel("options").title;
            var _2f4 = _2c6(_2ee, _2f2);
            if (!_2f2) {
                return;
            }
            if (opts.onBeforeRemove.call(_2ee, _2f3, _2f4) == false) {
                return;
            }
            _2f1.splice(_2f4, 1);
            _2f2.panel("destroy");
            if (_2f1.length) {
                _2b0(_2ee);
                var curr = _2c4(_2ee);
                if (!curr) {
                    _2db(_2ee, 0);
                }
            }
            opts.onRemove.call(_2ee, _2f3, _2f4);
        };
        $.fn.accordion = function (_2f5, _2f6) {
            if (typeof _2f5 == "string") {
                return $.fn.accordion.methods[_2f5](this, _2f6);
            }
            _2f5 = _2f5 || {};
            return this.each(function () {
                var _2f7 = $.data(this, "accordion");
                if (_2f7) {
                    $.extend(_2f7.options, _2f5);
                } else {
                    $.data(this, "accordion", {
                        options: $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), _2f5),
                        accordion: $(this).addClass("accordion"),
                        panels: []
                    });
                    init(this);
                }
                _2cd(this);
                _2b0(this);
                _2e2(this);
            });
        };
        $.fn.accordion.methods = {
            options: function (jq) {
                return $.data(jq[0], "accordion").options;
            }, panels: function (jq) {
                return $.data(jq[0], "accordion").panels;
            }, resize: function (jq, _2f8) {
                return jq.each(function () {
                    _2b0(this, _2f8);
                });
            }, getSelections: function (jq) {
                return _2c2(jq[0]);
            }, getSelected: function (jq) {
                return _2c4(jq[0]);
            }, getPanel: function (jq, _2f9) {
                return _2c9(jq[0], _2f9);
            }, getPanelIndex: function (jq, _2fa) {
                return _2c6(jq[0], _2fa);
            }, select: function (jq, _2fb) {
                return jq.each(function () {
                    _2db(this, _2fb);
                });
            }, unselect: function (jq, _2fc) {
                return jq.each(function () {
                    _2dc(this, _2fc);
                });
            }, add: function (jq, _2fd) {
                return jq.each(function () {
                    add(this, _2fd);
                });
            }, remove: function (jq, _2fe) {
                return jq.each(function () {
                    _2ed(this, _2fe);
                });
            }
        };
        $.fn.accordion.parseOptions = function (_2ff) {
            var t = $(_2ff);
            return $.extend({}, $.parser.parseOptions(_2ff, ["width", "height", {
                fit: "boolean",
                border: "boolean",
                animate: "boolean",
                multiple: "boolean",
                selected: "number"
            }]));
        };
        $.fn.accordion.defaults = {
            width: "auto",
            height: "auto",
            fit: false,
            border: true,
            animate: true,
            multiple: false,
            selected: 0,
            onSelect: function (_300, _301) {
            },
            onUnselect: function (_302, _303) {
            },
            onAdd: function (_304, _305) {
            },
            onBeforeRemove: function (_306, _307) {
            },
            onRemove: function (_308, _309) {
            }
        };
    })(jQuery);
    //tabs
    (function ($) {
        function _30a(c) {
            var w = 0;
            $(c).children().each(function () {
                w += $(this).outerWidth(true);
            });
            return w;
        };
        function _30b(_30c) {
            var opts = $.data(_30c, "tabs").options;
            if (opts.tabPosition == "left" || opts.tabPosition == "right" || !opts.showHeader) {
                return;
            }
            var _30d = $(_30c).children("div.tabs-header");
            var tool = _30d.children("div.tabs-tool");
            var _30e = _30d.children("div.tabs-scroller-left");
            var _30f = _30d.children("div.tabs-scroller-right");
            var wrap = _30d.children("div.tabs-wrap");
            var _310 = _30d.outerHeight();
            if (opts.plain) {
                _310 -= _310 - _30d.height();
            }
            tool._outerHeight(_310);
            var _311 = _30a(_30d.find("ul.tabs"));
            var _312 = _30d.width() - tool._outerWidth();
            if (_311 > _312) {
                _30e.add(_30f).show()._outerHeight(_310);
                if (opts.toolPosition == "left") {
                    tool.css({left: _30e.outerWidth(), right: ""});
                    wrap.css({
                        marginLeft: _30e.outerWidth() + tool._outerWidth(),
                        marginRight: _30f._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                } else {
                    tool.css({left: "", right: _30f.outerWidth()});
                    wrap.css({
                        marginLeft: _30e.outerWidth(),
                        marginRight: _30f.outerWidth() + tool._outerWidth(),
                        width: _312 - _30e.outerWidth() - _30f.outerWidth()
                    });
                }
            } else {
                _30e.add(_30f).hide();
                if (opts.toolPosition == "left") {
                    tool.css({left: 0, right: ""});
                    wrap.css({marginLeft: tool._outerWidth(), marginRight: 0, width: _312});
                } else {
                    tool.css({left: "", right: 0});
                    wrap.css({marginLeft: 0, marginRight: tool._outerWidth(), width: _312});
                }
            }
        };
        function _313(_314) {
            var opts = $.data(_314, "tabs").options;
            var _315 = $(_314).children("div.tabs-header");
            if (opts.tools) {
                if (typeof opts.tools == "string") {
                    $(opts.tools).addClass("tabs-tool").appendTo(_315);
                    $(opts.tools).show();
                } else {
                    _315.children("div.tabs-tool").remove();
                    var _316 = $("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_315);
                    var tr = _316.find("tr");
                    for (var i = 0; i < opts.tools.length; i++) {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(td);
                        tool[0].onclick = eval(opts.tools[i].handler || function () {
                            });
                        tool.linkbutton($.extend({}, opts.tools[i], {plain: true}));
                    }
                }
            } else {
                _315.children("div.tabs-tool").remove();
            }
        };
        function _317(_318, _319) {
            var _31a = $.data(_318, "tabs");
            var opts = _31a.options;
            var cc = $(_318);
            if (!opts.doSize) {
                return;
            }
            if (_319) {
                $.extend(opts, {width: _319.width, height: _319.height});
            }
            cc._size(opts);
            var _31b = cc.children("div.tabs-header");
            var _31c = cc.children("div.tabs-panels");
            var wrap = _31b.find("div.tabs-wrap");
            var ul = wrap.find(".tabs");
            ul.children("li").removeClass("tabs-first tabs-last");
            ul.children("li:first").addClass("tabs-first");
            ul.children("li:last").addClass("tabs-last");
            if (opts.tabPosition == "left" || opts.tabPosition == "right") {
                _31b._outerWidth(opts.showHeader ? opts.headerWidth : 0);
                _31c._outerWidth(cc.width() - _31b.outerWidth());
                _31b.add(_31c)._outerHeight(opts.height);
                wrap._outerWidth(_31b.width());
                ul._outerWidth(wrap.width()).css("height", "");
            } else {
                _31b.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool").css("display", opts.showHeader ? "block" : "none");
                _31b._outerWidth(cc.width()).css("height", "");
                if (opts.showHeader) {
                    _31b.css("background-color", "");
                    wrap.css("height", "");
                } else {
                    _31b.css("background-color", "transparent");
                    _31b._outerHeight(0);
                    wrap._outerHeight(0);
                }
                ul._outerHeight(opts.tabHeight).css("width", "");
                ul._outerHeight(ul.outerHeight() - ul.height() - 1 + opts.tabHeight).css("width", "");
                _31c._size("height", isNaN(opts.height) ? "" : (opts.height - _31b.outerHeight()));
                _31c._size("width", isNaN(opts.width) ? "" : opts.width);
            }
            if (_31a.tabs.length) {
                var d1 = ul.outerWidth(true) - ul.width();
                var li = ul.children("li:first");
                var d2 = li.outerWidth(true) - li.width();
                var _31d = _31b.width() - _31b.children(".tabs-tool")._outerWidth();
                var _31e = Math.floor((_31d - d1 - d2 * _31a.tabs.length) / _31a.tabs.length);
                $.map(_31a.tabs, function (p) {
                    _31f(p, (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) ? _31e : undefined);
                });
                if (opts.justified && $.inArray(opts.tabPosition, ["top", "bottom"]) >= 0) {
                    var _320 = _31d - d1 - _30a(ul);
                    _31f(_31a.tabs[_31a.tabs.length - 1], _31e + _320);
                }
            }
            _30b(_318);
            function _31f(p, _321) {
                var _322 = p.panel("options");
                var p_t = _322.tab.find("a.tabs-inner");
                var _321 = _321 ? _321 : (parseInt(_322.tabWidth || opts.tabWidth || undefined));
                if (_321) {
                    p_t._outerWidth(_321);
                } else {
                    p_t.css("width", "");
                }
                p_t._outerHeight(opts.tabHeight);
                p_t.css("lineHeight", p_t.height() + "px");
                p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
            };
        };
        function _323(_324) {
            var opts = $.data(_324, "tabs").options;
            var tab = _325(_324);
            if (tab) {
                var _326 = $(_324).children("div.tabs-panels");
                var _327 = opts.width == "auto" ? "auto" : _326.width();
                var _328 = opts.height == "auto" ? "auto" : _326.height();
                tab.panel("resize", {width: _327, height: _328});
            }
        };
        function _329(_32a) {
            var tabs = $.data(_32a, "tabs").tabs;
            var cc = $(_32a).addClass("tabs-container");
            var _32b = $("<div class=\"tabs-panels\"></div>").insertBefore(cc);
            cc.children("div").each(function () {
                _32b[0].appendChild(this);
            });
            cc[0].appendChild(_32b[0]);
            $("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(_32a);
            cc.children("div.tabs-panels").children("div").each(function (i) {
                var opts = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                _338(_32a, opts, $(this));
            });
            cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
                $(this).addClass("tabs-scroller-over");
            }, function () {
                $(this).removeClass("tabs-scroller-over");
            });
            cc.bind("_resize", function (e, _32c) {
                if ($(this).hasClass("easyui-fluid") || _32c) {
                    _317(_32a);
                    _323(_32a);
                }
                return false;
            });
        };
        function _32d(_32e) {
            var _32f = $.data(_32e, "tabs");
            var opts = _32f.options;
            $(_32e).children("div.tabs-header").unbind().bind("click", function (e) {
                if ($(e.target).hasClass("tabs-scroller-left")) {
                    $(_32e).tabs("scrollBy", -opts.scrollIncrement);
                } else {
                    if ($(e.target).hasClass("tabs-scroller-right")) {
                        $(_32e).tabs("scrollBy", opts.scrollIncrement);
                    } else {
                        var li = $(e.target).closest("li");
                        if (li.hasClass("tabs-disabled")) {
                            return false;
                        }
                        var a = $(e.target).closest("a.tabs-close");
                        if (a.length) {
                            _351(_32e, _330(li));
                        } else {
                            if (li.length) {
                                var _331 = _330(li);
                                var _332 = _32f.tabs[_331].panel("options");
                                if (_332.collapsible) {
                                    _332.closed ? _348(_32e, _331) : _365(_32e, _331);
                                } else {
                                    _348(_32e, _331);
                                }
                            }
                        }
                        return false;
                    }
                }
            }).bind("contextmenu", function (e) {
                var li = $(e.target).closest("li");
                if (li.hasClass("tabs-disabled")) {
                    return;
                }
                if (li.length) {
                    opts.onContextMenu.call(_32e, e, li.find("span.tabs-title").html(), _330(li));
                }
            });
            function _330(li) {
                var _333 = 0;
                li.parent().children("li").each(function (i) {
                    if (li[0] == this) {
                        _333 = i;
                        return false;
                    }
                });
                return _333;
            };
        };
        function _334(_335) {
            var opts = $.data(_335, "tabs").options;
            var _336 = $(_335).children("div.tabs-header");
            var _337 = $(_335).children("div.tabs-panels");
            _336.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
            _337.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
            if (opts.tabPosition == "top") {
                _336.insertBefore(_337);
            } else {
                if (opts.tabPosition == "bottom") {
                    _336.insertAfter(_337);
                    _336.addClass("tabs-header-bottom");
                    _337.addClass("tabs-panels-top");
                } else {
                    if (opts.tabPosition == "left") {
                        _336.addClass("tabs-header-left");
                        _337.addClass("tabs-panels-right");
                    } else {
                        if (opts.tabPosition == "right") {
                            _336.addClass("tabs-header-right");
                            _337.addClass("tabs-panels-left");
                        }
                    }
                }
            }
            if (opts.plain == true) {
                _336.addClass("tabs-header-plain");
            } else {
                _336.removeClass("tabs-header-plain");
            }
            _336.removeClass("tabs-header-narrow").addClass(opts.narrow ? "tabs-header-narrow" : "");
            var tabs = _336.find(".tabs");
            tabs.removeClass("tabs-pill").addClass(opts.pill ? "tabs-pill" : "");
            tabs.removeClass("tabs-narrow").addClass(opts.narrow ? "tabs-narrow" : "");
            tabs.removeClass("tabs-justified").addClass(opts.justified ? "tabs-justified" : "");
            if (opts.border == true) {
                _336.removeClass("tabs-header-noborder");
                _337.removeClass("tabs-panels-noborder");
            } else {
                _336.addClass("tabs-header-noborder");
                _337.addClass("tabs-panels-noborder");
            }
            opts.doSize = true;
        };
        function _338(_339, _33a, pp) {
            _33a = _33a || {};
            var _33b = $.data(_339, "tabs");
            var tabs = _33b.tabs;
            if (_33a.index == undefined || _33a.index > tabs.length) {
                _33a.index = tabs.length;
            }
            if (_33a.index < 0) {
                _33a.index = 0;
            }
            var ul = $(_339).children("div.tabs-header").find("ul.tabs");
            var _33c = $(_339).children("div.tabs-panels");
            var tab = $("<li>" + "<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a>" + "</li>");
            if (!pp) {
                pp = $("<div></div>");
            }
            if (_33a.index >= tabs.length) {
                tab.appendTo(ul);
                pp.appendTo(_33c);
                tabs.push(pp);
            } else {
                tab.insertBefore(ul.children("li:eq(" + _33a.index + ")"));
                pp.insertBefore(_33c.children("div.panel:eq(" + _33a.index + ")"));
                tabs.splice(_33a.index, 0, pp);
            }
            pp.panel($.extend({}, _33a, {
                tab: tab,
                border: false,
                noheader: true,
                closed: true,
                doSize: false,
                iconCls: (_33a.icon ? _33a.icon : undefined),
                onLoad: function () {
                    if (_33a.onLoad) {
                        _33a.onLoad.call(this, arguments);
                    }
                    _33b.options.onLoad.call(_339, $(this));
                },
                onBeforeOpen: function () {
                    if (_33a.onBeforeOpen) {
                        if (_33a.onBeforeOpen.call(this) == false) {
                            return false;
                        }
                    }
                    var p = $(_339).tabs("getSelected");
                    if (p) {
                        if (p[0] != this) {
                            $(_339).tabs("unselect", _343(_339, p));
                            p = $(_339).tabs("getSelected");
                            if (p) {
                                return false;
                            }
                        } else {
                            _323(_339);
                            return false;
                        }
                    }
                    var _33d = $(this).panel("options");
                    _33d.tab.addClass("tabs-selected");
                    var wrap = $(_339).find(">div.tabs-header>div.tabs-wrap");
                    var left = _33d.tab.position().left;
                    var _33e = left + _33d.tab.outerWidth();
                    if (left < 0 || _33e > wrap.width()) {
                        var _33f = left - (wrap.width() - _33d.tab.width()) / 2;
                        $(_339).tabs("scrollBy", _33f);
                    } else {
                        $(_339).tabs("scrollBy", 0);
                    }
                    var _340 = $(this).panel("panel");
                    _340.css("display", "block");
                    _323(_339);
                    _340.css("display", "none");
                },
                onOpen: function () {
                    if (_33a.onOpen) {
                        _33a.onOpen.call(this);
                    }
                    var _341 = $(this).panel("options");
                    _33b.selectHis.push(_341.title);
                    _33b.options.onSelect.call(_339, _341.title, _343(_339, this));
                },
                onBeforeClose: function () {
                    if (_33a.onBeforeClose) {
                        if (_33a.onBeforeClose.call(this) == false) {
                            return false;
                        }
                    }
                    $(this).panel("options").tab.removeClass("tabs-selected");
                },
                onClose: function () {
                    if (_33a.onClose) {
                        _33a.onClose.call(this);
                    }
                    var _342 = $(this).panel("options");
                    _33b.options.onUnselect.call(_339, _342.title, _343(_339, this));
                }
            }));
            $(_339).tabs("update", {tab: pp, options: pp.panel("options"), type: "header"});
        };
        function _344(_345, _346) {
            var _347 = $.data(_345, "tabs");
            var opts = _347.options;
            if (_346.selected == undefined) {
                _346.selected = true;
            }
            _338(_345, _346);
            opts.onAdd.call(_345, _346.title, _346.index);
            if (_346.selected) {
                _348(_345, _346.index);
            }
        };
        function _349(_34a, _34b) {
            _34b.type = _34b.type || "all";
            var _34c = $.data(_34a, "tabs").selectHis;
            var pp = _34b.tab;
            var _34d = pp.panel("options").title;
            if (_34b.type == "all" || _34b == "body") {
                pp.panel($.extend({}, _34b.options, {iconCls: (_34b.options.icon ? _34b.options.icon : undefined)}));
            }
            if (_34b.type == "all" || _34b.type == "header") {
                var opts = pp.panel("options");
                var tab = opts.tab;
                if (opts.header) {
                    tab.find(".tabs-inner").html($(opts.header));
                } else {
                    var _34e = tab.find("span.tabs-title");
                    var _34f = tab.find("span.tabs-icon");
                    _34e.html(opts.title);
                    _34f.attr("class", "tabs-icon");
                    tab.find("a.tabs-close").remove();
                    if (opts.closable) {
                        _34e.addClass("tabs-closable");
                        $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
                    } else {
                        _34e.removeClass("tabs-closable");
                    }
                    if (opts.iconCls) {
                        _34e.addClass("tabs-with-icon");
                        _34f.addClass(opts.iconCls);
                    } else {
                        _34e.removeClass("tabs-with-icon");
                    }
                    if (opts.tools) {
                        var _350 = tab.find("span.tabs-p-tool");
                        if (!_350.length) {
                            var _350 = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
                        }
                        if ($.isArray(opts.tools)) {
                            for (var i = 0; i < opts.tools.length; i++) {
                                var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(_350);
                                t.addClass(opts.tools[i].iconCls);
                                if (opts.tools[i].handler) {
                                    t.bind("click", {handler: opts.tools[i].handler}, function (e) {
                                        if ($(this).parents("li").hasClass("tabs-disabled")) {
                                            return;
                                        }
                                        e.data.handler.call(this);
                                    });
                                }
                            }
                        } else {
                            $(opts.tools).children().appendTo(_350);
                        }
                        var pr = _350.children().length * 12;
                        if (opts.closable) {
                            pr += 8;
                        } else {
                            pr -= 3;
                            _350.css("right", "5px");
                        }
                        _34e.css("padding-right", pr + "px");
                    } else {
                        tab.find("span.tabs-p-tool").remove();
                        _34e.css("padding-right", "");
                    }
                }
                if (_34d != opts.title) {
                    for (var i = 0; i < _34c.length; i++) {
                        if (_34c[i] == _34d) {
                            _34c[i] = opts.title;
                        }
                    }
                }
            }
            _317(_34a);
            $.data(_34a, "tabs").options.onUpdate.call(_34a, opts.title, _343(_34a, pp));
        };
        function _351(_352, _353) {
            var opts = $.data(_352, "tabs").options;
            var tabs = $.data(_352, "tabs").tabs;
            var _354 = $.data(_352, "tabs").selectHis;
            if (!_355(_352, _353)) {
                return;
            }
            var tab = _356(_352, _353);
            var _357 = tab.panel("options").title;
            var _358 = _343(_352, tab);
            if (opts.onBeforeClose.call(_352, _357, _358) == false) {
                return;
            }
            var tab = _356(_352, _353, true);
            tab.panel("options").tab.remove();
            tab.panel("destroy");
            opts.onClose.call(_352, _357, _358);
            _317(_352);
            for (var i = 0; i < _354.length; i++) {
                if (_354[i] == _357) {
                    _354.splice(i, 1);
                    i--;
                }
            }
            var _359 = _354.pop();
            if (_359) {
                _348(_352, _359);
            } else {
                if (tabs.length) {
                    _348(_352, 0);
                }
            }
        };
        function _356(_35a, _35b, _35c) {
            var tabs = $.data(_35a, "tabs").tabs;
            if (typeof _35b == "number") {
                if (_35b < 0 || _35b >= tabs.length) {
                    return null;
                } else {
                    var tab = tabs[_35b];
                    if (_35c) {
                        tabs.splice(_35b, 1);
                    }
                    return tab;
                }
            }
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.panel("options").title == _35b) {
                    if (_35c) {
                        tabs.splice(i, 1);
                    }
                    return tab;
                }
            }
            return null;
        };
        function _343(_35d, tab) {
            var tabs = $.data(_35d, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i][0] == $(tab)[0]) {
                    return i;
                }
            }
            return -1;
        };
        function _325(_35e) {
            var tabs = $.data(_35e, "tabs").tabs;
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                if (tab.panel("options").tab.hasClass("tabs-selected")) {
                    return tab;
                }
            }
            return null;
        };
        function _35f(_360) {
            var _361 = $.data(_360, "tabs");
            var tabs = _361.tabs;
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].panel("options").selected) {
                    _348(_360, i);
                    return;
                }
            }
            _348(_360, _361.options.selected);
        };
        function _348(_362, _363) {
            var p = _356(_362, _363);
            if (p && !p.is(":visible")) {
                _364(_362);
                p.panel("open");
            }
        };
        function _365(_366, _367) {
            var p = _356(_366, _367);
            if (p && p.is(":visible")) {
                _364(_366);
                p.panel("close");
            }
        };
        function _364(_368) {
            $(_368).children("div.tabs-panels").each(function () {
                $(this).stop(true, true);
            });
        };
        function _355(_369, _36a) {
            return _356(_369, _36a) != null;
        };
        function _36b(_36c, _36d) {
            var opts = $.data(_36c, "tabs").options;
            opts.showHeader = _36d;
            $(_36c).tabs("resize");
        };
        $.fn.tabs = function (_36e, _36f) {
            if (typeof _36e == "string") {
                return $.fn.tabs.methods[_36e](this, _36f);
            }
            _36e = _36e || {};
            return this.each(function () {
                var _370 = $.data(this, "tabs");
                if (_370) {
                    $.extend(_370.options, _36e);
                } else {
                    $.data(this, "tabs", {
                        options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), _36e),
                        tabs: [],
                        selectHis: []
                    });
                    _329(this);
                }
                _313(this);
                _334(this);
                _317(this);
                _32d(this);
                _35f(this);
            });
        };
        $.fn.tabs.methods = {
            options: function (jq) {
                var cc = jq[0];
                var opts = $.data(cc, "tabs").options;
                var s = _325(cc);
                opts.selected = s ? _343(cc, s) : -1;
                return opts;
            }, tabs: function (jq) {
                return $.data(jq[0], "tabs").tabs;
            }, resize: function (jq, _371) {
                return jq.each(function () {
                    _317(this, _371);
                    _323(this);
                });
            }, add: function (jq, _372) {
                return jq.each(function () {
                    _344(this, _372);
                });
            }, close: function (jq, _373) {
                return jq.each(function () {
                    _351(this, _373);
                });
            }, getTab: function (jq, _374) {
                return _356(jq[0], _374);
            }, getTabIndex: function (jq, tab) {
                return _343(jq[0], tab);
            }, getSelected: function (jq) {
                return _325(jq[0]);
            }, select: function (jq, _375) {
                return jq.each(function () {
                    _348(this, _375);
                });
            }, unselect: function (jq, _376) {
                return jq.each(function () {
                    _365(this, _376);
                });
            }, exists: function (jq, _377) {
                return _355(jq[0], _377);
            }, update: function (jq, _378) {
                return jq.each(function () {
                    _349(this, _378);
                });
            }, enableTab: function (jq, _379) {
                return jq.each(function () {
                    $(this).tabs("getTab", _379).panel("options").tab.removeClass("tabs-disabled");
                });
            }, disableTab: function (jq, _37a) {
                return jq.each(function () {
                    $(this).tabs("getTab", _37a).panel("options").tab.addClass("tabs-disabled");
                });
            }, showHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, true);
                });
            }, hideHeader: function (jq) {
                return jq.each(function () {
                    _36b(this, false);
                });
            }, scrollBy: function (jq, _37b) {
                return jq.each(function () {
                    var opts = $(this).tabs("options");
                    var wrap = $(this).find(">div.tabs-header>div.tabs-wrap");
                    var pos = Math.min(wrap._scrollLeft() + _37b, _37c());
                    wrap.animate({scrollLeft: pos}, opts.scrollDuration);
                    function _37c() {
                        var w = 0;
                        var ul = wrap.children("ul");
                        ul.children("li").each(function () {
                            w += $(this).outerWidth(true);
                        });
                        return w - wrap.width() + (ul.outerWidth() - ul.width());
                    };
                });
            }
        };
        $.fn.tabs.parseOptions = function (_37d) {
            return $.extend({}, $.parser.parseOptions(_37d, ["tools", "toolPosition", "tabPosition", {
                fit: "boolean",
                border: "boolean",
                plain: "boolean"
            }, {
                headerWidth: "number",
                tabWidth: "number",
                tabHeight: "number",
                selected: "number"
            }, {showHeader: "boolean", justified: "boolean", narrow: "boolean", pill: "boolean"}]));
        };
        $.fn.tabs.defaults = {
            width: "auto",
            height: "auto",
            headerWidth: 150,
            tabWidth: "auto",
            tabHeight: 27,
            selected: 0,
            showHeader: true,
            plain: false,
            fit: false,
            border: true,
            justified: false,
            narrow: false,
            pill: false,
            tools: null,
            toolPosition: "right",
            tabPosition: "top",
            scrollIncrement: 100,
            scrollDuration: 400,
            onLoad: function (_37e) {
            },
            onSelect: function (_37f, _380) {
            },
            onUnselect: function (_381, _382) {
            },
            onBeforeClose: function (_383, _384) {
            },
            onClose: function (_385, _386) {
            },
            onAdd: function (_387, _388) {
            },
            onUpdate: function (_389, _38a) {
            },
            onContextMenu: function (e, _38b, _38c) {
            }
        };
    })(jQuery);
    //layout
    (function ($) {
        var _38d = false;

        function _38e(_38f, _390) {
            var _391 = $.data(_38f, "layout");
            var opts = _391.options;
            var _392 = _391.panels;
            var cc = $(_38f);
            if (_390) {
                $.extend(opts, {width: _390.width, height: _390.height});
            }
            if (_38f.tagName.toLowerCase() == "body") {
                cc._size("fit");
            } else {
                cc._size(opts);
            }
            var cpos = {top: 0, left: 0, width: cc.width(), height: cc.height()};
            _393(_394(_392.expandNorth) ? _392.expandNorth : _392.north, "n");
            _393(_394(_392.expandSouth) ? _392.expandSouth : _392.south, "s");
            _395(_394(_392.expandEast) ? _392.expandEast : _392.east, "e");
            _395(_394(_392.expandWest) ? _392.expandWest : _392.west, "w");
            _392.center.panel("resize", cpos);
            function _393(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.panel("options");
                pp.panel("resize", {width: cc.width(), height: opts.height});
                var _396 = pp.panel("panel").outerHeight();
                pp.panel("move", {left: 0, top: (type == "n" ? 0 : cc.height() - _396)});
                cpos.height -= _396;
                if (type == "n") {
                    cpos.top += _396;
                    if (!opts.split && opts.border) {
                        cpos.top--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.height++;
                }
            };
            function _395(pp, type) {
                if (!pp.length || !_394(pp)) {
                    return;
                }
                var opts = pp.panel("options");
                pp.panel("resize", {width: opts.width, height: cpos.height});
                var _397 = pp.panel("panel").outerWidth();
                pp.panel("move", {left: (type == "e" ? cc.width() - _397 : 0), top: cpos.top});
                cpos.width -= _397;
                if (type == "w") {
                    cpos.left += _397;
                    if (!opts.split && opts.border) {
                        cpos.left--;
                    }
                }
                if (!opts.split && opts.border) {
                    cpos.width++;
                }
            };
        };
        function init(_398) {
            var cc = $(_398);
            cc.addClass("layout");
            function _399(cc) {
                cc.children("div").each(function () {
                    var opts = $.fn.layout.parsePanelOptions(this);
                    if ("north,south,east,west,center".indexOf(opts.region) >= 0) {
                        _39b(_398, opts, this);
                    }
                });
            };
            cc.children("form").length ? _399(cc.children("form")) : _399(cc);
            cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
            cc.bind("_resize", function (e, _39a) {
                if ($(this).hasClass("easyui-fluid") || _39a) {
                    _38e(_398);
                }
                return false;
            });
        };
        function _39b(_39c, _39d, el) {
            _39d.region = _39d.region || "center";
            var _39e = $.data(_39c, "layout").panels;
            var cc = $(_39c);
            var dir = _39d.region;
            if (_39e[dir].length) {
                return;
            }
            var pp = $(el);
            if (!pp.length) {
                pp = $("<div></div>").appendTo(cc);
            }
            var _39f = $.extend({}, $.fn.layout.paneldefaults, {
                width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"),
                height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"),
                doSize: false,
                collapsible: true,
                cls: ("layout-panel layout-panel-" + dir),
                bodyCls: "layout-body",
                onOpen: function () {
                    var tool = $(this).panel("header").children("div.panel-tool");
                    tool.children("a.panel-tool-collapse").hide();
                    var _3a0 = {north: "up", south: "down", east: "right", west: "left"};
                    if (!_3a0[dir]) {
                        return;
                    }
                    var _3a1 = "layout-button-" + _3a0[dir];
                    var t = tool.children("a." + _3a1);
                    if (!t.length) {
                        t = $("<a href=\"javascript:void(0)\"></a>").addClass(_3a1).appendTo(tool);
                        t.bind("click", {dir: dir}, function (e) {
                            _3ad(_39c, e.data.dir);
                            return false;
                        });
                    }
                    $(this).panel("options").collapsible ? t.show() : t.hide();
                }
            }, _39d);
            pp.panel(_39f);
            _39e[dir] = pp;
            var _3a2 = {north: "s", south: "n", east: "w", west: "e"};
            var _3a3 = pp.panel("panel");
            if (pp.panel("options").split) {
                _3a3.addClass("layout-split-" + dir);
            }
            _3a3.resizable($.extend({}, {
                handles: (_3a2[dir] || ""), disabled: (!pp.panel("options").split), onStartResize: function (e) {
                    _38d = true;
                    if (dir == "north" || dir == "south") {
                        var _3a4 = $(">div.layout-split-proxy-v", _39c);
                    } else {
                        var _3a4 = $(">div.layout-split-proxy-h", _39c);
                    }
                    var top = 0, left = 0, _3a5 = 0, _3a6 = 0;
                    var pos = {display: "block"};
                    if (dir == "north") {
                        pos.top = parseInt(_3a3.css("top")) + _3a3.outerHeight() - _3a4.height();
                        pos.left = parseInt(_3a3.css("left"));
                        pos.width = _3a3.outerWidth();
                        pos.height = _3a4.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_3a3.css("top"));
                            pos.left = parseInt(_3a3.css("left"));
                            pos.width = _3a3.outerWidth();
                            pos.height = _3a4.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_3a3.css("top")) || 0;
                                pos.left = parseInt(_3a3.css("left")) || 0;
                                pos.width = _3a4.width();
                                pos.height = _3a3.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_3a3.css("top")) || 0;
                                    pos.left = _3a3.outerWidth() - _3a4.width();
                                    pos.width = _3a4.width();
                                    pos.height = _3a3.outerHeight();
                                }
                            }
                        }
                    }
                    _3a4.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({
                        left: 0,
                        top: 0,
                        width: cc.width(),
                        height: cc.height()
                    }).appendTo(cc);
                }, onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var _3a7 = $(">div.layout-split-proxy-v", _39c);
                        _3a7.css("top", e.pageY - $(_39c).offset().top - _3a7.height() / 2);
                    } else {
                        var _3a7 = $(">div.layout-split-proxy-h", _39c);
                        _3a7.css("left", e.pageX - $(_39c).offset().left - _3a7.width() / 2);
                    }
                    return false;
                }, onStopResize: function (e) {
                    cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    pp.panel("resize", e.data);
                    _38e(_39c);
                    _38d = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _39d));
        };
        function _3a8(_3a9, _3aa) {
            var _3ab = $.data(_3a9, "layout").panels;
            if (_3ab[_3aa].length) {
                _3ab[_3aa].panel("destroy");
                _3ab[_3aa] = $();
                var _3ac = "expand" + _3aa.substring(0, 1).toUpperCase() + _3aa.substring(1);
                if (_3ab[_3ac]) {
                    _3ab[_3ac].panel("destroy");
                    _3ab[_3ac] = undefined;
                }
            }
        };
        function _3ad(_3ae, _3af, _3b0) {
            if (_3b0 == undefined) {
                _3b0 = "normal";
            }
            var _3b1 = $.data(_3ae, "layout").panels;
            var p = _3b1[_3af];
            var _3b2 = p.panel("options");
            if (_3b2.onBeforeCollapse.call(p) == false) {
                return;
            }
            var _3b3 = "expand" + _3af.substring(0, 1).toUpperCase() + _3af.substring(1);
            if (!_3b1[_3b3]) {
                _3b1[_3b3] = _3b4(_3af);
                _3b1[_3b3].panel("panel").bind("click", function () {
                    p.panel("expand", false).panel("open");
                    var _3b5 = _3b6();
                    p.panel("resize", _3b5.collapse);
                    p.panel("panel").animate(_3b5.expand, function () {
                        $(this).unbind(".layout").bind("mouseleave.layout", {region: _3af}, function (e) {
                            if (_38d == true) {
                                return;
                            }
                            if ($("body>div.combo-p>div.combo-panel:visible").length) {
                                return;
                            }
                            _3ad(_3ae, e.data.region);
                        });
                    });
                    return false;
                });
            }
            var _3b7 = _3b6();
            if (!_394(_3b1[_3b3])) {
                _3b1.center.panel("resize", _3b7.resizeC);
            }
            p.panel("panel").animate(_3b7.collapse, _3b0, function () {
                p.panel("collapse", false).panel("close");
                _3b1[_3b3].panel("open").panel("resize", _3b7.expandP);
                $(this).unbind(".layout");
            });
            function _3b4(dir) {
                var icon;
                if (dir == "east") {
                    icon = "layout-button-left";
                } else {
                    if (dir == "west") {
                        icon = "layout-button-right";
                    } else {
                        if (dir == "north") {
                            icon = "layout-button-down";
                        } else {
                            if (dir == "south") {
                                icon = "layout-button-up";
                            }
                        }
                    }
                }
                var p = $("<div></div>").appendTo(_3ae);
                p.panel($.extend({}, $.fn.layout.paneldefaults, {
                    cls: ("layout-expand layout-expand-" + dir),
                    title: "&nbsp;",
                    closed: true,
                    minWidth: 0,
                    minHeight: 0,
                    doSize: false,
                    tools: [{
                        iconCls: icon, handler: function () {
                            _3bd(_3ae, _3af);
                            return false;
                        }
                    }]
                }));
                p.panel("panel").hover(function () {
                    $(this).addClass("layout-expand-over");
                }, function () {
                    $(this).removeClass("layout-expand-over");
                });
                return p;
            };
            function _3b6() {
                var cc = $(_3ae);
                var _3b8 = _3b1.center.panel("options");
                var _3b9 = _3b2.collapsedSize;
                if (_3af == "east") {
                    var _3ba = p.panel("panel")._outerWidth();
                    var _3bb = _3b8.width + _3ba - _3b9;
                    if (_3b2.split || !_3b2.border) {
                        _3bb++;
                    }
                    return {
                        resizeC: {width: _3bb},
                        expand: {left: cc.width() - _3ba},
                        expandP: {top: _3b8.top, left: cc.width() - _3b9, width: _3b9, height: _3b8.height},
                        collapse: {left: cc.width(), top: _3b8.top, height: _3b8.height}
                    };
                } else {
                    if (_3af == "west") {
                        var _3ba = p.panel("panel")._outerWidth();
                        var _3bb = _3b8.width + _3ba - _3b9;
                        if (_3b2.split || !_3b2.border) {
                            _3bb++;
                        }
                        return {
                            resizeC: {width: _3bb, left: _3b9 - 1},
                            expand: {left: 0},
                            expandP: {left: 0, top: _3b8.top, width: _3b9, height: _3b8.height},
                            collapse: {left: -_3ba, top: _3b8.top, height: _3b8.height}
                        };
                    } else {
                        if (_3af == "north") {
                            var _3bc = p.panel("panel")._outerHeight();
                            var hh = _3b8.height;
                            if (!_394(_3b1.expandNorth)) {
                                hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                            }
                            _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).panel("resize", {
                                top: _3b9 - 1,
                                height: hh
                            });
                            return {
                                resizeC: {top: _3b9 - 1, height: hh},
                                expand: {top: 0},
                                expandP: {top: 0, left: 0, width: cc.width(), height: _3b9},
                                collapse: {top: -_3bc, width: cc.width()}
                            };
                        } else {
                            if (_3af == "south") {
                                var _3bc = p.panel("panel")._outerHeight();
                                var hh = _3b8.height;
                                if (!_394(_3b1.expandSouth)) {
                                    hh += _3bc - _3b9 + ((_3b2.split || !_3b2.border) ? 1 : 0);
                                }
                                _3b1.east.add(_3b1.west).add(_3b1.expandEast).add(_3b1.expandWest).panel("resize", {height: hh});
                                return {
                                    resizeC: {height: hh},
                                    expand: {top: cc.height() - _3bc},
                                    expandP: {top: cc.height() - _3b9, left: 0, width: cc.width(), height: _3b9},
                                    collapse: {top: cc.height(), width: cc.width()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _3bd(_3be, _3bf) {
            var _3c0 = $.data(_3be, "layout").panels;
            var p = _3c0[_3bf];
            var _3c1 = p.panel("options");
            if (_3c1.onBeforeExpand.call(p) == false) {
                return;
            }
            var _3c2 = "expand" + _3bf.substring(0, 1).toUpperCase() + _3bf.substring(1);
            if (_3c0[_3c2]) {
                _3c0[_3c2].panel("close");
                p.panel("panel").stop(true, true);
                p.panel("expand", false).panel("open");
                var _3c3 = _3c4();
                p.panel("resize", _3c3.collapse);
                p.panel("panel").animate(_3c3.expand, function () {
                    _38e(_3be);
                });
            }
            function _3c4() {
                var cc = $(_3be);
                var _3c5 = _3c0.center.panel("options");
                if (_3bf == "east" && _3c0.expandEast) {
                    return {
                        collapse: {left: cc.width(), top: _3c5.top, height: _3c5.height},
                        expand: {left: cc.width() - p.panel("panel")._outerWidth()}
                    };
                } else {
                    if (_3bf == "west" && _3c0.expandWest) {
                        return {
                            collapse: {left: -p.panel("panel")._outerWidth(), top: _3c5.top, height: _3c5.height},
                            expand: {left: 0}
                        };
                    } else {
                        if (_3bf == "north" && _3c0.expandNorth) {
                            return {
                                collapse: {top: -p.panel("panel")._outerHeight(), width: cc.width()},
                                expand: {top: 0}
                            };
                        } else {
                            if (_3bf == "south" && _3c0.expandSouth) {
                                return {
                                    collapse: {top: cc.height(), width: cc.width()},
                                    expand: {top: cc.height() - p.panel("panel")._outerHeight()}
                                };
                            }
                        }
                    }
                }
            };
        };
        function _394(pp) {
            if (!pp) {
                return false;
            }
            if (pp.length) {
                return pp.panel("panel").is(":visible");
            } else {
                return false;
            }
        };
        function _3c6(_3c7) {
            var _3c8 = $.data(_3c7, "layout").panels;
            _3c9("east");
            _3c9("west");
            _3c9("north");
            _3c9("south");
            function _3c9(_3ca) {
                var p = _3c8[_3ca];
                if (p.length && p.panel("options").collapsed) {
                    _3ad(_3c7, _3ca, 0);
                }
            };
        };
        function _3cb(_3cc, _3cd, _3ce) {
            var p = $(_3cc).layout("panel", _3cd);
            p.panel("options").split = _3ce;
            var cls = "layout-split-" + _3cd;
            var _3cf = p.panel("panel").removeClass(cls);
            if (_3ce) {
                _3cf.addClass(cls);
            }
            _3cf.resizable({disabled: (!_3ce)});
            _38e(_3cc);
        };
        $.fn.layout = function (_3d0, _3d1) {
            if (typeof _3d0 == "string") {
                return $.fn.layout.methods[_3d0](this, _3d1);
            }
            _3d0 = _3d0 || {};
            return this.each(function () {
                var _3d2 = $.data(this, "layout");
                if (_3d2) {
                    $.extend(_3d2.options, _3d0);
                } else {
                    var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _3d0);
                    $.data(this, "layout", {
                        options: opts,
                        panels: {center: $(), north: $(), south: $(), east: $(), west: $()}
                    });
                    init(this);
                }
                _38e(this);
                _3c6(this);
            });
        };
        $.fn.layout.methods = {
            options: function (jq) {
                return $.data(jq[0], "layout").options;
            }, resize: function (jq, _3d3) {
                return jq.each(function () {
                    _38e(this, _3d3);
                });
            }, panel: function (jq, _3d4) {
                return $.data(jq[0], "layout").panels[_3d4];
            }, collapse: function (jq, _3d5) {
                return jq.each(function () {
                    _3ad(this, _3d5);
                });
            }, expand: function (jq, _3d6) {
                return jq.each(function () {
                    _3bd(this, _3d6);
                });
            }, add: function (jq, _3d7) {
                return jq.each(function () {
                    _39b(this, _3d7);
                    _38e(this);
                    if ($(this).layout("panel", _3d7.region).panel("options").collapsed) {
                        _3ad(this, _3d7.region, 0);
                    }
                });
            }, remove: function (jq, _3d8) {
                return jq.each(function () {
                    _3a8(this, _3d8);
                    _38e(this);
                });
            }, split: function (jq, _3d9) {
                return jq.each(function () {
                    _3cb(this, _3d9, true);
                });
            }, unsplit: function (jq, _3da) {
                return jq.each(function () {
                    _3cb(this, _3da, false);
                });
            }
        };
        $.fn.layout.parseOptions = function (_3db) {
            return $.extend({}, $.parser.parseOptions(_3db, [{fit: "boolean"}]));
        };
        $.fn.layout.defaults = {fit: false};
        $.fn.layout.parsePanelOptions = function (_3dc) {
            var t = $(_3dc);
            return $.extend({}, $.fn.panel.parseOptions(_3dc), $.parser.parseOptions(_3dc, ["region", {
                split: "boolean",
                collpasedSize: "number",
                minWidth: "number",
                minHeight: "number",
                maxWidth: "number",
                maxHeight: "number"
            }]));
        };
        $.fn.layout.paneldefaults = $.extend({}, $.fn.panel.defaults, {
            region: null,
            split: false,
            collapsedSize: 28,
            minWidth: 10,
            minHeight: 10,
            maxWidth: 10000,
            maxHeight: 10000
        });
    })(jQuery);
    //menu
    (function ($) {
        $(function () {
            $(document).unbind(".menu").bind("mousedown.menu", function (e) {
                var m = $(e.target).closest("div.menu,div.combo-p");
                if (m.length) {
                    return;
                }
                $("body>div.menu-top:visible").not(".menu-inline").menu("hide");
                _3dd($("body>div.menu:visible").not(".menu-inline"));
            });
        });
        function init(_3de) {
            var opts = $.data(_3de, "menu").options;
            $(_3de).addClass("menu-top");
            opts.inline ? $(_3de).addClass("menu-inline") : $(_3de).appendTo("body");
            $(_3de).bind("_resize", function (e, _3df) {
                if ($(this).hasClass("easyui-fluid") || _3df) {
                    $(_3de).menu("resize", _3de);
                }
                return false;
            });
            var _3e0 = _3e1($(_3de));
            for (var i = 0; i < _3e0.length; i++) {
                _3e2(_3e0[i]);
            }
            function _3e1(menu) {
                var _3e3 = [];
                menu.addClass("menu");
                _3e3.push(menu);
                if (!menu.hasClass("menu-content")) {
                    menu.children("div").each(function () {
                        var _3e4 = $(this).children("div");
                        if (_3e4.length) {
                            _3e4.appendTo("body");
                            this.submenu = _3e4;
                            var mm = _3e1(_3e4);
                            _3e3 = _3e3.concat(mm);
                        }
                    });
                }
                return _3e3;
            };
            function _3e2(menu) {
                var wh = $.parser.parseOptions(menu[0], ["width", "height"]);
                menu[0].originalHeight = wh.height || 0;
                if (menu.hasClass("menu-content")) {
                    menu[0].originalWidth = wh.width || menu._outerWidth();
                } else {
                    menu[0].originalWidth = wh.width || 0;
                    menu.children("div").each(function () {
                        var item = $(this);
                        var _3e5 = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", {separator: "boolean"}]), {disabled: (item.attr("disabled") ? true : undefined)});
                        if (_3e5.separator) {
                            item.addClass("menu-sep");
                        }
                        if (!item.hasClass("menu-sep")) {
                            item[0].itemName = _3e5.name || "";
                            item[0].itemHref = _3e5.href || "";
                            var text = item.addClass("menu-item").html();
                            item.empty().append($("<div class=\"menu-text\"></div>").html(text));
                            if (_3e5.iconCls) {
                                $("<div class=\"menu-icon\"></div>").addClass(_3e5.iconCls).appendTo(item);
                            }
                            if (_3e5.disabled) {
                                _3e6(_3de, item[0], true);
                            }
                            if (item[0].submenu) {
                                $("<div class=\"menu-rightarrow\"></div>").appendTo(item);
                            }
                            _3e7(_3de, item);
                        }
                    });
                    $("<div class=\"menu-line\"></div>").prependTo(menu);
                }
                _3e8(_3de, menu);
                if (!menu.hasClass("menu-inline")) {
                    menu.hide();
                }
                _3e9(_3de, menu);
            };
        };
        function _3e8(_3ea, menu) {
            var opts = $.data(_3ea, "menu").options;
            var _3eb = menu.attr("style") || "";
            menu.css({display: "block", left: -10000, height: "auto", overflow: "hidden"});
            menu.find(".menu-item").each(function () {
                $(this)._outerHeight(opts.itemHeight);
                $(this).find(".menu-text").css({
                    height: (opts.itemHeight - 2) + "px",
                    lineHeight: (opts.itemHeight - 2) + "px"
                });
            });
            menu.removeClass("menu-noline").addClass(opts.noline ? "menu-noline" : "");
            var _3ec = menu[0].originalWidth || "auto";
            if (isNaN(parseInt(_3ec))) {
                _3ec = 0;
                menu.find("div.menu-text").each(function () {
                    if (_3ec < $(this)._outerWidth()) {
                        _3ec = $(this)._outerWidth();
                    }
                });
                _3ec += 40;
            }
            var _3ed = menu.outerHeight();
            var _3ee = menu[0].originalHeight || "auto";
            if (isNaN(parseInt(_3ee))) {
                _3ee = _3ed;
                if (menu.hasClass("menu-top") && opts.alignTo) {
                    var at = $(opts.alignTo);
                    var h1 = at.offset().top - $(document).scrollTop();
                    var h2 = $(window)._outerHeight() + $(document).scrollTop() - at.offset().top - at._outerHeight();
                    _3ee = Math.min(_3ee, Math.max(h1, h2));
                } else {
                    if (_3ee > $(window)._outerHeight()) {
                        _3ee = $(window).height();
                    }
                }
            }
            menu.attr("style", _3eb);
            menu._size({fit: (menu[0] == _3ea ? opts.fit : false), width: _3ec, minWidth: opts.minWidth, height: _3ee});
            menu.css("overflow", menu.outerHeight() < _3ed ? "auto" : "hidden");
            menu.children("div.menu-line")._outerHeight(_3ed - 2);
        };
        function _3e9(_3ef, menu) {
            if (menu.hasClass("menu-inline")) {
                return;
            }
            var _3f0 = $.data(_3ef, "menu");
            menu.unbind(".menu").bind("mouseenter.menu", function () {
                if (_3f0.timer) {
                    clearTimeout(_3f0.timer);
                    _3f0.timer = null;
                }
            }).bind("mouseleave.menu", function () {
                if (_3f0.options.hideOnUnhover) {
                    _3f0.timer = setTimeout(function () {
                        _3f1(_3ef, $(_3ef).hasClass("menu-inline"));
                    }, _3f0.options.duration);
                }
            });
        };
        function _3e7(_3f2, item) {
            if (!item.hasClass("menu-item")) {
                return;
            }
            item.unbind(".menu");
            item.bind("click.menu", function () {
                if ($(this).hasClass("menu-item-disabled")) {
                    return;
                }
                if (!this.submenu) {
                    _3f1(_3f2, $(_3f2).hasClass("menu-inline"));
                    var href = this.itemHref;
                    if (href) {
                        location.href = href;
                    }
                }
                $(this).trigger("mouseenter");
                var item = $(_3f2).menu("getItem", this);
                $.data(_3f2, "menu").options.onClick.call(_3f2, item);
            }).bind("mouseenter.menu", function (e) {
                item.siblings().each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
                item.addClass("menu-active");
                if ($(this).hasClass("menu-item-disabled")) {
                    item.addClass("menu-active-disabled");
                    return;
                }
                var _3f3 = item[0].submenu;
                if (_3f3) {
                    $(_3f2).menu("show", {menu: _3f3, parent: item});
                }
            }).bind("mouseleave.menu", function (e) {
                item.removeClass("menu-active menu-active-disabled");
                var _3f4 = item[0].submenu;
                if (_3f4) {
                    if (e.pageX >= parseInt(_3f4.css("left"))) {
                        item.addClass("menu-active");
                    } else {
                        _3dd(_3f4);
                    }
                } else {
                    item.removeClass("menu-active");
                }
            });
        };
        function _3f1(_3f5, _3f6) {
            var _3f7 = $.data(_3f5, "menu");
            if (_3f7) {
                if ($(_3f5).is(":visible")) {
                    _3dd($(_3f5));
                    if (_3f6) {
                        $(_3f5).show();
                    } else {
                        _3f7.options.onHide.call(_3f5);
                    }
                }
            }
            return false;
        };
        function _3f8(_3f9, _3fa) {
            var left, top;
            _3fa = _3fa || {};
            var menu = $(_3fa.menu || _3f9);
            $(_3f9).menu("resize", menu[0]);
            if (menu.hasClass("menu-top")) {
                var opts = $.data(_3f9, "menu").options;
                $.extend(opts, _3fa);
                left = opts.left;
                top = opts.top;
                if (opts.alignTo) {
                    var at = $(opts.alignTo);
                    left = at.offset().left;
                    top = at.offset().top + at._outerHeight();
                    if (opts.align == "right") {
                        left += at.outerWidth() - menu.outerWidth();
                    }
                }
                if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
                }
                if (left < 0) {
                    left = 0;
                }
                top = _3fb(top, opts.alignTo);
            } else {
                var _3fc = _3fa.parent;
                left = _3fc.offset().left + _3fc.outerWidth() - 2;
                if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = _3fc.offset().left - menu.outerWidth() + 2;
                }
                top = _3fb(_3fc.offset().top - 3);
            }
            function _3fb(top, _3fd) {
                if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    if (_3fd) {
                        top = $(_3fd).offset().top - menu._outerHeight();
                    } else {
                        top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight();
                    }
                }
                if (top < 0) {
                    top = 0;
                }
                return top;
            };
            menu.css({left: left, top: top});
            menu.show(0, function () {
                if (!menu[0].shadow) {
                    menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
                }
                menu[0].shadow.css({
                    display: (menu.hasClass("menu-inline") ? "none" : "block"),
                    zIndex: $.fn.menu.defaults.zIndex++,
                    left: menu.css("left"),
                    top: menu.css("top"),
                    width: menu.outerWidth(),
                    height: menu.outerHeight()
                });
                menu.css("z-index", $.fn.menu.defaults.zIndex++);
                if (menu.hasClass("menu-top")) {
                    $.data(menu[0], "menu").options.onShow.call(menu[0]);
                }
            });
        };
        function _3dd(menu) {
            if (menu && menu.length) {
                _3fe(menu);
                menu.find("div.menu-item").each(function () {
                    if (this.submenu) {
                        _3dd(this.submenu);
                    }
                    $(this).removeClass("menu-active");
                });
            }
            function _3fe(m) {
                m.stop(true, true);
                if (m[0].shadow) {
                    m[0].shadow.hide();
                }
                m.hide();
            };
        };
        function _3ff(_400, text) {
            var _401 = null;
            var tmp = $("<div></div>");

            function find(menu) {
                menu.children("div.menu-item").each(function () {
                    var item = $(_400).menu("getItem", this);
                    var s = tmp.empty().html(item.text).text();
                    if (text == $.trim(s)) {
                        _401 = item;
                    } else {
                        if (this.submenu && !_401) {
                            find(this.submenu);
                        }
                    }
                });
            };
            find($(_400));
            tmp.remove();
            return _401;
        };
        function _3e6(_402, _403, _404) {
            var t = $(_403);
            if (!t.hasClass("menu-item")) {
                return;
            }
            if (_404) {
                t.addClass("menu-item-disabled");
                if (_403.onclick) {
                    _403.onclick1 = _403.onclick;
                    _403.onclick = null;
                }
            } else {
                t.removeClass("menu-item-disabled");
                if (_403.onclick1) {
                    _403.onclick = _403.onclick1;
                    _403.onclick1 = null;
                }
            }
        };
        function _405(_406, _407) {
            var opts = $.data(_406, "menu").options;
            var menu = $(_406);
            if (_407.parent) {
                if (!_407.parent.submenu) {
                    var _408 = $("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
                    _408.hide();
                    _407.parent.submenu = _408;
                    $("<div class=\"menu-rightarrow\"></div>").appendTo(_407.parent);
                }
                menu = _407.parent.submenu;
            }
            if (_407.separator) {
                var item = $("<div class=\"menu-sep\"></div>").appendTo(menu);
            } else {
                var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
                $("<div class=\"menu-text\"></div>").html(_407.text).appendTo(item);
            }
            if (_407.iconCls) {
                $("<div class=\"menu-icon\"></div>").addClass(_407.iconCls).appendTo(item);
            }
            if (_407.id) {
                item.attr("id", _407.id);
            }
            if (_407.name) {
                item[0].itemName = _407.name;
            }
            if (_407.href) {
                item[0].itemHref = _407.href;
            }
            if (_407.onclick) {
                if (typeof _407.onclick == "string") {
                    item.attr("onclick", _407.onclick);
                } else {
                    item[0].onclick = eval(_407.onclick);
                }
            }
            if (_407.handler) {
                item[0].onclick = eval(_407.handler);
            }
            if (_407.disabled) {
                _3e6(_406, item[0], true);
            }
            _3e7(_406, item);
            _3e9(_406, menu);
            _3e8(_406, menu);
        };
        function _409(_40a, _40b) {
            function _40c(el) {
                if (el.submenu) {
                    el.submenu.children("div.menu-item").each(function () {
                        _40c(this);
                    });
                    var _40d = el.submenu[0].shadow;
                    if (_40d) {
                        _40d.remove();
                    }
                    el.submenu.remove();
                }
                $(el).remove();
            };
            var menu = $(_40b).parent();
            _40c(_40b);
            _3e8(_40a, menu);
        };
        function _40e(_40f, _410, _411) {
            var menu = $(_410).parent();
            if (_411) {
                $(_410).show();
            } else {
                $(_410).hide();
            }
            _3e8(_40f, menu);
        };
        function _412(_413) {
            $(_413).children("div.menu-item").each(function () {
                _409(_413, this);
            });
            if (_413.shadow) {
                _413.shadow.remove();
            }
            $(_413).remove();
        };
        $.fn.menu = function (_414, _415) {
            if (typeof _414 == "string") {
                return $.fn.menu.methods[_414](this, _415);
            }
            _414 = _414 || {};
            return this.each(function () {
                var _416 = $.data(this, "menu");
                if (_416) {
                    $.extend(_416.options, _414);
                } else {
                    _416 = $.data(this, "menu", {options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), _414)});
                    init(this);
                }
                $(this).css({left: _416.options.left, top: _416.options.top});
            });
        };
        $.fn.menu.methods = {
            options: function (jq) {
                return $.data(jq[0], "menu").options;
            }, show: function (jq, pos) {
                return jq.each(function () {
                    _3f8(this, pos);
                });
            }, hide: function (jq) {
                return jq.each(function () {
                    _3f1(this);
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    _412(this);
                });
            }, setText: function (jq, _417) {
                return jq.each(function () {
                    $(_417.target).children("div.menu-text").html(_417.text);
                });
            }, setIcon: function (jq, _418) {
                return jq.each(function () {
                    $(_418.target).children("div.menu-icon").remove();
                    if (_418.iconCls) {
                        $("<div class=\"menu-icon\"></div>").addClass(_418.iconCls).appendTo(_418.target);
                    }
                });
            }, getItem: function (jq, _419) {
                var t = $(_419);
                var item = {
                    target: _419,
                    id: t.attr("id"),
                    text: $.trim(t.children("div.menu-text").html()),
                    disabled: t.hasClass("menu-item-disabled"),
                    name: _419.itemName,
                    href: _419.itemHref,
                    onclick: _419.onclick
                };
                var icon = t.children("div.menu-icon");
                if (icon.length) {
                    var cc = [];
                    var aa = icon.attr("class").split(" ");
                    for (var i = 0; i < aa.length; i++) {
                        if (aa[i] != "menu-icon") {
                            cc.push(aa[i]);
                        }
                    }
                    item.iconCls = cc.join(" ");
                }
                return item;
            }, findItem: function (jq, text) {
                return _3ff(jq[0], text);
            }, appendItem: function (jq, _41a) {
                return jq.each(function () {
                    _405(this, _41a);
                });
            }, removeItem: function (jq, _41b) {
                return jq.each(function () {
                    _409(this, _41b);
                });
            }, enableItem: function (jq, _41c) {
                return jq.each(function () {
                    _3e6(this, _41c, false);
                });
            }, disableItem: function (jq, _41d) {
                return jq.each(function () {
                    _3e6(this, _41d, true);
                });
            }, showItem: function (jq, _41e) {
                return jq.each(function () {
                    _40e(this, _41e, true);
                });
            }, hideItem: function (jq, _41f) {
                return jq.each(function () {
                    _40e(this, _41f, false);
                });
            }, resize: function (jq, _420) {
                return jq.each(function () {
                    _3e8(this, $(_420));
                });
            }
        };
        $.fn.menu.parseOptions = function (_421) {
            return $.extend({}, $.parser.parseOptions(_421, [{
                minWidth: "number",
                itemHeight: "number",
                duration: "number",
                hideOnUnhover: "boolean"
            }, {fit: "boolean", inline: "boolean", noline: "boolean"}]));
        };
        $.fn.menu.defaults = {
            zIndex: 110000,
            left: 0,
            top: 0,
            alignTo: null,
            align: "left",
            minWidth: 120,
            itemHeight: 22,
            duration: 100,
            hideOnUnhover: true,
            inline: false,
            fit: false,
            noline: false,
            onShow: function () {
            },
            onHide: function () {
            },
            onClick: function (item) {
            }
        };
    })(jQuery);
    //menubutton
    (function ($) {
        function init(_422) {
            var opts = $.data(_422, "menubutton").options;
            var btn = $(_422);
            btn.linkbutton(opts);
            if (opts.hasDownArrow) {
                btn.removeClass(opts.cls.btn1 + " " + opts.cls.btn2).addClass("m-btn");
                btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + opts.size);
                var _423 = btn.find(".l-btn-left");
                $("<span></span>").addClass(opts.cls.arrow).appendTo(_423);
                $("<span></span>").addClass("m-btn-line").appendTo(_423);
            }
            $(_422).menubutton("resize");
            if (opts.menu) {
                $(opts.menu).menu({duration: opts.duration});
                var _424 = $(opts.menu).menu("options");
                var _425 = _424.onShow;
                var _426 = _424.onHide;
                $.extend(_424, {
                    onShow: function () {
                        var _427 = $(this).menu("options");
                        var btn = $(_427.alignTo);
                        var opts = btn.menubutton("options");
                        btn.addClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _425.call(this);
                    }, onHide: function () {
                        var _428 = $(this).menu("options");
                        var btn = $(_428.alignTo);
                        var opts = btn.menubutton("options");
                        btn.removeClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                        _426.call(this);
                    }
                });
            }
        };
        function _429(_42a) {
            var opts = $.data(_42a, "menubutton").options;
            var btn = $(_42a);
            var t = btn.find("." + opts.cls.trigger);
            if (!t.length) {
                t = btn;
            }
            t.unbind(".menubutton");
            var _42b = null;
            t.bind("click.menubutton", function () {
                if (!_42c()) {
                    _42d(_42a);
                    return false;
                }
            }).bind("mouseenter.menubutton", function () {
                if (!_42c()) {
                    _42b = setTimeout(function () {
                        _42d(_42a);
                    }, opts.duration);
                    return false;
                }
            }).bind("mouseleave.menubutton", function () {
                if (_42b) {
                    clearTimeout(_42b);
                }
                $(opts.menu).triggerHandler("mouseleave");
            });
            function _42c() {
                return $(_42a).linkbutton("options").disabled;
            };
        };
        function _42d(_42e) {
            var opts = $(_42e).menubutton("options");
            if (opts.disabled || !opts.menu) {
                return;
            }
            $("body>div.menu-top").menu("hide");
            var btn = $(_42e);
            var mm = $(opts.menu);
            if (mm.length) {
                mm.menu("options").alignTo = btn;
                mm.menu("show", {alignTo: btn, align: opts.menuAlign});
            }
            btn.blur();
        };
        $.fn.menubutton = function (_42f, _430) {
            if (typeof _42f == "string") {
                var _431 = $.fn.menubutton.methods[_42f];
                if (_431) {
                    return _431(this, _430);
                } else {
                    return this.linkbutton(_42f, _430);
                }
            }
            _42f = _42f || {};
            return this.each(function () {
                var _432 = $.data(this, "menubutton");
                if (_432) {
                    $.extend(_432.options, _42f);
                } else {
                    $.data(this, "menubutton", {options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), _42f)});
                    $(this).removeAttr("disabled");
                }
                init(this);
                _429(this);
            });
        };
        $.fn.menubutton.methods = {
            options: function (jq) {
                var _433 = jq.linkbutton("options");
                return $.extend($.data(jq[0], "menubutton").options, {
                    toggle: _433.toggle,
                    selected: _433.selected,
                    disabled: _433.disabled
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var opts = $(this).menubutton("options");
                    if (opts.menu) {
                        $(opts.menu).menu("destroy");
                    }
                    $(this).remove();
                });
            }
        };
        $.fn.menubutton.parseOptions = function (_434) {
            var t = $(_434);
            return $.extend({}, $.fn.linkbutton.parseOptions(_434), $.parser.parseOptions(_434, ["menu", {
                plain: "boolean",
                hasDownArrow: "boolean",
                duration: "number"
            }]));
        };
        $.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            hasDownArrow: true,
            menu: null,
            menuAlign: "left",
            duration: 100,
            cls: {btn1: "m-btn-active", btn2: "m-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn"}
        });
    })(jQuery);
    //splitbutton
    (function ($) {
        function init(_435) {
            var opts = $.data(_435, "splitbutton").options;
            $(_435).menubutton(opts);
            $(_435).addClass("s-btn");
        };
        $.fn.splitbutton = function (_436, _437) {
            if (typeof _436 == "string") {
                var _438 = $.fn.splitbutton.methods[_436];
                if (_438) {
                    return _438(this, _437);
                } else {
                    return this.menubutton(_436, _437);
                }
            }
            _436 = _436 || {};
            return this.each(function () {
                var _439 = $.data(this, "splitbutton");
                if (_439) {
                    $.extend(_439.options, _436);
                } else {
                    $.data(this, "splitbutton", {options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), _436)});
                    $(this).removeAttr("disabled");
                }
                init(this);
            });
        };
        $.fn.splitbutton.methods = {
            options: function (jq) {
                var _43a = jq.menubutton("options");
                var _43b = $.data(jq[0], "splitbutton").options;
                $.extend(_43b, {disabled: _43a.disabled, toggle: _43a.toggle, selected: _43a.selected});
                return _43b;
            }
        };
        $.fn.splitbutton.parseOptions = function (_43c) {
            var t = $(_43c);
            return $.extend({}, $.fn.linkbutton.parseOptions(_43c), $.parser.parseOptions(_43c, ["menu", {
                plain: "boolean",
                duration: "number"
            }]));
        };
        $.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {
            plain: true,
            menu: null,
            duration: 100,
            cls: {
                btn1: "m-btn-active s-btn-active",
                btn2: "m-btn-plain-active s-btn-plain-active",
                arrow: "m-btn-downarrow",
                trigger: "m-btn-line"
            }
        });
    })(jQuery);
    //validatebox $.extend($.fn.validatebox.defaults.rules,{rname:{validator:function(val){},message:''}});
    (function ($) {
        function init(_43d) {
            $(_43d).addClass("validatebox-text");
        };
        function _43e(_43f) {
            var _440 = $.data(_43f, "validatebox");
            _440.validating = false;
            if (_440.timer) {
                clearTimeout(_440.timer);
            }
            $(_43f).tooltip("destroy");
            $(_43f).unbind();
            $(_43f).remove();
        };
        function _441(_442) {
            var opts = $.data(_442, "validatebox").options;
            var box = $(_442);
            box.unbind(".validatebox");
            if (opts.novalidate || box.is(":disabled")) {
                return;
            }
            for (var _443 in opts.events) {
                $(_442).bind(_443 + ".validatebox", {target: _442}, opts.events[_443]);
            }
        };
        function _444(e) {
            var _445 = e.data.target;
            var _446 = $.data(_445, "validatebox");
            var box = $(_445);
            if ($(_445).attr("readonly")) {
                return;
            }
            _446.validating = true;
            _446.value = undefined;
            (function () {
                if (_446.validating) {
                    if (_446.value != box.val()) {
                        _446.value = box.val();
                        if (_446.timer) {
                            clearTimeout(_446.timer);
                        }
                        _446.timer = setTimeout(function () {
                            $(_445).validatebox("validate");
                        }, _446.options.delay);
                    } else {
                        _447(_445);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        };
        function _448(e) {
            var _449 = e.data.target;
            var _44a = $.data(_449, "validatebox");
            if (_44a.timer) {
                clearTimeout(_44a.timer);
                _44a.timer = undefined;
            }
            _44a.validating = false;
            _44b(_449);
        };
        function _44c(e) {
            var _44d = e.data.target;
            if ($(_44d).hasClass("validatebox-invalid")) {
                _44e(_44d);
            }
        };
        function _44f(e) {
            var _450 = e.data.target;
            var _451 = $.data(_450, "validatebox");
            if (!_451.validating) {
                _44b(_450);
            }
        };
        function _44e(_452) {
            var _453 = $.data(_452, "validatebox");
            var opts = _453.options;
            $(_452).tooltip($.extend({}, opts.tipOptions, {
                content: _453.message,
                position: opts.tipPosition,
                deltaX: opts.deltaX
            })).tooltip("show");
            _453.tip = true;
        };
        function _447(_454) {
            var _455 = $.data(_454, "validatebox");
            if (_455 && _455.tip) {
                $(_454).tooltip("reposition");
            }
        };
        function _44b(_456) {
            var _457 = $.data(_456, "validatebox");
            _457.tip = false;
            $(_456).tooltip("hide");
        };
        function _458(_459) {
            var _45a = $.data(_459, "validatebox");
            var opts = _45a.options;
            var box = $(_459);
            opts.onBeforeValidate.call(_459);
            var _45b = _45c();
            opts.onValidate.call(_459, _45b);
            return _45b;
            function _45d(msg) {
                _45a.message = msg;
            };
            function _45e(_45f, _460) {
                var _461 = box.val();
                var _462 = /([a-zA-Z_]+)(.*)/.exec(_45f);
                var rule = opts.rules[_462[1]];
                if (rule && _461) {
                    var _463 = _460 || opts.validParams || eval(_462[2]);
                    if (!rule["validator"].call(_459, _461, _463)) {
                        box.addClass("validatebox-invalid");
                        var _464 = rule["message"];
                        if (_463) {
                            for (var i = 0; i < _463.length; i++) {
                                _464 = _464.replace(new RegExp("\\{" + i + "\\}", "g"), _463[i]);
                            }
                        }
                        _45d(opts.invalidMessage || _464);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                return true;
            };
            function _45c() {
                box.removeClass("validatebox-invalid");
                _44b(_459);
                if (opts.novalidate || box.is(":disabled")) {
                    return true;
                }
                if (opts.required) {
                    if (box.val() == "") {
                        box.addClass("validatebox-invalid");
                        _45d(opts.missingMessage);
                        if (_45a.validating) {
                            _44e(_459);
                        }
                        return false;
                    }
                }
                if (opts.validType) {
                    if ($.isArray(opts.validType)) {
                        for (var i = 0; i < opts.validType.length; i++) {
                            if (!_45e(opts.validType[i])) {
                                return false;
                            }
                        }
                    } else {
                        if (typeof opts.validType == "string") {
                            if (!_45e(opts.validType)) {
                                return false;
                            }
                        } else {
                            for (var _465 in opts.validType) {
                                var _466 = opts.validType[_465];
                                if (!_45e(_465, _466)) {
                                    return false;
                                }
                            }
                        }
                    }
                }
                return true;
            };
        };
        function _467(_468, _469) {
            var opts = $.data(_468, "validatebox").options;
            if (_469 != undefined) {
                opts.novalidate = _469;
            }
            if (opts.novalidate) {
                $(_468).removeClass("validatebox-invalid");
                _44b(_468);
            }
            _458(_468);
            _441(_468);
        };
        $.fn.validatebox = function (_46a, _46b) {
            if (typeof _46a == "string") {
                return $.fn.validatebox.methods[_46a](this, _46b);
            }
            _46a = _46a || {};
            return this.each(function () {
                var _46c = $.data(this, "validatebox");
                if (_46c) {
                    $.extend(_46c.options, _46a);
                } else {
                    init(this);
                    $.data(this, "validatebox", {options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), _46a)});
                }
                _467(this);
                _458(this);
            });
        };
        $.fn.validatebox.methods = {
            options: function (jq) {
                return $.data(jq[0], "validatebox").options;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _43e(this);
                });
            }, validate: function (jq) {
                return jq.each(function () {
                    _458(this);
                });
            }, isValid: function (jq) {
                return _458(jq[0]);
            }, enableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, false);
                });
            }, disableValidation: function (jq) {
                return jq.each(function () {
                    _467(this, true);
                });
            }
        };
        $.fn.validatebox.parseOptions = function (_46d) {
            var t = $(_46d);
            return $.extend({}, $.parser.parseOptions(_46d, ["validType", "missingMessage", "invalidMessage", "tipPosition", {
                delay: "number",
                deltaX: "number"
            }]), {
                required: (t.attr("required") ? true : undefined),
                novalidate: (t.attr("novalidate") != undefined ? true : undefined)
            });
        };
        $.fn.validatebox.defaults = {
            required: false,
            validType: null,
            validParams: null,
            delay: 200,
            missingMessage: "该项必须填写",
            invalidMessage: null,
            tipPosition: "right",
            deltaX: 0,
            novalidate: false,
            events: {
                focus: _444, blur: _448, mouseenter: _44c, mouseleave: _44f, click: function (e) {
                    var t = $(e.data.target);
                    if (!t.is(":focus")) {
                        t.trigger("focus");
                    }
                }
            },
            tipOptions: {
                showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                    $(this).tooltip("tip").css({color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC"});
                }, onHide: function () {
                    $(this).tooltip("destroy");
                }
            },
            rules: {
                //验证汉字
                chinese: {
                    validator: function (value) {
                        return /^[\u0391-\uFFE5]+$/.test(value);
                    },
                    message: '请输入纯中文'
                },
                //移动手机号码验证
                mobile: {//value值为文本框中的值
                    validator: function (value) {
                        var reg = /^1\d{10}$/;
                        return reg.test(value);
                    },
                    message: '手机号码格式错误'
                },
                //国内邮编验证
                zipCode: {
                    validator: function (value) {
                        var reg = /^[0-9]\d{5}$/;
                        return reg.test(value);
                    },
                    message: '邮编格式错误'
                },
                //数字
                number: {
                    validator: function (value) {
                        var reg =/^[0-9]*$/;
                        return reg.test(value);
                    },
                    message: '请输入纯数字'
                },
                email: {
                    validator: function (_46e) {
                        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_46e);
                    }, message: "Email格式错误"
                }, url: {
                    validator: function (_46f) {
                        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_46f);
                    }, message: "网址格式错误"
                }, length: {
                    validator: function (_470, _471) {
                        var len = $.trim(_470).length;
                        return len >= _471[0] && len <= _471[1];
                    }, message: "请输入{0}个到{1}个字符"
                }, remote: {
                    validator: function (_472, _473) {
                        var data = {};
                        data[_473[1]] = _472;
                        var _474 = $.ajax({
                            url: _473[0],
                            dataType: "json",
                            data: data,
                            async: false,
                            cache: false,
                            type: "post"
                        }).responseText;
                        return _474 == "true";
                    }, message: "填写错误, 请更正"
                }
            },
            onBeforeValidate: function () {
            },
            onValidate: function (_475) {
            }
        };
        $.extendValidateRules=function(obj){return $.extend($.fn.validatebox.defaults.rules,obj);}
    })(jQuery);
    //textbox
    (function ($) {
        function init(_476) {
            $(_476).addClass("textbox-f").hide();
            var span = $("<span class=\"textbox\">" + "<input class=\"textbox-text\" autocomplete=\"off\">" + "<input type=\"hidden\" class=\"textbox-value\">" + "</span>").insertAfter(_476);
            var name = $(_476).attr("name");
            if (name) {
                span.find("input.textbox-value").attr("name", name);
                $(_476).removeAttr("name").attr("textboxName", name);
            }
            return span;
        };
        function _477(_478) {
            var _479 = $.data(_478, "textbox");
            var opts = _479.options;
            var tb = _479.textbox;
            tb.find(".textbox-text").remove();
            if (opts.multiline) {
                $("<textarea class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
            } else {
                $("<input type=\"" + opts.type + "\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
            }
            tb.find(".textbox-addon").remove();
            var bb = opts.icons ? $.extend(true, [], opts.icons) : [];
            if (opts.iconCls) {
                bb.push({iconCls: opts.iconCls, disabled: true});
            }
            if (bb.length) {
                var bc = $("<span class=\"textbox-addon\"></span>").prependTo(tb);
                bc.addClass("textbox-addon-" + opts.iconAlign);
                for (var i = 0; i < bb.length; i++) {
                    bc.append("<a href=\"javascript:void(0)\" class=\"textbox-icon " + bb[i].iconCls + "\" icon-index=\"" + i + "\" tabindex=\"-1\"></a>");
                }
            }
            tb.find(".textbox-button").remove();
            if (opts.buttonText || opts.buttonIcon) {
                var btn = $("<a href=\"javascript:void(0)\" class=\"textbox-button\"></a>").prependTo(tb);
                btn.addClass("textbox-button-" + opts.buttonAlign).linkbutton({
                    text: opts.buttonText,
                    iconCls: opts.buttonIcon
                });
            }
            _47a(_478, opts.disabled);
            _47b(_478, opts.readonly);
        };
        function _47c(_47d) {
            var tb = $.data(_47d, "textbox").textbox;
            tb.find(".textbox-text").validatebox("destroy");
            tb.remove();
            $(_47d).remove();
        };
        function _47e(_47f, _480) {
            var _481 = $.data(_47f, "textbox");
            var opts = _481.options;
            var tb = _481.textbox;
            var _482 = tb.parent();
            if (_480) {
                opts.width = _480;
            }
            if (isNaN(parseInt(opts.width))) {
                var c = $(_47f).clone();
                c.css("visibility", "hidden");
                c.insertAfter(_47f);
                opts.width = c.outerWidth();
                c.remove();
            }
            var _483 = tb.is(":visible");
            if (!_483) {
                tb.appendTo("body");
            }
            var _484 = tb.find(".textbox-text");
            var btn = tb.find(".textbox-button");
            var _485 = tb.find(".textbox-addon");
            var _486 = _485.find(".textbox-icon");
            tb._size(opts, _482);
            btn.linkbutton("resize", {height: tb.height()});
            btn.css({left: (opts.buttonAlign == "left" ? 0 : ""), right: (opts.buttonAlign == "right" ? 0 : "")});
            _485.css({
                left: (opts.iconAlign == "left" ? (opts.buttonAlign == "left" ? btn._outerWidth() : 0) : ""),
                right: (opts.iconAlign == "right" ? (opts.buttonAlign == "right" ? btn._outerWidth() : 0) : "")
            });
            _486.css({width: opts.iconWidth + "px", height: tb.height() + "px"});
            _484.css({
                paddingLeft: (_47f.style.paddingLeft || ""),
                paddingRight: (_47f.style.paddingRight || ""),
                marginLeft: _487("left"),
                marginRight: _487("right")
            });
            if (opts.multiline) {
                _484.css({paddingTop: (_47f.style.paddingTop || ""), paddingBottom: (_47f.style.paddingBottom || "")});
                _484._outerHeight(tb.height());
            } else {
                var _488 = Math.floor((tb.height() - _484.height()) / 2);
                _484.css({paddingTop: _488 + "px", paddingBottom: _488 + "px"});
            }
            _484._outerWidth(tb.width() - _486.length * opts.iconWidth - btn._outerWidth());
            if (!_483) {
                tb.insertAfter(_47f);
            }
            opts.onResize.call(_47f, opts.width, opts.height);
            function _487(_489) {
                return (opts.iconAlign == _489 ? _485._outerWidth() : 0) + (opts.buttonAlign == _489 ? btn._outerWidth() : 0);
            };
        };
        function _48a(_48b) {
            var opts = $(_48b).textbox("options");
            var _48c = $(_48b).textbox("textbox");
            _48c.validatebox($.extend({}, opts, {
                deltaX: $(_48b).textbox("getTipX"), onBeforeValidate: function () {
                    var box = $(this);
                    if (!box.is(":focus")) {
                        opts.oldInputValue = box.val();
                        box.val(opts.value);
                    }
                }, onValidate: function (_48d) {
                    var box = $(this);
                    if (opts.oldInputValue != undefined) {
                        box.val(opts.oldInputValue);
                        opts.oldInputValue = undefined;
                    }
                    var tb = box.parent();
                    if (_48d) {
                        tb.removeClass("textbox-invalid");
                    } else {
                        tb.addClass("textbox-invalid");
                    }
                }
            }));
        };
        function _48e(_48f) {
            var _490 = $.data(_48f, "textbox");
            var opts = _490.options;
            var tb = _490.textbox;
            var _491 = tb.find(".textbox-text");
            _491.attr("placeholder", opts.prompt);
            _491.unbind(".textbox");
            if (!opts.disabled && !opts.readonly) {
                _491.bind("blur.textbox", function (e) {
                    if (!tb.hasClass("textbox-focused")) {
                        return;
                    }
                    opts.value = $(this).val();
                    if (opts.value == "") {
                        $(this).val(opts.prompt).addClass("textbox-prompt");
                    } else {
                        $(this).removeClass("textbox-prompt");
                    }
                    tb.removeClass("textbox-focused");
                }).bind("focus.textbox", function (e) {
                    if (tb.hasClass("textbox-focused")) {
                        return;
                    }
                    if ($(this).val() != opts.value) {
                        $(this).val(opts.value);
                    }
                    $(this).removeClass("textbox-prompt");
                    tb.addClass("textbox-focused");
                });
                for (var _492 in opts.inputEvents) {
                    _491.bind(_492 + ".textbox", {target: _48f}, opts.inputEvents[_492]);
                }
            }
            var _493 = tb.find(".textbox-addon");
            _493.unbind().bind("click", {target: _48f}, function (e) {
                var icon = $(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
                if (icon.length) {
                    var _494 = parseInt(icon.attr("icon-index"));
                    var conf = opts.icons[_494];
                    if (conf && conf.handler) {
                        conf.handler.call(icon[0], e);
                        opts.onClickIcon.call(_48f, _494);
                    }
                }
            });
            _493.find(".textbox-icon").each(function (_495) {
                var conf = opts.icons[_495];
                var icon = $(this);
                if (!conf || conf.disabled || opts.disabled || opts.readonly) {
                    icon.addClass("textbox-icon-disabled");
                } else {
                    icon.removeClass("textbox-icon-disabled");
                }
            });
            var btn = tb.find(".textbox-button");
            btn.unbind(".textbox").bind("click.textbox", function () {
                if (!btn.linkbutton("options").disabled) {
                    opts.onClickButton.call(_48f);
                }
            });
            btn.linkbutton((opts.disabled || opts.readonly) ? "disable" : "enable");
            tb.unbind(".textbox").bind("_resize.textbox", function (e, _496) {
                if ($(this).hasClass("easyui-fluid") || _496) {
                    _47e(_48f);
                }
                return false;
            });
        };
        function _47a(_497, _498) {
            var _499 = $.data(_497, "textbox");
            var opts = _499.options;
            var tb = _499.textbox;
            if (_498) {
                opts.disabled = true;
                $(_497).attr("disabled", "disabled");
                tb.addClass("textbox-disabled");
                tb.find(".textbox-text,.textbox-value").attr("disabled", "disabled");
            } else {
                opts.disabled = false;
                tb.removeClass("textbox-disabled");
                $(_497).removeAttr("disabled");
                tb.find(".textbox-text,.textbox-value").removeAttr("disabled");
            }
        };
        function _47b(_49a, mode) {
            var _49b = $.data(_49a, "textbox");
            var opts = _49b.options;
            opts.readonly = mode == undefined ? true : mode;
            _49b.textbox.removeClass("textbox-readonly").addClass(opts.readonly ? "textbox-readonly" : "");
            var _49c = _49b.textbox.find(".textbox-text");
            _49c.removeAttr("readonly");
            if (opts.readonly || !opts.editable) {
                _49c.attr("readonly", "readonly");
            }
        };
        $.fn.textbox = function (_49d, _49e) {
            if (typeof _49d == "string") {
                var _49f = $.fn.textbox.methods[_49d];
                if (_49f) {
                    return _49f(this, _49e);
                } else {
                    return this.each(function () {
                        var _4a0 = $(this).textbox("textbox");
                        _4a0.validatebox(_49d, _49e);
                    });
                }
            }
            _49d = _49d || {};
            return this.each(function () {
                var _4a1 = $.data(this, "textbox");
                if (_4a1) {
                    $.extend(_4a1.options, _49d);
                    if (_49d.value != undefined) {
                        _4a1.options.originalValue = _49d.value;
                    }
                } else {
                    _4a1 = $.data(this, "textbox", {
                        options: $.extend({}, $.fn.textbox.defaults, $.fn.textbox.parseOptions(this), _49d),
                        textbox: init(this)
                    });
                    _4a1.options.originalValue = _4a1.options.value;
                }
                _477(this);
                _48e(this);
                _47e(this);
                _48a(this);
                $(this).textbox("initValue", _4a1.options.value);
            });
        };
        $.fn.textbox.methods = {
            options: function (jq) {
                return $.data(jq[0], "textbox").options;
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    var t = $(this);
                    if (t.data("textbox")) {
                        return;
                    }
                    if (!$(from).data("textbox")) {
                        $(from).textbox();
                    }
                    var name = t.attr("name") || "";
                    t.addClass("textbox-f").hide();
                    t.removeAttr("name").attr("textboxName", name);
                    var span = $(from).next().clone().insertAfter(t);
                    span.find("input.textbox-value").attr("name", name);
                    $.data(this, "textbox", {options: $.extend(true, {}, $(from).textbox("options")), textbox: span});
                    var _4a2 = $(from).textbox("button");
                    if (_4a2.length) {
                        t.textbox("button").linkbutton($.extend(true, {}, _4a2.linkbutton("options")));
                    }
                    _48e(this);
                    _48a(this);
                });
            }, textbox: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-text");
            }, button: function (jq) {
                return $.data(jq[0], "textbox").textbox.find(".textbox-button");
            }, destroy: function (jq) {
                return jq.each(function () {
                    _47c(this);
                });
            }, resize: function (jq, _4a3) {
                return jq.each(function () {
                    _47e(this, _4a3);
                });
            }, disable: function (jq) {
                return jq.each(function () {
                    _47a(this, true);
                    _48e(this);
                });
            }, enable: function (jq) {
                return jq.each(function () {
                    _47a(this, false);
                    _48e(this);
                });
            }, readonly: function (jq, mode) {
                return jq.each(function () {
                    _47b(this, mode);
                    _48e(this);
                });
            }, isValid: function (jq) {
                return jq.textbox("textbox").validatebox("isValid");
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setValue", "");
                });
            }, setText: function (jq, _4a4) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    var _4a5 = $(this).textbox("textbox");
                    if ($(this).textbox("getText") != _4a4) {
                        opts.value = _4a4;
                        _4a5.val(_4a4);
                    }
                    if (!_4a5.is(":focus")) {
                        if (_4a4) {
                            _4a5.removeClass("textbox-prompt");
                        } else {
                            _4a5.val(opts.prompt).addClass("textbox-prompt");
                        }
                    }
                    $(this).textbox("validate");
                });
            }, initValue: function (jq, _4a6) {
                return jq.each(function () {
                    var _4a7 = $.data(this, "textbox");
                    _4a7.options.value = "";
                    $(this).textbox("setText", _4a6);
                    _4a7.textbox.find(".textbox-value").val(_4a6);
                    $(this).val(_4a6);
                });
            }, setValue: function (jq, _4a8) {
                return jq.each(function () {
                    var opts = $.data(this, "textbox").options;
                    var _4a9 = $(this).textbox("getValue");
                    $(this).textbox("initValue", _4a8);
                    if (_4a9 != _4a8) {
                        opts.onChange.call(this, _4a8, _4a9);
                        $(this).closest("form").trigger("_change", [this]);
                    }
                });
            }, getText: function (jq) {
                var _4aa = jq.textbox("textbox");
                if (_4aa.is(":focus")) {
                    return _4aa.val();
                } else {
                    return jq.textbox("options").value;
                }
            }, getValue: function (jq) {
                return jq.data("textbox").textbox.find(".textbox-value").val();
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).textbox("options");
                    $(this).textbox("setValue", opts.originalValue);
                });
            }, getIcon: function (jq, _4ab) {
                return jq.data("textbox").textbox.find(".textbox-icon:eq(" + _4ab + ")");
            }, getTipX: function (jq) {
                var _4ac = jq.data("textbox");
                var opts = _4ac.options;
                var tb = _4ac.textbox;
                var _4ad = tb.find(".textbox-text");
                var _4ae = tb.find(".textbox-addon")._outerWidth();
                var _4af = tb.find(".textbox-button")._outerWidth();
                if (opts.tipPosition == "right") {
                    return (opts.iconAlign == "right" ? _4ae : 0) + (opts.buttonAlign == "right" ? _4af : 0) + 1;
                } else {
                    if (opts.tipPosition == "left") {
                        return (opts.iconAlign == "left" ? -_4ae : 0) + (opts.buttonAlign == "left" ? -_4af : 0) - 1;
                    } else {
                        return _4ae / 2 * (opts.iconAlign == "right" ? 1 : -1);
                    }
                }
            }
        };
        $.fn.textbox.parseOptions = function (_4b0) {
            var t = $(_4b0);
            return $.extend({}, $.fn.validatebox.parseOptions(_4b0), $.parser.parseOptions(_4b0, ["prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
                multiline: "boolean",
                editable: "boolean",
                iconWidth: "number"
            }]), {
                value: (t.val() || undefined),
                type: (t.attr("type") ? t.attr("type") : undefined),
                disabled: (t.attr("disabled") ? true : undefined),
                readonly: (t.attr("readonly") ? true : undefined)
            });
        };
        $.fn.textbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
            width: "auto",
            height: 22,
            prompt: "",
            value: "",
            type: "text",
            multiline: false,
            editable: true,
            disabled: false,
            readonly: false,
            icons: [],
            iconCls: null,
            iconAlign: "right",
            iconWidth: 18,
            buttonText: "",
            buttonIcon: null,
            buttonAlign: "right",
            inputEvents: {
                blur: function (e) {
                    var t = $(e.data.target);
                    var opts = t.textbox("options");
                    t.textbox("setValue", opts.value);
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.textbox("setValue", t.textbox("getText"));
                    }
                }
            },
            onChange: function (_4b1, _4b2) {
            },
            onResize: function (_4b3, _4b4) {
            },
            onClickButton: function () {
            },
            onClickIcon: function (_4b5) {
            }
        });
    })(jQuery);
    //filebox
    (function ($) {
        var _4b6 = 0;

        function _4b7(_4b8) {
            var _4b9 = $.data(_4b8, "filebox");
            var opts = _4b9.options;
            var id = "filebox_file_id_" + (++_4b6);
            $(_4b8).addClass("filebox-f").textbox(opts);
            $(_4b8).textbox("textbox").attr("readonly", "readonly");
            _4b9.filebox = $(_4b8).next().addClass("filebox");
            _4b9.filebox.find(".textbox-value").remove();
            opts.oldValue = "";
            var file = $("<input type=\"file\" class=\"textbox-value\">").appendTo(_4b9.filebox);
            file.attr("id", id).attr("name", $(_4b8).attr("textboxName") || "");
            file.change(function () {
                $(_4b8).filebox("setText", this.value);
                opts.onChange.call(_4b8, this.value, opts.oldValue);
                opts.oldValue = this.value;
            });
            var btn = $(_4b8).filebox("button");
            if (btn.length) {
                $("<label class=\"filebox-label\" for=\"" + id + "\"></label>").appendTo(btn);
                if (btn.linkbutton("options").disabled) {
                    file.attr("disabled", "disabled");
                } else {
                    file.removeAttr("disabled");
                }
            }
        };
        $.fn.filebox = function (_4ba, _4bb) {
            if (typeof _4ba == "string") {
                var _4bc = $.fn.filebox.methods[_4ba];
                if (_4bc) {
                    return _4bc(this, _4bb);
                } else {
                    return this.textbox(_4ba, _4bb);
                }
            }
            _4ba = _4ba || {};
            return this.each(function () {
                var _4bd = $.data(this, "filebox");
                if (_4bd) {
                    $.extend(_4bd.options, _4ba);
                } else {
                    $.data(this, "filebox", {options: $.extend({}, $.fn.filebox.defaults, $.fn.filebox.parseOptions(this), _4ba)});
                }
                _4b7(this);
            });
        };
        $.fn.filebox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "filebox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.filebox.parseOptions = function (_4be) {
            return $.extend({}, $.fn.textbox.parseOptions(_4be), {});
        };
        $.fn.filebox.defaults = $.extend({}, $.fn.textbox.defaults, {
            buttonIcon: null,
            buttonText: "Choose File",
            buttonAlign: "right",
            inputEvents: {}
        });
    })(jQuery);
    //searchbox
    (function ($) {
        function _4bf(_4c0) {
            var _4c1 = $.data(_4c0, "searchbox");
            var opts = _4c1.options;
            var _4c2 = $.extend(true, [], opts.icons);
            _4c2.push({
                iconCls: "searchbox-button", handler: function (e) {
                    var t = $(e.data.target);
                    var opts = t.searchbox("options");
                    opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                }
            });
            _4c3();
            var _4c4 = _4c5();
            $(_4c0).addClass("searchbox-f").textbox($.extend({}, opts, {
                icons: _4c2,
                buttonText: (_4c4 ? _4c4.text : "")
            }));
            $(_4c0).attr("searchboxName", $(_4c0).attr("textboxName"));
            _4c1.searchbox = $(_4c0).next();
            _4c1.searchbox.addClass("searchbox");
            _4c6(_4c4);
            function _4c3() {
                if (opts.menu) {
                    _4c1.menu = $(opts.menu).menu();
                    var _4c7 = _4c1.menu.menu("options");
                    var _4c8 = _4c7.onClick;
                    _4c7.onClick = function (item) {
                        _4c6(item);
                        _4c8.call(this, item);
                    };
                } else {
                    if (_4c1.menu) {
                        _4c1.menu.menu("destroy");
                    }
                    _4c1.menu = null;
                }
            };
            function _4c5() {
                if (_4c1.menu) {
                    var item = _4c1.menu.children("div.menu-item:first");
                    _4c1.menu.children("div.menu-item").each(function () {
                        var _4c9 = $.extend({}, $.parser.parseOptions(this), {selected: ($(this).attr("selected") ? true : undefined)});
                        if (_4c9.selected) {
                            item = $(this);
                            return false;
                        }
                    });
                    return _4c1.menu.menu("getItem", item[0]);
                } else {
                    return null;
                }
            };
            function _4c6(item) {
                if (!item) {
                    return;
                }
                $(_4c0).textbox("button").menubutton({
                    text: item.text,
                    iconCls: (item.iconCls || null),
                    menu: _4c1.menu,
                    menuAlign: opts.buttonAlign,
                    plain: false
                });
                _4c1.searchbox.find("input.textbox-value").attr("name", item.name || item.text);
                $(_4c0).searchbox("resize");
            };
        };
        $.fn.searchbox = function (_4ca, _4cb) {
            if (typeof _4ca == "string") {
                var _4cc = $.fn.searchbox.methods[_4ca];
                if (_4cc) {
                    return _4cc(this, _4cb);
                } else {
                    return this.textbox(_4ca, _4cb);
                }
            }
            _4ca = _4ca || {};
            return this.each(function () {
                var _4cd = $.data(this, "searchbox");
                if (_4cd) {
                    $.extend(_4cd.options, _4ca);
                } else {
                    $.data(this, "searchbox", {options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), _4ca)});
                }
                _4bf(this);
            });
        };
        $.fn.searchbox.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "searchbox").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, menu: function (jq) {
                return $.data(jq[0], "searchbox").menu;
            }, getName: function (jq) {
                return $.data(jq[0], "searchbox").searchbox.find("input.textbox-value").attr("name");
            }, selectName: function (jq, name) {
                return jq.each(function () {
                    var menu = $.data(this, "searchbox").menu;
                    if (menu) {
                        menu.children("div.menu-item").each(function () {
                            var item = menu.menu("getItem", this);
                            if (item.name == name) {
                                $(this).triggerHandler("click");
                                return false;
                            }
                        });
                    }
                });
            }, destroy: function (jq) {
                return jq.each(function () {
                    var menu = $(this).searchbox("menu");
                    if (menu) {
                        menu.menu("destroy");
                    }
                    $(this).textbox("destroy");
                });
            }
        };
        $.fn.searchbox.parseOptions = function (_4ce) {
            var t = $(_4ce);
            return $.extend({}, $.fn.textbox.parseOptions(_4ce), $.parser.parseOptions(_4ce, ["menu"]), {searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined)});
        };
        $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                keydown: function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        var t = $(e.data.target);
                        var opts = t.searchbox("options");
                        t.searchbox("setValue", $(this).val());
                        opts.searcher.call(e.data.target, t.searchbox("getValue"), t.searchbox("getName"));
                        return false;
                    }
                }
            }), buttonAlign: "left", menu: null, searcher: function (_4cf, name) {
            }
        });
    })(jQuery);
    //form deleted
    //numberbox
    (function ($) {
        function _4fe(_4ff) {
            var _500 = $.data(_4ff, "numberbox");
            var opts = _500.options;
            $(_4ff).addClass("numberbox-f").textbox(opts);
            $(_4ff).textbox("textbox").css({imeMode: "disabled"});
            $(_4ff).attr("numberboxName", $(_4ff).attr("textboxName"));
            _500.numberbox = $(_4ff).next();
            _500.numberbox.addClass("numberbox");
            var _501 = opts.parser.call(_4ff, opts.value);
            var _502 = opts.formatter.call(_4ff, _501);
            $(_4ff).numberbox("initValue", _501).numberbox("setText", _502);
        };
        function _503(_504, _505) {
            var _506 = $.data(_504, "numberbox");
            var opts = _506.options;
            var _505 = opts.parser.call(_504, _505);
            var text = opts.formatter.call(_504, _505);
            opts.value = _505;
            $(_504).textbox("setText", text).textbox("setValue", _505);
            text = opts.formatter.call(_504, $(_504).textbox("getValue"));
            $(_504).textbox("setText", text);
        };
        $.fn.numberbox = function (_507, _508) {
            if (typeof _507 == "string") {
                var _509 = $.fn.numberbox.methods[_507];
                if (_509) {
                    return _509(this, _508);
                } else {
                    return this.textbox(_507, _508);
                }
            }
            _507 = _507 || {};
            return this.each(function () {
                var _50a = $.data(this, "numberbox");
                if (_50a) {
                    $.extend(_50a.options, _507);
                } else {
                    _50a = $.data(this, "numberbox", {options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), _507)});
                }
                _4fe(this);
            });
        };
        $.fn.numberbox.methods = {
            options: function (jq) {
                var opts = jq.data("textbox") ? jq.textbox("options") : {};
                return $.extend($.data(jq[0], "numberbox").options, {
                    width: opts.width,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, fix: function (jq) {
                return jq.each(function () {
                    $(this).numberbox("setValue", $(this).numberbox("getText"));
                });
            }, setValue: function (jq, _50b) {
                return jq.each(function () {
                    _503(this, _50b);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("clear");
                    $(this).numberbox("options").value = "";
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    $(this).textbox("reset");
                    $(this).numberbox("setValue", $(this).numberbox("getValue"));
                });
            }
        };
        $.fn.numberbox.parseOptions = function (_50c) {
            var t = $(_50c);
            return $.extend({}, $.fn.textbox.parseOptions(_50c), $.parser.parseOptions(_50c, ["decimalSeparator", "groupSeparator", "suffix", {
                min: "number",
                max: "number",
                precision: "number"
            }]), {prefix: (t.attr("prefix") ? t.attr("prefix") : undefined)});
        };
        $.fn.numberbox.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {
                keypress: function (e) {
                    var _50d = e.data.target;
                    var opts = $(_50d).numberbox("options");
                    return opts.filter.call(_50d, e);
                }, blur: function (e) {
                    var _50e = e.data.target;
                    $(_50e).numberbox("setValue", $(_50e).numberbox("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var _50f = e.data.target;
                        $(_50f).numberbox("setValue", $(_50f).numberbox("getText"));
                    }
                }
            },
            min: null,
            max: null,
            precision: 0,
            decimalSeparator: ".",
            groupSeparator: "",
            prefix: "",
            suffix: "",
            filter: function (e) {
                var opts = $(this).numberbox("options");
                var s = $(this).numberbox("getText");
                if (e.which == 13) {
                    return true;
                }
                if (e.which == 45) {
                    return (s.indexOf("-") == -1 ? true : false);
                }
                var c = String.fromCharCode(e.which);
                if (c == opts.decimalSeparator) {
                    return (s.indexOf(c) == -1 ? true : false);
                } else {
                    if (c == opts.groupSeparator) {
                        return true;
                    } else {
                        if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                            return true;
                        } else {
                            if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            },
            formatter: function (_510) {
                if (!_510) {
                    return _510;
                }
                _510 = _510 + "";
                var opts = $(this).numberbox("options");
                var s1 = _510, s2 = "";
                var dpos = _510.indexOf(".");
                if (dpos >= 0) {
                    s1 = _510.substring(0, dpos);
                    s2 = _510.substring(dpos + 1, _510.length);
                }
                if (opts.groupSeparator) {
                    var p = /(\d+)(\d{3})/;
                    while (p.test(s1)) {
                        s1 = s1.replace(p, "$1" + opts.groupSeparator + "$2");
                    }
                }
                if (s2) {
                    return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
                } else {
                    return opts.prefix + s1 + opts.suffix;
                }
            },
            parser: function (s) {
                s = s + "";
                var opts = $(this).numberbox("options");
                if (parseFloat(s) != s) {
                    if (opts.prefix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"), ""));
                    }
                    if (opts.suffix) {
                        s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"), ""));
                    }
                    if (opts.groupSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.groupSeparator, "g"), ""));
                    }
                    if (opts.decimalSeparator) {
                        s = $.trim(s.replace(new RegExp("\\" + opts.decimalSeparator, "g"), "."));
                    }
                    s = s.replace(/\s/g, "");
                }
                var val = parseFloat(s).toFixed(opts.precision);
                if (isNaN(val)) {
                    val = "";
                } else {
                    if (typeof (opts.min) == "number" && val < opts.min) {
                        val = opts.min.toFixed(opts.precision);
                    } else {
                        if (typeof (opts.max) == "number" && val > opts.max) {
                            val = opts.max.toFixed(opts.precision);
                        }
                    }
                }
                return val;
            }
        });
    })(jQuery);
    //calendar deleted
    //spinner
    (function ($) {
        function _543(_544) {
            var _545 = $.data(_544, "spinner");
            var opts = _545.options;
            var _546 = $.extend(true, [], opts.icons);
            _546.push({
                iconCls: "spinner-arrow", handler: function (e) {
                    _547(e);
                }
            });
            $(_544).addClass("spinner-f").textbox($.extend({}, opts, {icons: _546}));
            var _548 = $(_544).textbox("getIcon", _546.length - 1);
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
            _548.append("<a href=\"javascript:void(0)\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
            $(_544).attr("spinnerName", $(_544).attr("textboxName"));
            _545.spinner = $(_544).next();
            _545.spinner.addClass("spinner");
        };
        function _547(e) {
            var _549 = e.data.target;
            var opts = $(_549).spinner("options");
            var up = $(e.target).closest("a.spinner-arrow-up");
            if (up.length) {
                opts.spin.call(_549, false);
                opts.onSpinUp.call(_549);
                $(_549).spinner("validate");
            }
            var down = $(e.target).closest("a.spinner-arrow-down");
            if (down.length) {
                opts.spin.call(_549, true);
                opts.onSpinDown.call(_549);
                $(_549).spinner("validate");
            }
        };
        $.fn.spinner = function (_54a, _54b) {
            if (typeof _54a == "string") {
                var _54c = $.fn.spinner.methods[_54a];
                if (_54c) {
                    return _54c(this, _54b);
                } else {
                    return this.textbox(_54a, _54b);
                }
            }
            _54a = _54a || {};
            return this.each(function () {
                var _54d = $.data(this, "spinner");
                if (_54d) {
                    $.extend(_54d.options, _54a);
                } else {
                    _54d = $.data(this, "spinner", {options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _54a)});
                }
                _543(this);
            });
        };
        $.fn.spinner.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "spinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.spinner.parseOptions = function (_54e) {
            return $.extend({}, $.fn.textbox.parseOptions(_54e), $.parser.parseOptions(_54e, ["min", "max", {increment: "number"}]));
        };
        $.fn.spinner.defaults = $.extend({}, $.fn.textbox.defaults, {
            min: null, max: null, increment: 1, spin: function (down) {
            }, onSpinUp: function () {
            }, onSpinDown: function () {
            }
        });
    })(jQuery);
    (function ($) {
        function _54f(_550) {
            $(_550).addClass("numberspinner-f");
            var opts = $.data(_550, "numberspinner").options;
            $(_550).numberbox(opts).spinner(opts);
            $(_550).numberbox("setValue", opts.value);
        };
        function _551(_552, down) {
            var opts = $.data(_552, "numberspinner").options;
            var v = parseFloat($(_552).numberbox("getValue") || opts.value) || 0;
            if (down) {
                v -= opts.increment;
            } else {
                v += opts.increment;
            }
            $(_552).numberbox("setValue", v);
        };
        $.fn.numberspinner = function (_553, _554) {
            if (typeof _553 == "string") {
                var _555 = $.fn.numberspinner.methods[_553];
                if (_555) {
                    return _555(this, _554);
                } else {
                    return this.numberbox(_553, _554);
                }
            }
            _553 = _553 || {};
            return this.each(function () {
                var _556 = $.data(this, "numberspinner");
                if (_556) {
                    $.extend(_556.options, _553);
                } else {
                    $.data(this, "numberspinner", {options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), _553)});
                }
                _54f(this);
            });
        };
        $.fn.numberspinner.methods = {
            options: function (jq) {
                var opts = jq.numberbox("options");
                return $.extend($.data(jq[0], "numberspinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }
        };
        $.fn.numberspinner.parseOptions = function (_557) {
            return $.extend({}, $.fn.spinner.parseOptions(_557), $.fn.numberbox.parseOptions(_557), {});
        };
        $.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
            spin: function (down) {
                _551(this, down);
            }
        });
    })(jQuery);
    (function ($) {
        function _558(_559) {
            var _55a = 0;
            if (_559.selectionStart) {
                _55a = _559.selectionStart;
            } else {
                if (_559.createTextRange) {
                    var _55b = _559.createTextRange();
                    var s = document.selection.createRange();
                    s.setEndPoint("StartToStart", _55b);
                    _55a = s.text.length;
                }
            }
            return _55a;
        };
        function _55c(_55d, _55e, end) {
            if (_55d.selectionStart) {
                _55d.setSelectionRange(_55e, end);
            } else {
                if (_55d.createTextRange) {
                    var _55f = _55d.createTextRange();
                    _55f.collapse();
                    _55f.moveEnd("character", end);
                    _55f.moveStart("character", _55e);
                    _55f.select();
                }
            }
        };
        function _560(_561) {
            var opts = $.data(_561, "timespinner").options;
            $(_561).addClass("timespinner-f").spinner(opts);
            var _562 = opts.formatter.call(_561, opts.parser.call(_561, opts.value));
            $(_561).timespinner("initValue", _562);
        };
        function _563(e) {
            var _564 = e.data.target;
            var opts = $.data(_564, "timespinner").options;
            var _565 = _558(this);
            for (var i = 0; i < opts.selections.length; i++) {
                var _566 = opts.selections[i];
                if (_565 >= _566[0] && _565 <= _566[1]) {
                    _567(_564, i);
                    return;
                }
            }
        };
        function _567(_568, _569) {
            var opts = $.data(_568, "timespinner").options;
            if (_569 != undefined) {
                opts.highlight = _569;
            }
            var _56a = opts.selections[opts.highlight];
            if (_56a) {
                var tb = $(_568).timespinner("textbox");
                _55c(tb[0], _56a[0], _56a[1]);
                tb.focus();
            }
        };
        function _56b(_56c, _56d) {
            var opts = $.data(_56c, "timespinner").options;
            var _56d = opts.parser.call(_56c, _56d);
            var text = opts.formatter.call(_56c, _56d);
            $(_56c).spinner("setValue", text);
        };
        function _56e(_56f, down) {
            var opts = $.data(_56f, "timespinner").options;
            var s = $(_56f).timespinner("getValue");
            var _570 = opts.selections[opts.highlight];
            var s1 = s.substring(0, _570[0]);
            var s2 = s.substring(_570[0], _570[1]);
            var s3 = s.substring(_570[1]);
            var v = s1 + ((parseInt(s2) || 0) + opts.increment * (down ? -1 : 1)) + s3;
            $(_56f).timespinner("setValue", v);
            _567(_56f);
        };
        $.fn.timespinner = function (_571, _572) {
            if (typeof _571 == "string") {
                var _573 = $.fn.timespinner.methods[_571];
                if (_573) {
                    return _573(this, _572);
                } else {
                    return this.spinner(_571, _572);
                }
            }
            _571 = _571 || {};
            return this.each(function () {
                var _574 = $.data(this, "timespinner");
                if (_574) {
                    $.extend(_574.options, _571);
                } else {
                    $.data(this, "timespinner", {options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), _571)});
                }
                _560(this);
            });
        };
        $.fn.timespinner.methods = {
            options: function (jq) {
                var opts = jq.data("spinner") ? jq.spinner("options") : {};
                return $.extend($.data(jq[0], "timespinner").options, {
                    width: opts.width,
                    value: opts.value,
                    originalValue: opts.originalValue,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, setValue: function (jq, _575) {
                return jq.each(function () {
                    _56b(this, _575);
                });
            }, getHours: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[0], 10);
            }, getMinutes: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[1], 10);
            }, getSeconds: function (jq) {
                var opts = $.data(jq[0], "timespinner").options;
                var vv = jq.timespinner("getValue").split(opts.separator);
                return parseInt(vv[2], 10) || 0;
            }
        };
        $.fn.timespinner.parseOptions = function (_576) {
            return $.extend({}, $.fn.spinner.parseOptions(_576), $.parser.parseOptions(_576, ["separator", {
                showSeconds: "boolean",
                highlight: "number"
            }]));
        };
        $.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
            inputEvents: $.extend({}, $.fn.spinner.defaults.inputEvents, {
                click: function (e) {
                    _563.call(this, e);
                }, blur: function (e) {
                    var t = $(e.data.target);
                    t.timespinner("setValue", t.timespinner("getText"));
                }, keydown: function (e) {
                    if (e.keyCode == 13) {
                        var t = $(e.data.target);
                        t.timespinner("setValue", t.timespinner("getText"));
                    }
                }
            }),
            formatter: function (date) {
                if (!date) {
                    return "";
                }
                var opts = $(this).timespinner("options");
                var tt = [_577(date.getHours()), _577(date.getMinutes())];
                if (opts.showSeconds) {
                    tt.push(_577(date.getSeconds()));
                }
                return tt.join(opts.separator);
                function _577(_578) {
                    return (_578 < 10 ? "0" : "") + _578;
                };
            },
            parser: function (s) {
                var opts = $(this).timespinner("options");
                var date = _579(s);
                if (date) {
                    var min = _579(opts.min);
                    var max = _579(opts.max);
                    if (min && min > date) {
                        date = min;
                    }
                    if (max && max < date) {
                        date = max;
                    }
                }
                return date;
                function _579(s) {
                    if (!s) {
                        return null;
                    }
                    var tt = s.split(opts.separator);
                    return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
                };
                if (!s) {
                    return null;
                }
                var tt = s.split(opts.separator);
                return new Date(1900, 0, 0, parseInt(tt[0], 10) || 0, parseInt(tt[1], 10) || 0, parseInt(tt[2], 10) || 0);
            },
            selections: [[0, 2], [3, 5], [6, 8]],
            separator: ":",
            showSeconds: false,
            highlight: 0,
            spin: function (down) {
                _56e(this, down);
            }
        });
    })(jQuery);
    //datetimespinner deleted
    //datagrid deleted
    //propertygrid deleted
    //treegrid deleted
    //datalist deleted
    //combo
    (function ($) {
        $(function () {
            $(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function (e) {
                var p = $(e.target).closest("span.combo,div.combo-p,div.menu");
                if (p.length) {
                    _90a(p);
                    return;
                }
                $("body>div.combo-p>div.combo-panel:visible").panel("close");
            });
        });
        function _90b(_90c) {
            var _90d = $.data(_90c, "combo");
            var opts = _90d.options;
            if (!_90d.panel) {
                _90d.panel = $("<div class=\"combo-panel\"></div>").appendTo("body");
                _90d.panel.panel({
                    minWidth: opts.panelMinWidth,
                    maxWidth: opts.panelMaxWidth,
                    minHeight: opts.panelMinHeight,
                    maxHeight: opts.panelMaxHeight,
                    doSize: false,
                    closed: true,
                    cls: "combo-p",
                    style: {position: "absolute", zIndex: 10},
                    onOpen: function () {
                        var _90e = $(this).panel("options").comboTarget;
                        var _90f = $.data(_90e, "combo");
                        if (_90f) {
                            _90f.options.onShowPanel.call(_90e);
                        }
                    },
                    onBeforeClose: function () {
                        _90a(this);
                    },
                    onClose: function () {
                        var _910 = $(this).panel("options").comboTarget;
                        var _911 = $(_910).data("combo");
                        if (_911) {
                            _911.options.onHidePanel.call(_910);
                        }
                    }
                });
            }
            var _912 = $.extend(true, [], opts.icons);
            if (opts.hasDownArrow) {
                _912.push({
                    iconCls: "combo-arrow", handler: function (e) {
                        _916(e.data.target);
                    }
                });
            }
            $(_90c).addClass("combo-f").textbox($.extend({}, opts, {
                icons: _912, onChange: function () {
                }
            }));
            $(_90c).attr("comboName", $(_90c).attr("textboxName"));
            _90d.combo = $(_90c).next();
            _90d.combo.addClass("combo");
        };
        function _913(_914) {
            var _915 = $.data(_914, "combo");
            var opts = _915.options;
            var p = _915.panel;
            if (p.is(":visible")) {
                p.panel("close");
            }
            if (!opts.cloned) {
                p.panel("destroy");
            }
            $(_914).textbox("destroy");
        };
        function _916(_917) {
            var _918 = $.data(_917, "combo").panel;
            if (_918.is(":visible")) {
                _919(_917);
            } else {
                var p = $(_917).closest("div.combo-panel");
                $("div.combo-panel:visible").not(_918).not(p).panel("close");
                $(_917).combo("showPanel");
            }
            $(_917).combo("textbox").focus();
        };
        function _90a(_91a) {
            $(_91a).find(".combo-f").each(function () {
                var p = $(this).combo("panel");
                if (p.is(":visible")) {
                    p.panel("close");
                }
            });
        };
        function _91b(e) {
            var _91c = e.data.target;
            var _91d = $.data(_91c, "combo");
            var opts = _91d.options;
            var _91e = _91d.panel;
            if (!opts.editable) {
                _916(_91c);
            } else {
                var p = $(_91c).closest("div.combo-panel");
                $("div.combo-panel:visible").not(_91e).not(p).panel("close");
            }
        };
        function _91f(e) {
            var _920 = e.data.target;
            var t = $(_920);
            var _921 = t.data("combo");
            var opts = t.combo("options");
            switch (e.keyCode) {
                case 38:
                    opts.keyHandler.up.call(_920, e);
                    break;
                case 40:
                    opts.keyHandler.down.call(_920, e);
                    break;
                case 37:
                    opts.keyHandler.left.call(_920, e);
                    break;
                case 39:
                    opts.keyHandler.right.call(_920, e);
                    break;
                case 13:
                    e.preventDefault();
                    opts.keyHandler.enter.call(_920, e);
                    return false;
                case 9:
                case 27:
                    _919(_920);
                    break;
                default:
                    if (opts.editable) {
                        if (_921.timer) {
                            clearTimeout(_921.timer);
                        }
                        _921.timer = setTimeout(function () {
                            var q = t.combo("getText");
                            if (_921.previousText != q) {
                                _921.previousText = q;
                                t.combo("showPanel");
                                opts.keyHandler.query.call(_920, q, e);
                                t.combo("validate");
                            }
                        }, opts.delay);
                    }
            }
        };
        function _922(_923) {
            var _924 = $.data(_923, "combo");
            var _925 = _924.combo;
            var _926 = _924.panel;
            var opts = $(_923).combo("options");
            var _927 = _926.panel("options");
            _927.comboTarget = _923;
            if (_927.closed) {
                _926.panel("panel").show().css({
                    zIndex: ($.fn.menu ? $.fn.menu.defaults.zIndex++ : $.fn.window.defaults.zIndex++),
                    left: -999999
                });
                _926.panel("resize", {
                    width: (opts.panelWidth ? opts.panelWidth : _925._outerWidth()),
                    height: opts.panelHeight
                });
                _926.panel("panel").hide();
                _926.panel("open");
            }
            (function () {
                if (_926.is(":visible")) {
                    _926.panel("move", {left: _928(), top: _929()});
                    setTimeout(arguments.callee, 200);
                }
            })();
            function _928() {
                var left = _925.offset().left;
                if (opts.panelAlign == "right") {
                    left += _925._outerWidth() - _926._outerWidth();
                }
                if (left + _926._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                    left = $(window)._outerWidth() + $(document).scrollLeft() - _926._outerWidth();
                }
                if (left < 0) {
                    left = 0;
                }
                return left;
            };
            function _929() {
                var top = _925.offset().top + _925._outerHeight();
                if (top + _926._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                    top = _925.offset().top - _926._outerHeight();
                }
                if (top < $(document).scrollTop()) {
                    top = _925.offset().top + _925._outerHeight();
                }
                return top;
            };
        };
        function _919(_92a) {
            var _92b = $.data(_92a, "combo").panel;
            _92b.panel("close");
        };
        function _92c(_92d, text) {
            var _92e = $.data(_92d, "combo");
            var _92f = $(_92d).textbox("getText");
            if (_92f != text) {
                $(_92d).textbox("setText", text);
                _92e.previousText = text;
            }
        };
        function _930(_931) {
            var _932 = [];
            var _933 = $.data(_931, "combo").combo;
            _933.find(".textbox-value").each(function () {
                _932.push($(this).val());
            });
            return _932;
        };
        function _934(_935, _936) {
            var _937 = $.data(_935, "combo");
            var opts = _937.options;
            var _938 = _937.combo;
            if (!$.isArray(_936)) {
                _936 = _936.split(opts.separator);
            }
            var _939 = _930(_935);
            _938.find(".textbox-value").remove();
            var name = $(_935).attr("textboxName") || "";
            for (var i = 0; i < _936.length; i++) {
                var _93a = $("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_938);
                _93a.attr("name", name);
                if (opts.disabled) {
                    _93a.attr("disabled", "disabled");
                }
                _93a.val(_936[i]);
            }
            var _93b = (function () {
                if (_939.length != _936.length) {
                    return true;
                }
                var a1 = $.extend(true, [], _939);
                var a2 = $.extend(true, [], _936);
                a1.sort();
                a2.sort();
                for (var i = 0; i < a1.length; i++) {
                    if (a1[i] != a2[i]) {
                        return true;
                    }
                }
                return false;
            })();
            if (_93b) {
                if (opts.multiple) {
                    opts.onChange.call(_935, _936, _939);
                } else {
                    opts.onChange.call(_935, _936[0], _939[0]);
                }
                $(_935).closest("form").trigger("_change", [_935]);
            }
        };
        function _93c(_93d) {
            var _93e = _930(_93d);
            return _93e[0];
        };
        function _93f(_940, _941) {
            _934(_940, [_941]);
        };
        function _942(_943) {
            var opts = $.data(_943, "combo").options;
            var _944 = opts.onChange;
            opts.onChange = function () {
            };
            if (opts.multiple) {
                _934(_943, opts.value ? opts.value : []);
            } else {
                _93f(_943, opts.value);
            }
            opts.onChange = _944;
        };
        $.fn.combo = function (_945, _946) {
            if (typeof _945 == "string") {
                var _947 = $.fn.combo.methods[_945];
                if (_947) {
                    return _947(this, _946);
                } else {
                    return this.textbox(_945, _946);
                }
            }
            _945 = _945 || {};
            return this.each(function () {
                var _948 = $.data(this, "combo");
                if (_948) {
                    $.extend(_948.options, _945);
                    if (_945.value != undefined) {
                        _948.options.originalValue = _945.value;
                    }
                } else {
                    _948 = $.data(this, "combo", {
                        options: $.extend({}, $.fn.combo.defaults, $.fn.combo.parseOptions(this), _945),
                        previousText: ""
                    });
                    _948.options.originalValue = _948.options.value;
                }
                _90b(this);
                _942(this);
            });
        };
        $.fn.combo.methods = {
            options: function (jq) {
                var opts = jq.textbox("options");
                return $.extend($.data(jq[0], "combo").options, {
                    width: opts.width,
                    height: opts.height,
                    disabled: opts.disabled,
                    readonly: opts.readonly
                });
            }, cloneFrom: function (jq, from) {
                return jq.each(function () {
                    $(this).textbox("cloneFrom", from);
                    $.data(this, "combo", {
                        options: $.extend(true, {cloned: true}, $(from).combo("options")),
                        combo: $(this).next(),
                        panel: $(from).combo("panel")
                    });
                    $(this).addClass("combo-f").attr("comboName", $(this).attr("textboxName"));
                });
            }, panel: function (jq) {
                return $.data(jq[0], "combo").panel;
            }, destroy: function (jq) {
                return jq.each(function () {
                    _913(this);
                });
            }, showPanel: function (jq) {
                return jq.each(function () {
                    _922(this);
                });
            }, hidePanel: function (jq) {
                return jq.each(function () {
                    _919(this);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).textbox("setText", "");
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", []);
                    } else {
                        $(this).combo("setValue", "");
                    }
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $.data(this, "combo").options;
                    if (opts.multiple) {
                        $(this).combo("setValues", opts.originalValue);
                    } else {
                        $(this).combo("setValue", opts.originalValue);
                    }
                });
            }, setText: function (jq, text) {
                return jq.each(function () {
                    _92c(this, text);
                });
            }, getValues: function (jq) {
                return _930(jq[0]);
            }, setValues: function (jq, _949) {
                return jq.each(function () {
                    _934(this, _949);
                });
            }, getValue: function (jq) {
                return _93c(jq[0]);
            }, setValue: function (jq, _94a) {
                return jq.each(function () {
                    _93f(this, _94a);
                });
            }
        };
        $.fn.combo.parseOptions = function (_94b) {
            var t = $(_94b);
            return $.extend({}, $.fn.textbox.parseOptions(_94b), $.parser.parseOptions(_94b, ["separator", "panelAlign", {
                panelWidth: "number",
                hasDownArrow: "boolean",
                delay: "number",
                selectOnNavigation: "boolean"
            }, {
                panelMinWidth: "number",
                panelMaxWidth: "number",
                panelMinHeight: "number",
                panelMaxHeight: "number"
            }]), {
                panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined),
                multiple: (t.attr("multiple") ? true : undefined)
            });
        };
        $.fn.combo.defaults = $.extend({}, $.fn.textbox.defaults, {
            inputEvents: {click: _91b, keydown: _91f, paste: _91f, drop: _91f},
            panelWidth: null,
            panelHeight: 200,
            panelMinWidth: null,
            panelMaxWidth: null,
            panelMinHeight: null,
            panelMaxHeight: null,
            panelAlign: "left",
            multiple: false,
            selectOnNavigation: true,
            separator: ",",
            hasDownArrow: true,
            delay: 200,
            keyHandler: {
                up: function (e) {
                }, down: function (e) {
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                }, query: function (q, e) {
                }
            },
            onShowPanel: function () {
            },
            onHidePanel: function () {
            },
            onChange: function (_94c, _94d) {
            }
        });
    })(jQuery);
    //combobox
    (function ($) {
        var _94e = 0;

        function _94f(_950, _951) {
            var _952 = $.data(_950, "combobox");
            var opts = _952.options;
            var data = _952.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i][opts.valueField] == _951) {
                    return i;
                }
            }
            return -1;
        };
        function _953(_954, _955) {
            var opts = $.data(_954, "combobox").options;
            var _956 = $(_954).combo("panel");
            var item = opts.finder.getEl(_954, _955);
            if (item.length) {
                if (item.position().top <= 0) {
                    var h = _956.scrollTop() + item.position().top;
                    _956.scrollTop(h);
                } else {
                    if (item.position().top + item.outerHeight() > _956.height()) {
                        var h = _956.scrollTop() + item.position().top + item.outerHeight() - _956.height();
                        _956.scrollTop(h);
                    }
                }
            }
        };
        function nav(_957, dir) {
            var opts = $.data(_957, "combobox").options;
            var _958 = $(_957).combobox("panel");
            var item = _958.children("div.combobox-item-hover");
            if (!item.length) {
                item = _958.children("div.combobox-item-selected");
            }
            item.removeClass("combobox-item-hover");
            var _959 = "div.combobox-item:visible:not(.combobox-item-disabled):first";
            var _95a = "div.combobox-item:visible:not(.combobox-item-disabled):last";
            if (!item.length) {
                item = _958.children(dir == "next" ? _959 : _95a);
            } else {
                if (dir == "next") {
                    item = item.nextAll(_959);
                    if (!item.length) {
                        item = _958.children(_959);
                    }
                } else {
                    item = item.prevAll(_959);
                    if (!item.length) {
                        item = _958.children(_95a);
                    }
                }
            }
            if (item.length) {
                item.addClass("combobox-item-hover");
                var row = opts.finder.getRow(_957, item);
                if (row) {
                    _953(_957, row[opts.valueField]);
                    if (opts.selectOnNavigation) {
                        _95b(_957, row[opts.valueField]);
                    }
                }
            }
        };
        function _95b(_95c, _95d) {
            var opts = $.data(_95c, "combobox").options;
            var _95e = $(_95c).combo("getValues");
            if ($.inArray(_95d + "", _95e) == -1) {
                if (opts.multiple) {
                    _95e.push(_95d);
                } else {
                    _95e = [_95d];
                }
                _95f(_95c, _95e);
                opts.onSelect.call(_95c, opts.finder.getRow(_95c, _95d));
            }
        };
        function _960(_961, _962) {
            var opts = $.data(_961, "combobox").options;
            var _963 = $(_961).combo("getValues");
            var _964 = $.inArray(_962 + "", _963);
            if (_964 >= 0) {
                _963.splice(_964, 1);
                _95f(_961, _963);
                opts.onUnselect.call(_961, opts.finder.getRow(_961, _962));
            }
        };
        function _95f(_965, _966, _967) {
            var opts = $.data(_965, "combobox").options;
            var _968 = $(_965).combo("panel");
            if (!$.isArray(_966)) {
                _966 = _966.split(opts.separator);
            }
            _968.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            var vv = [], ss = [];
            for (var i = 0; i < _966.length; i++) {
                var v = _966[i];
                var s = v;
                opts.finder.getEl(_965, v).addClass("combobox-item-selected");
                var row = opts.finder.getRow(_965, v);
                if (row) {
                    s = row[opts.textField];
                }
                vv.push(v);
                ss.push(s);
            }
            if (!_967) {
                $(_965).combo("setText", ss.join(opts.separator));
            }
            $(_965).combo("setValues", vv);
        };
        function _969(_96a, data, _96b) {
            var _96c = $.data(_96a, "combobox");
            var opts = _96c.options;
            _96c.data = opts.loadFilter.call(_96a, data);
            _96c.groups = [];
            data = _96c.data;
            var _96d = $(_96a).combobox("getValues");
            var dd = [];
            var _96e = undefined;
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var v = row[opts.valueField] + "";
                var s = row[opts.textField];
                var g = row[opts.groupField];
                if (g) {
                    if (_96e != g) {
                        _96e = g;
                        _96c.groups.push(g);
                        dd.push("<div id=\"" + (_96c.groupIdPrefix + "_" + (_96c.groups.length - 1)) + "\" class=\"combobox-group\">");
                        dd.push(opts.groupFormatter ? opts.groupFormatter.call(_96a, g) : g);
                        dd.push("</div>");
                    }
                } else {
                    _96e = undefined;
                }
                var cls = "combobox-item" + (row.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
                dd.push("<div id=\"" + (_96c.itemIdPrefix + "_" + i) + "\" class=\"" + cls + "\">");
                dd.push(opts.formatter ? opts.formatter.call(_96a, row) : s);
                dd.push("</div>");
                if (row["selected"] && $.inArray(v, _96d) == -1) {
                    _96d.push(v);
                }
            }
            $(_96a).combo("panel").html(dd.join(""));
            if (opts.multiple) {
                _95f(_96a, _96d, _96b);
            } else {
                _95f(_96a, _96d.length ? [_96d[_96d.length - 1]] : [], _96b);
            }
            opts.onLoadSuccess.call(_96a, data);
        };
        function _96f(_970, url, _971, _972) {
            var opts = $.data(_970, "combobox").options;
            if (url) {
                opts.url = url;
            }
            _971 = $.extend({}, opts.queryParams, _971 || {});
            if (opts.onBeforeLoad.call(_970, _971) == false) {
                return;
            }
            opts.loader.call(_970, _971, function (data) {
                _969(_970, data, _972);
            }, function () {
                opts.onLoadError.apply(this, arguments);
            });
        };
        function _973(_974, q) {
            var _975 = $.data(_974, "combobox");
            var opts = _975.options;
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            if (opts.mode == "remote") {
                _976(qq);
                _96f(_974, null, {q: q}, true);
            } else {
                var _977 = $(_974).combo("panel");
                _977.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
                _977.find("div.combobox-item,div.combobox-group").hide();
                var data = _975.data;
                var vv = [];
                $.map(qq, function (q) {
                    q = $.trim(q);
                    var _978 = q;
                    var _979 = undefined;
                    for (var i = 0; i < data.length; i++) {
                        var row = data[i];
                        if (opts.filter.call(_974, q, row)) {
                            var v = row[opts.valueField];
                            var s = row[opts.textField];
                            var g = row[opts.groupField];
                            var item = opts.finder.getEl(_974, v).show();
                            if (s.toLowerCase() == q.toLowerCase()) {
                                _978 = v;
                                item.addClass("combobox-item-selected");
                            }
                            if (opts.groupField && _979 != g) {
                                $("#" + _975.groupIdPrefix + "_" + $.inArray(g, _975.groups)).show();
                                _979 = g;
                            }
                        }
                    }
                    vv.push(_978);
                });
                _976(vv);
            }
            function _976(vv) {
                _95f(_974, opts.multiple ? (q ? vv : []) : vv, true);
            };
        };
        function _97a(_97b) {
            var t = $(_97b);
            var opts = t.combobox("options");
            var _97c = t.combobox("panel");
            var item = _97c.children("div.combobox-item-hover");
            if (item.length) {
                var row = opts.finder.getRow(_97b, item);
                var _97d = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        t.combobox("unselect", _97d);
                    } else {
                        t.combobox("select", _97d);
                    }
                } else {
                    t.combobox("select", _97d);
                }
            }
            var vv = [];
            $.map(t.combobox("getValues"), function (v) {
                if (_94f(_97b, v) >= 0) {
                    vv.push(v);
                }
            });
            t.combobox("setValues", vv);
            if (!opts.multiple) {
                t.combobox("hidePanel");
            }
        };
        function _97e(_97f) {
            var _980 = $.data(_97f, "combobox");
            var opts = _980.options;
            _94e++;
            _980.itemIdPrefix = "_easyui_combobox_i" + _94e;
            _980.groupIdPrefix = "_easyui_combobox_g" + _94e;
            $(_97f).addClass("combobox-f");
            $(_97f).combo($.extend({}, opts, {
                onShowPanel: function () {
                    $(_97f).combo("panel").find("div.combobox-item,div.combobox-group").show();
                    _953(_97f, $(_97f).combobox("getValue"));
                    opts.onShowPanel.call(_97f);
                }
            }));
            $(_97f).combo("panel").unbind().bind("mouseover", function (e) {
                $(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
                var item = $(e.target).closest("div.combobox-item");
                if (!item.hasClass("combobox-item-disabled")) {
                    item.addClass("combobox-item-hover");
                }
                e.stopPropagation();
            }).bind("mouseout", function (e) {
                $(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
                e.stopPropagation();
            }).bind("click", function (e) {
                var item = $(e.target).closest("div.combobox-item");
                if (!item.length || item.hasClass("combobox-item-disabled")) {
                    return;
                }
                var row = opts.finder.getRow(_97f, item);
                if (!row) {
                    return;
                }
                var _981 = row[opts.valueField];
                if (opts.multiple) {
                    if (item.hasClass("combobox-item-selected")) {
                        _960(_97f, _981);
                    } else {
                        _95b(_97f, _981);
                    }
                } else {
                    _95b(_97f, _981);
                    $(_97f).combo("hidePanel");
                }
                e.stopPropagation();
            });
        };
        $.fn.combobox = function (_982, _983) {
            if (typeof _982 == "string") {
                var _984 = $.fn.combobox.methods[_982];
                if (_984) {
                    return _984(this, _983);
                } else {
                    return this.combo(_982, _983);
                }
            }
            _982 = _982 || {};
            return this.each(function () {
                var _985 = $.data(this, "combobox");
                if (_985) {
                    $.extend(_985.options, _982);
                    _97e(this);
                } else {
                    _985 = $.data(this, "combobox", {
                        options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _982),
                        data: []
                    });
                    _97e(this);
                    var data = $.fn.combobox.parseData(this);
                    if (data.length) {
                        _969(this, data);
                    }
                }
                if (_985.options.data) {
                    _969(this, _985.options.data);
                }
                _96f(this);
            });
        };
        $.fn.combobox.methods = {
            options: function (jq) {
                var _986 = jq.combo("options");
                return $.extend($.data(jq[0], "combobox").options, {
                    width: _986.width,
                    height: _986.height,
                    originalValue: _986.originalValue,
                    disabled: _986.disabled,
                    readonly: _986.readonly
                });
            }, getData: function (jq) {
                return $.data(jq[0], "combobox").data;
            }, setValues: function (jq, _987) {
                return jq.each(function () {
                    _95f(this, _987);
                });
            }, setValue: function (jq, _988) {
                return jq.each(function () {
                    _95f(this, [_988]);
                });
            }, clear: function (jq) {
                return jq.each(function () {
                    $(this).combo("clear");
                    var _989 = $(this).combo("panel");
                    _989.find("div.combobox-item-selected").removeClass("combobox-item-selected");
                });
            }, reset: function (jq) {
                return jq.each(function () {
                    var opts = $(this).combobox("options");
                    if (opts.multiple) {
                        $(this).combobox("setValues", opts.originalValue);
                    } else {
                        $(this).combobox("setValue", opts.originalValue);
                    }
                });
            }, loadData: function (jq, data) {
                return jq.each(function () {
                    _969(this, data);
                });
            }, reload: function (jq, url) {
                return jq.each(function () {
                    if (typeof url == "string") {
                        _96f(this, url);
                    } else {
                        if (url) {
                            var opts = $(this).combobox("options");
                            opts.queryParams = url;
                        }
                        _96f(this);
                    }
                });
            }, select: function (jq, _98a) {
                return jq.each(function () {
                    _95b(this, _98a);
                });
            }, unselect: function (jq, _98b) {
                return jq.each(function () {
                    _960(this, _98b);
                });
            }
        };
        $.fn.combobox.parseOptions = function (_98c) {
            var t = $(_98c);
            return $.extend({}, $.fn.combo.parseOptions(_98c), $.parser.parseOptions(_98c, ["valueField", "textField", "groupField", "mode", "method", "url"]));
        };
        $.fn.combobox.parseData = function (_98d) {
            var data = [];
            var opts = $(_98d).combobox("options");
            $(_98d).children().each(function () {
                if (this.tagName.toLowerCase() == "optgroup") {
                    var _98e = $(this).attr("label");
                    $(this).children().each(function () {
                        _98f(this, _98e);
                    });
                } else {
                    _98f(this);
                }
            });
            return data;
            function _98f(el, _990) {
                var t = $(el);
                var row = {};
                row[opts.valueField] = t.attr("value") != undefined ? t.attr("value") : t.text();
                row[opts.textField] = t.text();
                row["selected"] = t.is(":selected");
                row["disabled"] = t.is(":disabled");
                if (_990) {
                    opts.groupField = opts.groupField || "group";
                    row[opts.groupField] = _990;
                }
                data.push(row);
            };
        };
        $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
            valueField: "value", textField: "text", groupField: null, groupFormatter: function (_991) {
                return _991;
            }, mode: "local", method: "post", url: null, data: null, queryParams: {}, keyHandler: {
                up: function (e) {
                    nav(this, "prev");
                    e.preventDefault();
                }, down: function (e) {
                    nav(this, "next");
                    e.preventDefault();
                }, left: function (e) {
                }, right: function (e) {
                }, enter: function (e) {
                    _97a(this);
                }, query: function (q, e) {
                    _973(this, q);
                }
            }, filter: function (q, row) {
                var opts = $(this).combobox("options");
                return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
            }, formatter: function (row) {
                var opts = $(this).combobox("options");
                return row[opts.textField];
            }, loader: function (_992, _993, _994) {
                var opts = $(this).combobox("options");
                if (!opts.url) {
                    return false;
                }
                $.ajax({
                    type: opts.method, url: opts.url, data: _992, dataType: "json", success: function (data) {
                        _993(data);
                    }, error: function () {
                        _994.apply(this, arguments);
                    }
                });
            }, loadFilter: function (data) {
                return data;
            }, finder: {
                getEl: function (_995, _996) {
                    var _997 = _94f(_995, _996);
                    var id = $.data(_995, "combobox").itemIdPrefix + "_" + _997;
                    return $("#" + id);
                }, getRow: function (_998, p) {
                    var _999 = $.data(_998, "combobox");
                    var _99a = (p instanceof jQuery) ? p.attr("id").substr(_999.itemIdPrefix.length + 1) : _94f(_998, p);
                    return _999.data[parseInt(_99a)];
                }
            }, onBeforeLoad: function (_99b) {
            }, onLoadSuccess: function () {
            }, onLoadError: function () {
            }, onSelect: function (_99c) {
            }, onUnselect: function (_99d) {
            }
        });
    })(jQuery);
    //combotree deleted
    //combogrid deleted
    //datebox deleted
    //datetimebox deleted
    //slider deleted
}
if ( typeof module === "object" && typeof module.exports === "object" ){
    module.exports=_easyui;
}else{
    _easyui(window.jQuery);
}
