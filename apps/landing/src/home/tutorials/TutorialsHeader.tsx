import { CuiContainer } from '../../components/CuiContainer'
import { CuiText } from '../../components/CuiText'

export const TutorialsHeader = () => {
  return (
    <CuiContainer>
      <CuiContainer
        className={`
          mt-5 pb-7
          sm:mt-10 sm:pb-14
          md:mt-20
        `}
      >
        <CuiText variant="hero-title">Learn To Build</CuiText>
        <p
          className={`
            m-auto w-full px-8 text-center text-base text-slate-500
            sm:text-lg
            md:px-0 md:text-xl
            xl:w-3/5
          `}
        >
          Checkout our different tutorials for building different types of user
          interfaces. From simple to complex, we've got you covered.
        </p>
      </CuiContainer>
    </CuiContainer>
  )
}
