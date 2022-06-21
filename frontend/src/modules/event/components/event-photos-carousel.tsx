import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '@/components/button'

import { Photo } from '../store/types'

type Props = {
  photos: Photo[]
}

const EventPhotosCarousel = ({ photos }: Props) => {
  return (
    <Swiper
      className="event-photos-carousel carousel"
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
      {photos.map(photo => (
        <SwiperSlide key={photo._id} className="event-photos-carousel-slide">
          <img src={photo.url} alt={photo.description} />
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

export default EventPhotosCarousel
