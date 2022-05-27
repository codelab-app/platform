import { Input } from 'antd'

const { TextArea } = Input

// Disallow SSR rendering of the editor, because it can't load it properly on the server
export const MonacoEditor = TextArea
