import type { IAtomModel } from '@codelab/frontend/abstract/domain'

import { Empty, Typography } from 'antd'

import { UpdateAtomForm } from '../update-atom'

export const AtomForm = ({ atom }: { atom: IAtomModel }) => {
  return (
    <div className="flex size-full flex-col overflow-auto">
      <Typography className="text-2xl">Examples</Typography>
      <div className="flex grow flex-col justify-center">
        <Empty></Empty>
      </div>

      <Typography className="text-2xl">Edit Atom</Typography>
      <UpdateAtomForm atom={atom} />
    </div>
  )
}
