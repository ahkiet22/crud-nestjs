import { plainToInstance } from 'class-transformer'
import { IsString, validateSync, ValidationError } from 'class-validator'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({
  path: '.env',
})

// check file .env
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Not found file .env')
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string

  @IsString()
  ACCESS_TOKEN_SECRET: string

  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string

  @IsString()
  REFRESH_TOKEN_SECRET: string

  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}

const configServer = plainToInstance(ConfigSchema, process.env)
const errorArray: ValidationError[] = validateSync(configServer)
if (errorArray.length > 0) {
  const errors = errorArray.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    }
  })
  throw errors
}

const envConfig = configServer

export default envConfig
