import type { Ref } from 'mobx-keystone'
import type { IPageModel } from '../page'

export type IRedirectModel = Ref<IPageModel> | Ref<IUrlModel>
