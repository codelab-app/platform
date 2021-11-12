import React, { useState } from 'react'
import { createPortal } from 'react-dom'

// https://stackoverflow.com/questions/34743264/how-to-set-iframe-content-of-a-react-component

export const IFrame = (
  props: React.PropsWithChildren<
    React.DetailedHTMLProps<
      React.IframeHTMLAttributes<HTMLIFrameElement>,
      HTMLIFrameElement
    >
  >,
) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

  return (
    <iframe
      {...props}
      ref={(iframeRef) =>
        setMountNode(iframeRef?.contentWindow?.document?.body ?? null)
      }
    >
      {mountNode && createPortal(props.children, mountNode)}
    </iframe>
  )
}
