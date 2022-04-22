import { IAtomDTO } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { v4 } from 'uuid'
import { AtomModel } from '../../model'
import {
  Atom as AtomInput,
  AtomCreateInput,
  AtomTagsConnectFieldInput,
  CreateAtomsMutationResponse,
  Tag,
} from '../../ogm-types.gen'
import exportAtom from './exportAtom.cypher'

export const atomRepository = {
  exportAtom: (txn: RxTransaction): Observable<Maybe<Array<IAtomDTO>>> =>
    txn
      .run(exportAtom)
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('graph') as Maybe<Array<IAtomDTO>>),
      ),

  importAtomFromJson: async (
    atoms: Array<AtomInput>,
  ): Promise<Array<CreateAtomsMutationResponse>> => {
    const allAtomPromises: Array<CreateAtomsMutationResponse> =
      await Promise.all(
        atoms.map(async (atom) => {
          const tagNames: Array<string> =
            atom?.tags?.map((tag: Tag) => tag.name) || []

          const tagConnects: Array<AtomTagsConnectFieldInput> = tagNames.map(
            (name: string) => {
              return { where: { node: { name } } }
            },
          )

          const atomCreateInput: AtomCreateInput = {
            id: v4(),
            name: atom.name,
            type: atom.type,
            tags: {
              connect: tagConnects,
            },
            api: {
              connect: {
                where: {
                  node: {
                    id: atom.api?.id,
                  },
                },
              },
            },
          }

          return (await AtomModel()).create({ input: [atomCreateInput] })
        }),
      )

    return Promise.resolve(allAtomPromises)
  },
}
