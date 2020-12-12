import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Upload {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
