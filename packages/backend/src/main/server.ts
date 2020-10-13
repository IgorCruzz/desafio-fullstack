import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import './typeorm'
import './container'
import routes from './routes'
import AppError from '@validation/errors/AppError'
import ValidationError from '@validation/errors/ValidationError'
// import morgan from 'morgan'
// import { getMorganLogLevel } from './http/helpers/morganHelpers'

const PORT = 3333
const HOST = '0.0.0.0'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
// app.use(morgan(getMorganLogLevel))

// Global Exception Handling: if the error is known is returned an friendly response
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status_code).json({
      status: 'error',
      message: err.message
    })
  }

  if (err instanceof ValidationError) {
    return response.status(err.status_code).json({
      status: 'Validation Error',
      messages: err.message
    })
  }
  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT}!`)
})
