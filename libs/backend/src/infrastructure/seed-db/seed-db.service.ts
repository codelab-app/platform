import { Inject, Injectable } from '@nestjs/common';
import { DgraphProvider, DgraphTokens } from '../dgraph';
import { Mutation, Operation, Txn } from 'dgraph-js';

@Injectable()
export class SeedDbService {

  constructor(@Inject(DgraphTokens.DgraphProvider)
              protected readonly dgraphProvider: DgraphProvider,) {
  }

  async seedDB() {
    return await this.transactionWrapper(async (txn) => {
        await this.seedAppWithPage(txn)
      }
    )
  }

  async seedAtoms() {
    return await this.transactionWrapper(async (txn) => {
        await this.seedAtomsAndLibraries(txn)
      }
    )
  }

  private async seedAtomsAndLibraries(txn: Txn) {
    const mu = new Mutation()
    const OWNER_ID = 'seed-user-test-id'
    const LIB_UID = '_:root_lib'
    const ATOM_UID = '_:atom_id'
    const INTERFACE_UID = '_:interface_id'
    const FIELD_UID = '_:field_id'
    const lib_data = {
      'uid': LIB_UID,
      'Library.name': 'Root Library',
      'Library.ownerId': OWNER_ID,
      'Library.atoms': [
        {
          'uid': ATOM_UID,
          'Atom.library': {'uid': LIB_UID},
          'Atom.type': 'AntDesignInput',
          'Atom.label': 'Input',
          'Atom.propTypes': {
            'uid': INTERFACE_UID,
            'Interface.atom': {'uid': ATOM_UID},
            'Interface.fields': [
              {
                'uid': FIELD_UID,
                'Field.interface': {'uid': INTERFACE_UID},
                'Field.key': 'block',
                'Field.label': 'block',
                'Field.description': 'Option to fit button width to its parent width',
              }
            ]
          }
        }

      ]
    }

    const propType = {

    }


    mu.setSetJson(lib_data)

    const mutationResultLib = await txn.mutate(mu)

    const fieldUid = mutationResultLib.getUidsMap().get(FIELD_UID)

    await txn.commit()
  }

  private async seedAppWithPage(txn: Txn) {
    const mu = new Mutation()

    const d = {
      'uid': '_:codelab_app',
      'App.name': 'Codelab Test App',
      'App.pages': [
        {
          'Page.name': 'Page Root',
          'Page.app': {
            'uid': '_:codelab_app'
          }
        }
      ]
    }

    mu.setSetJson(d)

    const mutationResult = await txn.mutate(mu)

    const uid = mutationResult.getUidsMap()

    await txn.commit()
  }

  private async transactionWrapper<TResult>(
    execute: (txn: Txn) => Promise<TResult>,
  ) {
    const txn = this.dgraphProvider.client.newTxn()

    try {
      return await execute(txn)
    } finally {
      await txn.discard()
    }
  }
}
