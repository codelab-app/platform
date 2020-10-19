import React, { PropsWithChildren } from 'react'

const CustomComponent: React.FC<PropsWithChildren<any>> = ({
  children,
  ...props
}: any) => {
  return (
    <>
      {React.Children.toArray(children).map((child: any, index: number) => {
        return React.cloneElement(child, {
          ...child.props,
          // eslint-disable-next-line react/no-array-index-key
          key: index,
        })
      })}
    </>
  )
}

const CustomContainer: React.FC<PropsWithChildren<any>> = ({
  children,
  ...props
}: any) => {
  return <>{children(props)}</>
}

export class RenderComponent {
  static Default = CustomComponent

  static Container = CustomContainer
}
