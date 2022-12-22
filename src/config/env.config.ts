import { config } from 'dotenv'
import { join } from 'path'

export function getEnvConfig() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const appRoot = join(__dirname, '../', '../')
  const enfFilePath = isDevelopment ? join(appRoot, '.development.env') : join(appRoot, '.env')
  config({ path: enfFilePath })
}
