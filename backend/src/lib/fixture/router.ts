import { AsyncRouter } from 'express-async-router'
import generateMockData from './generate-mock-data'

const router = AsyncRouter()

router.post('/', async () => {
  await generateMockData()

  return { message: 'Mock data generated successfully' }
})

export default router
