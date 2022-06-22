import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import OrganizationService from '@/modules/organization/store/organization-service'
import { Organization } from '@/modules/organization/store/types'
import EventList from '@/modules/search/components/event-list'
import SearchService from '@/modules/search/store/search-service'

const OrganizationDetailsPage = () => {
  const { query } = useRouter()

  const [organization, setOrganization] = useState<Organization | null>(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrganization = async () => {
    setLoading(true)

    try {
      const organization_ = await OrganizationService.getOrganizationBySlug(
        query.slug as string
      )

      const { list: events_ } = await SearchService.search({
        organization: organization_._id,
        limit: '100000',
      })

      setOrganization(organization_)
      setEvents(events_)
    } catch (e: any) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!query.slug) return

    fetchOrganization()
  }, [query.slug])

  return (
    <>
      {!loading && organization ? (
        <main className="page organization-details-page">
          <div className="container">
            <section className="organization-info-container">
              <div className="organization-info">
                <img
                  src={organization.photo.url}
                  alt={organization.photo.description}
                />

                <div>
                  <h1 className="organization-name">{organization.name}</h1>

                  <h4 className="organization-enrollment-date">
                    {moment
                      .utc(organization.createdAt)
                      .format('[Member since] MMM, YYYY')}
                  </h4>
                </div>
              </div>
            </section>

            <section className="organization-events-section">
              <h2 className="organization-events-section-title">Events</h2>

              <EventList events={events} hideHeader hideNoData />
            </section>
          </div>
        </main>
      ) : null}
    </>
  )
}

export default OrganizationDetailsPage
