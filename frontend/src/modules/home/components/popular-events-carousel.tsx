import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import Link from 'next/link'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/components/button'
import { Event } from '@/modules/event/store/types'

type Props = {
  events: Event[]
}

const PopularEventsCarousel = ({ events }: Props) => {
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
            <Link href={`/events/${event.slug}`} passHref>
              <a>
                <h3 className="popular-events-carousel-slide-title">
                  {event.name}
                </h3>
              </a>
            </Link>
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
