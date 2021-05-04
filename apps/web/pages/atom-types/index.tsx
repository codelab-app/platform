import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { GetAtomTypesTable, MainPaneAtomType } from '@codelab/modules/atom-type'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import React from 'react'

const AtomType = () => {
  return (
    <>
      <GetAtomTypesTable />
    </>
  )
}

AtomType.Layout = LayoutBuilder
AtomType.MainPane = MainPaneAtomType

export const getServerSideProps = withPageAuthRequired()

export default AtomType
