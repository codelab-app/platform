import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button } from 'antd'

export const editorStyles = css`
  width: 85%;
`

export const ExpandButton = styled(Button)`
  position: absolute !important;
  bottom: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
`

export const containerStyles = css`
  position: relative;

  // Can be improved by selecting the styled component, but need to figure out how to config jest to load emotion
  .CodeMirrorInput--btnExpand {
    display: none;
  }

  &:hover {
    .CodeMirrorInput--btnExpand {
      display: block;
    }
  }

  // Styles taken from ant-input - to make it look similar to other fields
  box-sizing: border-box;
  margin: 4px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 0 4px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;

  &:focus-within {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    border-right-width: 1px !important;
    outline: 0;
  }

  // Remove dotted line on focus
  .cm-editor.cm-focused {
    outline: none;
  }

  // I couldn't find how to disable the line numbers, for now I'm just hiding the gutter, but there must be an option to not render them somewhere
  .cm-gutters {
    display: none;
  }

  .cm-line {
    background: none;
  }

  .cm-tooltip-autocomplete {
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    padding: 4px;
  }

  .cm-tooltip-autocomplete > ul > li {
    padding: 3px 5px !important;
    border-radius: 4px;
  }
`
