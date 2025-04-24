var A = /* @__PURE__ */ ((e) => (e.Action = "Action", e.Admin = "Admin", e.App = "App", e.Atom = "Atom", e.AuthGuard = "AuthGuard", e.Builder = "Builder", e.Component = "Component", e.Domain = "Domain", e.Element = "Element", e.Field = "Field", e.Page = "Page", e.Pagination = "Pagination", e.Prop = "Prop", e.Redirect = "Redirect", e.Resource = "Resource", e.Tag = "Tag", e.Type = "Type", e.User = "User", e))(A || {});
function i(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var d = { exports: {} }, F = d.exports, c;
function s() {
  return c || (c = 1, function(e, R) {
    (function(p, b, r) {
      e.exports = r(), e.exports.default = r();
    })("slugify", F, function() {
      var p = JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`), b = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');
      function r(m, o) {
        if (typeof m != "string")
          throw new Error("slugify: string argument expected");
        o = typeof o == "string" ? { replacement: o } : o || {};
        var T = b[o.locale] || {}, C = o.replacement === void 0 ? "-" : o.replacement, u = o.trim === void 0 ? !0 : o.trim, t = m.normalize().split("").reduce(function(I, n) {
          var l = T[n];
          return l === void 0 && (l = p[n]), l === void 0 && (l = n), l === C && (l = " "), I + l.replace(o.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "");
        }, "");
        return o.strict && (t = t.replace(/[^A-Za-z0-9\s]/g, "")), u && (t = t.trim()), t = t.replace(/\s+/g, C), o.lower && (t = t.toLowerCase()), t;
      }
      return r.extend = function(m) {
        Object.assign(p, m);
      }, r;
    });
  }(d)), d.exports;
}
var g = s();
const D = /* @__PURE__ */ i(g);
var a = /* @__PURE__ */ ((e) => (e.ActionFormCreate = "ActionFormCreate", e.ActionFormUpdate = "ActionFormUpdate", e.ActionModalCreate = "ActionModalCreate", e.ActionModalDelete = "ActionModalDelete", e.ActionModalUpdate = "ActionModalUpdate", e.ActionPopoverCreate = "ActionPopoverCreate", e.ActionPopoverUpdate = "ActionPopoverUpdate", e.ActionToolbarItemCreate = "ActionToolbarItemCreate", e.ActionToolbarItemCreateCancel = "ActionToolbarItemCreateCancel", e.ActionToolbarItemDelete = "ActionToolbarItemDelete", e.ActionToolbarItemUpdate = "ActionToolbarItemUpdate", e.ActionToolbarItemUpdateCancel = "ActionToolbarItemUpdateCancel", e.AdminDataModalExport = "AdminDataModalExport", e.AdminDataModalImport = "AdminDataModalImport", e.AppButtonOpenCreateForm = "AppButtonOpenCreateForm", e.AppFormCreate = "AppFormCreate", e.AppModalBuild = "AppModalBuild", e.AppModalCreate = "AppModalCreate", e.AppModalDelete = "AppModalDelete", e.AppModalUpdate = "AppModalUpdate", e.AppToolbarItemBuild = "AppToolbarItemBuild", e.AppToolbarItemCreate = "AppToolbarItemCreate", e.AppToolbarItemImport = "AppToolbarItemImport", e.AtomFormCreate = "AtomFormCreate", e.AtomFormUpdate = "AtomFormUpdate", e.AtomModalCreate = "AtomModalCreate", e.AtomModalDelete = "AtomModalDelete", e.AtomModalUpdate = "AtomModalUpdate", e.AtomPopoverCreate = "AtomPopoverCreate", e.AtomPopoverUpdate = "AtomPopoverUpdate", e.AtomSidebar = "AtomSidebar", e.AtomsModalDelete = "AtomsModalDelete", e.AtomsToolbarItemDelete = "AtomsToolbarItemDelete", e.AtomToolbarItemCreate = "AtomToolbarItemCreate", e.AtomToolbarItemCreateCancel = "AtomToolbarItemCreateCancel", e.AtomToolbarItemUpdate = "AtomToolbarItemUpdate", e.AtomToolbarItemUpdateCancel = "AtomToolbarItemUpdateCancel", e.AuthGuardFormCreate = "AuthGuardFormCreate", e.AuthGuardFormUpdate = "AuthGuardFormUpdate", e.AuthGuardModalCreate = "AuthGuardModalCreate", e.AuthGuardModalDelete = "AuthGuardModalDelete", e.AuthGuardModalUpdate = "AuthGuardModalUpdate", e.AuthGuardPopoverCreate = "AuthGuardPopoverCreate", e.AuthGuardPopoverUpdate = "AuthGuardPopoverUpdate", e.AuthGuardSidebar = "AuthGuardSidebar", e.AuthGuardToolbarItemCreate = "AuthGuardToolbarItemCreate", e.AuthGuardToolbarItemCreateCancel = "AuthGuardToolbarItemCreateCancel", e.AuthGuardToolbarItemDelete = "AuthGuardToolbarItemDelete", e.BuilderSidebar = "BuilderSidebar", e.BuilderToolbarItemOpenBuilder = "BuilderToolbarItemOpenBuilder", e.BuilderToolbarItemOpenPreview = "BuilderToolbarItemOpenPreview", e.ButtonConfirmation = "ButtonConfirmation", e.ComponentFormCreate = "ComponentFormCreate", e.ComponentFormUpdate = "ComponentFormUpdate", e.ComponentModalDelete = "ComponentModalDelete", e.ComponentModalUpdate = "ComponentModalUpdate", e.ComponentPopoverCreate = "ComponentPopoverCreate", e.ComponentSidebar = "ComponentSidebar", e.ComponentToolbarItemCreate = "ComponentToolbarItemCreate", e.ComponentToolbarItemCreateCancel = "ComponentToolbarItemCreateCancel", e.ComponentToolbarItemImport = "ComponentToolbarItemImport", e.DomainModalCreate = "DomainModalCreate", e.DomainModalDelete = "DomainModalDelete", e.DomainModalUpdate = "DomainModalUpdate", e.DomainToolbarItemCreate = "DomainToolbarItemCreate", e.ElementFormCreate = "ElementFormCreate", e.ElementFormMove = "ElementFormMove", e.ElementFormUpdate = "ElementFormUpdate", e.ElementModalDelete = "ElementModalDelete", e.ElementPopconfirmFormDelete = "ElementPopconfirmFormDelete", e.ElementPopconfirmOverlayDelete = "ElementPopconfirmOverlayDelete", e.ElementPopoverCreate = "ElementPopoverCreate", e.ElementToolbarItemCreate = "ElementToolbarItemCreate", e.ElementToolbarItemCreateCancel = "ElementToolbarItemCreateCancel", e.FieldFormCreate = "FieldFormCreate", e.FieldFormSelectDefaultValue = "FieldFormSelectDefaultValue", e.FieldFormSelectUnionTypeValue = "FieldFormSelectUnionTypeValue", e.FieldFormUpdate = "FieldFormUpdate", e.FieldModalCreate = "FieldModalCreate", e.FieldModalDelete = "FieldModalDelete", e.FieldModalUpdate = "FieldModalUpdate", e.FieldPopoverCreate = "FieldPopoverCreate", e.FieldPopoverUpdate = "FieldPopoverUpdate", e.FieldToolbarItemCreate = "FieldToolbarItemCreate", e.FieldToolbarItemCreateCancel = "FieldToolbarItemCreateCancel", e.FieldToolbarItemDelete = "FieldToolbarItemDelete", e.FieldToolbarItemUpdate = "FieldToolbarItemUpdate", e.FieldToolbarItemUpdateCancel = "FieldToolbarItemUpdateCancel", e.FormInterface = "FormInterface", e.LambdaToolbarItemCreate = "LambdaToolbarItemCreate", e.PageFormCreate = "PageFormCreate", e.PageFormUpdate = "PageFormUpdate", e.PageModalDelete = "PageModalDelete", e.PagePopoverCreate = "PagePopoverCreate", e.PagePopoverUpdate = "PagePopoverUpdate", e.PageSidebar = "PageSidebar", e.PageToolbarItemCreate = "PageToolbarItemCreate", e.PageToolbarItemCreateCancel = "PageToolbarItemCreateCancel", e.PageToolbarItemDelete = "PageToolbarItemDelete", e.PageToolbarItemUpdate = "PageToolbarItemUpdate", e.PageToolbarItemUpdateCancel = "PageToolbarItemUpdateCancel", e.PaginationControl = "PaginationControl", e.PaginationToolbarItemSearch = "PaginationToolbarItemSearch", e.ProgressBarGlobal = "ProgressBarGlobal", e.RedirectFormCreate = "RedirectFormCreate", e.RedirectFormUpdate = "RedirectFormUpdate", e.RedirectModalDelete = "RedirectModalDelete", e.RedirectPopconfirmDelete = "RedirectPopconfirmDelete", e.RedirectPopoverCreate = "RedirectPopoverCreate", e.RedirectPopoverUpdate = "RedirectPopoverUpdate", e.RedirectToolbarItemCreate = "RedirectToolbarItemCreate", e.RedirectToolbarItemCreateCancel = "RedirectToolbarItemCreateCancel", e.RedirectToolbarItemUpdate = "RedirectToolbarItemUpdate", e.RedirectToolbarItemUpdateCancel = "RedirectToolbarItemUpdateCancel", e.ResourceFormCreate = "ResourceFormCreate", e.ResourceFormUpdate = "ResourceFormUpdate", e.ResourceModalDelete = "ResourceModalDelete", e.ResourcePopoverCreate = "ResourcePopoverCreate", e.ResourcePopoverUpdate = "ResourcePopoverUpdate", e.ResourceSidebar = "ResourceSidebar", e.ResourceToolbarItemCreate = "ResourceToolbarItemCreate", e.ResourceToolbarItemCreateCancel = "ResourceToolbarItemCreateCancel", e.ResourceToolbarItemDelete = "ResourceToolbarItemDelete", e.ResourceToolbarItemUpdate = "ResourceToolbarItemUpdate", e.ResourceToolbarItemUpdateCancel = "ResourceToolbarItemUpdateCancel", e.TagFormCreate = "TagFormCreate", e.TagFormUpdate = "TagFormUpdate", e.TagModalDelete = "TagModalDelete", e.TagPopoverCreate = "TagPopoverCreate", e.TagPopoverUpdate = "TagPopoverUpdate", e.TagSidebar = "TagSidebar", e.TagToolabarItemCreateCancel = "TagToolabarItemCreateCancel", e.TagToolbarItemCreate = "TagToolbarItemCreate", e.TagToolbarItemCreateCancel = "TagToolbarItemCreateCancel", e.TagToolbarItemDelete = "TagToolbarItemDelete", e.TypeFormCreate = "TypeFormCreate", e.TypeFormUpdate = "TypeFormUpdate", e.TypeModalCreate = "TypeModalCreate", e.TypeModalDelete = "TypeModalDelete", e.TypeModalUpdate = "TypeModalUpdate", e.TypePopoverCreate = "TypePopoverCreate", e.TypePopoverUpdate = "TypePopoverUpdate", e.TypeSidebar = "TypeSidebar", e.TypeToolbarItemCreate = "TypeToolbarItemCreate", e.TypeToolbarItemCreateCancel = "TypeToolbarItemCreateCancel", e.TypeToolbarItemDelete = "TypeToolbarItemDelete", e.UserToolbarItemSignOut = "UserToolbarItemSignOut", e))(a || {});
const P = {
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
}, M = (e) => P[e].label, f = (e) => h(M(e)), h = (e) => D(e, {
  lower: !0,
  // remove: /[*+~.()%'"!:@$^]/g,
  strict: !0
});
var v = /* @__PURE__ */ ((e) => (e[e.xs = 0] = "xs", e[e.sm = 576] = "sm", e[e.md = 768] = "md", e[e.lg = 992] = "lg", e[e.xl = 1200] = "xl", e[e["2xl"] = 1600] = "2xl", e))(v || {});
export {
  v as BreakpointSize,
  A as EntityType,
  a as UiKey,
  f as getUiDataKey,
  M as getUiDataLabel
};
