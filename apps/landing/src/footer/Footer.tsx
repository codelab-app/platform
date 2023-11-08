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

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className="bg-slate-700">
      <Row className="m-auto w-4/5 px-0 py-12 pt-14 xl:container sm:w-3/4 md:pt-28 lg:w-11/12 lg:px-1 xl:px-12 2xl:w-11/12 2xl:px-0">
        <Col className="mb-4 text-lg text-slate-400 lg:mb-0" lg={7} xs={16}>
          <Image
            alt="Codelab Logo"
            height={42}
            src="/logo-footer.svg"
            width={123}
          />

          <p className="mt-4 text-sm xl:text-lg">
            All rights reserved – @ 2022
          </p>
        </Col>
        <Col className="mb-4 text-lg text-slate-400 lg:mb-0" lg={6} xs={8}>
          <p className="text-xl font-extrabold text-white">Resources</p>
          <p className="text-base xl:text-lg">Showcases</p>
          <p className="text-base xl:text-lg">Components</p>
          <p className="text-base xl:text-lg">Blog</p>
          <p className="text-base xl:text-lg">FAQ</p>
        </Col>
        <Col className="mb-4 text-lg text-slate-400 lg:mb-0" lg={7} xs={16}>
          <p className="text-xl font-extrabold text-white">Contact</p>
          <p className="text-base xl:text-lg">Live Support</p>
          <p className="text-base xl:text-lg">support@codelab.ai</p>
        </Col>
        <Col className="mb-4 lg:mb-0" lg={3} xs={8}>
          <p className="text-lg font-bold text-white">Follow Us</p>
          <div className="flex flex-col p-0 text-lg text-white md:flex-row">
            <p className="pr-4">
              <FontAwesomeIcon icon={faTwitter} />
            </p>
            <p className="pr-4">
              <FontAwesomeIcon icon={faFacebook} />
            </p>
            <p className="pr-4">
              <FontAwesomeIcon icon={faGithub} />
            </p>
            <p className="pr-4">
              <FontAwesomeIcon icon={faYoutube} />
            </p>
            <p className="pr-4">
              <FontAwesomeIcon icon={faDiscord} />
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  )
}
