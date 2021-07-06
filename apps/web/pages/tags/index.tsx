import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DashboardLayout } from 'apps/web/src/templates/DashboardLayout'
import React from 'react'
import { NextPageLayout } from '../../src/templates/Layout.d'

const Tag: NextPageLayout<'dashboard'> = () => <></>

Tag.Layout = DashboardLayout
Tag.MainPane = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default Tag
