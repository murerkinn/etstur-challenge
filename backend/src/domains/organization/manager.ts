import Organization, {
  OrganizationDocument,
  OrganizationRaw,
} from './models/organization'
import AclManager from '@/domains/acl'
import { PartnerDocument } from '../account/models/partner'
import { PhotoRaw } from '../event/models/photo'

type CreateOrganizationData = OrganizationRaw & {
  owner: PartnerDocument
}

const createOrganization = async (rawOrganization: CreateOrganizationData) => {
  const defaultPhoto: PhotoRaw = {
    url: `https://via.placeholder.com/1200x800?Text=${rawOrganization.name}`,
    description: `Placeholder for ${rawOrganization.name}`,
  }

  const organization = await Organization.create({
    name: rawOrganization.name,
    photo: rawOrganization.photo || defaultPhoto,
  })

  await AclManager.generateRolesForOrganization(
    organization as OrganizationDocument,
    rawOrganization.owner
  )

  return organization
}

const getOrganizationById = async (id: string) => {
  const organization = await Organization.findOne({ _id: id })

  return organization
}

const OrganizationManager = {
  createOrganization,
  getOrganizationById,
}

export default OrganizationManager
