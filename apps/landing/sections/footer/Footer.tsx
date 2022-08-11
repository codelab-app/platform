import {
  faDiscord,
  faFacebook,
  faGithub,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { PropsWithChildren } from 'react'

export const Footer = ({ children }: PropsWithChildren<any>) => {
  return (
    <footer>
      <span>Codelab.ai ©2020</span>
      <ul>
        <Image
          alt="Codelab Logo"
          height={26}
          layout="fixed"
          src="/codelab-logo-default.svg"
          width={90}
        />
        <li>All rights reserved – @ 2022</li>
      </ul>
      <ul>
        Resources
        <li>Showcases</li>
        <li>Components</li>
        <li>Blog</li>
        <li>FAQ</li>
      </ul>
      <ul>
        Contact
        <li>Live Support</li>
        <li>support@codelab.ai</li>
      </ul>
      <ul>
        Follow Us
        <li>
          <FontAwesomeIcon icon={faTwitter} />
        </li>
        <li>
          <FontAwesomeIcon icon={faFacebook} />
        </li>
        <li>
          <FontAwesomeIcon icon={faGithub} />
        </li>
        <li>
          <FontAwesomeIcon icon={faYoutube} />
        </li>
        <li>
          <FontAwesomeIcon icon={faDiscord} />
        </li>
      </ul>
    </footer>
  )
}
