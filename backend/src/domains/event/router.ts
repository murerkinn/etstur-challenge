import { AsyncRouter } from 'express-async-router'

import EventBridge from './bridge'

const router = AsyncRouter()

router.get('/:slug', req => {
  return EventBridge.getEventBySlug(req.params.slug)
})

export default router
