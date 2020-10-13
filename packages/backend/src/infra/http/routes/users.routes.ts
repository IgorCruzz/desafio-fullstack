import { Router } from 'express'
import UserController from '@presentation/controllers/UsersController'

const usersController = new UserController()
const router = Router()

router.post('/', usersController.create)

export default router
