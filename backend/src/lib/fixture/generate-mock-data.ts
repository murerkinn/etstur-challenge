import casual from 'casual'
import times from 'lodash/times'
import moment from 'moment'

import cities from '@/constants/cities'
import AccountManager from '@/domains/account/manager'
import { PartnerDocument } from '@/domains/account/models/partner'
import CategoryManager from '@/domains/category/manager'
import EventManager from '@/domains/event/manager'
import OrganizationManager from '@/domains/organization/manager'
import TicketManager from '@/domains/ticket/manager'

const PLACEHOLDER_BASE_URL = 'https://via.placeholder.com/1200x800/'

const generateRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateCategories = async () => {
  const categoryNamesToGenerate = ['Music', 'Stage', 'Education', 'Family']

  const categories = []

  for (const categoryName of categoryNamesToGenerate) {
    const category = await CategoryManager.createCategory({
      name: categoryName,
    })

    categories.push(category)
  }

  return categories
}

const generateRandomColor = () =>
  Math.floor(Math.random() * 16777215).toString(16)

const generatePhotos = (eventSlug: string) => {
  const countOfPhotos = generateRandomNumberBetween(0, 8)

  if (countOfPhotos === 0)
    return [
      {
        url: PLACEHOLDER_BASE_URL + '?Text=Placeholder',
        description: 'Placeholder',
      },
    ]

  const photos = []

  for (let i = 1; i <= countOfPhotos; i++) {
    const photoDescription = eventSlug + ' - ' + i
    const photoUrl =
      PLACEHOLDER_BASE_URL + generateRandomColor() + '?Text=' + photoDescription

    photos.push({
      url: photoUrl,
      description: photoDescription,
    })
  }

  return photos
}

export default async function generateMockData() {
  const categories = await generateCategories()

  const promises = times(20, async () => {
    const partner = await AccountManager.createPartner({
      firstName: casual.first_name,
      lastName: casual.last_name,
      email: casual.email,
      password: 'Asdf123*',
    })

    const organizationName = casual.company_name

    const organizationData = {
      name: organizationName,
      photo: {
        url:
          PLACEHOLDER_BASE_URL +
          generateRandomColor() +
          '?Text=' +
          organizationName,
        description: organizationName,
      },
    }

    const organization = await OrganizationManager.createOrganization({
      ...organizationData,
      owner: partner as PartnerDocument,
    })

    const eventPromises = times(50, async () => {
      const category =
        categories[generateRandomNumberBetween(0, categories.length - 1)]

      const dayDiff = generateRandomNumberBetween(-600, 300)

      let startsAt

      if (dayDiff >= 0) {
        startsAt = moment.utc().add(dayDiff, 'days')
      } else {
        startsAt = moment.utc().subtract(Math.abs(dayDiff), 'days')
      }

      const endsAt = moment
        .utc(startsAt)
        .add(generateRandomNumberBetween(1, 7), 'days')

      const cityData = cities[generateRandomNumberBetween(0, cities.length - 1)]

      const eventName =
        'Event about ' + category.name + ' of ' + organization.name

      const event = await EventManager.createEvent({
        name: eventName,
        category: category._id,
        description: casual.text,
        free: casual.boolean,
        organizator: organization._id,
        organizationName: organization.name,
        startsAt: startsAt.toDate(),
        endsAt: endsAt.toDate(),
        photos: [],
        location: {
          type: 'Point',
          coordinates: cityData.coordinates,
        },
        address: {
          city: cityData.city.toLowerCase(),
          country: 'TR',
          street: 'Street',
          zipCode: '12345',
        },
      })

      event.photos = generatePhotos(event.slug)
      event.soldTicketCount = generateRandomNumberBetween(0, 400)

      await event.save()

      if (!event.free) {
        const ticketSeriesCount = generateRandomNumberBetween(1, 5)
        const baseTicketPrice = generateRandomNumberBetween(100, 5000)

        for (let i = 1; i <= ticketSeriesCount; i++) {
          const ticketCountForEvent = generateRandomNumberBetween(1, 50)

          const ticketPromises = Array.from(
            { length: ticketCountForEvent },
            async () => {
              await TicketManager.createTicket({
                event: event._id,
                price: baseTicketPrice * i,
                series: 'Series - ' + i,
              })
            }
          )

          await Promise.all(ticketPromises)
        }
      }
    })

    await Promise.all(eventPromises)
  })

  await Promise.all(promises)
}
