/**
 * Created by damma on 02.12.2016.
 */
!function (e) {
    if ("object" == typeof exports && "undefined" != typeof module)module.exports = e(); else if ("function" == typeof define && define.amd)define([], e); else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.blobUtil = e()
    }
}(function () {
    return function e(t, n, r) {
        function o(u, f) {
            if (!n[u]) {
                if (!t[u]) {
                    var a = "function" == typeof require && require;
                    if (!f && a)return a(u, !0);
                    if (i)return i(u, !0);
                    var c = new Error("Cannot find module '" + u + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = n[u] = {exports: {}};
                t[u][0].call(l.exports, function (e) {
                    var n = t[u][1][e];
                    return o(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[u].exports
        }

        for (var i = "function" == typeof require && require, u = 0; u < r.length; u++)o(r[u]);
        return o
    }({
        1: [function (e, t, n) {
            "use strict";
            function r(e) {
                for (var t = e.length, n = new ArrayBuffer(t), r = new Uint8Array(n), o = -1; ++o < t;)r[o] = e.charCodeAt(o);
                return n
            }

            function o(e) {
                for (var t = "", n = new Uint8Array(e), r = n.byteLength, o = -1; ++o < r;)t += String.fromCharCode(n[o]);
                return t
            }

            function i(e, t) {
                return new B(function (n, r) {
                    var o = new Image;
                    t && (o.crossOrigin = t), o.onload = function () {
                        n(o)
                    }, o.onerror = r, o.src = e
                })
            }

            function u(e) {
                var t = document.createElement("canvas");
                t.width = e.width, t.height = e.height;
                var n = t.getContext("2d");
                return n.drawImage(e, 0, 0, e.width, e.height, 0, 0, e.width, e.height), t
            }

            function f(e, t) {
                return t = t || {}, "string" == typeof t && (t = {type: t}), new m(e, t)
            }

            function a(e) {
                return (window.URL || window.webkitURL).createObjectURL(e)
            }

            function c(e) {
                return (window.URL || window.webkitURL).revokeObjectURL(e)
            }

            function l(e) {
                return new B(function (t, n) {
                    var r = new FileReader, i = "function" == typeof r.readAsBinaryString;
                    r.onloadend = function (e) {
                        var n = e.target.result || "";
                        return i ? t(n) : void t(o(n))
                    }, r.onerror = n, i ? r.readAsBinaryString(e) : r.readAsArrayBuffer(e)
                })
            }

            function s(e, t) {
                return B.resolve().then(function () {
                    var n = [r(atob(e))];
                    return t ? f(n, {type: t}) : f(n)
                })
            }

            function h(e, t) {
                return B.resolve().then(function () {
                    return s(btoa(e), t)
                })
            }

            function d(e) {
                return l(e).then(function (e) {
                    return btoa(e)
                })
            }

            function p(e) {
                return B.resolve().then(function () {
                    var t = e.match(/data:([^;]+)/)[1], n = e.replace(/^[^,]+,/, ""), o = r(atob(n));
                    return f([o], {type: t})
                })
            }

            function v(e, t, n, r) {
                return t = t || "image/png", i(e, n).then(function (e) {
                    return u(e)
                }).then(function (e) {
                    return e.toDataURL(t, r)
                })
            }

            function y(e, t, n) {
                return B.resolve().then(function () {
                    return "function" == typeof e.toBlob ? new B(function (r) {
                        e.toBlob(r, t, n)
                    }) : p(e.toDataURL(t, n))
                })
            }

            function b(e, t, n, r) {
                return t = t || "image/png", i(e, n).then(function (e) {
                    return u(e)
                }).then(function (e) {
                    return y(e, t, r)
                })
            }

            function w(e, t) {
                return B.resolve().then(function () {
                    return f([e], t)
                })
            }

            function g(e) {
                return new B(function (t, n) {
                    var r = new FileReader;
                    r.onloadend = function (e) {
                        var n = e.target.result || new ArrayBuffer(0);
                        t(n)
                    }, r.onerror = n, r.readAsArrayBuffer(e)
                })
            }

            var m = e("blob"), B = e("native-or-lie");
            t.exports = {
                createBlob: f,
                createObjectURL: a,
                revokeObjectURL: c,
                imgSrcToBlob: b,
                imgSrcToDataURL: v,
                canvasToBlob: y,
                dataURLToBlob: p,
                blobToBase64String: d,
                base64StringToBlob: s,
                binaryStringToBlob: h,
                blobToBinaryString: l,
                arrayBufferToBlob: w,
                blobToArrayBuffer: g
            }
        }, {blob: 2, "native-or-lie": 3}], 2: [function (e, t, n) {
            (function (e) {
                function n(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (n.buffer instanceof ArrayBuffer) {
                            var r = n.buffer;
                            if (n.byteLength !== r.byteLength) {
                                var o = new Uint8Array(n.byteLength);
                                o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer
                            }
                            e[t] = r
                        }
                    }
                }

                function r(e, t) {
                    t = t || {};
                    var r = new i;
                    n(e);
                    for (var o = 0; o < e.length; o++)r.append(e[o]);
                    return t.type ? r.getBlob(t.type) : r.getBlob()
                }

                function o(e, t) {
                    return n(e), new Blob(e, t || {})
                }

                var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder, u = function () {
                    try {
                        var e = new Blob(["hi"]);
                        return 2 === e.size
                    } catch (t) {
                        return !1
                    }
                }(), f = u && function () {
                        try {
                            var e = new Blob([new Uint8Array([1, 2])]);
                            return 2 === e.size
                        } catch (t) {
                            return !1
                        }
                    }(), a = i && i.prototype.append && i.prototype.getBlob;
                t.exports = function () {
                    return u ? f ? e.Blob : o : a ? r : void 0
                }()
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}], 3: [function (e, t, n) {
            t.exports = "function" == typeof Promise ? Promise : e("lie")
        }, {lie: 4}], 4: [function (e, t, n) {
            "use strict";
            function r() {
            }

            function o(e) {
                if ("function" != typeof e)throw new TypeError("resolver must be a function");
                this.state = w, this.queue = [], this.outcome = void 0, e !== r && a(this, e)
            }

            function i(e, t, n) {
                this.promise = e, "function" == typeof t && (this.onFulfilled = t, this.callFulfilled = this.otherCallFulfilled), "function" == typeof n && (this.onRejected = n, this.callRejected = this.otherCallRejected)
            }

            function u(e, t, n) {
                p(function () {
                    var r;
                    try {
                        r = t(n)
                    } catch (o) {
                        return v.reject(e, o)
                    }
                    r === e ? v.reject(e, new TypeError("Cannot resolve promise with itself")) : v.resolve(e, r)
                })
            }

            function f(e) {
                var t = e && e.then;
                if (e && "object" == typeof e && "function" == typeof t)return function () {
                    t.apply(e, arguments)
                }
            }

            function a(e, t) {
                function n(t) {
                    i || (i = !0, v.reject(e, t))
                }

                function r(t) {
                    i || (i = !0, v.resolve(e, t))
                }

                function o() {
                    t(r, n)
                }

                var i = !1, u = c(o);
                "error" === u.status && n(u.value)
            }

            function c(e, t) {
                var n = {};
                try {
                    n.value = e(t), n.status = "success"
                } catch (r) {
                    n.status = "error", n.value = r
                }
                return n
            }

            function l(e) {
                return e instanceof this ? e : v.resolve(new this(r), e)
            }

            function s(e) {
                var t = new this(r);
                return v.reject(t, e)
            }

            function h(e) {
                function t(e, t) {
                    function r(e) {
                        u[t] = e, ++f !== o || i || (i = !0, v.resolve(c, u))
                    }

                    n.resolve(e).then(r, function (e) {
                        i || (i = !0, v.reject(c, e))
                    })
                }

                var n = this;
                if ("[object Array]" !== Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));
                var o = e.length, i = !1;
                if (!o)return this.resolve([]);
                for (var u = new Array(o), f = 0, a = -1, c = new this(r); ++a < o;)t(e[a], a);
                return c
            }

            function d(e) {
                function t(e) {
                    n.resolve(e).then(function (e) {
                        i || (i = !0, v.resolve(f, e))
                    }, function (e) {
                        i || (i = !0, v.reject(f, e))
                    })
                }

                var n = this;
                if ("[object Array]" !== Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));
                var o = e.length, i = !1;
                if (!o)return this.resolve([]);
                for (var u = -1, f = new this(r); ++u < o;)t(e[u]);
                return f
            }

            var p = e("immediate"), v = {}, y = ["REJECTED"], b = ["FULFILLED"], w = ["PENDING"];
            t.exports = o, o.prototype["catch"] = function (e) {
                return this.then(null, e)
            }, o.prototype.then = function (e, t) {
                if ("function" != typeof e && this.state === b || "function" != typeof t && this.state === y)return this;
                var n = new this.constructor(r);
                if (this.state !== w) {
                    var o = this.state === b ? e : t;
                    u(n, o, this.outcome)
                } else this.queue.push(new i(n, e, t));
                return n
            }, i.prototype.callFulfilled = function (e) {
                v.resolve(this.promise, e)
            }, i.prototype.otherCallFulfilled = function (e) {
                u(this.promise, this.onFulfilled, e)
            }, i.prototype.callRejected = function (e) {
                v.reject(this.promise, e)
            }, i.prototype.otherCallRejected = function (e) {
                u(this.promise, this.onRejected, e)
            }, v.resolve = function (e, t) {
                var n = c(f, t);
                if ("error" === n.status)return v.reject(e, n.value);
                var r = n.value;
                if (r)a(e, r); else {
                    e.state = b, e.outcome = t;
                    for (var o = -1, i = e.queue.length; ++o < i;)e.queue[o].callFulfilled(t)
                }
                return e
            }, v.reject = function (e, t) {
                e.state = y, e.outcome = t;
                for (var n = -1, r = e.queue.length; ++n < r;)e.queue[n].callRejected(t);
                return e
            }, o.resolve = l, o.reject = s, o.all = h, o.race = d
        }, {immediate: 5}], 5: [function (e, t, n) {
            (function (e) {
                "use strict";
                function n() {
                    l = !0;
                    for (var e, t, n = s.length; n;) {
                        for (t = s, s = [], e = -1; ++e < n;)t[e]();
                        n = s.length
                    }
                    l = !1
                }

                function r(e) {
                    1 !== s.push(e) || l || o()
                }

                var o, i = e.MutationObserver || e.WebKitMutationObserver;
                if (i) {
                    var u = 0, f = new i(n), a = e.document.createTextNode("");
                    f.observe(a, {characterData: !0}), o = function () {
                        a.data = u = ++u % 2
                    }
                } else if (e.setImmediate || "undefined" == typeof e.MessageChannel)o = "document" in e && "onreadystatechange" in e.document.createElement("script") ? function () {
                    var t = e.document.createElement("script");
                    t.onreadystatechange = function () {
                        n(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
                    }, e.document.documentElement.appendChild(t)
                } : function () {
                    setTimeout(n, 0)
                }; else {
                    var c = new e.MessageChannel;
                    c.port1.onmessage = n, o = function () {
                        c.port2.postMessage(0)
                    }
                }
                var l, s = [];
                t.exports = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [1])(1)
});