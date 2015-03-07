init_awesomplete = function () {
  function m (a, b) {
    for (var c in a) {
      var f = a[c], e = this.input.getAttribute ("data-" + c.toLowerCase ());
      this[c] = "number" === typeof f ? +e : !1 === f ? null !== e : f instanceof Function ? null : e;
      this[c] = this[c] || b[c] || f
    }
  }

  function d (a, b) {
    return "string" === typeof a ? (b || document).querySelector (a) : a || null
  }

  function h (a, b) {
    return k.call ((b || document).querySelectorAll (a))
  }

  function l () {
    h ("input.awesomplete").forEach (function (a) {
      new Awesomplete (a)
    })
  }

  var g = self.Awesomplete = function (a, b) {
    var c = this;
    this.input = d (a);
    this.input.setAttribute ("aria-autocomplete",
      "list");
    b = b || {};
    m.call (this, {
      minChars: 2,
      maxItems: 10,
      autoFirst: !1,
      filter: g.FILTER_CONTAINS,
      sort: g.SORT_BYLENGTH,
      item: function (a, b) {
        return d.create ("li", {
          innerHTML: a.replace (RegExp (d.regExpEscape (b.trim ()), "gi"), "<mark>$&</mark>"),
          "aria-selected": "false"
        })
      },
      replace: function (a) {
        this.input.value = a
      }
    }, b);
    this.index = -1;
    this.container = d.create ("div", {className: "awesomplete", around: a});
    this.ul = d.create ("ul", {hidden: "", inside: this.container});
    this.status = d.create ("span", {
      className: "visually-hidden", role: "status",
      "aria-live": "assertive", "aria-relevant": "additions", inside: this.container
    });
    d.bind (this.input, {
      input: this.evaluate.bind (this), blur: this.close.bind (this), keydown: function (a) {
        var b = a.keyCode;
        if (c.opened)if (13 === b && c.selected)a.preventDefault (), c.select (); else if (27 === b)c.close (); else if (38 === b || 40 === b)a.preventDefault (), c[38 === b ? "previous" : "next"] ()
      }
    });
    d.bind (this.input.form, {submit: this.close.bind (this)});
    d.bind (this.ul, {
      mousedown: function (a) {
        a = a.target;
        if (a !== this) {
          for (; a && !/li/i.test (a.nodeName);)a =
            a.parentNode;
          a && c.select (a)
        }
      }
    });
    this.input.hasAttribute ("list") ? (this.list = "#" + a.getAttribute ("list"), a.removeAttribute ("list")) : this.list = this.input.getAttribute ("data-list") || b.list || [];
    g.all.push (this)
  };
  g.prototype = {
    set list (a) {
      Array.isArray (a) ? this._list = a : "string" === typeof a && -1 < a.indexOf (",") ? this._list = a.split (/\s*,\s*/) : (a = d (a)) && a.children && (this._list = k.apply (a.children).map (function (a) {
        return a.innerHTML.trim ()
      }));
      document.activeElement === this.input && this.evaluate ()
    }, get selected () {
      return -1 <
        this.index
    }, get opened () {
      return this.ul && null == this.ul.getAttribute ("hidden")
    }, close: function () {
      this.ul.setAttribute ("hidden", "");
      this.index = -1;
      d.fire (this.input, "awesomplete-close")
    }, open: function () {
      this.ul.removeAttribute ("hidden");
      this.autoFirst && -1 === this.index && this.goto (0);
      d.fire (this.input, "awesomplete-open")
    }, next: function () {
      this.goto (this.index < this.ul.children.length - 1 ? this.index + 1 : -1)
    }, previous: function () {
      var a = this.ul.children.length;
      this.goto (this.selected ? this.index - 1 : a - 1)
    }, goto: function (a) {
      var b =
        this.ul.children;
      this.selected && b[this.index].setAttribute ("aria-selected", "false");
      this.index = a;
      -1 < a && 0 < b.length && (b[a].setAttribute ("aria-selected", "true"), this.status.textContent = b[a].textContent)
    }, select: function (a) {
      if (a = a || this.ul.children[this.index]) {
        var b;
        d.fire (this.input, "awesomplete-select", {
          text: a.textContent, preventDefault: function () {
            b = !0
          }
        });
        b || (this.replace (a.textContent), this.close (), d.fire (this.input, "awesomplete-selectcomplete"))
      }
    }, evaluate: function () {
      var a = this, b = this.input.value;
      b.length >= this.minChars && 0 < this._list.length ? (this.index = -1, this.ul.innerHTML = "", this._list.filter (function (c) {
        return a.filter (c, b)
      }).sort (this.sort).every (function (c, d) {
        a.ul.appendChild (a.item (c, b));
        return d < a.maxItems - 1
      }), 0 === this.ul.children.length ? this.close () : this.open ()) : this.close ()
    }
  };
  g.all = [];
  g.FILTER_CONTAINS = function (a, b) {
    return RegExp (d.regExpEscape (b.trim ()), "i").test (a)
  };
  g.FILTER_STARTSWITH = function (a, b) {
    return RegExp ("^" + d.regExpEscape (b.trim ()), "i").test (a)
  };
  g.SORT_BYLENGTH = function (a,
                              b) {
    return a.length !== b.length ? a.length - b.length : a < b ? -1 : 1
  };
  var k = Array.prototype.slice;
  d.create = function (a, b) {
    var c = document.createElement (a), f;
    for (f in b) {
      var e = b[f];
      "inside" === f ? d (e).appendChild (c) : "around" === f ? (e = d (e), e.parentNode.insertBefore (c, e), c.appendChild (e)) : f in c ? c[f] = e : c.setAttribute (f, e)
    }
    return c
  };
  d.bind = function (a, b) {
    if (a)for (var c in b) {
      var d = b[c];
      c.split (/\s+/).forEach (function (b) {
        a.addEventListener (b, d)
      })
    }
  };
  d.fire = function (a, b, c) {
    var d = document.createEvent ("HTMLEvents");
    d.initEvent (b,
      !0, !0);
    for (var e in c)d[e] = c[e];
    a.dispatchEvent (d)
  };
  d.regExpEscape = function (a) {
    return a.replace (/[-\\^$*+?.()|[\]{}]/g, "\\$&")
  };
  "loading" !== document.readyState ? l () : document.addEventListener ("DOMContentLoaded", l);
  g.$ = d;
  g.$$ = h
};

if (Meteor.isClient) {
  Meteor.startup (function () {

  });
};
