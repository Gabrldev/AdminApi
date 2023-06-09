/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Router } from 'express'
import { readdirSync } from 'fs'

const PATH_ROUTER = `${__dirname}`

const router = Router()

const cleanFileName = (fileName: string): string | undefined => {
  const file = fileName.split('.').shift()
  return file
}
readdirSync(PATH_ROUTER).filter((fileName: string) => {
  const cleanName = cleanFileName(fileName)
  if (cleanName !== 'index') {
    void import(`./${cleanName}`).then((module) => {
      console.log(`Route ${cleanName} loaded`)

      router.use(`/api/${cleanName}`, module.router)
    })
  }
})

export { router }
