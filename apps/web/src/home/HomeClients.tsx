import { TestimonialSection } from './TestimonialSection'

const Testimonial = () => {
  return null
}

export const HomeClients = () => {
  return (
    <section id="home-client" style={{ padding: '2rem 0' }}>
<<<<<<< HEAD
      <TestimonialSection />
=======
      <Row gutter={[padding.sm, padding.sm]} align="middle">
        <Col span={24}>
          <Space
            align="center"
            direction="vertical"
            style={{ display: 'flex' }}
          >
            <Typography.Title level={4}>
              Serving startups all around the world
            </Typography.Title>
            <Space align="center" size={50}>
              {range(0, 5).map((_, i) => (
                <Image
                  width="200"
                  src={imageUrl}
                  key={`${i}` as string}
                  preview={false}
                />
              ))}
            </Space>
          </Space>
        </Col>
      </Row>
>>>>>>> 054cbd416 (ci: fix slack username notification)
    </section>
  )
}
