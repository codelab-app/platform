import { Switch } from 'antd'

export const PricingHeader = () => {
  return (
    <section>
      <div
        className={`
          m-auto mt-5 w-11/12
          pb-7
          md:mt-20
          sm:mt-10 sm:pb-14
          xl:container
        `}
      >
        <h1 className="text-center text-2xl md:text-5xl sm:text-3xl">
          Compare Pricing
        </h1>
        <p
          className={`
            px-8 text-center text-base
            text-slate-500
            md:px-0 md:text-xl
            sm:text-lg
          `}
        >
          Whether you're trying out our product, or building your next startup,
          we have you covered with our different plans
        </p>
        <div
          className={`
            flex flex-col items-center
            justify-center text-sm
            md:text-lg
            sm:flex-row sm:text-base
          `}
        >
          <div className="mb-4 mr-0 sm:mb-0 sm:mr-4">
            <span>Monthly</span>
            <Switch className="mx-4 bg-blue-500" defaultChecked />
            <span>Yearly</span>
          </div>

          <span
            className={`
              bg-violet-200 px-2 py-1
              text-sm text-violet-700
              md:text-base
            `}
          >
            Save up to 25%
          </span>
        </div>
      </div>
    </section>
  )
}
