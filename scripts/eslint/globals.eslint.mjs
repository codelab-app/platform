// This configures the core ESLint rule 'no-restricted-globals'

const restrictedGlobals = [
  'postMessage',
  'blur',
  'focus',
  'close',
  'frames',
  'self',
  'parent',
  'opener',
  'top',
  'length',
  'closed',
  'location',
  'origin',
  'name',
  'locationbar',
  'menubar',
  'personalbar',
  'scrollbars',
  'statusbar',
  'toolbar',
  'status',
  'frameElement',
  'navigator',
  'customElements',
  'external',
  'screen',
  'innerWidth',
  'innerHeight',
  'scrollX',
  'pageXOffset',
  'scrollY',
  'pageYOffset',
  'screenX',
  'screenY',
  'outerWidth',
  'outerHeight',
  'devicePixelRatio',
  'clientInformation',
  'screenLeft',
  'screenTop',
  'defaultStatus',
  'defaultstatus',
  'styleMedia',
  'onanimationend',
  'onanimationiteration',
  'onanimationstart',
  'onsearch',
  'ontransitionend',
  'onwebkitanimationend',
  'onwebkitanimationiteration',
  'onwebkitanimationstart',
  'onwebkittransitionend',
  'isSecureContext',
  'onabort',
  'onblur',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onreset',
  'onresize',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onstalled',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'onvolumechange',
  'onwaiting',
  'onwheel',
  'onauxclick',
  'ongotpointercapture',
  'onlostpointercapture',
  'onpointerdown',
  'onpointermove',
  'onpointerup',
  'onpointercancel',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onafterprint',
  'onbeforeprint',
  'onbeforeunload',
  'onhashchange',
  'onlanguagechange',
  'onmessage',
  'onmessageerror',
  'onoffline',
  'ononline',
  'onpagehide',
  'onpageshow',
  'onpopstate',
  'onrejectionhandled',
  'onstorage',
  'onunhandledrejection',
  'onunload',
  'performance',
  'stop',
  'open',
  'print',
  'captureEvents',
  'releaseEvents',
  'getComputedStyle',
  'matchMedia',
  'moveTo',
  'moveBy',
  'resizeTo',
  'resizeBy',
  'getSelection',
  'find',
  'createImageBitmap',
  'scroll',
  'scrollTo',
  'scrollBy',
  'onappinstalled',
  'onbeforeinstallprompt',
  'crypto',
  'ondevicemotion',
  'ondeviceorientation',
  'ondeviceorientationabsolute',
  'indexedDB',
  'webkitStorageInfo',
  'chrome',
  'visualViewport',
  'speechSynthesis',
  'webkitRequestFileSystem',
  'webkitResolveLocalFileSystemURL',
  'openDatabase',
]

export default [
  {
    files: ['**/*.{ts,tsx}'], // Target TypeScript/TSX files
    rules: {
      'no-restricted-globals': ['error', ...restrictedGlobals], // Apply the list of restricted globals
    },
  },
]
