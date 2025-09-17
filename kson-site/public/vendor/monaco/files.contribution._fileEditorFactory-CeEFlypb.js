import { y as w, U as pe, gH as b, fX as Ee, rM as ee, rN as Ie, a3 as y, h6 as O, ah as v, gQ as me, D as k, rO as Ge, gX as G, ay as C, h8 as E, aS as $, g3 as te, aD as Q, b9 as m, rP as Te, rQ as x, gL as J, a6 as U, cE as _e, eH as X, hr as j, a8 as A, _ as L, b as h, M as be, jA as ie, f_ as Me, gD as P, gE as R, h5 as F, rR as we, lQ as ke, h4 as Le, hd as xe, d0 as Ue, cD as W, jx as N, rS as Pe, m3 as Fe, rJ as We, gC as V, gK as H, a5 as K, rT as B, a7 as l, cu as ve, gR as ge, gJ as Se, aa as Ne, eU as re, rU as se, rV as p, an as Ve, A as Ce, W as ye, R as He, hl as Z, hv as Ae, rL as Ke, bU as Oe, mA as Be, ak as Ye, gI as Y, gB as qe, gF as oe, lX as ne, gV as ze, l$ as ae, cL as $e, mB as Qe, rW as S, rX as f, rc as de, bS as Je, mw as Xe, x as je, jE as Ze, O as et, m5 as tt, et as it, eu as rt, ro as st, re as ce } from "./index-8dqW3L9v.js";
function ue(u, e, t) {
  const i = u.get(w), r = u.get(pe), s = ot(e, t, i, r);
  return s instanceof Promise ? s.then((n) => he(n, e, t, i)) : he(s, e, t, i);
}
function he(u, e, t, i) {
  let r;
  return i.activeGroup !== u && e.options && !e.options.inactive && e.options.preserveFocus && typeof e.options.activation != "number" && t !== Ee && (r = me.ACTIVATE), [u, r];
}
function ot(u, e, t, i) {
  let r;
  const s = b(u) ? u.editor : u, n = u.options;
  if (e && typeof e != "number")
    r = e;
  else if (typeof e == "number" && e >= 0)
    r = t.getGroup(e);
  else if (e === Ee) {
    const o = ee(i);
    let a = t.findGroup({ direction: o });
    (!a || _(a, s)) && (a = t.addGroup(t.activeGroup, o)), r = a;
  } else if (e === Ie)
    r = t.createAuxiliaryEditorPart({
      bounds: n?.auxiliary?.bounds,
      compact: n?.auxiliary?.compact,
      alwaysOnTop: n?.auxiliary?.alwaysOnTop
    }).then((o) => o.activeGroup);
  else if (!n || typeof n.index != "number") {
    const o = t.getGroups(y.MOST_RECENTLY_ACTIVE);
    if (n?.revealIfVisible) {
      for (const a of o)
        if (nt(a, s)) {
          r = a;
          break;
        }
    }
    if (!r && (n?.revealIfOpened || i.getValue("workbench.editor.revealIfOpen") || O(s) && s.hasCapability(v.Singleton))) {
      let a, d;
      for (const c of o)
        if (De(c, s) && (d || (d = c), !a && c.isActive(s) && (a = c)), d && a)
          break;
      r = a || d;
    }
  }
  if (!r) {
    let o = t.activeGroup;
    if (_(o, s)) {
      for (const a of t.getGroups(y.MOST_RECENTLY_ACTIVE))
        if (!_(a, s)) {
          o = a;
          break;
        }
      _(o, s) ? r = t.addGroup(o, ee(i)) : r = o;
    } else
      r = o;
  }
  return r;
}
function _(u, e) {
  return !(!u.isLocked || De(u, e));
}
function nt(u, e) {
  return u.activeEditor ? u.activeEditor.matches(e) : !1;
}
function De(u, e) {
  for (const t of u.editors)
    if (t.matches(e))
      return !0;
  return !1;
}
var I;
let q = class extends k {
  static {
    I = this;
  }
  static {
    this.STORAGE_KEY = "editors.mru";
  }
  get count() {
    return this.mostRecentEditorsMap.size;
  }
  get editors() {
    return [...this.mostRecentEditorsMap.values()];
  }
  hasEditor(e) {
    return this.editorsPerResourceCounter.get(e.resource)?.has(this.toIdentifier(e)) ?? !1;
  }
  hasEditors(e) {
    return this.editorsPerResourceCounter.has(e);
  }
  toIdentifier(e, t) {
    return typeof e != "string" ? this.toIdentifier(e.typeId, e.editorId) : t ? `${e}/${t}` : e;
  }
  constructor(e, t, i) {
    super(), this.editorGroupService = t, this.storageService = i, this.keyMap = /* @__PURE__ */ new Map(), this.mostRecentEditorsMap = new Ge(), this.editorsPerResourceCounter = new G(), this._onDidMostRecentlyActiveEditorsChange = this._register(new C()), this.onDidMostRecentlyActiveEditorsChange = this._onDidMostRecentlyActiveEditorsChange.event, this.editorGroupsContainer = e ?? t, this.isScoped = !!e, this.registerListeners(), this.loadState();
  }
  registerListeners() {
    this._register(this.editorGroupsContainer.onDidAddGroup((e) => this.onGroupAdded(e))), this._register(this.editorGroupService.onDidChangeEditorPartOptions((e) => this.onDidChangeEditorPartOptions(e))), this._register(this.storageService.onWillSaveState(() => this.saveState()));
  }
  onGroupAdded(e) {
    const t = e.getEditors(E.MOST_RECENTLY_ACTIVE);
    for (let i = t.length - 1; i >= 0; i--)
      this.addMostRecentEditor(e, t[i], !1, !0);
    this.editorGroupsContainer.activeGroup === e && e.activeEditor && this.addMostRecentEditor(e, e.activeEditor, !0, !1), this.registerGroupListeners(e);
  }
  registerGroupListeners(e) {
    const t = new $();
    t.add(e.onDidModelChange((i) => {
      switch (i.kind) {
        case te.GROUP_ACTIVE: {
          this.editorGroupsContainer.activeGroup === e && e.activeEditor && this.addMostRecentEditor(e, e.activeEditor, !0, !1);
          break;
        }
        case te.EDITOR_OPEN: {
          i.editor && (this.addMostRecentEditor(e, i.editor, !1, !0), this.ensureOpenedEditorsLimit({ groupId: e.id, editor: i.editor }, e.id));
          break;
        }
      }
    })), t.add(e.onDidCloseEditor((i) => {
      this.removeMostRecentEditor(e, i.editor);
    })), t.add(e.onDidActiveEditorChange((i) => {
      i.editor && this.addMostRecentEditor(e, i.editor, this.editorGroupsContainer.activeGroup === e, !1);
    })), Q.once(e.onWillDispose)(() => m(t));
  }
  onDidChangeEditorPartOptions(e) {
    if (!Te(e.newPartOptions.limit, e.oldPartOptions.limit)) {
      const t = this.editorGroupsContainer.activeGroup;
      let i;
      t.activeEditor && (i = { editor: t.activeEditor, groupId: t.id }), this.ensureOpenedEditorsLimit(i);
    }
  }
  addMostRecentEditor(e, t, i, r) {
    const s = this.ensureKey(e, t), n = this.mostRecentEditorsMap.first;
    i || !n ? this.mostRecentEditorsMap.set(s, s, n ? x.AsOld : void 0) : (this.mostRecentEditorsMap.set(s, s, x.AsOld), this.mostRecentEditorsMap.set(n, n, x.AsOld)), r && this.updateEditorResourcesMap(t, !0), this._onDidMostRecentlyActiveEditorsChange.fire();
  }
  updateEditorResourcesMap(e, t) {
    let i, r, s;
    if (e instanceof J ? (i = e.primary.resource, r = e.primary.typeId, s = e.primary.editorId) : (i = e.resource, r = e.typeId, s = e.editorId), !i)
      return;
    const n = this.toIdentifier(r, s);
    if (t) {
      let o = this.editorsPerResourceCounter.get(i);
      o || (o = /* @__PURE__ */ new Map(), this.editorsPerResourceCounter.set(i, o)), o.set(n, (o.get(n) ?? 0) + 1);
    } else {
      const o = this.editorsPerResourceCounter.get(i);
      if (o) {
        const a = o.get(n) ?? 0;
        a > 1 ? o.set(n, a - 1) : (o.delete(n), o.size === 0 && this.editorsPerResourceCounter.delete(i));
      }
    }
  }
  removeMostRecentEditor(e, t) {
    this.updateEditorResourcesMap(t, !1);
    const i = this.findKey(e, t);
    if (i) {
      this.mostRecentEditorsMap.delete(i);
      const r = this.keyMap.get(e.id);
      r && r.delete(i.editor) && r.size === 0 && this.keyMap.delete(e.id), this._onDidMostRecentlyActiveEditorsChange.fire();
    }
  }
  findKey(e, t) {
    const i = this.keyMap.get(e.id);
    if (i)
      return i.get(t);
  }
  ensureKey(e, t) {
    let i = this.keyMap.get(e.id);
    i || (i = /* @__PURE__ */ new Map(), this.keyMap.set(e.id, i));
    let r = i.get(t);
    return r || (r = { groupId: e.id, editor: t }, i.set(t, r)), r;
  }
  async ensureOpenedEditorsLimit(e, t) {
    if (!this.editorGroupService.partOptions.limit?.enabled || typeof this.editorGroupService.partOptions.limit.value != "number" || this.editorGroupService.partOptions.limit.value <= 0)
      return;
    const i = this.editorGroupService.partOptions.limit.value;
    if (this.editorGroupService.partOptions.limit?.perEditorGroup)
      if (typeof t == "number") {
        const r = this.editorGroupsContainer.getGroup(t);
        r && await this.doEnsureOpenedEditorsLimit(i, r.getEditors(E.MOST_RECENTLY_ACTIVE).map((s) => ({ editor: s, groupId: t })), e);
      } else
        for (const r of this.editorGroupsContainer.groups)
          await this.ensureOpenedEditorsLimit(e, r.id);
    else
      await this.doEnsureOpenedEditorsLimit(i, [...this.mostRecentEditorsMap.values()], e);
  }
  async doEnsureOpenedEditorsLimit(e, t, i) {
    let r;
    if (this.editorGroupService.partOptions.limit?.excludeDirty ? r = t.filter(({ editor: a }) => !(a.isDirty() && !a.isSaving() || a.hasCapability(v.Scratchpad))) : r = t, e >= r.length)
      return;
    const s = r.reverse().filter(({ editor: a, groupId: d }) => !(a.isDirty() && !a.isSaving() || a.hasCapability(v.Scratchpad) || i && a === i.editor && d === i.groupId || this.editorGroupsContainer.getGroup(d)?.isSticky(a)));
    let n = r.length - e;
    const o = /* @__PURE__ */ new Map();
    for (const { groupId: a, editor: d } of s) {
      let c = o.get(a);
      if (c || (c = [], o.set(a, c)), c.push(d), n--, n === 0)
        break;
    }
    for (const [a, d] of o) {
      const c = this.editorGroupsContainer.getGroup(a);
      c && await c.closeEditors(d, { preserveFocus: !0 });
    }
  }
  saveState() {
    this.isScoped || (this.mostRecentEditorsMap.isEmpty() ? this.storageService.remove(I.STORAGE_KEY, U.WORKSPACE) : this.storageService.store(I.STORAGE_KEY, JSON.stringify(this.serialize()), U.WORKSPACE, _e.MACHINE));
  }
  serialize() {
    const e = X.as(j.EditorFactory), t = [...this.mostRecentEditorsMap.values()], i = /* @__PURE__ */ new Map();
    return {
      entries: A(t.map(({ editor: r, groupId: s }) => {
        const n = this.editorGroupsContainer.getGroup(s);
        if (!n)
          return;
        let o = i.get(n);
        o || (o = n.getEditors(E.SEQUENTIAL).filter((d) => e.getEditorSerializer(d)?.canSerialize(d)), i.set(n, o));
        const a = o.indexOf(r);
        if (a !== -1)
          return { groupId: s, index: a };
      }))
    };
  }
  async loadState() {
    (this.editorGroupsContainer === this.editorGroupService.mainPart || this.editorGroupsContainer === this.editorGroupService) && await this.editorGroupService.whenReady;
    let e = !1;
    if (!this.isScoped) {
      const t = this.storageService.get(I.STORAGE_KEY, U.WORKSPACE);
      t && (e = !0, this.deserialize(JSON.parse(t)));
    }
    if (!e) {
      const t = this.editorGroupsContainer.getGroups(y.MOST_RECENTLY_ACTIVE);
      for (let i = t.length - 1; i >= 0; i--) {
        const r = t[i], s = r.getEditors(E.MOST_RECENTLY_ACTIVE);
        for (let n = s.length - 1; n >= 0; n--)
          this.addMostRecentEditor(r, s[n], !0, !0);
      }
    }
    for (const t of this.editorGroupsContainer.groups)
      this.registerGroupListeners(t);
  }
  deserialize(e) {
    const t = [];
    for (const { groupId: i, index: r } of e.entries) {
      const s = this.editorGroupsContainer.getGroup(i);
      if (!s)
        continue;
      const n = s.getEditorByIndex(r);
      if (!n)
        continue;
      const o = this.ensureKey(s, n);
      t.push([o, o]), this.updateEditorResourcesMap(n, !0);
    }
    this.mostRecentEditorsMap.fromJSON(t);
  }
};
q = I = L([
  h(1, w),
  h(2, be)
], q);
var z;
let le = z = class extends k {
  constructor(e, t, i, r, s, n, o, a, d, c, g) {
    super(), this.editorGroupService = t, this.instantiationService = i, this.fileService = r, this.configurationService = s, this.contextService = n, this.uriIdentityService = o, this.editorResolverService = a, this.workspaceTrustRequestService = d, this.hostService = c, this.textEditorService = g, this._onDidActiveEditorChange = this._register(new C()), this.onDidActiveEditorChange = this._onDidActiveEditorChange.event, this._onDidVisibleEditorsChange = this._register(new C()), this.onDidVisibleEditorsChange = this._onDidVisibleEditorsChange.event, this._onDidEditorsChange = this._register(new C()), this.onDidEditorsChange = this._onDidEditorsChange.event, this._onWillOpenEditor = this._register(new C()), this.onWillOpenEditor = this._onWillOpenEditor.event, this._onDidCloseEditor = this._register(new C()), this.onDidCloseEditor = this._onDidCloseEditor.event, this._onDidOpenEditorFail = this._register(new C()), this.onDidOpenEditorFail = this._onDidOpenEditorFail.event, this._onDidMostRecentlyActiveEditorsChange = this._register(new C()), this.onDidMostRecentlyActiveEditorsChange = this._onDidMostRecentlyActiveEditorsChange.event, this.lastActiveEditor = void 0, this.activeOutOfWorkspaceWatchers = new G(), this.closeOnFileDelete = !1, this.editorGroupsContainer = e ?? t, this.editorsObserver = this._register(this.instantiationService.createInstance(q, this.editorGroupsContainer)), this.onConfigurationUpdated(), this.registerListeners();
  }
  createScoped(e, t) {
    return t.add(new z(
      e,
      this.editorGroupService,
      this.instantiationService,
      this.fileService,
      this.configurationService,
      this.contextService,
      this.uriIdentityService,
      this.editorResolverService,
      this.workspaceTrustRequestService,
      this.hostService,
      this.textEditorService
    ));
  }
  registerListeners() {
    this.editorGroupsContainer === this.editorGroupService.mainPart || this.editorGroupsContainer === this.editorGroupService ? this.editorGroupService.whenReady.then(() => this.onEditorGroupsReady()) : this.onEditorGroupsReady(), this._register(this.editorGroupsContainer.onDidChangeActiveGroup((e) => this.handleActiveEditorChange(e))), this._register(this.editorGroupsContainer.onDidAddGroup((e) => this.registerGroupListeners(e))), this._register(this.editorsObserver.onDidMostRecentlyActiveEditorsChange(() => this._onDidMostRecentlyActiveEditorsChange.fire())), this._register(this.onDidVisibleEditorsChange(() => this.handleVisibleEditorsChange())), this._register(this.fileService.onDidRunOperation((e) => this.onDidRunFileOperation(e))), this._register(this.fileService.onDidFilesChange((e) => this.onDidFilesChange(e))), this._register(this.configurationService.onDidChangeConfiguration((e) => this.onConfigurationUpdated(e)));
  }
  onEditorGroupsReady() {
    for (const e of this.editorGroupsContainer.groups)
      this.registerGroupListeners(e);
    this.activeEditor && (this.doHandleActiveEditorChangeEvent(), this._onDidVisibleEditorsChange.fire());
  }
  handleActiveEditorChange(e) {
    e === this.editorGroupsContainer.activeGroup && (!this.lastActiveEditor && !e.activeEditor || this.doHandleActiveEditorChangeEvent());
  }
  doHandleActiveEditorChangeEvent() {
    const e = this.editorGroupsContainer.activeGroup;
    this.lastActiveEditor = e.activeEditor ?? void 0, this._onDidActiveEditorChange.fire();
  }
  registerGroupListeners(e) {
    const t = new $();
    t.add(e.onDidModelChange((i) => {
      this._onDidEditorsChange.fire({ groupId: e.id, event: i });
    })), t.add(e.onDidActiveEditorChange(() => {
      this.handleActiveEditorChange(e), this._onDidVisibleEditorsChange.fire();
    })), t.add(e.onWillOpenEditor((i) => {
      this._onWillOpenEditor.fire(i);
    })), t.add(e.onDidCloseEditor((i) => {
      this._onDidCloseEditor.fire(i);
    })), t.add(e.onDidOpenEditorFail((i) => {
      this._onDidOpenEditorFail.fire({ editor: i, groupId: e.id });
    })), Q.once(e.onWillDispose)(() => {
      m(t);
    });
  }
  handleVisibleEditorsChange() {
    const e = new ie();
    for (const t of this.visibleEditors) {
      const i = Me(A([
        P.getCanonicalUri(t, { supportSideBySide: R.PRIMARY }),
        P.getCanonicalUri(t, { supportSideBySide: R.SECONDARY })
      ]), (r) => r.toString());
      for (const r of i)
        this.fileService.hasProvider(r) && !this.contextService.isInsideWorkspace(r) && e.add(r);
    }
    for (const t of this.activeOutOfWorkspaceWatchers.keys())
      e.has(t) || (m(this.activeOutOfWorkspaceWatchers.get(t)), this.activeOutOfWorkspaceWatchers.delete(t));
    for (const t of e.keys())
      if (!this.activeOutOfWorkspaceWatchers.get(t)) {
        const i = this.fileService.watch(t);
        this.activeOutOfWorkspaceWatchers.set(t, i);
      }
  }
  async onDidRunFileOperation(e) {
    e.isOperation(F.MOVE) && this.handleMovedFile(e.resource, e.target.resource), (e.isOperation(F.DELETE) || e.isOperation(F.MOVE)) && this.handleDeletedFile(e.resource, !1, e.target ? e.target.resource : void 0);
  }
  onDidFilesChange(e) {
    e.gotDeleted() && this.handleDeletedFile(e, !0);
  }
  async handleMovedFile(e, t) {
    for (const i of this.editorGroupsContainer.groups) {
      const r = [];
      for (const s of i.editors) {
        const n = s.resource;
        if (!n || !this.uriIdentityService.extUri.isEqualOrParent(n, e))
          continue;
        let o;
        if (this.uriIdentityService.extUri.isEqual(e, n))
          o = t;
        else {
          const c = we(n.path, e.path, this.uriIdentityService.extUri.ignorePathCasing(n));
          o = ke(t, n.path.substr(c + e.path.length + 1));
        }
        const a = await s.rename(i.id, o);
        if (!a)
          return;
        const d = {
          preserveFocus: !0,
          pinned: i.isPinned(s),
          sticky: i.isSticky(s),
          index: i.getIndexOfEditor(s),
          inactive: !i.isActive(s)
        };
        O(a.editor) ? r.push({
          editor: s,
          replacement: a.editor,
          options: {
            ...a.options,
            ...d
          }
        }) : r.push({
          editor: s,
          replacement: {
            ...a.editor,
            options: {
              ...a.editor.options,
              ...d
            }
          }
        });
      }
      r.length && this.replaceEditors(r, i);
    }
  }
  onConfigurationUpdated(e) {
    if (e && !e.affectsConfiguration("workbench.editor.closeOnFileDelete"))
      return;
    const t = this.configurationService.getValue();
    typeof t.workbench?.editor?.closeOnFileDelete == "boolean" ? this.closeOnFileDelete = t.workbench.editor.closeOnFileDelete : this.closeOnFileDelete = !1;
  }
  handleDeletedFile(e, t, i) {
    for (const r of this.getAllNonDirtyEditors({ includeUntitled: !1, supportSideBySide: !0 }))
      (async () => {
        const s = r.resource;
        if (s && (this.closeOnFileDelete || !t)) {
          if (i && this.uriIdentityService.extUri.isEqualOrParent(s, i))
            return;
          let n = !1;
          if (e instanceof Le ? n = e.contains(s, xe.DELETED) : n = this.uriIdentityService.extUri.isEqualOrParent(s, e), !n)
            return;
          let o = !1;
          t && this.fileService.hasProvider(s) && (await Ue(100), o = await this.fileService.exists(s)), !o && !r.isDisposed() && r.dispose();
        }
      })();
  }
  getAllNonDirtyEditors(e) {
    const t = [];
    function i(r) {
      r.hasCapability(v.Untitled) && !e.includeUntitled || r.isDirty() || t.push(r);
    }
    for (const r of this.editors)
      e.supportSideBySide && r instanceof J ? (i(r.primary), i(r.secondary)) : i(r);
    return t;
  }
  get activeEditorPane() {
    return this.editorGroupsContainer.activeGroup?.activeEditorPane;
  }
  get activeTextEditorControl() {
    const e = this.activeEditorPane;
    if (e) {
      const t = e.getControl();
      if (W(t) || N(t))
        return t;
      if (Pe(t) && W(t.activeCodeEditor))
        return t.activeCodeEditor;
    }
  }
  get activeTextEditorLanguageId() {
    let e;
    const t = this.activeTextEditorControl;
    return N(t) ? e = t.getModifiedEditor() : e = t, e?.getModel()?.getLanguageId();
  }
  get count() {
    return this.editorsObserver.count;
  }
  get editors() {
    return this.getEditors(E.SEQUENTIAL).map(({ editor: e }) => e);
  }
  getEditors(e, t) {
    switch (e) {
      case E.MOST_RECENTLY_ACTIVE:
        return t?.excludeSticky ? this.editorsObserver.editors.filter(({ groupId: i, editor: r }) => !this.editorGroupsContainer.getGroup(i)?.isSticky(r)) : this.editorsObserver.editors;
      case E.SEQUENTIAL: {
        const i = [];
        for (const r of this.editorGroupsContainer.getGroups(y.GRID_APPEARANCE))
          i.push(...r.getEditors(E.SEQUENTIAL, t).map((s) => ({ editor: s, groupId: r.id })));
        return i;
      }
    }
  }
  get activeEditor() {
    const e = this.editorGroupsContainer.activeGroup;
    return e ? e.activeEditor ?? void 0 : void 0;
  }
  get visibleEditorPanes() {
    return A(this.editorGroupsContainer.groups.map((e) => e.activeEditorPane));
  }
  get visibleTextEditorControls() {
    return this.doGetVisibleTextEditorControls(this.visibleEditorPanes);
  }
  doGetVisibleTextEditorControls(e) {
    const t = [];
    for (const i of e) {
      const r = [];
      i instanceof Fe ? (r.push(i.getPrimaryEditorPane()?.getControl()), r.push(i.getSecondaryEditorPane()?.getControl())) : r.push(i.getControl());
      for (const s of r)
        (W(s) || N(s)) && t.push(s);
    }
    return t;
  }
  getVisibleTextEditorControls(e) {
    return this.doGetVisibleTextEditorControls(A(this.editorGroupsContainer.getGroups(e === E.SEQUENTIAL ? y.GRID_APPEARANCE : y.MOST_RECENTLY_ACTIVE).map((t) => t.activeEditorPane)));
  }
  get visibleEditors() {
    return A(this.editorGroupsContainer.groups.map((e) => e.activeEditor));
  }
  async openEditor(e, t, i) {
    let r, s = O(e) ? t : e.options, n;
    if (We(t) && (i = t), !O(e)) {
      const o = await this.editorResolverService.resolveEditor(e, i);
      if (o === V.ABORT)
        return;
      H(o) && (r = o.editor, s = o.options, n = o.group);
    }
    if (r || (r = O(e) ? e : await this.textEditorService.resolveTextEditor(e)), !n) {
      let o;
      const a = this.instantiationService.invokeFunction(ue, { editor: r, options: s }, i);
      a instanceof Promise ? [n, o] = await a : [n, o] = a, o && (s = { ...s, activation: o });
    }
    return n.openEditor(r, s);
  }
  async openEditors(e, t, i) {
    if (i?.validateTrust && !await this.handleWorkspaceTrust(e))
      return [];
    const r = /* @__PURE__ */ new Map();
    for (const n of e) {
      let o, a;
      if (!b(n)) {
        const c = await this.editorResolverService.resolveEditor(n, t);
        if (c === V.ABORT)
          continue;
        H(c) && (o = c, a = c.group);
      }
      if (o || (o = b(n) ? n : { editor: await this.textEditorService.resolveTextEditor(n), options: n.options }), !a) {
        const c = this.instantiationService.invokeFunction(ue, o, t);
        c instanceof Promise ? [a] = await c : [a] = c;
      }
      let d = r.get(a);
      d || (d = [], r.set(a, d)), d.push(o);
    }
    const s = [];
    for (const [n, o] of r)
      s.push(n.openEditors(o));
    return A(await K.settled(s));
  }
  async handleWorkspaceTrust(e) {
    const { resources: t, diffMode: i, mergeMode: r } = this.extractEditorResources(e);
    switch (await this.workspaceTrustRequestService.requestOpenFilesTrust(t)) {
      case B.Open:
        return !0;
      case B.OpenInNewWindow:
        return await this.hostService.openWindow(t.map((n) => ({ fileUri: n })), { forceNewWindow: !0, diffMode: i, mergeMode: r }), !1;
      case B.Cancel:
        return !1;
    }
  }
  extractEditorResources(e) {
    const t = new ie();
    let i = !1, r = !1;
    for (const s of e)
      if (b(s)) {
        const n = P.getOriginalUri(s.editor, { supportSideBySide: R.BOTH });
        l.isUri(n) ? t.add(n) : n && (n.primary && t.add(n.primary), n.secondary && t.add(n.secondary), i = s.editor instanceof ve);
      } else
        ge(s) && (l.isUri(s.input1) && t.add(s.input1.resource), l.isUri(s.input2) && t.add(s.input2.resource), l.isUri(s.base) && t.add(s.base.resource), l.isUri(s.result) && t.add(s.result.resource), r = !0), Se(s) ? (l.isUri(s.original.resource) && t.add(s.original.resource), l.isUri(s.modified.resource) && t.add(s.modified.resource), i = !0) : Ne(s) && t.add(s.resource);
    return {
      resources: Array.from(t.keys()),
      diffMode: i,
      mergeMode: r
    };
  }
  isOpened(e) {
    return this.editorsObserver.hasEditor({
      resource: this.uriIdentityService.asCanonicalUri(e.resource),
      typeId: e.typeId,
      editorId: e.editorId
    });
  }
  isVisible(e) {
    for (const t of this.editorGroupsContainer.groups)
      if (t.activeEditor?.matches(e))
        return !0;
    return !1;
  }
  async closeEditor({ editor: e, groupId: t }, i) {
    await this.editorGroupsContainer.getGroup(t)?.closeEditor(e, i);
  }
  async closeEditors(e, t) {
    const i = /* @__PURE__ */ new Map();
    for (const { editor: r, groupId: s } of e) {
      const n = this.editorGroupsContainer.getGroup(s);
      if (!n)
        continue;
      let o = i.get(n);
      o || (o = [], i.set(n, o)), o.push(r);
    }
    for (const [r, s] of i)
      await r.closeEditors(s, t);
  }
  findEditors(e, t, i) {
    const r = l.isUri(e) ? e : e.resource, s = l.isUri(e) ? void 0 : e.typeId;
    if (t?.supportSideBySide !== R.ANY && t?.supportSideBySide !== R.SECONDARY && !this.editorsObserver.hasEditors(r))
      return l.isUri(e) || re(i) ? [] : void 0;
    if (re(i)) {
      const n = [];
      for (const o of this.editorGroupsContainer.getGroups(y.MOST_RECENTLY_ACTIVE)) {
        const a = [];
        if (l.isUri(e))
          a.push(...this.findEditors(e, t, o));
        else {
          const d = this.findEditors(e, t, o);
          d && a.push(d);
        }
        n.push(...a.map((d) => ({ editor: d, groupId: o.id })));
      }
      return n;
    } else {
      const n = typeof i == "number" ? this.editorGroupsContainer.getGroup(i) : i;
      if (l.isUri(e))
        return n ? n.findEditors(r, t) : [];
      {
        if (!n)
          return;
        const o = n.findEditors(r, t);
        for (const a of o)
          if (a.typeId === s)
            return a;
        return;
      }
    }
  }
  async replaceEditors(e, t) {
    const i = typeof t == "number" ? this.editorGroupsContainer.getGroup(t) : t, r = [];
    for (const s of e) {
      let n;
      if (!O(s.replacement)) {
        const o = await this.editorResolverService.resolveEditor(s.replacement, i);
        if (o === V.ABORT)
          continue;
        H(o) && (n = {
          editor: s.editor,
          replacement: o.editor,
          options: o.options,
          forceReplaceDirty: s.forceReplaceDirty
        });
      }
      n || (n = {
        editor: s.editor,
        replacement: se(s) ? s.replacement : await this.textEditorService.resolveTextEditor(s.replacement),
        options: se(s) ? s.options : s.replacement.options,
        forceReplaceDirty: s.forceReplaceDirty
      }), r.push(n);
    }
    return i?.replaceEditors(r);
  }
  async save(e, t) {
    Array.isArray(e) || (e = [e]);
    const i = this.getUniqueEditors(e), r = [], s = [];
    if (t?.saveAs)
      s.push(...i);
    else
      for (const { groupId: o, editor: a } of i)
        a.hasCapability(v.Untitled) ? s.push({ groupId: o, editor: a }) : r.push({ groupId: o, editor: a });
    const n = await K.settled(r.map(({ groupId: o, editor: a }) => (t?.reason === p.EXPLICIT && this.editorGroupsContainer.getGroup(o)?.pinEditor(a), a.save(o, t))));
    for (const { groupId: o, editor: a } of s) {
      if (a.isDisposed())
        continue;
      const c = {
        pinned: !0,
        viewState: (await this.openEditor(a, o))?.getViewState()
      }, g = t?.saveAs ? await a.saveAs(o, t) : await a.save(o, t);
      if (n.push(g), !g)
        break;
      if (!a.matches(g)) {
        const Re = a.hasCapability(v.Untitled) ? this.editorGroupsContainer.groups.map((T) => T.id) : [o];
        for (const T of Re)
          g instanceof Ve ? await this.replaceEditors([{ editor: a, replacement: g, options: c }], T) : await this.replaceEditors([{ editor: a, replacement: { ...g, options: c } }], T);
      }
    }
    return {
      success: n.every((o) => !!o),
      editors: A(n)
    };
  }
  saveAll(e) {
    return this.save(this.getAllModifiedEditors(e), e);
  }
  async revert(e, t) {
    Array.isArray(e) || (e = [e]);
    const i = this.getUniqueEditors(e);
    return await K.settled(i.map(async ({ groupId: r, editor: s }) => (this.editorGroupsContainer.getGroup(r)?.pinEditor(s), s.revert(r, t)))), !i.some(({ editor: r }) => r.isDirty());
  }
  async revertAll(e) {
    return this.revert(this.getAllModifiedEditors(e), e);
  }
  getAllModifiedEditors(e) {
    const t = [];
    for (const i of this.editorGroupsContainer.getGroups(y.MOST_RECENTLY_ACTIVE))
      for (const r of i.getEditors(E.MOST_RECENTLY_ACTIVE))
        r.isModified() && ((typeof e?.includeUntitled == "boolean" || !e?.includeUntitled?.includeScratchpad) && r.hasCapability(v.Scratchpad) || !e?.includeUntitled && r.hasCapability(v.Untitled) || e?.excludeSticky && i.isSticky(r) || t.push({ groupId: i.id, editor: r }));
    return t;
  }
  getUniqueEditors(e) {
    const t = [];
    for (const { editor: i, groupId: r } of e)
      t.some((s) => s.editor.matches(i)) || t.push({ editor: i, groupId: r });
    return t;
  }
  dispose() {
    super.dispose(), this.activeOutOfWorkspaceWatchers.forEach((e) => m(e)), this.activeOutOfWorkspaceWatchers.clear();
  }
};
le = z = L([
  h(1, w),
  h(2, Ce),
  h(3, ye),
  h(4, pe),
  h(5, He),
  h(6, Z),
  h(7, Ae),
  h(8, Ke),
  h(9, Oe),
  h(10, Be)
], le);
var D;
class at extends Error {
  constructor(e, t) {
    super(e), this.name = "FileEditorInputLeakError", this.stack = t;
  }
}
let fe = class extends k {
  static {
    D = this;
  }
  constructor(e, t, i, r, s) {
    super(), this.untitledTextEditorService = e, this.instantiationService = t, this.uriIdentityService = i, this.fileService = r, this.editorResolverService = s, this.editorInputCache = new G(), this.fileEditorFactory = X.as(j.EditorFactory).getFileEditorFactory(), this.mapLeakToCounter = /* @__PURE__ */ new Map(), this.registerDefaultEditor();
  }
  registerDefaultEditor() {
    this._register(this.editorResolverService.registerEditor("*", {
      id: Y.id,
      label: Y.displayName,
      detail: Y.providerDisplayName,
      priority: Ye.builtin
    }, {}, {
      createEditorInput: (e) => ({ editor: this.createTextEditor(e) }),
      createUntitledEditorInput: (e) => ({ editor: this.createTextEditor(e) }),
      createDiffEditorInput: (e) => ({ editor: this.createTextEditor(e) })
    }));
  }
  async resolveTextEditor(e) {
    return this.createTextEditor(e);
  }
  createTextEditor(e) {
    if (ge(e))
      return this.createTextEditor(e.result);
    if (Se(e)) {
      const r = this.createTextEditor(e.original), s = this.createTextEditor(e.modified);
      return this.instantiationService.createInstance(ve, e.label, e.description, r, s, void 0);
    }
    if (qe(e)) {
      const r = this.createTextEditor(e.primary), s = this.createTextEditor(e.secondary);
      return this.instantiationService.createInstance(J, e.label, e.description, s, r);
    }
    const t = e;
    if (t.forceUntitled || !t.resource || t.resource.scheme === oe.untitled) {
      const r = {
        languageId: t.languageId,
        initialValue: t.contents,
        encoding: t.encoding
      };
      let s;
      return t.resource?.scheme === oe.untitled ? s = this.untitledTextEditorService.create({ untitledResource: t.resource, ...r }) : s = this.untitledTextEditorService.create({ associatedResource: t.resource, ...r }), this.createOrGetCached(s.resource, () => this.instantiationService.createInstance(ne, s));
    }
    const i = e;
    if (i.resource instanceof l) {
      const r = i.label || ze(i.resource), s = i.resource, n = this.uriIdentityService.asCanonicalUri(s);
      return this.createOrGetCached(n, () => i.forceFile || this.fileService.hasProvider(n) ? this.fileEditorFactory.createFileEditor(n, s, i.label, i.description, i.encoding, i.languageId, i.contents, this.instantiationService) : this.instantiationService.createInstance(ae, n, i.label, i.description, i.languageId, i.contents), (o) => {
        o instanceof ne || (o instanceof ae ? (r && o.setName(r), i.description && o.setDescription(i.description), i.languageId && o.setPreferredLanguageId(i.languageId), typeof i.contents == "string" && o.setPreferredContents(i.contents)) : (o.setPreferredResource(s), i.label && o.setPreferredName(i.label), i.description && o.setPreferredDescription(i.description), i.encoding && o.setPreferredEncoding(i.encoding), i.languageId && o.setPreferredLanguageId(i.languageId), typeof i.contents == "string" && o.setPreferredContents(i.contents)));
      });
    }
    throw new Error(
      `ITextEditorService: Unable to create texteditor from ${JSON.stringify(e)}`
    );
  }
  createOrGetCached(e, t, i) {
    let r = this.editorInputCache.get(e);
    if (r)
      return i?.(r), r;
    r = t(), this.editorInputCache.set(e, r);
    const s = this.trackLeaks(r);
    return Q.once(r.onWillDispose)(() => {
      this.editorInputCache.delete(e), s && this.untrackLeaks(s);
    }), r;
  }
  static {
    this.LEAK_TRACKING_THRESHOLD = 256;
  }
  static {
    this.LEAK_REPORTING_THRESHOLD = 2 * this.LEAK_TRACKING_THRESHOLD;
  }
  static {
    this.LEAK_REPORTED = !1;
  }
  trackLeaks(e) {
    if (D.LEAK_REPORTED || this.editorInputCache.size < D.LEAK_TRACKING_THRESHOLD)
      return;
    const t = `${e.resource.scheme}#${e.typeId || "<no typeId>"}#${e.editorId || "<no editorId>"}
${new Error().stack?.split(`
`).slice(2).join(`
`) ?? ""}`, i = (this.mapLeakToCounter.get(t) ?? 0) + 1;
    if (this.mapLeakToCounter.set(t, i), this.editorInputCache.size > D.LEAK_REPORTING_THRESHOLD) {
      D.LEAK_REPORTED = !0;
      const [r, s] = Array.from(this.mapLeakToCounter.entries()).reduce(([o, a], [d, c]) => c > a ? [d, c] : [o, a]), n = `Potential text editor input LEAK detected, having ${this.editorInputCache.size} text editor inputs already. Most frequent owner (${s})`;
      $e(new at(n, r));
    }
    return t;
  }
  untrackLeaks(e) {
    const t = (this.mapLeakToCounter.get(e) ?? 1) - 1;
    this.mapLeakToCounter.set(e, t), t === 0 && this.mapLeakToCounter.delete(e);
  }
};
fe = D = L([
  h(0, Qe),
  h(1, Ce),
  h(2, Z),
  h(3, ye),
  h(4, Ae)
], fe);
let M = class extends k {
  static {
    this.ID = "workbench.contrib.editorAutoSave";
  }
  constructor(e, t, i, r, s, n, o, a) {
    super(), this.filesConfigurationService = e, this.hostService = t, this.editorService = i, this.editorGroupService = r, this.workingCopyService = s, this.logService = n, this.markerService = o, this.uriIdentityService = a, this.scheduledAutoSavesAfterDelay = /* @__PURE__ */ new Map(), this.lastActiveEditor = void 0, this.lastActiveGroupId = void 0, this.lastActiveEditorControlDisposable = this._register(new $()), this.waitingOnConditionAutoSaveWorkingCopies = new G((d) => this.uriIdentityService.extUri.getComparisonKey(d)), this.waitingOnConditionAutoSaveEditors = new G((d) => this.uriIdentityService.extUri.getComparisonKey(d));
    for (const d of this.workingCopyService.dirtyWorkingCopies)
      this.onDidRegister(d);
    this.registerListeners();
  }
  registerListeners() {
    this._register(this.hostService.onDidChangeFocus((e) => this.onWindowFocusChange(e))), this._register(this.hostService.onDidChangeActiveWindow(() => this.onActiveWindowChange())), this._register(this.editorService.onDidActiveEditorChange(() => this.onDidActiveEditorChange())), this._register(this.filesConfigurationService.onDidChangeAutoSaveConfiguration(() => this.onDidChangeAutoSaveConfiguration())), this._register(this.workingCopyService.onDidRegister((e) => this.onDidRegister(e))), this._register(this.workingCopyService.onDidUnregister((e) => this.onDidUnregister(e))), this._register(this.workingCopyService.onDidChangeDirty((e) => this.onDidChangeDirty(e))), this._register(this.workingCopyService.onDidChangeContent((e) => this.onDidChangeContent(e))), this._register(this.markerService.onMarkerChanged((e) => this.onConditionChanged(e, S.ERRORS))), this._register(this.filesConfigurationService.onDidChangeAutoSaveDisabled((e) => this.onConditionChanged([e], S.DISABLED)));
  }
  onConditionChanged(e, t) {
    for (const i of e) {
      const r = this.waitingOnConditionAutoSaveWorkingCopies.get(i);
      if (r?.condition === t)
        r.workingCopy.isDirty() && this.filesConfigurationService.getAutoSaveMode(r.workingCopy.resource, r.reason).mode !== f.OFF && (this.discardAutoSave(r.workingCopy), this.logService.trace("[editor auto save] running auto save from condition change event", r.workingCopy.resource.toString(), r.workingCopy.typeId), r.workingCopy.save({ reason: r.reason }));
      else {
        const s = this.waitingOnConditionAutoSaveEditors.get(i);
        s?.condition === t && !s.editor.editor.isDisposed() && s.editor.editor.isDirty() && this.filesConfigurationService.getAutoSaveMode(s.editor.editor, s.reason).mode !== f.OFF && (this.waitingOnConditionAutoSaveEditors.delete(i), this.logService.trace(`[editor auto save] running auto save from condition change event with reason ${s.reason}`), this.editorService.save(s.editor, { reason: s.reason }));
      }
    }
  }
  onWindowFocusChange(e) {
    e || this.maybeTriggerAutoSave(p.WINDOW_CHANGE);
  }
  onActiveWindowChange() {
    this.maybeTriggerAutoSave(p.WINDOW_CHANGE);
  }
  onDidActiveEditorChange() {
    this.lastActiveEditor && typeof this.lastActiveGroupId == "number" && this.maybeTriggerAutoSave(p.FOCUS_CHANGE, { groupId: this.lastActiveGroupId, editor: this.lastActiveEditor });
    const e = this.editorGroupService.activeGroup, t = this.lastActiveEditor = e.activeEditor ?? void 0;
    this.lastActiveGroupId = e.id, this.lastActiveEditorControlDisposable.clear();
    const i = this.editorService.activeEditorPane;
    t && i && this.lastActiveEditorControlDisposable.add(i.onDidBlur(() => {
      this.maybeTriggerAutoSave(p.FOCUS_CHANGE, { groupId: e.id, editor: t });
    }));
  }
  maybeTriggerAutoSave(e, t) {
    if (t) {
      if (!t.editor.isDirty() || t.editor.isReadonly() || t.editor.hasCapability(v.Untitled))
        return;
      const i = this.filesConfigurationService.getAutoSaveMode(t.editor, e);
      i.mode !== f.OFF ? (e === p.WINDOW_CHANGE && (i.mode === f.ON_FOCUS_CHANGE || i.mode === f.ON_WINDOW_CHANGE) || e === p.FOCUS_CHANGE && i.mode === f.ON_FOCUS_CHANGE) && (this.logService.trace(`[editor auto save] triggering auto save with reason ${e}`), this.editorService.save(t, { reason: e })) : t.editor.resource && (i.reason === S.ERRORS || i.reason === S.DISABLED) && this.waitingOnConditionAutoSaveEditors.set(t.editor.resource, { editor: t, reason: e, condition: i.reason });
    } else
      this.saveAllDirtyAutoSaveables(e);
  }
  onDidChangeAutoSaveConfiguration() {
    let e;
    switch (this.filesConfigurationService.getAutoSaveMode(void 0).mode) {
      case f.ON_FOCUS_CHANGE:
        e = p.FOCUS_CHANGE;
        break;
      case f.ON_WINDOW_CHANGE:
        e = p.WINDOW_CHANGE;
        break;
      case f.AFTER_SHORT_DELAY:
      case f.AFTER_LONG_DELAY:
        e = p.AUTO;
        break;
    }
    e && this.saveAllDirtyAutoSaveables(e);
  }
  saveAllDirtyAutoSaveables(e) {
    for (const t of this.workingCopyService.dirtyWorkingCopies) {
      if (t.capabilities & de.Untitled)
        continue;
      const i = this.filesConfigurationService.getAutoSaveMode(t.resource, e);
      i.mode !== f.OFF ? t.save({ reason: e }) : (i.reason === S.ERRORS || i.reason === S.DISABLED) && this.waitingOnConditionAutoSaveWorkingCopies.set(t.resource, { workingCopy: t, reason: e, condition: i.reason });
    }
  }
  onDidRegister(e) {
    e.isDirty() && this.scheduleAutoSave(e);
  }
  onDidUnregister(e) {
    this.discardAutoSave(e);
  }
  onDidChangeDirty(e) {
    e.isDirty() ? this.scheduleAutoSave(e) : this.discardAutoSave(e);
  }
  onDidChangeContent(e) {
    e.isDirty() && this.scheduleAutoSave(e);
  }
  scheduleAutoSave(e) {
    if (e.capabilities & de.Untitled)
      return;
    const t = this.filesConfigurationService.getAutoSaveConfiguration(e.resource).autoSaveDelay;
    if (typeof t != "number")
      return;
    this.discardAutoSave(e), this.logService.trace(`[editor auto save] scheduling auto save after ${t}ms`, e.resource.toString(), e.typeId);
    const i = setTimeout(() => {
      if (this.discardAutoSave(e), e.isDirty()) {
        const r = p.AUTO, s = this.filesConfigurationService.getAutoSaveMode(e.resource, r);
        s.mode !== f.OFF ? (this.logService.trace("[editor auto save] running auto save", e.resource.toString(), e.typeId), e.save({ reason: r })) : (s.reason === S.ERRORS || s.reason === S.DISABLED) && this.waitingOnConditionAutoSaveWorkingCopies.set(e.resource, { workingCopy: e, reason: r, condition: s.reason });
      }
    }, t);
    this.scheduledAutoSavesAfterDelay.set(e, Je(() => {
      this.logService.trace("[editor auto save] clearing pending auto save", e.resource.toString(), e.typeId), clearTimeout(i);
    }));
  }
  discardAutoSave(e) {
    m(this.scheduledAutoSavesAfterDelay.get(e)), this.scheduledAutoSavesAfterDelay.delete(e), this.waitingOnConditionAutoSaveWorkingCopies.delete(e.resource), this.waitingOnConditionAutoSaveEditors.delete(e.resource);
  }
};
M = L([
  h(0, Xe),
  h(1, Oe),
  h(2, je),
  h(3, w),
  h(4, Ze),
  h(5, et),
  h(6, tt),
  h(7, Z)
], M);
it(M.ID, M, rt.BlockRestore);
X.as(j.EditorFactory).registerFileEditorFactory({
  typeId: st,
  createFileEditor: (u, e, t, i, r, s, n, o) => o.createInstance(ce, u, e, t, i, r, s, n),
  isFileEditor: (u) => u instanceof ce
});
export {
  le as E,
  fe as T,
  ue as f
};
//# sourceMappingURL=files.contribution._fileEditorFactory-CeEFlypb.js.map
