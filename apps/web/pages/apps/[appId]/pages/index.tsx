import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { MainPanePage } from '@codelab/modules/page'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import React from 'react'

const Pages = () => <>Hi</>

Pages.Layout = LayoutBuilder
Pages.MainPane = MainPanePage

export const getServerSideProps = withPageAuthRequired()

export default Pages
