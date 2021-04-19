import React, { useState } from 'react'
import { Layout } from 'antd'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import xw from 'xwind'
import { css, Global } from '@emotion/react'
import { SidebarMenu } from '../components/SidebarMenu'
import { RecoilRoot } from 'recoil'

// import '../styles/global.css'
import '../styles/antd.less'
// import 'prism-material-themes/themes/material-palenight.css'

const { Content, Header, Footer, Sider } = Layout

export interface Frontmatter {
  slug: string
  title: string
  order?: number
  suborder: number
}

// https://www.gatsbyjs.com/blog/2019-11-21-how-to-convert-an-existing-gatsby-blog-to-use-mdx/
export default function Template(props) {
  const { data, pageContext } = props

  const { mdx } = data // data.markdownRemark holds your post data
  const { frontmatter, body } = mdx

  const pages: Array<Frontmatter> = pageContext.edges.map((edge) => {
    const {
      node: {
        frontmatter: { slug, title, order, suborder },
      },
    } = edge

    return {
      title,
      slug,
      order,
      suborder,
    }
  })

  const [collapsed, setCollapsed] = useState(false)

  return (
    <RecoilRoot>
      <Layout style={{ height: '100%' }}>
        {/* <Helmet>
          <link href="themes/material-default.css" rel="stylesheet" />
        </Helmet> */}
        <Global
          styles={{
            ...xw`XWIND_BASE XWIND_GLOBAL`,
            ...css`
              #___gatsby,
              #gatsby-focus-wrapper {
                min-height: 100%;
                height: 100%;
              }
            `,
          }}
        />
        <Sider
          theme="light"
          collapsible
          collapsedWidth={78}
          // width={200}
          breakpoint="md"
          collapsed={collapsed}
          onCollapse={(isCollapsed) => {
            console.log(isCollapsed)
            setCollapsed(isCollapsed)
          }}
        >
          <SidebarMenu
            pages={pages}
            currentPathname={props.location.pathname}
          />
        </Sider>
        <Layout css={xw`h-full`}>
          {/* <Header>Header</Header> */}
          <Content css={xw`p-4`}>
            <MDXRenderer>{body}</MDXRenderer>
            {/* <div dangerouslySetInnerHTML={{ __html: html }} /> */}
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </RecoilRoot>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      frontmatter {
        # date(formatString: "MMMM DD, YYYY")
        slug
        order
        # suborder
        # title
      }
    }
  }
`
