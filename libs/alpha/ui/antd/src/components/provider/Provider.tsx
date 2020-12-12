import axios from 'axios'
import React, { PropsWithChildren } from 'react'

axios.create({
  baseURL: 'https://localhost:4000/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
})

export namespace Provider {
  export const Default: React.FC<PropsWithChildren<any>> = ({
    children,
    ...props
  }) => {
    console.log(props)

    return (
      <>
        {(Array.isArray(children) ? children : [children]).map(
          (child: React.ReactElement, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              {React.cloneElement(child, { ...props, ...child.props })}
            </React.Fragment>
          ),
        )}
      </>
    )
  }
}
