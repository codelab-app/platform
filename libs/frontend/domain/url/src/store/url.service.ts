import type {
  ICreateUrlData,
  IUpdateUrlData,
  IUrlModel,
  IUrlService,
} from '@codelab/frontend/abstract/domain'
import { IUrlDTO } from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  createContext,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { Url } from './url.model'
import { UrlRepository } from './url.repo'

@model('@codelab/UrlService')
export class UrlService
  extends Model({
    id: idProp,
    urlRepository: prop(() => new UrlRepository({})),
    urls: prop(() => objectMap<IUrlModel>()),
  })
  implements IUrlService
{
  @modelFlow
  @transaction
  create = _async(function* (this: UrlService, { id, url }: ICreateUrlData) {
    const urls = this.add({ id, url })

    yield* _await(this.urlRepository.add(urls))

    return urls
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: UrlService, urls: Array<IUrlModel>) {
    urls.forEach((url) => {
      this.urls.delete(url.id)
    })

    yield* _await(this.urlRepository.delete(urls))

    return
  })

  @modelFlow
  @transaction
  update = _async(function* (this: UrlService, { id, url }: IUpdateUrlData) {
    const urls = this.urls.get(id)!

    urls.writeCache({ url })

    yield* _await(this.urlRepository.update(urls))

    return urls
  })

  @modelAction
  add({ id, url }: IUrlDTO) {
    console.debug('urlService.add()', { id, url })

    let urls = this.url(id)

    if (urls) {
      urls.writeCache({ url })
    } else {
      urls = Url.create({ id, url })
      this.urls.set(urls.id, urls)
    }

    return urls
  }

  url(id: string) {
    return this.urls.get(id)
  }
}

export const urlServiceContext = createContext<IUrlService>()

export const getUrlService = (self: object) => {
  const urlService = urlServiceContext.get(self)

  if (!urlService) {
    throw new Error('UrlService context is not defined')
  }

  return urlService
}
