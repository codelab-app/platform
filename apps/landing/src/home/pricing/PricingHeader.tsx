import { Switch } from 'antd'

import { CuiContainer } from '../../components/CuiContainer'
import { CuiText } from '../../components/CuiText'

export const PricingHeader = () => {
  return (
    <section>
      <CuiContainer
        className={`
          mt-5 pb-7
          sm:mt-10 sm:pb-14
          md:mt-20
        `}
      >
        <CuiText variant="hero-title">Compare Pricing</CuiText>
        <p
          className={`
            px-8 text-center text-base text-slate-500
            sm:text-lg
            md:px-0 md:text-xl
          `}
        >
          Whether you're trying out our product, or building your next startup,
          we have you covered with our different plans
        </p>
        <div
          className={`
            flex flex-col items-center justify-center text-sm
            sm:flex-row sm:text-base
            md:text-lg
          `}
        >
          <div
            className={`
              mb-4 mr-0
              sm:mb-0 sm:mr-4
            `}
          >
            <span>Monthly</span>
            <Switch className="mx-4 bg-blue-500" defaultChecked />
            <span>Yearly</span>
          </div>

          <span
            className={`
              bg-violet-200 px-2 py-1 text-sm text-violet-700
              md:text-base
            `}
          >
            Save up to 25%
          </span>
        </div>
      </CuiContainer>
    </section>
  )
}
