import { u as G, v as q, w as z, x as U, y as L, z as ee, _ as te, b as ie, A as oe, B as re, G as ne, J as ae, L as se, M as le, O as de, P as ue, Q as ce, R as fe, U as pe, W as ge, X as Pe, Y as we, Z as p, a0 as O, a1 as V, a2 as g, a3 as ve, a4 as u, a5 as M, a6 as T, a7 as ye, a8 as K, a9 as x, aa as b, ab as Re, ac as me, ad as Se, ae as he } from "./index-8dqW3L9v.js";
import { al as Ue, am as Ne, af as He, aj as Fe, ap as Ye, an as Xe, ah as $e, ag as je, ak as Je, ao as Qe, ai as Ze } from "./index-8dqW3L9v.js";
import { g as Te, E as Ae, S as Ce, P as Ee, A as be } from "./views-DVZIaAI-.js";
import { a as ze } from "./views-DVZIaAI-.js";
import { M as Ie, a as Be } from "./editor-DklStVNa.js";
function Oe(t, r, d) {
  const P = document.createElement(r === "status" ? "footer" : "div");
  return P.classList.add("part", "monaco-workbench-part", ...d), P.id = t, P.setAttribute("role", r), r === "status" && P.setAttribute("aria-live", "off"), P;
}
function Ve(t) {
  const r = t.getContainer()?.parentNode;
  r != null && t.layout(Math.max(t.minimumWidth, Math.min(t.maximumWidth, r.offsetWidth)), Math.max(t.minimumHeight, Math.min(t.maximumHeight, r.offsetHeight)), r.offsetTop, r.offsetLeft);
}
function xe(t, r) {
  t.oncontextmenu = () => !1;
  function d() {
    Ve(r);
  }
  r.onDidVisibilityChange((P) => {
    P && d();
  }), d();
}
function De(t) {
  return t.isConnected ? t.checkVisibility != null ? t.checkVisibility({
    checkOpacity: !0,
    checkVisibilityCSS: !0
  }) : t.offsetHeight > 0 && t.offsetWidth > 0 : !1;
}
function I() {
  const t = ee.get(L).mainPart.getContainer();
  return t != null && De(t);
}
let D = class extends Be {
  constructor(r) {
    super(r.createInstance(Ae), !1, r), this.restoreGroup = (...d) => this.delegate.restoreGroup(...d);
  }
  getId() {
    return "standalone";
  }
  updateStyles() {
  }
  registerPart(r) {
    return this.delegate.registerPart(r);
  }
  bind(r, d) {
    return this.delegate.bind(r, d);
  }
  get activePart() {
    return this.delegate.activePart;
  }
};
D = te([
  ie(0, oe)
], D);
let N = (t) => t;
re(async (t) => {
  const r = t.get(ne), d = t.get(ae), P = t.get(se), R = t.get(le), m = t.get(L), H = t.get(U), S = t.get(de), F = t.get(ue), A = t.get(ce), k = t.get(fe), W = t.get(pe), Y = t.get(ge), X = t.get(Pe), c = t.get(we);
  function $() {
    const e = A.options?.defaultLayout;
    if ((e?.editors != null && e.editors.length > 0 || e?.layout?.editors != null) && ((e.force ?? !1) || R.isNew(T.WORKSPACE)))
      return {
        layout: e.layout?.editors,
        filesToOpenOrCreate: e.editors?.map((i) => ({
          viewColumn: i.viewColumn,
          fileUri: ye.revive(i.uri),
          openOnlyIfExists: i.openOnlyIfExists,
          options: i.options
        }))
      };
    const { filesToOpenOrCreate: l, filesToDiff: o, filesToMerge: s } = A;
    if (l != null || o != null || s != null)
      return { filesToOpenOrCreate: l, filesToDiff: o, filesToMerge: s };
  }
  function j(e, l) {
    const o = e.options?.defaultLayout;
    if (o == null || !(o.force ?? !1) && !l.isNew(T.WORKSPACE))
      return;
    const { views: s } = o;
    if (s != null && s.length > 0)
      return s.map((i) => i.id);
  }
  function J(e, l) {
    return me(e.getWorkspace()) ? !1 : !!(W.getValue("window.restoreWindows") === "preserve") || l === void 0;
  }
  async function Q(e, l) {
    if (l != null) {
      const o = K(await x(l.filesToMerge, e, S));
      if (o.length === 4 && b(o[0]) && b(o[1]) && b(o[2]) && b(o[3]))
        return [
          {
            editor: {
              input1: { resource: o[0].resource },
              input2: { resource: o[1].resource },
              base: { resource: o[2].resource },
              result: { resource: o[3].resource },
              options: { pinned: !0 }
            }
          }
        ];
      const s = K(await x(l.filesToDiff, e, S));
      if (s.length === 2)
        return [
          {
            editor: {
              original: { resource: s[0].resource },
              modified: { resource: s[1].resource },
              options: { pinned: !0 }
            }
          }
        ];
      const i = [], f = await x(l.filesToOpenOrCreate, e, S);
      for (let a = 0; a < f.length; a++) {
        const w = f[a];
        w != null && i.push({
          editor: w,
          viewColumn: l.filesToOpenOrCreate?.[a].viewColumn
        });
      }
      return i;
    } else if (k.getWorkbenchState() === Re.EMPTY && W.getValue("workbench.startupEditor") === "newUntitledFile")
      return m.mainPart.hasRestorableState ? [] : await X.hasBackups() ? [] : [
        {
          editor: { resource: void 0 }
        }
      ];
    return [];
  }
  const h = $();
  h != null && S.info("Initial editor state", h);
  let n = {
    layout: {
      editors: h?.layout
    },
    editor: {
      restoreEditors: J(k, h),
      editorsToOpen: Q(Y, h)
    },
    views: {
      defaults: j(A, R),
      containerToRestore: {}
    }
  };
  function v(e) {
    return d.getDefaultViewContainer(e) ?? d.getViewContainersByLocation(e)[0];
  }
  function Z() {
    if (c.isVisible(p.SIDEBAR_PART)) {
      let e;
      !A.isBuilt || P.startupKind === Se.ReloadedWindow || he ? e = R.get(Ce.activeViewletSettingsKey, T.WORKSPACE, v(u.Sidebar)?.id) : e = v(u.Sidebar)?.id, n.views.containerToRestore.sideBar = e;
    }
    if (c.isVisible(p.PANEL_PART)) {
      const e = R.get(Ee.activePanelSettingsKey, T.WORKSPACE, v(u.Panel)?.id);
      n.views.containerToRestore.panel = e;
    }
    if (c.isVisible(p.AUXILIARYBAR_PART)) {
      const e = R.get(be.activeViewSettingsKey, T.WORKSPACE, v(u.AuxiliaryBar)?.id);
      n.views.containerToRestore.auxiliaryBar = e;
    }
  }
  Z(), n = N(n), n.views.containerToRestore.sideBar == null && c.setPartHidden(!0, p.SIDEBAR_PART), n.views.containerToRestore.panel == null && c.setPartHidden(!0, p.PANEL_PART), n.views.containerToRestore.auxiliaryBar == null && c.setPartHidden(!0, p.AUXILIARYBAR_PART);
  const B = document.createElement("div");
  B.style.display = "none", document.body.append(B);
  for (const { id: e, role: l, classes: o, options: s, getPosition: i, onDidChangePosition: f } of [
    { id: p.TITLEBAR_PART, role: "none", classes: ["titlebar"] },
    { id: p.BANNER_PART, role: "banner", classes: ["banner"] },
    {
      id: p.ACTIVITYBAR_PART,
      role: "none",
      classes: ["activitybar"],
      getPosition: () => c.getSideBarPosition(),
      onDidChangePosition: c.onDidChangeSideBarPosition
    },
    {
      id: p.SIDEBAR_PART,
      role: "none",
      classes: ["sidebar"],
      getPosition: () => c.getSideBarPosition(),
      onDidChangePosition: c.onDidChangeSideBarPosition
    },
    {
      id: p.EDITOR_PART,
      role: "main",
      classes: ["editor"],
      options: { restorePreviousState: n.editor.restoreEditors }
    },
    {
      id: p.PANEL_PART,
      role: "none",
      classes: ["panel", "basepanel"],
      getPosition: () => c.getPanelPosition(),
      onDidChangePosition: c.onDidChangePanelPosition
    },
    {
      id: p.AUXILIARYBAR_PART,
      role: "none",
      classes: ["auxiliarybar", "basepanel"],
      getPosition: () => c.getSideBarPosition() === O.LEFT ? O.RIGHT : O.LEFT,
      onDidChangePosition: c.onDidChangeSideBarPosition
    },
    { id: p.STATUSBAR_PART, role: "status", classes: ["statusbar"] }
  ]) {
    const a = c.getPart(e);
    if (a != null) {
      const w = Oe(e, l, o);
      if (a.create(w, s), xe(w, a), a.layout(9999, 9999, 0, 0), B.append(w), i != null) {
        let E = i();
        a.element.classList.add(V(E)), f?.(() => {
          a.element.classList.remove(V(E)), E = i(), a.element.classList.add(V(E));
        });
      }
    }
  }
  const y = [], _ = [];
  y.push((async () => {
    g("code/willRestoreEditors"), await m.mainPart.whenReady, g("code/restoreEditors/editorGroupsReady"), n.layout?.editors != null && m.applyLayout(n.layout.editors);
    const e = await n.editor.editorsToOpen;
    g("code/restoreEditors/editorsToOpenResolved");
    let l;
    if (e.length > 0) {
      const o = m.getGroups(ve.GRID_APPEARANCE), s = /* @__PURE__ */ new Map();
      for (const i of e) {
        const f = o[(i.viewColumn ?? 1) - 1];
        let a = s.get(f.id);
        a == null && (a = /* @__PURE__ */ new Set(), s.set(f.id, a)), a.add(i.editor);
      }
      l = Promise.all(Array.from(s).map(async ([i, f]) => {
        try {
          await H.openEditors(Array.from(f), i, { validateTrust: !0 });
        } catch (a) {
          S.error(a);
        }
      }));
    }
    _.push(Promise.all([
      l?.finally(() => g("code/restoreEditors/editorsOpened")),
      m.mainPart.whenRestored.finally(() => g("code/restoreEditors/editorGroupsRestored"))
    ]).finally(() => {
      g("code/didRestoreEditors");
    }));
  })());
  const C = (async () => {
    if (n.views.defaults != null && n.views.defaults.length > 0) {
      g("code/willOpenDefaultViews");
      const e = [], l = (i) => {
        const f = d.getViewLocationById(i.id);
        if (f !== null) {
          const a = d.getViewContainerByViewId(i.id);
          if (a != null) {
            i.order >= (e[f]?.order ?? 0) && (e[f] = { id: a.id, order: i.order });
            const w = d.getViewContainerModel(a);
            return w.setCollapsed(i.id, !1), w.setVisible(i.id, !0), !0;
          }
        }
        return !1;
      }, o = [...n.views.defaults].reverse().map((i, f) => ({ id: i, order: f }));
      let s = o.length;
      for (; s > 0; )
        s--, l(o[s]) && o.splice(s, 1);
      if (o.length > 0) {
        await F.whenInstalledExtensionsRegistered();
        let i = o.length;
        for (; i > 0; )
          i--, l(o[i]) && o.splice(i, 1);
      }
      e[u.Sidebar] != null && (n.views.containerToRestore.sideBar = e[u.Sidebar].id), e[u.Panel] != null && (n.views.containerToRestore.panel = e[u.Panel].id), e[u.AuxiliaryBar] != null && (n.views.containerToRestore.auxiliaryBar = e[u.AuxiliaryBar].id), g("code/didOpenDefaultViews");
    }
  })();
  y.push(C), y.push((async () => {
    if (await C, n.views.containerToRestore.sideBar == null)
      return;
    g("code/willRestoreViewlet"), await r.openPaneComposite(n.views.containerToRestore.sideBar, u.Sidebar) == null && await r.openPaneComposite(v(u.Sidebar)?.id, u.Sidebar), g("code/didRestoreViewlet");
  })()), y.push((async () => {
    if (await C, n.views.containerToRestore.panel == null)
      return;
    g("code/willRestorePanel"), await r.openPaneComposite(n.views.containerToRestore.panel, u.Panel) == null && await r.openPaneComposite(v(u.Panel)?.id, u.Panel), g("code/didRestorePanel");
  })()), y.push((async () => {
    if (await C, n.views.containerToRestore.auxiliaryBar == null)
      return;
    g("code/willRestoreAuxiliaryBar"), await r.openPaneComposite(n.views.containerToRestore.auxiliaryBar, u.AuxiliaryBar) == null && await r.openPaneComposite(v(u.AuxiliaryBar)?.id, u.AuxiliaryBar), g("code/didRestoreAuxiliaryBar");
  })()), await M.settled(y), await M.settled(_);
});
function Ge(t, r, d) {
  return d != null && (N = typeof d == "boolean" ? (P) => ({
    ...P,
    editor: {
      ...P.editor,
      restoreEditors: d
    }
  }) : d), {
    ...Te(r),
    ...z({
      isKeybindingConfigurationVisible: I,
      shouldUseGlobalPicker: I
    }),
    ...q({
      shouldUseGlobalKeybindings: I
    }),
    [L.toString()]: new G(D, [], !1),
    [U.toString()]: new G(Ie, [t, I], !1)
  };
}
export {
  Ue as AbstractResourceEditorInput,
  Ne as AbstractTextResourceEditorInput,
  ze as ActivityService,
  He as ActivitybarPart,
  Fe as ConfirmResult,
  Ye as DomScrollableElement,
  Xe as EditorInput,
  $e as EditorInputCapabilities,
  je as GroupOrientation,
  Ee as PanelPart,
  p as Parts,
  O as Position,
  Je as RegisteredEditorPriority,
  Ce as SidebarPart,
  Qe as SplitView,
  u as ViewContainerLocation,
  Ze as ViewPaneContainer,
  Ge as default,
  I as isEditorPartVisible,
  xe as renderPart
};
//# sourceMappingURL=index--plBD-a7.js.map
