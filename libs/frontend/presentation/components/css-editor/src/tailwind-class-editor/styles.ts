import styled from 'styled-components'

export const ColorBox = styled.div`
  width: 10px;
  height: 10px;
  border: 0.3px solid lightgray;
`

export const BlankColorBox = styled.div`
  width: 10px;
  height: 10px;
  background-color: transparent;
`

export const CustomOption = styled.div`
  padding: 0px 6px;
  background-color: #edebeb;
  border: 1px solid #d9d8d8;
  border-radius: 12px;
  margin: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;

  span {
    font-size: 12px;
  }
`

export const Label = styled.span`
  display: inline-flex;
  align-items: center;
  height: 32px;
`
