import { z as I, kh as N, rI as L, D as k, ay as E, aD as n, h6 as _, rJ as V, aa as H, rK as S, fX as z, lV as U, kd as K, rG as i, bD as F, bG as P, pW as A, pV as W, l$ as C, g3 as O, h9 as B, _ as w, b as h, y as Y, A as x, W as J, U as $, R as X, hl as j, hv as q, rL as Q, bU as Z, mA as tt, jt as et } from "./index-8dqW3L9v.js";
import { E as it } from "./files.contribution._fileEditorFactory-CeEFlypb.js";
var y;
class ot {
  constructor() {
    this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = i, this.isTransient = () => !1, this.windowId = F.vscodeWindowId, this.createEditorActions = i, this.onDidFocus = n.None, this.onDidOpenEditorFail = n.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.setActive = i, this.notifyIndexChanged = i, this.relayout = i, this.dispose = i, this.toJSON = i, this.minimumWidth = 0, this.maximumWidth = Number.POSITIVE_INFINITY, this.minimumHeight = 0, this.maximumHeight = Number.POSITIVE_INFINITY, this.onDidChange = n.None, this.layout = i, this.onDidModelChange = n.None, this.onWillDispose = n.None, this.onDidActiveEditorChange = n.None, this.onWillCloseEditor = n.None, this.onDidCloseEditor = n.None, this.onWillMoveEditor = n.None, this.onWillOpenEditor = n.None, this.id = 0, this.index = 0, this.label = "main", this.ariaLabel = "main", this.activeEditorPane = void 0, this.activeEditor = null, this.previewEditor = null, this.count = 0, this.isEmpty = !1, this.isLocked = !1, this.stickyCount = 0, this.editors = [], this.getEditors = () => [], this.findEditors = () => [], this.getEditorByIndex = () => {
    }, this.getIndexOfEditor = i, this.openEditor = i, this.openEditors = i, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => !1, this.contains = () => !1, this.moveEditor = i, this.moveEditors = i, this.copyEditor = i, this.copyEditors = i, this.closeEditor = i, this.closeEditors = i, this.closeAllEditors = i, this.replaceEditors = i, this.pinEditor = () => {
    }, this.stickEditor = () => {
    }, this.unstickEditor = () => {
    }, this.lock = () => {
    }, this.isFirst = i, this.isLast = i;
  }
  get groupsView() {
    return i();
  }
  notifyLabelChanged() {
  }
  get titleHeight() {
    return i();
  }
  get element() {
    return i();
  }
  get scopedContextKeyService() {
    return I.get(P);
  }
  focus() {
  }
}
const st = new ot();
class nt {
  constructor(o) {
    this.editor = o, this.onDidChangeControl = n.None, this.onDidChangeSizeConstraints = n.None, this.onDidFocus = n.None, this.onDidBlur = n.None, this.input = void 0, this.options = void 0, this.group = st, this.scopedContextKeyService = void 0, this.getViewState = i, this.isVisible = i, this.hasFocus = i, this.getId = i, this.getTitle = i, this.focus = i;
  }
  get minimumWidth() {
    return A.width;
  }
  get maximumWidth() {
    return W.width;
  }
  get minimumHeight() {
    return A.height;
  }
  get maximumHeight() {
    return W.height;
  }
  getControl() {
    return this.editor;
  }
}
function rt(g, o, a) {
  async function u(e, d, c) {
    const t = _(e) ? d : e.options;
    V(d) && (c = d);
    const s = H(e) || _(e) ? e.resource : void 0;
    if (s == null || !g.canHandleResource(s))
      return await o(e, d, c);
    let r;
    if (r = I.get(N).listCodeEditors().find((l) => l instanceof S && l.getModel() != null && l.getModel().uri.toString() === s.toString()), r == null) {
      const l = await o(
        e,
        d,
        c
      );
      if (l != null)
        return l;
      const p = await g.createModelReference(s);
      if (r = await a?.(p, t, c === z), r == null) {
        p.dispose();
        return;
      }
    }
    return t != null && U(t, r, K.Immediate), (t?.preserveFocus ?? !1) || (r.focus(), r.getContainerDomNode().scrollIntoView()), new nt(r);
  }
  return u;
}
let T = class extends it {
  constructor(o, a, u, e, d, c, t, s, r, f, l, p, v) {
    super(void 0, u, e, d, c, t, s, r, f, l, p), this._isEditorPartVisible = a, this.openEditor = rt(v, this.openEditor.bind(this), o);
  }
  get activeTextEditorControl() {
    const o = I.get(N).getFocusedCodeEditor();
    return o != null && o instanceof L ? o : super.activeTextEditorControl;
  }
  async openEditor(o, a, u) {
    if (this._isEditorPartVisible())
      return await super.openEditor(o, a, u);
  }
};
T = w([
  h(2, Y),
  h(3, x),
  h(4, J),
  h(5, $),
  h(6, X),
  h(7, j),
  h(8, q),
  h(9, Q),
  h(10, Z),
  h(11, tt),
  h(12, et)
], T);
class M {
  constructor(o, a, u) {
    this.editor = o, this.input = a, this.group = u, this.onDidChangeControl = n.None, this.options = void 0, this.minimumWidth = 0, this.maximumWidth = Number.POSITIVE_INFINITY, this.minimumHeight = 0, this.maximumHeight = Number.POSITIVE_INFINITY, this.onDidChangeSizeConstraints = n.None, this.scopedContextKeyService = void 0, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidBlur = this.editor.onDidBlurEditorWidget;
  }
  getControl() {
    return this.editor;
  }
  getViewState() {
  }
  isVisible() {
    return !0;
  }
  hasFocus() {
    return this.editor.hasWidgetFocus();
  }
  getId() {
    return this.editor.getId();
  }
  getTitle() {
  }
  focus() {
    this.editor.focus();
  }
}
let G = y = class extends k {
  constructor(o, a, u) {
    super(), this.editor = o, this.scopedContextKeyService = u, this.active = !1, this.selectedEditors = [], this.isSelected = () => !1, this.setSelection = i, this.isTransient = () => !1, this.windowId = F.vscodeWindowId, this.onDidFocus = this.editor.onDidFocusEditorWidget, this.onDidOpenEditorFail = n.None, this.whenRestored = Promise.resolve(), this.disposed = !1, this.notifyIndexChanged = i, this.relayout = i, this.toJSON = i, this.minimumWidth = 0, this.maximumWidth = Number.POSITIVE_INFINITY, this.minimumHeight = 0, this.maximumHeight = Number.POSITIVE_INFINITY, this.onDidChange = this.editor.onDidLayoutChange, this.layout = () => this.editor.layout(), this._onDidModelChange = new E(), this.onDidModelChange = this._onDidModelChange.event, this.onWillDispose = this.editor.onDidDispose, this._onDidActiveEditorChange = new E(), this.onDidActiveEditorChange = this._onDidActiveEditorChange.event, this.onWillCloseEditor = n.None, this._onDidCloseEditor = new E(), this.onDidCloseEditor = this._onDidCloseEditor.event, this.onWillMoveEditor = n.None, this._onWillOpenEditor = new E(), this.onWillOpenEditor = this._onWillOpenEditor.event, this.id = --y.idCounter, this.index = -1, this.label = `standalone editor ${-this.id}`, this.ariaLabel = `standalone editor ${-this.id}`, this.previewEditor = null, this.isLocked = !0, this.stickyCount = 0, this.getEditors = () => this.editors, this.findEditors = (t) => this.pane != null && t.toString() === this.pane.input.resource.toString() ? [this.pane.input] : [], this.getEditorByIndex = (t) => this.pane != null && t === 0 ? this.pane.input : void 0, this.getIndexOfEditor = (t) => this.pane != null && this.pane.input === t ? 0 : -1, this.openEditor = async (t) => {
      if (!t.isDisposed() && t instanceof C && t.resource.toString() === this.pane?.input.resource.toString())
        return this.focus(), this.pane;
    }, this.openEditors = async (t) => {
      if (t.length === 1)
        return await this.openEditor(t[0].editor);
    }, this.isPinned = () => !1, this.isSticky = () => !1, this.isActive = () => this.editor.hasWidgetFocus(), this.contains = (t) => this.pane != null && this.pane.input === t, this.moveEditor = i, this.moveEditors = i, this.copyEditor = i, this.copyEditors = i, this.closeEditor = i, this.closeEditors = i, this.closeAllEditors = i, this.replaceEditors = i, this.pinEditor = () => {
    }, this.stickEditor = () => {
    }, this.unstickEditor = () => {
    }, this.lock = () => {
    }, this.isFirst = i, this.isLast = i;
    const e = (t) => {
      const s = a.createInstance(C, t, void 0, void 0, void 0, void 0);
      this._onWillOpenEditor.fire({
        editor: s,
        groupId: this.id
      }), this.pane = new M(o, s, this), this._onDidModelChange.fire({
        kind: O.EDITOR_OPEN,
        editor: s,
        editorIndex: 0
      }), this._onDidActiveEditorChange.fire({
        editor: s
      });
    }, d = (t) => {
      if (this.pane != null && this.pane.input.resource.toString() === t.toString()) {
        const s = this.pane;
        this.pane = void 0, this._onDidModelChange.fire({
          kind: O.EDITOR_CLOSE,
          editorIndex: 0
        }), this._onDidActiveEditorChange.fire({
          editor: void 0
        }), this._onDidCloseEditor.fire({
          context: B.UNKNOWN,
          editor: s.input,
          groupId: this.id,
          index: 0,
          sticky: !1
        });
      }
    };
    o.onDidChangeModel((t) => {
      t.oldModelUrl != null && d(t.oldModelUrl), t.newModelUrl != null && e(t.newModelUrl);
    }), this._register({
      dispose: () => {
        const t = o.getModel();
        t != null && d(t.uri);
      }
    });
    const c = o.getModel();
    if (c != null) {
      const t = a.createInstance(C, c.uri, void 0, void 0, void 0, void 0);
      this.pane = new M(o, t, this);
    }
  }
  get groupsView() {
    return i();
  }
  notifyLabelChanged() {
  }
  createEditorActions() {
    return {
      actions: {
        primary: [],
        secondary: []
      },
      onDidChange: n.None
    };
  }
  get titleHeight() {
    return i();
  }
  setActive(o) {
    this.active = o;
  }
  get element() {
    return this.editor.getContainerDomNode();
  }
  get activeEditorPane() {
    return this.pane;
  }
  get activeEditor() {
    return this.pane?.input ?? null;
  }
  get count() {
    return this.pane != null ? 1 : 0;
  }
  get isEmpty() {
    return this.pane == null;
  }
  get editors() {
    return this.pane != null ? [this.pane.input] : [];
  }
  focus() {
    this.editor.focus(), this.editor.getContainerDomNode().scrollIntoView();
  }
};
G.idCounter = 0;
G = y = w([
  h(1, x),
  h(2, P)
], G);
let R = class extends k {
  constructor(o, a, u) {
    super(), this.delegate = o, this.instantiationService = u, this._serviceBrand = void 0, this.additionalGroups = [], this.activeGroupOverride = void 0, this.onDidCreateAuxiliaryEditorPart = this.delegate.onDidCreateAuxiliaryEditorPart, this.onDidChangeGroupMaximized = this.delegate.onDidChangeGroupMaximized, this._onDidChangeActiveGroup = new E(), this.onDidChangeActiveGroup = n.any(this._onDidChangeActiveGroup.event, this.delegate.onDidChangeActiveGroup), this._onDidAddGroup = new E(), this.onDidAddGroup = n.any(this._onDidAddGroup.event, this.delegate.onDidAddGroup), this._onDidRemoveGroup = new E(), this.onDidRemoveGroup = n.any(this._onDidRemoveGroup.event, this.delegate.onDidRemoveGroup), this.onDidMoveGroup = this.delegate.onDidMoveGroup, this.onDidActivateGroup = this.delegate.onDidActivateGroup, this.onDidChangeGroupIndex = this.delegate.onDidChangeGroupIndex, this.onDidChangeGroupLocked = this.delegate.onDidChangeGroupLocked, this.getLayout = () => this.delegate.getLayout(), this.getGroups = (e) => [...this.delegate.getGroups(e), ...this.additionalGroups], this.getGroup = (e) => this.delegate.getGroup(e) ?? this.additionalGroups.find((d) => d.id === e), this.activateGroup = (...e) => this.delegate.activateGroup(...e), this.getSize = (...e) => this.delegate.getSize(...e), this.setSize = (...e) => this.delegate.setSize(...e), this.arrangeGroups = (...e) => this.delegate.arrangeGroups(...e), this.applyLayout = (...e) => this.delegate.applyLayout(...e), this.setGroupOrientation = (...e) => this.delegate.setGroupOrientation(...e), this.findGroup = (...e) => this.delegate.findGroup(...e), this.addGroup = (...e) => this.delegate.addGroup(...e), this.removeGroup = (...e) => this.delegate.removeGroup(...e), this.moveGroup = (...e) => this.delegate.moveGroup(...e), this.mergeGroup = (...e) => this.delegate.mergeGroup(...e), this.mergeAllGroups = (...e) => this.delegate.mergeAllGroups(...e), this.copyGroup = (...e) => this.delegate.copyGroup(...e), this.onDidChangeEditorPartOptions = this.delegate.onDidChangeEditorPartOptions, this.enforcePartOptions = (...e) => this.delegate.enforcePartOptions(...e), setTimeout(() => {
      const e = I.get(N), d = (t) => {
        if (t instanceof S) {
          let s;
          const r = (m) => {
            const D = m != null ? this.additionalGroups.find((b) => b.editor === m) : void 0;
            this.activeGroupOverride !== D && (this.activeGroupOverride = D, this._onDidChangeActiveGroup.fire(this.activeGroup));
          }, f = (m) => {
            !a && this.activeGroupOverride === this.additionalGroups.find((D) => D.editor === m) && r(void 0);
          }, l = () => {
            s != null && window.clearTimeout(s), r(t);
          }, p = () => {
            s != null && window.clearTimeout(s), s = window.setTimeout(() => {
              s = void 0, f(t);
            }, 100);
          };
          t.onDidDispose(() => {
            f(t);
          }), t.onDidFocusEditorText(l), t.onDidFocusEditorWidget(l), t.onDidBlurEditorText(p), t.onDidBlurEditorWidget(p), t.hasWidgetFocus() && l();
          const v = u.createInstance(G, t);
          this.additionalGroups.push(v), this._onDidAddGroup.fire(v);
        }
      }, c = (t) => {
        if (t instanceof S) {
          const s = this.additionalGroups.find((r) => r.editor === t);
          s != null && (s.dispose(), this.activeGroupOverride === s && (this.activeGroupOverride = void 0, this._onDidChangeActiveGroup.fire(this.activeGroup)), this.additionalGroups = this.additionalGroups.filter((r) => r !== s), this._onDidRemoveGroup.fire(s));
        }
      };
      this._register(e.onCodeEditorAdd(d)), this._register(e.onCodeEditorRemove(c)), e.listCodeEditors().forEach(d);
    });
  }
  getScopedInstantiationService() {
    return this.instantiationService;
  }
  registerContextKeyProvider(o) {
    return this.delegate.registerContextKeyProvider(o);
  }
  saveWorkingSet(o) {
    return this.delegate.saveWorkingSet(o);
  }
  getWorkingSets() {
    return this.delegate.getWorkingSets();
  }
  applyWorkingSet(o) {
    return this.delegate.applyWorkingSet(o);
  }
  deleteWorkingSet(o) {
    return this.delegate.deleteWorkingSet(o);
  }
  get isReady() {
    return this.delegate.isReady;
  }
  get whenReady() {
    return this.delegate.whenReady;
  }
  get whenRestored() {
    return this.delegate.whenRestored;
  }
  get hasRestorableState() {
    return this.delegate.hasRestorableState;
  }
  get parts() {
    return this.delegate.parts;
  }
  createAuxiliaryEditorPart(o) {
    return this.delegate.createAuxiliaryEditorPart(o);
  }
  get mainPart() {
    return this.delegate.mainPart;
  }
  getPart(o) {
    return this.delegate.getPart(o);
  }
  toggleMaximizeGroup(o) {
    return this.delegate.toggleMaximizeGroup(o);
  }
  toggleExpandGroup(o) {
    return this.delegate.toggleExpandGroup(o);
  }
  createEditorDropTarget(o, a) {
    return this.delegate.createEditorDropTarget(o, a);
  }
  get groups() {
    return [...this.additionalGroups, ...this.delegate.groups];
  }
  get activeGroup() {
    return this.activeGroupOverride ?? this.delegate.activeGroup;
  }
  get sideGroup() {
    return this.delegate.sideGroup;
  }
  get count() {
    return this.delegate.count + this.additionalGroups.length;
  }
  get orientation() {
    return this.delegate.orientation;
  }
  get partOptions() {
    return this.delegate.partOptions;
  }
};
R = w([
  h(2, x)
], R);
export {
  T as M,
  R as a,
  st as f
};
//# sourceMappingURL=editor-DklStVNa.js.map
