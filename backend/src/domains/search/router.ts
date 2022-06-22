import { AsyncRouter } from 'express-async-router'
import SearchManager from './manager'

const router = AsyncRouter()

router.get('/', async req => {
  return SearchManager.search(req.query)
})

router.get('/popular', async req => {
  return SearchManager.getPopularEvents()
})

export default router
