import type { IAtomRendererRecord } from '@codelab/frontend/abstract/domain'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import { IAtomType } from '@codelab/shared/abstract/core'

export const htmlAtoms: IAtomRendererRecord = {
  [IAtomType.HtmlDiv]: 'div',
  [IAtomType.HtmlSpan]: 'span',
  [IAtomType.HtmlA]: 'a',
  [IAtomType.HtmlP]: 'p',
  [IAtomType.HtmlVideo]: 'video',
  [IAtomType.HtmlUl]: 'ul',
  [IAtomType.HtmlTrack]: 'track',
  [IAtomType.HtmlTitle]: 'title',
  [IAtomType.HtmlTime]: 'time',
  [IAtomType.HtmlTextarea]: 'textarea',
  [IAtomType.HtmlTemplate]: 'template',
  [IAtomType.HtmlTr]: 'tr',
  [IAtomType.HtmlTable]: 'table',
  // [IAtomType.HtmlCol]: 'col',
  [IAtomType.HtmlTd]: 'td',
  [IAtomType.HtmlCaption]: 'caption',
  [IAtomType.HtmlStyle]: 'style',
  [IAtomType.HtmlSource]: 'source',
  [IAtomType.HtmlSelect]: 'select',
  [IAtomType.HtmlBlockquote]: 'blockquote',
  [IAtomType.HtmlProgress]: 'progress',
  [IAtomType.HtmlPre]: 'pre',
  [IAtomType.HtmlPicture]: 'picture',
  [IAtomType.HtmlParam]: 'param',
  [IAtomType.HtmlOutput]: 'output',
  [IAtomType.HtmlOption]: 'option',
  [IAtomType.HtmlOptgroup]: 'optgroup',
  [IAtomType.HtmlObject]: 'object',
  [IAtomType.HtmlOl]: 'ol',
  [IAtomType.HtmlMeter]: 'meter',
  [IAtomType.HtmlMeta]: 'meta',
  [IAtomType.HtmlMap]: 'map',
  [IAtomType.HtmlLink]: 'link',
  [IAtomType.HtmlLegend]: 'legend',
  [IAtomType.HtmlLabel]: 'label',
  [IAtomType.HtmlLi]: 'li',
  [IAtomType.HtmlInput]: 'input',
  [IAtomType.HtmlImg]: 'img',
  [IAtomType.HtmlIframe]: 'iframe',
  [IAtomType.HtmlH1]: 'h1',
  [IAtomType.HtmlH2]: 'h2',
  [IAtomType.HtmlH3]: 'h3',
  [IAtomType.HtmlH4]: 'h4',
  [IAtomType.HtmlH5]: 'h5',
  [IAtomType.HtmlH6]: 'h6',
  [IAtomType.HtmlHead]: 'head',
  [IAtomType.HtmlHr]: 'hr',
  [IAtomType.HtmlForm]: 'form',
  [IAtomType.HtmlFieldset]: 'fieldset',
  [IAtomType.HtmlEmbed]: 'embed',
  [IAtomType.HtmlDialog]: 'dialog',
  [IAtomType.HtmlDetails]: 'details',
  [IAtomType.HtmlDatalist]: 'datalist',
  [IAtomType.HtmlData]: 'data',
  [IAtomType.HtmlDl]: 'dl',
  [IAtomType.HtmlCanvas]: 'canvas',
  [IAtomType.HtmlButton]: 'button',
  [IAtomType.HtmlBase]: 'base',
  [IAtomType.HtmlBr]: 'br',
  [IAtomType.HtmlAudio]: 'audio',
  [IAtomType.HtmlArea]: 'area',
  [IAtomType.HtmlFooter]: 'footer',
  [IAtomType.HtmlHeader]: 'header',
  [IAtomType.HtmlAside]: 'aside',
  [IAtomType.HtmlMain]: 'main',
  [IAtomType.HtmlNav]: 'nav',
  [IAtomType.HtmlSection]: 'section',
  [IAtomType.HtmlCode]: 'code',
  [IAtomType.HtmlEm]: 'em',
  [IAtomType.HtmlI]: 'i',
  [IAtomType.HtmlS]: 's',
  [IAtomType.HtmlSmall]: 'small',
  [IAtomType.HtmlStrong]: 'strong',
  [IAtomType.HtmlSub]: 'sub',
  [IAtomType.HtmlSup]: 'sup',
  [IAtomType.HtmlScript]: dynamicLoader(() =>
    import('../codelab/components').then((mod) => mod.CodelabScript),
  ),
}
