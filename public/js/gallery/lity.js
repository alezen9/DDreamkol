! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(n) {
        return t(e, n)
    }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, require("jquery")) : e.lity = t(e, e.jQuery || e.Zepto)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";
    var n, i, r = e.document,
        o = t(e),
        l = t("html"),
        a = 0,
        s = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
        d = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
        c = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
        u = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
        f = {
            image: function(e) {
                if (!s.test(e)) return !1;
                var n = t('<img src="' + e + '">'),
                    i = t.Deferred(),
                    r = function() {
                        var e;
                        i.reject((e = "Failed loading image", t('<span class="lity-error"/>').append(e)))
                    };
                return n.on("load", function() {
                    if (0 === this.naturalWidth) return r();
                    i.resolve(n)
                }).on("error", r), i.promise()
            },
            inline: function(e) {
                var n;
                try {
                    n = t(e)
                } catch (e) {
                    return !1
                }
                if (!n.length) return !1;
                var i = t('<span style="display:none !important" class="lity-inline-placeholder"/>');
                return n.after(i).on("lity:ready", function(e, t) {
                    t.one("lity:remove", function() {
                        i.before(n.addClass("lity-hide")).remove()
                    })
                })
            },
            iframe: function(e) {
                var n, i = e;
                (n = d.exec(e)) && (i = b("https://www.youtube" + (n[2] || "") + ".com/embed/" + n[4], t.extend({
                    autoplay: 1
                }, h(n[5] || ""))));
                (n = c.exec(e)) && (i = b("https://player.vimeo.com/video/" + n[3], t.extend({
                    autoplay: 1
                }, h(n[4] || ""))));
                (n = u.exec(e)) && (i = b("https://www.google." + n[3] + "/maps?" + n[6], {
                    output: n[6].indexOf("layer=c") > 0 ? "svembed" : "embed"
                }));
                return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + i + '"></iframe></div>'
            }
        },
        y = {
            esc: !0,
            handler: null,
            template: '<div class="lity" tabindex="-1"><div class="lity-wrap" data-lity-close><div class="lity-loader">Loading...</div><div class="lity-container"><button data-lity-btn="prev" class="lity-prev btn">&lt;</button><div class="lity-content"></div><button data-lity-btn="next" class="lity-next btn">&gt;</button><button class="lity-close" type="button" title="Close (Esc)" data-lity-close>×</button></div></div></div>'
        };

    function p() {
        l[a > 0 ? "addClass" : "removeClass"]("lity-active")
    }
    var v = function() {
        var e = r.createElement("div"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return t[n];
        return !1
    }();

    function m(e) {
        var n = t.Deferred();
        return v ? (e.one(v, n.resolve), setTimeout(n.resolve, 500)) : n.resolve(), n.promise()
    }

    function g(e, n, i) {
        if (1 === arguments.length) return t.extend({}, e);
        if ("string" == typeof n) {
            if (void 0 === i) return void 0 === e[n] ? null : e[n];
            e[n] = i
        } else t.extend(e, n);
        return this
    }

    function h(e) {
        for (var t, n = decodeURI(e).split("&"), i = {}, r = 0, o = n.length; r < o; r++) n[r] && (i[(t = n[r].split("="))[0]] = t[1]);
        return i
    }

    function b(e, n) {
        return e + (e.indexOf("?") > -1 ? "&" : "?") + t.param(n)
    }

    function x(e) {
        var l, s, d = {},
            c = {},
            u = t.Deferred().resolve();

        function v(e) {
            27 === e.keyCode && E()
        }

        function h() {
            var e = r.documentElement.clientHeight ? r.documentElement.clientHeight : Math.round(o.height());
            s.css("max-height", Math.floor(e) + "px").trigger("lity:resize", [l])
        }

        function b(e, n) {
            l && (s = t(n), o.on("resize", h), h(), l.find(".lity-loader").each(function() {
                var e = t(this);
                m(e).always(function() {
                    e.remove()
                })
            }), l.removeClass("lity-loading").find(".lity-content").empty().append(s), s.removeClass("lity-hide").trigger("lity:ready", [l, e]), u.resolve())
        }

        function x(e, s, d, c) {
            u = t.Deferred(), a++, p(), l = t(d.template).addClass("lity-loading").appendTo("body"),
                function() {
                    var e = r.querySelectorAll("[data-lity-btn]");

                    function t(e) {
                        var t = e.target.getAttribute("data-lity-btn");
                        "next" === t && !1 !== i && i.click(), "prev" === t && !1 !== n && n.click()
                    }
                    for (var o = 0; o < e.length; o++) e[o].addEventListener("click", t, !1)
                }(), d.esc && o.on("keyup", v), setTimeout(function() {
                    l.addClass("lity-opened lity-" + e).on("click", "[data-lity-close]", function(e) {
                        t(e.target).is("[data-lity-close]") && E()
                    }).trigger("lity:open", [l, c]), t.when(s).always(t.proxy(b, null, c))
                }, 0)
        }

        function w(e, r, o) {
            var l, a, s = t.extend({}, f, c);
            if (n = null != o.context.parentElement.previousElementSibling && o.context.parentElement.previousElementSibling.firstElementChild, i = null != o.context.parentElement.nextElementSibling && o.context.parentElement.nextElementSibling.firstElementChild, (r = t.extend({}, y, d, r)).handler && s[r.handler]) a = s[r.handler](e, C), l = r.handler;
            else {
                var u = {};
                t.each(["inline", "iframe"], function(e, t) {
                    s[t] && (u[t] = s[t]), delete s[t]
                });
                var p = function(t, n) {
                    return !n || ((a = n(e, C)) ? (l = t, !1) : void 0)
                };
                t.each(s, p), l || t.each(u, p)
            }
            return a && t.when(E()).done(t.proxy(x, null, l, a, r, o)), !!a
        }

        function E() {
            if (l) {
                var e = t.Deferred();
                return u.done(function() {
                    a--, p(), o.off("resize", h).off("keyup", v), s.trigger("lity:close", [l]), l.removeClass("lity-opened").addClass("lity-closed");
                    var t = l,
                        n = s;
                    l = null, s = null, m(n.add(t)).always(function() {
                        n.trigger("lity:remove", [t]), t.remove(), e.resolve()
                    })
                }), e.promise()
            }
        }

        function C(e) {
            if (!e.preventDefault) return C.open(e);
            var n = t(this),
                i = n.data("lity-target") || n.attr("href") || n.attr("src");
            i && (w(i, n.data("lity-options") || n.data("lity"), n) && (n.blur(), e.preventDefault()))
        }
        return C.handlers = t.proxy(g, C, c), C.options = t.proxy(g, C, d), C.open = function(e, t, n) {
            return w(e, t, n), C
        }, C.close = function() {
            return E(), C
        }, C.options(e)
    }
    return x.version = "@VERSION", x.handlers = t.proxy(g, x, f), x.options = t.proxy(g, x, y), t(r).on("click", "[data-lity]", x()), x
});