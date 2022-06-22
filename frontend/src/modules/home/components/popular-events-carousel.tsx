import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/components/button'

const events = Array.from({ length: 10 }, (_, i) => ({
  _id: i,
  name: 'Event ' + i,
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, delectus? Aliquam, provident! Quis eaque harum doloribus? Quo illum autem eius.`,
  photos: [{ url: '/images/slide.jpg', description: 'Slide' }],
}))

const PopularEventsCarousel = () => {
  return (
    <Swiper
      className="popular-events-carousel carousel"
      slidesPerView={1}
      modules={[Navigation, Pagination]}
      pagination={{
        dynamicBullets: true,
      }}
      navigation={{
        prevEl: '.carousel-prev',
        nextEl: '.carousel-next',
      }}
    >
      {events.map(event => (
        <SwiperSlide key={event._id} className="popular-events-carousel-slide">
          <img
            className="popular-events-carousel-slide-image"
            src={event.photos[0].url}
            alt={event.photos[0].description}
          />

          <div className="popular-events-carousel-slide-details">
            <h3 className="popular-events-carousel-slide-title">
              {event.name}
            </h3>
            <p className="popular-events-carousel-slide-description">
              {event.description}
            </p>
          </div>
        </SwiperSlide>
      ))}

      <Button className="carousel-prev" variant="icon-only">
        <KeyboardArrowLeft />
      </Button>

      <Button className="carousel-next" variant="icon-only">
        <KeyboardArrowRight />
      </Button>
    </Swiper>
  )
}

export default PopularEventsCarousel
