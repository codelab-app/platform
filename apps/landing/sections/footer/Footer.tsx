import {
  faDiscord,
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'antd'
import Image from 'next/image'
import type { PropsWithChildren } from 'react'
import React from 'react'
import tw from 'twin.macro'

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer css={tw`bg-slate-700`}>
      <Row
        css={tw`w-4/5 sm:w-3/4 lg:w-11/12 xl:container 2xl:w-11/12 m-auto py-12 px-0 lg:px-1 xl:px-12 2xl:px-0 pt-14 md:pt-28`}
      >
        <Col css={tw`mb-4 lg:mb-0 text-lg text-slate-400`} lg={7} xs={16}>
          <Image
            alt="Codelab Logo"
            height={42}
            src="/logo-footer.svg"
            width={123}
          />

          <p css={tw`mt-4 text-sm xl:text-lg`}>All rights reserved – @ 2022</p>
        </Col>
        <Col css={tw`mb-4 lg:mb-0 text-lg text-slate-400`} lg={6} xs={8}>
          <p css={tw`text-xl text-white font-extrabold`}>Resources</p>
          <p css={tw`text-base xl:text-lg`}>Showcases</p>
          <p css={tw`text-base xl:text-lg`}>Components</p>
          <p css={tw`text-base xl:text-lg`}>Blog</p>
          <p css={tw`text-base xl:text-lg`}>FAQ</p>
        </Col>
        <Col css={tw`mb-4 lg:mb-0 text-lg text-slate-400`} lg={7} xs={16}>
          <p css={tw`text-xl text-white font-extrabold`}>Contact</p>
          <p css={tw`text-base xl:text-lg`}>Live Support</p>
          <p css={tw`text-base xl:text-lg`}>support@codelab.ai</p>
        </Col>
        <Col css={tw`mb-4 lg:mb-0`} lg={3} xs={8}>
          <p css={tw`text-lg text-white font-bold`}>Follow Us</p>
          <div css={tw`text-lg flex flex-col md:flex-row p-0 text-white`}>
            <p css={tw`pr-4`}>
              <FontAwesomeIcon icon={faTwitter} />
            </p>
            <p css={tw`pr-4`}>
              <FontAwesomeIcon icon={faFacebook} />
            </p>
            <p css={tw`pr-4`}>
              <FontAwesomeIcon icon={faGithub} />
            </p>
            <p css={tw`pr-4`}>
              <FontAwesomeIcon icon={faYoutube} />
            </p>
            <p css={tw`pr-4`}>
              <FontAwesomeIcon icon={faDiscord} />
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  )
}
