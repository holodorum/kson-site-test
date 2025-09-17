import { a as v, D as E, T as m, K as z, _ as M, b as T, I as b, c as H, d as x, $ as i, e as h, C as S, f as g, S as c, F as _, g as C, h as D, E as A, i as L, n as w, j as O, N as B, k as I, l as N, m as P, o as R, p as $, V as F, q as W, s as y, H as K, t as V } from "./index-8dqW3L9v.js";
const j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var p;
v(j);
let u = class extends E {
  static {
    p = this;
  }
  static {
    this.ID = "editor.contrib.inspectTokens";
  }
  static get(t) {
    return t.getContribution(p.ID);
  }
  constructor(t, e, n) {
    super(), this._editor = t, this._languageService = n, this._widget = null, this._register(this._editor.onDidChangeModel((o) => this.stop())), this._register(this._editor.onDidChangeModelLanguage((o) => this.stop())), this._register(m.onDidChange((o) => this.stop())), this._register(this._editor.onKeyUp((o) => o.keyCode === z.Escape && this.stop()));
  }
  dispose() {
    this.stop(), super.dispose();
  }
  launch() {
    this._widget || this._editor.hasModel() && (this._widget = new f(this._editor, this._languageService));
  }
  stop() {
    this._widget && (this._widget.dispose(), this._widget = null);
  }
};
u = p = M([
  T(1, b),
  T(2, H)
], u);
class G extends N {
  constructor() {
    super({
      id: "editor.action.inspectTokens",
      label: P.inspectTokensAction,
      alias: "Developer: Inspect Tokens",
      precondition: void 0
    });
  }
  run(t, e) {
    u.get(e)?.launch();
  }
}
function U(d) {
  let t = "";
  for (let e = 0, n = d.length; e < n; e++) {
    const o = d.charCodeAt(e);
    switch (o) {
      case I.Tab:
        t += "→";
        break;
      case I.Space:
        t += "·";
        break;
      default:
        t += String.fromCharCode(o);
    }
  }
  return t;
}
function q(d, t) {
  const e = m.get(t);
  if (e)
    return e;
  const n = d.encodeLanguageId(t);
  return {
    getInitialState: () => B,
    tokenize: (o, l, a) => O(t, a),
    tokenizeEncoded: (o, l, a) => w(n, a)
  };
}
class f extends E {
  static {
    this._ID = "editor.contrib.inspectTokensWidget";
  }
  constructor(t, e) {
    super(), this.allowEditorOverflow = !0, this._editor = t, this._languageService = e, this._model = this._editor.getModel(), this._domNode = document.createElement("div"), this._domNode.className = "tokens-inspect-widget", this._tokenizationSupport = q(this._languageService.languageIdCodec, this._model.getLanguageId()), this._compute(this._editor.getPosition()), this._register(this._editor.onDidChangeCursorPosition((n) => this._compute(this._editor.getPosition()))), this._editor.addContentWidget(this);
  }
  dispose() {
    this._editor.removeContentWidget(this), super.dispose();
  }
  getId() {
    return f._ID;
  }
  _compute(t) {
    const e = this._getTokensAtLine(t.lineNumber);
    let n = 0;
    for (let r = e.tokens1.length - 1; r >= 0; r--) {
      const k = e.tokens1[r];
      if (t.column - 1 >= k.offset) {
        n = r;
        break;
      }
    }
    let o = 0;
    for (let r = e.tokens2.length >>> 1; r >= 0; r--)
      if (t.column - 1 >= e.tokens2[r << 1]) {
        o = r;
        break;
      }
    const l = this._model.getLineContent(t.lineNumber);
    let a = "";
    if (n < e.tokens1.length) {
      const r = e.tokens1[n].offset, k = n + 1 < e.tokens1.length ? e.tokens1[n + 1].offset : l.length;
      a = l.substring(r, k);
    }
    x(this._domNode, i("h2.tm-token", void 0, U(a), i("span.tm-token-length", void 0, `${a.length} ${a.length === 1 ? "char" : "chars"}`))), h(this._domNode, i("hr.tokens-inspect-separator", { style: "clear:both" }));
    const s = (o << 1) + 1 < e.tokens2.length ? this._decodeMetadata(e.tokens2[(o << 1) + 1]) : null;
    h(this._domNode, i("table.tm-metadata-table", void 0, i("tbody", void 0, i("tr", void 0, i("td.tm-metadata-key", void 0, "language"), i("td.tm-metadata-value", void 0, `${s ? s.languageId : "-?-"}`)), i("tr", void 0, i("td.tm-metadata-key", void 0, "token type"), i("td.tm-metadata-value", void 0, `${s ? this._tokenTypeToString(s.tokenType) : "-?-"}`)), i("tr", void 0, i("td.tm-metadata-key", void 0, "font style"), i("td.tm-metadata-value", void 0, `${s ? this._fontStyleToString(s.fontStyle) : "-?-"}`)), i("tr", void 0, i("td.tm-metadata-key", void 0, "foreground"), i("td.tm-metadata-value", void 0, `${s ? S.Format.CSS.formatHex(s.foreground) : "-?-"}`)), i("tr", void 0, i("td.tm-metadata-key", void 0, "background"), i("td.tm-metadata-value", void 0, `${s ? S.Format.CSS.formatHex(s.background) : "-?-"}`))))), h(this._domNode, i("hr.tokens-inspect-separator")), n < e.tokens1.length && h(this._domNode, i("span.tm-token-type", void 0, e.tokens1[n].type)), this._editor.layoutContentWidget(this);
  }
  _decodeMetadata(t) {
    const e = m.getColorMap(), n = g.getLanguageId(t), o = g.getTokenType(t), l = g.getFontStyle(t), a = g.getForeground(t), s = g.getBackground(t);
    return {
      languageId: this._languageService.languageIdCodec.decodeLanguageId(n),
      tokenType: o,
      fontStyle: l,
      foreground: e[a],
      background: e[s]
    };
  }
  _tokenTypeToString(t) {
    switch (t) {
      case c.Other:
        return "Other";
      case c.Comment:
        return "Comment";
      case c.String:
        return "String";
      case c.RegEx:
        return "RegEx";
      default:
        return "??";
    }
  }
  _fontStyleToString(t) {
    let e = "";
    return t & _.Italic && (e += "italic "), t & _.Bold && (e += "bold "), t & _.Underline && (e += "underline "), t & _.Strikethrough && (e += "strikethrough "), e.length === 0 && (e = "---"), e;
  }
  _getTokensAtLine(t) {
    const e = this._getStateBeforeLine(t), n = this._tokenizationSupport.tokenize(this._model.getLineContent(t), !0, e), o = this._tokenizationSupport.tokenizeEncoded(this._model.getLineContent(t), !0, e);
    return {
      startState: e,
      tokens1: n.tokens,
      tokens2: o.tokens,
      endState: n.endState
    };
  }
  _getStateBeforeLine(t) {
    let e = this._tokenizationSupport.getInitialState();
    for (let n = 1; n < t; n++)
      e = this._tokenizationSupport.tokenize(this._model.getLineContent(n), !0, e).endState;
    return e;
  }
  getDomNode() {
    return this._domNode;
  }
  getPosition() {
    return {
      position: this._editor.getPosition(),
      preference: [C.BELOW, C.ABOVE]
    };
  }
}
D(u.ID, u, A.Lazy);
L(G);
class J extends N {
  constructor() {
    super({
      id: "editor.action.toggleHighContrast",
      label: R.toggleHighContrast,
      alias: "Toggle High Contrast Theme",
      precondition: void 0
    }), this._originalThemeName = null;
  }
  run(t, e) {
    const n = t.get(b), o = n.getColorTheme();
    $(o.type) ? (n.setTheme(this._originalThemeName || (y(o.type) ? F : W)), this._originalThemeName = null) : (n.setTheme(y(o.type) ? K : V), this._originalThemeName = o.themeName);
  }
}
L(J);
function Y() {
  return {};
}
export {
  Y as default
};
//# sourceMappingURL=index-BeT4-pc0.js.map
