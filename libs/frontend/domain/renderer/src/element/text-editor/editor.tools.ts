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
import ColorPicker from 'editorjs-text-color-plugin'

export const EDITOR_TOOLS = {
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },

  code: {
    class: Code,
    shortcut: 'CMD+SHIFT+C',
  },

  Color: {
    class: ColorPicker,
    config: {
      colorCollections: [
        '#EC7878',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#0070FF',
        '#03A9F4',
        '#00BCD4',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFF',
      ],
      customPicker: true,
      defaultColor: '#FF1300',
      type: 'text',
    },
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
