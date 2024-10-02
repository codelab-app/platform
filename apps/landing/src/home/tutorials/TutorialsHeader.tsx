export const TutorialsHeader = () => {
  return (
    <section className="m-auto w-11/12 xl:container">
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
          Learn To Build
        </h1>
        <p
          className={`
            m-auto w-full px-8
            text-center text-base text-slate-500
            md:px-0 md:text-xl
            sm:text-lg
            xl:w-3/5
          `}
        >
          Checkout our different tutorials for building different types of user
          interfaces. From simple to complex, we've got you covered.
        </p>
      </div>
    </section>
  )
}
