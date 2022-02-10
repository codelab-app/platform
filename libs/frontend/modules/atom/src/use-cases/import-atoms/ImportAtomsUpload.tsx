import { useNotify } from '@codelab/frontend/shared/utils'
import { ImportUpload } from '@codelab/frontend/view/components'
import { Button } from 'antd'
import React from 'react'
import { useImportAtomsMutation } from '../../graphql/Atom.endpoints.v2.graphql.gen'

export const ImportAtomsUpload = () => {
  const [importAtoms] = useImportAtomsMutation()

  const { onSuccess, onError } = useNotify(
    { title: 'Atoms successfully imported' },
    { title: 'Error while importing atoms' },
  )

  const fetchFn = (data: any) => {
    console.log(data)

    return importAtoms({
      variables: {
        input: {
          payload: data,
        },
      },
    })
      .unwrap()
      .then(onSuccess)
      .catch(onError)
  }

  return (
    <>
      <Button
        onClick={() =>
          importAtoms({
            variables: {
              input: {
                payload: `[
                  {
                    __typename: 'Atom',
                    id: '989eebe0-5ed6-4a25-a1c6-b3013bbaa2a9',
                    name: 'Button',
                    type: 'AntDesignButton',
                  },
                ]`,
              },
            },
          })
            .unwrap()
            .then((r) => console.log(r))
            .catch((e) => console.error(e))
        }
      >
        Test
      </Button>
      <ImportUpload fetchFn={fetchFn} />
    </>
  )
}
