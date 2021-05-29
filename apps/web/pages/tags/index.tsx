import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DashboardLayout } from 'apps/web/src/templates/DashboardLayout'
import React from 'react'

const Tag = () => <>Hi</>

Tag.Layout = DashboardLayout
Tag.MainPane = () => <>Hi</>

export const getServerSideProps = withPageAuthRequired()

export default Tag
