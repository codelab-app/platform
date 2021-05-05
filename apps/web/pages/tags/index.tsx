import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import React from 'react'

const Tag = () => <>Hi</>

Tag.Layout = LayoutBuilder
Tag.MainPane = () => <>Hi</>

export const getServerSideProps = withPageAuthRequired()

export default Tag
