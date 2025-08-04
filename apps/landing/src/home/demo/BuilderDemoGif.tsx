import Image from 'next/image'

interface BuilderDemoGifProps {
  className?: string
  showBrowserFrame?: boolean
}

export const BuilderDemoGif = ({
  className = '',
  showBrowserFrame = true,
}: BuilderDemoGifProps) => {
  if (showBrowserFrame) {
    return (
      <div
        className={`
          relative w-full
          ${className}
        `}
      >
        <img
          alt="Safari Browser Frame"
          className={`
            absolute z-10 max-h-80 w-full rounded-xl border border-solid border-gray-200
            object-contain
            sm:max-h-[520px]
            md:max-h-fit
          `}
          src="/Browser/Safari (Big Sur) - Light.png"
        />
        <div className="relative z-20 px-6 pb-6 pt-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-lg">
            <Image
              alt="Codelab UI Builder Demo"
              className="object-contain"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              src="/builder-demo.gif"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`
        relative w-full overflow-hidden rounded-lg shadow-2xl
        ${className}
      `}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          alt="Codelab UI Builder Demo"
          className="object-contain"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          src="/builder-demo.gif"
        />
      </div>
    </div>
  )
}
