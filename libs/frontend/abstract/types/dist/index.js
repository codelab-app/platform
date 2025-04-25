import o from "slugify";
var t = /* @__PURE__ */ ((e) => (e.Action = "Action", e.Admin = "Admin", e.App = "App", e.Atom = "Atom", e.AuthGuard = "AuthGuard", e.Builder = "Builder", e.Component = "Component", e.Domain = "Domain", e.Element = "Element", e.Field = "Field", e.Page = "Page", e.Pagination = "Pagination", e.Prop = "Prop", e.Redirect = "Redirect", e.Resource = "Resource", e.Tag = "Tag", e.Type = "Type", e.User = "User", e))(t || {}), a = /* @__PURE__ */ ((e) => (e.ActionFormCreate = "ActionFormCreate", e.ActionFormUpdate = "ActionFormUpdate", e.ActionModalCreate = "ActionModalCreate", e.ActionModalDelete = "ActionModalDelete", e.ActionModalUpdate = "ActionModalUpdate", e.ActionPopoverCreate = "ActionPopoverCreate", e.ActionPopoverUpdate = "ActionPopoverUpdate", e.ActionToolbarItemCreate = "ActionToolbarItemCreate", e.ActionToolbarItemCreateCancel = "ActionToolbarItemCreateCancel", e.ActionToolbarItemDelete = "ActionToolbarItemDelete", e.ActionToolbarItemUpdate = "ActionToolbarItemUpdate", e.ActionToolbarItemUpdateCancel = "ActionToolbarItemUpdateCancel", e.AdminDataModalExport = "AdminDataModalExport", e.AdminDataModalImport = "AdminDataModalImport", e.AppButtonOpenCreateForm = "AppButtonOpenCreateForm", e.AppFormCreate = "AppFormCreate", e.AppModalBuild = "AppModalBuild", e.AppModalCreate = "AppModalCreate", e.AppModalDelete = "AppModalDelete", e.AppModalUpdate = "AppModalUpdate", e.AppToolbarItemBuild = "AppToolbarItemBuild", e.AppToolbarItemCreate = "AppToolbarItemCreate", e.AppToolbarItemImport = "AppToolbarItemImport", e.AtomFormCreate = "AtomFormCreate", e.AtomFormUpdate = "AtomFormUpdate", e.AtomModalCreate = "AtomModalCreate", e.AtomModalDelete = "AtomModalDelete", e.AtomModalUpdate = "AtomModalUpdate", e.AtomPopoverCreate = "AtomPopoverCreate", e.AtomPopoverUpdate = "AtomPopoverUpdate", e.AtomSidebar = "AtomSidebar", e.AtomsModalDelete = "AtomsModalDelete", e.AtomsToolbarItemDelete = "AtomsToolbarItemDelete", e.AtomToolbarItemCreate = "AtomToolbarItemCreate", e.AtomToolbarItemCreateCancel = "AtomToolbarItemCreateCancel", e.AtomToolbarItemUpdate = "AtomToolbarItemUpdate", e.AtomToolbarItemUpdateCancel = "AtomToolbarItemUpdateCancel", e.AuthGuardFormCreate = "AuthGuardFormCreate", e.AuthGuardFormUpdate = "AuthGuardFormUpdate", e.AuthGuardModalCreate = "AuthGuardModalCreate", e.AuthGuardModalDelete = "AuthGuardModalDelete", e.AuthGuardModalUpdate = "AuthGuardModalUpdate", e.AuthGuardPopoverCreate = "AuthGuardPopoverCreate", e.AuthGuardPopoverUpdate = "AuthGuardPopoverUpdate", e.AuthGuardSidebar = "AuthGuardSidebar", e.AuthGuardToolbarItemCreate = "AuthGuardToolbarItemCreate", e.AuthGuardToolbarItemCreateCancel = "AuthGuardToolbarItemCreateCancel", e.AuthGuardToolbarItemDelete = "AuthGuardToolbarItemDelete", e.BuilderSidebar = "BuilderSidebar", e.BuilderToolbarItemOpenBuilder = "BuilderToolbarItemOpenBuilder", e.BuilderToolbarItemOpenPreview = "BuilderToolbarItemOpenPreview", e.ButtonConfirmation = "ButtonConfirmation", e.ComponentFormCreate = "ComponentFormCreate", e.ComponentFormUpdate = "ComponentFormUpdate", e.ComponentModalDelete = "ComponentModalDelete", e.ComponentModalUpdate = "ComponentModalUpdate", e.ComponentPopoverCreate = "ComponentPopoverCreate", e.ComponentSidebar = "ComponentSidebar", e.ComponentToolbarItemCreate = "ComponentToolbarItemCreate", e.ComponentToolbarItemCreateCancel = "ComponentToolbarItemCreateCancel", e.ComponentToolbarItemImport = "ComponentToolbarItemImport", e.DomainModalCreate = "DomainModalCreate", e.DomainModalDelete = "DomainModalDelete", e.DomainModalUpdate = "DomainModalUpdate", e.DomainToolbarItemCreate = "DomainToolbarItemCreate", e.ElementFormCreate = "ElementFormCreate", e.ElementFormMove = "ElementFormMove", e.ElementFormUpdate = "ElementFormUpdate", e.ElementModalDelete = "ElementModalDelete", e.ElementPopconfirmFormDelete = "ElementPopconfirmFormDelete", e.ElementPopconfirmOverlayDelete = "ElementPopconfirmOverlayDelete", e.ElementPopoverCreate = "ElementPopoverCreate", e.ElementToolbarItemCreate = "ElementToolbarItemCreate", e.ElementToolbarItemCreateCancel = "ElementToolbarItemCreateCancel", e.FieldFormCreate = "FieldFormCreate", e.FieldFormSelectDefaultValue = "FieldFormSelectDefaultValue", e.FieldFormSelectUnionTypeValue = "FieldFormSelectUnionTypeValue", e.FieldFormUpdate = "FieldFormUpdate", e.FieldModalCreate = "FieldModalCreate", e.FieldModalDelete = "FieldModalDelete", e.FieldModalUpdate = "FieldModalUpdate", e.FieldPopoverCreate = "FieldPopoverCreate", e.FieldPopoverUpdate = "FieldPopoverUpdate", e.FieldToolbarItemCreate = "FieldToolbarItemCreate", e.FieldToolbarItemCreateCancel = "FieldToolbarItemCreateCancel", e.FieldToolbarItemDelete = "FieldToolbarItemDelete", e.FieldToolbarItemUpdate = "FieldToolbarItemUpdate", e.FieldToolbarItemUpdateCancel = "FieldToolbarItemUpdateCancel", e.FormInterface = "FormInterface", e.LambdaToolbarItemCreate = "LambdaToolbarItemCreate", e.PageFormCreate = "PageFormCreate", e.PageFormUpdate = "PageFormUpdate", e.PageModalDelete = "PageModalDelete", e.PagePopoverCreate = "PagePopoverCreate", e.PagePopoverUpdate = "PagePopoverUpdate", e.PageSidebar = "PageSidebar", e.PageToolbarItemCreate = "PageToolbarItemCreate", e.PageToolbarItemCreateCancel = "PageToolbarItemCreateCancel", e.PageToolbarItemDelete = "PageToolbarItemDelete", e.PageToolbarItemUpdate = "PageToolbarItemUpdate", e.PageToolbarItemUpdateCancel = "PageToolbarItemUpdateCancel", e.PaginationControl = "PaginationControl", e.PaginationToolbarItemSearch = "PaginationToolbarItemSearch", e.ProgressBarGlobal = "ProgressBarGlobal", e.RedirectFormCreate = "RedirectFormCreate", e.RedirectFormUpdate = "RedirectFormUpdate", e.RedirectModalDelete = "RedirectModalDelete", e.RedirectPopconfirmDelete = "RedirectPopconfirmDelete", e.RedirectPopoverCreate = "RedirectPopoverCreate", e.RedirectPopoverUpdate = "RedirectPopoverUpdate", e.RedirectToolbarItemCreate = "RedirectToolbarItemCreate", e.RedirectToolbarItemCreateCancel = "RedirectToolbarItemCreateCancel", e.RedirectToolbarItemUpdate = "RedirectToolbarItemUpdate", e.RedirectToolbarItemUpdateCancel = "RedirectToolbarItemUpdateCancel", e.ResourceFormCreate = "ResourceFormCreate", e.ResourceFormUpdate = "ResourceFormUpdate", e.ResourceModalDelete = "ResourceModalDelete", e.ResourcePopoverCreate = "ResourcePopoverCreate", e.ResourcePopoverUpdate = "ResourcePopoverUpdate", e.ResourceSidebar = "ResourceSidebar", e.ResourceToolbarItemCreate = "ResourceToolbarItemCreate", e.ResourceToolbarItemCreateCancel = "ResourceToolbarItemCreateCancel", e.ResourceToolbarItemDelete = "ResourceToolbarItemDelete", e.ResourceToolbarItemUpdate = "ResourceToolbarItemUpdate", e.ResourceToolbarItemUpdateCancel = "ResourceToolbarItemUpdateCancel", e.TagFormCreate = "TagFormCreate", e.TagFormUpdate = "TagFormUpdate", e.TagModalDelete = "TagModalDelete", e.TagPopoverCreate = "TagPopoverCreate", e.TagPopoverUpdate = "TagPopoverUpdate", e.TagSidebar = "TagSidebar", e.TagToolabarItemCreateCancel = "TagToolabarItemCreateCancel", e.TagToolbarItemCreate = "TagToolbarItemCreate", e.TagToolbarItemCreateCancel = "TagToolbarItemCreateCancel", e.TagToolbarItemDelete = "TagToolbarItemDelete", e.TypeFormCreate = "TypeFormCreate", e.TypeFormUpdate = "TypeFormUpdate", e.TypeModalCreate = "TypeModalCreate", e.TypeModalDelete = "TypeModalDelete", e.TypeModalUpdate = "TypeModalUpdate", e.TypePopoverCreate = "TypePopoverCreate", e.TypePopoverUpdate = "TypePopoverUpdate", e.TypeSidebar = "TypeSidebar", e.TypeToolbarItemCreate = "TypeToolbarItemCreate", e.TypeToolbarItemCreateCancel = "TypeToolbarItemCreateCancel", e.TypeToolbarItemDelete = "TypeToolbarItemDelete", e.UserToolbarItemSignOut = "UserToolbarItemSignOut", e))(a || {});
const l = {
  /**
   * Action
   */
  [a.ActionFormCreate]: {
    label: "Create Action Form"
  },
  [a.ActionFormUpdate]: {
    label: "Update Action Form"
  },
  [a.ActionModalCreate]: {
    label: "Create Action Modal"
  },
  [a.ActionModalDelete]: {
    label: "Delete Action Modal"
  },
  [a.ActionModalUpdate]: {
    label: "Update Action Modal"
  },
  [a.ActionPopoverCreate]: {
    label: "Create Action"
  },
  [a.ActionPopoverUpdate]: {
    label: "Update Action"
  },
  [a.ActionToolbarItemCreate]: {
    label: "Create Action Toolbar Item"
  },
  [a.ActionToolbarItemCreateCancel]: {
    label: "Cancel Create Action Toolbar Item"
  },
  [a.ActionToolbarItemDelete]: {
    label: "Delete Action Toolbar Item"
  },
  [a.ActionToolbarItemUpdate]: {
    label: "Update Action Toolbar Item"
  },
  [a.ActionToolbarItemUpdateCancel]: {
    label: "Cancel Update Action Toolbar Item"
  },
  /**
   * Admin
   */
  [a.AdminDataModalExport]: {
    label: "Export Admin Data Modal"
  },
  [a.AdminDataModalImport]: {
    label: "Import Admin Data Modal"
  },
  /**
   * App
   */
  [a.AppButtonOpenCreateForm]: {
    label: "Open Create App Form Button"
  },
  [a.AppFormCreate]: {
    label: "Create App Form"
  },
  [a.AppModalBuild]: {
    label: "Build App Modal"
  },
  [a.AppModalCreate]: {
    label: "Create App"
  },
  [a.AppModalDelete]: {
    label: "Delete App Modal"
  },
  [a.AppModalUpdate]: {
    label: "Update App Modal"
  },
  [a.AppToolbarItemBuild]: {
    label: "Build App Toolbar Item"
  },
  [a.AppToolbarItemCreate]: {
    label: "Create App Toolbar Item"
  },
  [a.AppToolbarItemImport]: {
    label: "Import App Toolbar Item"
  },
  /**
   * Atom
   */
  [a.AtomFormCreate]: {
    label: "Create Atom Form"
  },
  [a.AtomFormUpdate]: {
    label: "Update Atom Form"
  },
  [a.AtomModalCreate]: {
    label: "Create Atom Modal"
  },
  [a.AtomModalDelete]: {
    label: "Delete Atom Modal"
  },
  [a.AtomModalUpdate]: {
    label: "Update Atom Modal"
  },
  // Atom
  [a.AtomPopoverCreate]: {
    label: "New Atom"
  },
  [a.AtomPopoverUpdate]: {
    label: "Update"
  },
  [a.AtomSidebar]: {
    label: "Atom Sidebar"
  },
  [a.AtomsModalDelete]: {
    label: "Delete Atoms Modal"
  },
  [a.AtomsToolbarItemDelete]: {
    label: "Delete Atoms Toolbar Item"
  },
  [a.AtomToolbarItemCreate]: {
    label: "Create Atom Toolbar Item"
  },
  [a.AtomToolbarItemCreateCancel]: {
    label: "Cancel Create Atom Toolbar Item"
  },
  [a.AtomToolbarItemUpdate]: {
    label: "Update Atom Toolbar Item"
  },
  [a.AtomToolbarItemUpdateCancel]: {
    label: "Cancel"
  },
  /**
   * AuthGuard
   */
  [a.AuthGuardFormCreate]: {
    label: "Create Auth Guard Form"
  },
  [a.AuthGuardFormUpdate]: {
    label: "Update Auth Guard Form"
  },
  [a.AuthGuardModalCreate]: {
    label: "Create Auth Guard Modal"
  },
  [a.AuthGuardModalDelete]: {
    label: "Delete Auth Guard Modal"
  },
  [a.AuthGuardModalUpdate]: {
    label: "Update Auth Guard Modal"
  },
  [a.AuthGuardPopoverCreate]: {
    label: "Auth Guard"
  },
  [a.AuthGuardPopoverUpdate]: {
    label: "Update Auth Guard"
  },
  [a.AuthGuardSidebar]: {
    label: "Auth Guard Sidebar"
  },
  [a.AuthGuardToolbarItemCreate]: {
    label: "Create Auth Guard Toolbar Item"
  },
  [a.AuthGuardToolbarItemCreateCancel]: {
    label: "Cancel Create Auth Guard Toolbar Item"
  },
  [a.AuthGuardToolbarItemDelete]: {
    label: "Delete Auth Guard Toolbar Item"
  },
  /**
   * Builder
   */
  [a.BuilderSidebar]: {
    label: "Builder Sidebar"
  },
  [a.BuilderToolbarItemOpenBuilder]: {
    label: "Open Builder Builder Toolbar Item"
  },
  [a.BuilderToolbarItemOpenPreview]: {
    label: "Open Preview Builder Toolbar Item"
  },
  /**
   * Button
   */
  [a.ButtonConfirmation]: {
    label: "Confirmation Button"
  },
  /**
   * Component
   */
  [a.ComponentFormCreate]: {
    label: "Create Component Form"
  },
  [a.ComponentFormUpdate]: {
    label: "Update Component Form"
  },
  [a.ComponentModalDelete]: {
    label: "Delete Component Modal"
  },
  [a.ComponentModalUpdate]: {
    label: "Update Component Modal"
  },
  [a.ComponentPopoverCreate]: {
    label: "Component"
  },
  [a.ComponentSidebar]: {
    label: "Component Sidebar"
  },
  [a.ComponentToolbarItemCreate]: {
    label: "Create Component Toolbar Item"
  },
  [a.ComponentToolbarItemCreateCancel]: {
    label: "Cancel Create Component Toolbar Item"
  },
  [a.ComponentToolbarItemImport]: {
    label: "Import Component Toolbar Item"
  },
  /**
   * Domain
   */
  [a.DomainModalCreate]: {
    label: "Create Domain Modal"
  },
  [a.DomainModalDelete]: {
    label: "Delete Domain Modal"
  },
  [a.DomainModalUpdate]: {
    label: "Update Domain Modal"
  },
  [a.DomainToolbarItemCreate]: {
    label: "Create Domain Toolbar Item"
  },
  /**
   * Element
   */
  [a.ElementFormCreate]: {
    label: "Create Element Form"
  },
  [a.ElementPopconfirmFormDelete]: {
    label: "Delete Element Popconfirm Form"
  },
  [a.ElementPopconfirmOverlayDelete]: {
    label: "Delete Element Popconfirm Overlay"
  },
  [a.ElementFormMove]: {
    label: "Move Element Form"
  },
  [a.ElementFormUpdate]: {
    label: "Update Element Form"
  },
  [a.ElementModalDelete]: {
    label: "Delete Element Modal"
  },
  [a.ElementPopoverCreate]: {
    label: "Create Element"
  },
  [a.ElementToolbarItemCreate]: {
    label: "Create Element Toolbar Item"
  },
  [a.ElementToolbarItemCreateCancel]: {
    label: "Cancel Create Element Toolbar Item"
  },
  /**
   * Field
   */
  [a.FieldFormCreate]: {
    label: "Create Field Form"
  },
  [a.FieldFormSelectDefaultValue]: {
    label: "Select Default Value Field Form"
  },
  [a.FieldFormSelectUnionTypeValue]: {
    label: "Select Union Type Value Field Form"
  },
  [a.FieldFormUpdate]: {
    label: "Update Field Form"
  },
  [a.FieldModalCreate]: {
    label: "Create Field Modal"
  },
  [a.FieldModalDelete]: {
    label: "Delete Field Modal"
  },
  [a.FieldModalUpdate]: {
    label: "Update Field Modal"
  },
  [a.FieldPopoverCreate]: {
    label: "Create Field"
  },
  [a.FieldPopoverUpdate]: {
    label: "Update Field"
  },
  [a.FieldToolbarItemCreate]: {
    label: "Create Field Toolbar Item"
  },
  [a.FieldToolbarItemCreateCancel]: {
    label: "Cancel Create Field Toolbar Item"
  },
  [a.FieldToolbarItemDelete]: {
    label: "Delete Field Toolbar Item"
  },
  [a.FieldToolbarItemUpdate]: {
    label: "Update Field Toolbar Item"
  },
  [a.FieldToolbarItemUpdateCancel]: {
    label: "Cancel Update Field Toolbar Item"
  },
  [a.FormInterface]: {
    label: "Interface Form"
  },
  /**
   * Lambda
   */
  [a.LambdaToolbarItemCreate]: {
    label: "Create Lambda Toolbar Item"
  },
  /**
   * Page
   */
  [a.PageFormCreate]: {
    label: "Create Page Form"
  },
  [a.PageFormUpdate]: {
    label: "Update Page Form"
  },
  [a.PageModalDelete]: {
    label: "Delete Page Modal"
  },
  [a.PagePopoverCreate]: {
    label: "Create Page"
  },
  [a.PagePopoverUpdate]: {
    label: "Update Page"
  },
  [a.PageSidebar]: {
    label: "Page Sidebar"
  },
  [a.PageToolbarItemCreate]: {
    label: "Create Page Toolbar Item"
  },
  [a.PageToolbarItemCreateCancel]: {
    label: "Cancel Create Page Toolbar Item"
  },
  [a.PageToolbarItemDelete]: {
    label: "Delete Page Toolbar Item"
  },
  [a.PageToolbarItemUpdate]: {
    label: "Update Page Toolbar Item"
  },
  [a.PageToolbarItemUpdateCancel]: {
    label: "Cancel Update Page Toolbar Item"
  },
  /**
   * Pagination
   */
  [a.PaginationToolbarItemSearch]: {
    label: "Search Pagination Toolbar Item"
  },
  [a.PaginationControl]: {
    label: "Pagination Control Toolbar Item"
  },
  /**
   * ProgressBar
   */
  [a.ProgressBarGlobal]: {
    label: "Global Progress Bar"
  },
  /**
   * Redirect
   */
  [a.RedirectFormCreate]: {
    label: "Create Redirect Form"
  },
  [a.RedirectFormUpdate]: {
    label: "Update Redirect Form"
  },
  [a.RedirectModalDelete]: {
    label: "Delete Redirect Modal"
  },
  [a.RedirectPopoverCreate]: {
    label: "Create Redirect"
  },
  [a.RedirectPopconfirmDelete]: {
    label: "Delete Redirect Popconfirm"
  },
  [a.RedirectPopoverUpdate]: {
    label: "Update Redirect"
  },
  [a.RedirectToolbarItemCreate]: {
    label: "Create Redirect Toolbar Item"
  },
  [a.RedirectToolbarItemCreateCancel]: {
    label: "Cancel Create Redirect Toolbar Item"
  },
  [a.RedirectToolbarItemUpdate]: {
    label: "Update Redirect Toolbar Item"
  },
  [a.RedirectToolbarItemUpdateCancel]: {
    label: "Cancel Update Redirect Toolbar Item"
  },
  /**
   * Resource
   */
  [a.ResourceFormCreate]: {
    label: "Create Resource Form"
  },
  [a.ResourceFormUpdate]: {
    label: "Update Resource Form"
  },
  [a.ResourceModalDelete]: {
    label: "Delete Resource Modal"
  },
  [a.ResourcePopoverCreate]: {
    label: "Resource"
  },
  [a.ResourcePopoverUpdate]: {
    label: "Resource"
  },
  [a.ResourceSidebar]: {
    label: "Resource Sidebar"
  },
  [a.ResourceToolbarItemCreate]: {
    label: "Create Resource Toolbar Item"
  },
  [a.ResourceToolbarItemCreateCancel]: {
    label: "Cancel Create Resource Toolbar Item"
  },
  [a.ResourceToolbarItemDelete]: {
    label: "Delete Resource Toolbar Item"
  },
  [a.ResourceToolbarItemUpdate]: {
    label: "Update Resource Toolbar Item"
  },
  [a.ResourceToolbarItemUpdateCancel]: {
    label: "Cancel Update Resource Toolbar Item"
  },
  /**
   * Tag
   */
  [a.TagFormCreate]: {
    label: "Create Tag Form"
  },
  [a.TagFormUpdate]: {
    label: "Update Tag Form"
  },
  [a.TagModalDelete]: {
    label: "Delete Tag"
  },
  [a.TagPopoverCreate]: {
    label: "Create Tag"
  },
  [a.TagPopoverUpdate]: {
    label: "Update Tag"
  },
  [a.TagSidebar]: {
    label: "Tag Sidebar"
  },
  [a.TagToolabarItemCreateCancel]: {
    label: "Cancel Create Tag Toolbar Item"
  },
  [a.TagToolbarItemCreate]: {
    label: "Create Tag Toolbar Item"
  },
  [a.TagToolbarItemCreateCancel]: {
    label: "Cancel Create Tag Toolbar Item"
  },
  [a.TagToolbarItemDelete]: {
    label: "Delete Tag Toolbar Item"
  },
  /**
   * Type
   */
  [a.TypeFormCreate]: {
    label: "Create Type Form"
  },
  [a.TypeFormUpdate]: {
    label: "Update Type Form"
  },
  [a.TypeModalCreate]: {
    label: "Create Type Modal"
  },
  [a.TypeModalDelete]: {
    label: "Delete Type Modal"
  },
  [a.TypeModalUpdate]: {
    label: "Update Type Modal"
  },
  [a.TypePopoverCreate]: {
    label: "Create Type"
  },
  [a.TypePopoverUpdate]: {
    label: "Update Type"
  },
  [a.TypeSidebar]: {
    label: "Type Sidebar"
  },
  [a.TypeToolbarItemCreate]: {
    label: "Create Type Toolbar Item"
  },
  [a.TypeToolbarItemCreateCancel]: {
    label: "Cancel Create Type Toolbar Item"
  },
  [a.TypeToolbarItemDelete]: {
    label: "Delete Type Toolbar Item"
  },
  /**
   * User
   */
  [a.UserToolbarItemSignOut]: {
    label: "Sign Out User Toolbar Item"
  }
}, r = (e) => l[e].label, p = (e) => m(r(e)), m = (e) => o(e, {
  lower: !0,
  // remove: /[*+~.()%'"!:@$^]/g,
  strict: !0
});
var d = /* @__PURE__ */ ((e) => (e[e.xs = 0] = "xs", e[e.sm = 576] = "sm", e[e.md = 768] = "md", e[e.lg = 992] = "lg", e[e.xl = 1200] = "xl", e[e["2xl"] = 1600] = "2xl", e))(d || {});
export {
  d as BreakpointSize,
  t as EntityType,
  a as UiKey,
  p as getUiDataKey,
  r as getUiDataLabel
};
