import { faArrowRight, faTag } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Row } from 'antd'
import Image from 'next/image'

export interface ITutorialsItem {
  description: string
  image: string
  tags: Array<string>
  title: string
}

export interface TutorialsBodyProps {
  tutorials: Array<ITutorialsItem>
}

export const TutorialsBody = ({ tutorials }: TutorialsBodyProps) => {
  return (
    <section className="m-auto w-11/12 pb-14 xl:container">
      <Row className="m-auto mb-0 w-3/4 pb-14 lg:w-11/12 xl:w-4/5">
        {tutorials.map((item, index) => (
          <Col className="m-auto mb-16 w-full lg:w-[47%]" key={index}>
            <div
              className={`
                relative mb-4 h-[180px]
                w-full
                lg:h-[260px]
                md:h-[300px]
                sm:h-[260px]
                xl:h-[300px]
              `}
            >
              <Image
                alt="image"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 47vw"
                src={item.image}
              />
            </div>
            <h5 className="text-base 2xl:text-2xl lg:text-lg md:text-xl">
              {item.title}
            </h5>
            <p className="mb-2 text-sm 2xl:text-base lg:text-sm md:text-base">
              {item.description}
            </p>
            <Button
              className={`
                mb-4 flex items-center
                px-0 text-sm text-violet-500
                2xl:text-base
                lg:mb-0 lg:text-sm
                md:text-base
              `}
              type="link"
            >
              Learn More
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </Button>
            <div className="mt-2 flex items-center">
              <FontAwesomeIcon className="mr-2 text-xl" icon={faTag} />
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <p
                    className={`
                      mb-0 border-2 border-solid
                      border-gray-200 bg-gray-100 px-2
                    `}
                    key={tagIndex}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>
  )
}
