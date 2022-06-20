import { Enforcer, newEnforcer } from 'casbin'
import { MongooseAdapter } from 'casbin-mongoose-adapter'
import path from 'path'

import { PartnerDocument } from '@/domains/account/models/partner'
import { OrganizationDocument } from '@/domains/organization/models/organization'
import { mongoConnectionString } from '@/lib/mongo'

class Casbin {
  enforcer: Enforcer

  async init() {
    const model = path.resolve(__dirname, './acl_model.conf')
    const adapter = await MongooseAdapter.newSyncedAdapter(
      mongoConnectionString
    )

    this.enforcer = await newEnforcer(model, adapter)
  }

  async generateRolesForPartner(partner: PartnerDocument) {
    const partnerId = partner._id
    const partnerRole = `role:partner:${partnerId}`

    const policiesToAdd = [[partnerRole, 'organization', 'create']]

    await this.enforcer.addPolicies(policiesToAdd)
    await this.enforcer.addRoleForUser(partnerId, partnerRole)
  }

  async generateRolesForOrganization(
    organization: OrganizationDocument,
    partner: PartnerDocument
  ) {
    const partnerId = partner._id
    const organizationOwnerRole = `role:owner:${organization._id}`
    const organizationResource = `organization:${organization._id}`

    const policiesToAdd = [
      [organizationOwnerRole, organizationResource, 'edit'],
      [organizationOwnerRole, organizationResource, 'delete'],
    ]

    await this.enforcer.addPolicies(policiesToAdd)
    await this.enforcer.addRoleForUser(partnerId, organizationOwnerRole)
  }
}

const AclManager = new Casbin()

export default AclManager
