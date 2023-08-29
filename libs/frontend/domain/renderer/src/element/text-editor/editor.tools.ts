import CheckList from '@editorjs/checklist'
import Code from '@editorjs/code'
import Header from '@editorjs/header'
import InlineCode from '@editorjs/inline-code'
import LinkTool from '@editorjs/link'
import List from '@editorjs/list'
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

  color: {
    class: ColorPicker,
    config: {
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
    class: ColorPicker,
    config: {
      defaultColor: '#FFBF00',
      type: 'marker',
    },
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
