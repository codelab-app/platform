'use client'

import { CreateAtomModal } from '@codelab/frontend-application-atom/use-cases/create-atom'
import { DeleteAtomsModal } from '@codelab/frontend-application-atom/use-cases/delete-atom'
import { AtomForm } from '@codelab/frontend-application-atom/use-cases/get-atoms'
import { usePaginationQuery } from '@codelab/frontend-application-shared-store/pagination'
import { CreateFieldModal } from '@codelab/frontend-application-type/use-cases/create-field'
import { DeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import type { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Page = ({
  searchParams: { page, pageSize },
}: {
  searchParams: { page: string; pageSize: string }
}) => {
  return (
    <>
      <CreateAtomModal />
      <DeleteAtomsModal />
      <CreateFieldModal />
      <DeleteFieldModal />
      <AtomForm />
    </>
  )
}

export default Page
