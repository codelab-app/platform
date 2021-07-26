import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DashboardLayout } from 'apps/web/src/layout/DashboardLayout'
import React from 'react'
import { NextPageTemplate } from '../../src/templates/Layout.d'

const Tag: NextPageTemplate<'dashboard'> = () => <></>

Tag.Template = DashboardLayout
Tag.MainPane = () => <></>

export const getServerSideProps = withPageAuthRequired()

export default Tag
