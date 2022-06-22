import { Photo } from '@/modules/event/store/types'

export type Organization = {
  _id: string
  name: string
  slug: string
  photo: Photo
  createdAt: string
}
