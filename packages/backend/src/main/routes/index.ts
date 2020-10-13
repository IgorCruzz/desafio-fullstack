import { Router } from 'express'
import usersRouter from '@infra/http/routes/users.routes'
import sessionsRouter from '@infra/http/routes/sessions.routes'

const router = Router()

router.use('/account/create', usersRouter)
router.use('/session', sessionsRouter)

export default router
