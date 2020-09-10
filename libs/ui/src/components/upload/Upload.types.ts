import { PropsFromKeys } from '@codelab/shared/interface/props'

export const uploadPropKeys = [
  'accept',
  'action',
  'method',
  'directory',
  'beforeUpload',
  'customRequest',
  'data',
  'defaultFileList',
  'disabled',
  'fileList',
  'headers',
  'listType',
  'multiple',
  'name',
  'previewFile',
  'isImageUrl',
  'showUploadList',
  'withCredentials',
  'openFileDialogOnClick',
  'onChange',
  'onPreview',
  'onRemove',
  'onDownload',
  'transformFile',
  'iconRender',
] as const

export type UploadProps = PropsFromKeys<typeof uploadPropKeys[number]>
