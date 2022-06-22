import { API } from '@/lib/api'

const getOrganizationBySlug = async (slug: string) => {
  const { data } = await API.get(`/organization/${slug}`)

  return data
}

const OrganizationService = {
  getOrganizationBySlug,
}

export default OrganizationService
