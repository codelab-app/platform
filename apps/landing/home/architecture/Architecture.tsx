import { Button, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Architecture = () => {
  return (
    <section className="bg-violet-700 m-auto container">
      <h2>Replace Your Entire Frontend Stack</h2>
      <p>
        Codelab is a purpose built frontend layer meant to be used with external
        API services. It’s designed from the ground up as a full-fledged
        frontend solution. Use existing UI Frameworks or custom components to
        build your view, and maintain them easily with our built-in design
        system. Manage local state & connect to remote API’s.
      </p>
      <Space>
        <Button>Traditional Tech Stack</Button>
        <Button>Tech stack with Codelab</Button>
      </Space>
      <Image
        alt="Traditional Tech Stack Diagram"
        src="/tech-stack-diagram-traditional-2x.png"
      />
      <Image
        alt="Codelab Tech Stack Diagram"
        src="/tech-stack-diagram-codelab-2x.png"
      />
      {/* <img src="/tech-stack-diagram-traditional.png" /> */}
    </section>
  )
}
