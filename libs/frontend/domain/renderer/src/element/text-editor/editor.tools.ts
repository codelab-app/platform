import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
import Marker from '@editorjs/marker'
import Quote from '@editorjs/quote'
import Underline from '@editorjs/underline'
import StrikeThrough from '@sotaproject/strikethrough'

export const EDITOR_TOOLS = {
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },

  code: {
    class: Code,
    shortcut: 'CMD+SHIFT+C',
  },

  header: {
    class: Header,
    config: {
      placeholder: 'Header',
    },
    inlineToolbar: ['marker', 'link'],
    shortcut: 'CMD+SHIFT+H',
  },

  inlineCode: {
    class: InlineCode,
    shortcut: 'CMD+SHIFT+C',
  },

  linkTool: LinkTool,

  list: {
    class: List,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+L',
  },

  marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
  },

  strikethrough: {
    class: StrikeThrough,
    inlineToolbar: true,
  },

  underline: {
    class: Underline,
    inlineToolbar: true,
  },
}
