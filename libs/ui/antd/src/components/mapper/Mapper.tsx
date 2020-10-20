import React from 'react'

export interface MapperProps {
  dataSource: Array<any> // Array to be mapped into React Elements
  render: React.ReactElement // React Element to render
}

const MapperComponent: React.FC<MapperProps> = (props) => {
  const { dataSource, render, ...restProps } = props

  return (
    <>
      {dataSource.map((item: any, index: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {React.cloneElement(render, { ...restProps, item, index })}
        </React.Fragment>
      ))}
    </>
  )
}

export class CodelabMapper {
  static Default = MapperComponent
}
