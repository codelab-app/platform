import {
  ElementSchema,
  ExportAppSchema,
  IElement,
  IExportApp,
  IUser,
} from '@codelab/shared/abstract/core'
import { flatMap } from 'lodash'

export interface PayloadAndExistingPair {
  existingId: string // the id of the existing matching entity in the current database
  payloadId: string // the id we're from the payload we're importing
}

// Abstracted this, because it was confusing using just Map<string, string>
export class PayloadIdToExistingIdMap {
  private readonly map: Map<string, string>

  constructor(importedAndExistingPairs?: Array<PayloadAndExistingPair>) {
    if (importedAndExistingPairs) {
      this.map = new Map<string, string>(
        importedAndExistingPairs.map((pair) => [
          pair.payloadId,
          pair.existingId,
        ]),
      )
    } else {
      this.map = new Map()
    }
  }

  getExisting(imported: string): string | undefined {
    return this.map.get(imported)
  }

  set(pair: PayloadAndExistingPair) {
    this.map.set(pair.payloadId, pair.existingId)
  }

  entries() {
    return this.map.entries()
  }

  hasPayloadId(id: string) {
    return this.map.has(id)
  }
}

export const parsePayload = (payload: string): IExportApp =>
  ExportAppSchema.parse(JSON.parse(payload))

export const replaceIdInPayload = (
  payload: IExportApp,
  pair: PayloadAndExistingPair,
) => {
  return replaceManyIdsInPayload(payload, new PayloadIdToExistingIdMap([pair]))
}

export const replaceManyIdsInPayload = (
  payload: IExportApp,
  pairMap: PayloadIdToExistingIdMap,
) => {
  let stringified = JSON.stringify(payload)

  for (const [key, value] of pairMap.entries()) {
    if (key === value) {
      continue
    }

    if (stringified.includes(`"${value}"`)) {
      // If the payload already has the new id, this could be an issue.
      // Because if later on we try to replace it with the old id, we'll replace the existing id
      // e.g. {appId: 0x1, elements: [{id: 0x2}]} -> replace 0x1 with 0x2 -> {appId: 0x2, elements: [{id: 0x2,}]}
      // -> replace 0x2 (element's id) with 0x3 -> {appId: 0x3, elements: [{id: 0x3}]} -> appId is changed undesirably
      // I'm not sure how this should be handled, but it's going to be pretty rare and only happening when
      // importing from a different database instance, which I guess 99% of the time will be from dev to another dev environment

      throw new Error(`${value} already exists in payload`)
    }

    stringified = stringified.replace(new RegExp(`"${key}"`, 'g'), `"${value}"`)
  }

  return parsePayload(stringified)
}

export const collectAllElements = (payload: IExportApp) =>
  flatMap(payload.pages, (page) => page.elements.vertices)

export const collectAllEdges = (payload: IExportApp) =>
  flatMap(payload.pages, (page) => page.elements.edges)

export const createPlaceholderElement = (
  importedElement: IElement,
  currentUser?: IUser,
): IElement => {
  return ElementSchema.parse({
    fixedId: importedElement.fixedId,
    owner: currentUser?.id ? { id: currentUser.id } : undefined,
    props: {},
  } as IElement)
}

export const splitElementsByFixedId = (input: Array<IElement>) => {
  const componentsWithFixedId: Array<IElement & { fixedId: string }> = []
  const elements: Array<IElement> = []

  for (const e of input) {
    if (e.componentTag && e.fixedId) {
      componentsWithFixedId.push(e as any)
    } else {
      elements.push(e)
    }
  }

  return { withFixedId: componentsWithFixedId, withoutFixedId: elements }
}
