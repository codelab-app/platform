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
import tw from 'twin.macro'

export const Footer = ({ children }: PropsWithChildren<any>) => {
  return (
    <footer css={tw`bg-slate-700`}>
      <div css={tw`container m-auto flex justify-between py-12 pt-28`}>
        <ul css={tw`text-lg text-slate-400 list-none`}>
          <Image
            alt="Codelab Logo"
            height={42}
            layout="fixed"
            src="/logo-footer.svg"
            width={123}
          />
          <li css={tw`mt-4 `}>All rights reserved – @ 2022</li>
        </ul>
        <ul css={tw`text-lg text-slate-400 list-none`}>
          <p css={tw`text-xl text-white font-extrabold`}>Resources</p>
          <li>Showcases</li>
          <li>Components</li>
          <li>Blog</li>
          <li>FAQ</li>
        </ul>
        <ul css={tw`text-lg text-slate-400 list-none`}>
          <p css={tw`text-xl text-white font-extrabold`}>Contact</p>
          <li>Live Support</li>
          <li>support@codelab.ai</li>
        </ul>
        <div>
          <p css={tw`text-lg text-white font-bold`}>Follow Us</p>
          <ul css={tw`text-lg flex justify-between p-0 text-white list-none`}>
            <li css={tw`pr-4`}>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
            <li css={tw`pr-4`}>
              <FontAwesomeIcon icon={faFacebook} />
            </li>
            <li css={tw`pr-4`}>
              <FontAwesomeIcon icon={faGithub} />
            </li>
            <li css={tw`pr-4`}>
              <FontAwesomeIcon icon={faYoutube} />
            </li>
            <li css={tw`pr-4`}>
              <FontAwesomeIcon icon={faDiscord} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
