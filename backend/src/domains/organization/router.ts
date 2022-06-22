import { AsyncRouter } from 'express-async-router'
import OrganizationManager from './manager'

const router = AsyncRouter()

router.get('/:slug', req => {
  return OrganizationManager.getOrganizationBySlug(req.params.slug)
})

export default router
