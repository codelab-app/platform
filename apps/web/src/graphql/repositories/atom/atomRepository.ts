import { AtomFragment } from '@codelab/frontend/modules/atom'
import { Maybe } from '@codelab/shared/abstract/types'
import { RxTransaction } from 'neo4j-driver'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'
import { Atom } from '../../model'
import {
  Atom as AtomInput,
  AtomCreateInput,
  AtomTagsConnectFieldInput,
  CreateAtomsMutationResponse,
  Tag,
} from '../../ogm-types.gen'
import exportAtom from './exportAtom.cypher'

export const atomRepository = {
  exportAtom: (txn: RxTransaction): Observable<Maybe<Array<AtomFragment>>> =>
    txn
      .run(exportAtom)
      .records()
      .pipe(
        first(() => true, undefined),
        map((r) => r?.get('graph') as Maybe<Array<AtomFragment>>),
      ),
  importAtomFromJson: async (
    atoms: Array<AtomInput>,
  ): Promise<Array<CreateAtomsMutationResponse>> => {
    const allAtomPromises: Array<CreateAtomsMutationResponse> =
      await Promise.all(
        atoms.map((atom) => {
          const tagNames: Array<string> =
            atom?.tags?.map((tag: Tag) => tag.name) || []

          const tagConnects: Array<AtomTagsConnectFieldInput> = tagNames.map(
            (name: string) => {
              return { where: { node: { name } } }
            },
          )

          const atomCreateInput: AtomCreateInput = {
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

          return Atom().create({ input: [atomCreateInput] })
        }),
      )

    return Promise.resolve(allAtomPromises)
  },
}
