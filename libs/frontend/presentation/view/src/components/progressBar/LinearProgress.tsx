import styled from 'styled-components'

interface LinearProgressProps {
  ariaLabel?: string
}

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  height: 5px;
  width: 100%;

  @keyframes indeterminate {
    0% {
      left: -100%;
      width: 50%;
    }
    50% {
      left: 25%;
      width: 75%;
    }
    100% {
      left: 100%;
      width: 50%;
    }
  }
`

const ProgressBarContent = styled.div`
  animation: indeterminate 1.5s infinite;
  background: linear-gradient(to right, #569cff 20%, #1677ff 80%);
  background-color: #1677ff;
  height: 100%;
  position: relative;
  transition: width 0.3s ease;
  width: 100%;
`

const LinearProgress = (props: LinearProgressProps) => {
  return (
    <ProgressBarContainer aria-label={props.ariaLabel} role="progressbar">
      <ProgressBarContent />
    </ProgressBarContainer>
  )
}

export default LinearProgress
