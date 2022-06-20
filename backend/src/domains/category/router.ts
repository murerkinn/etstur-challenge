import { AsyncRouter } from 'express-async-router'
import CategoryManager from './manager'

const router = AsyncRouter()

router.get('/', () => {
  return CategoryManager.listCategories()
})

export default router
