import { write }              from 'redux-journal'
import { manager }            from 'redux-manager'
import { TAGS, SERVICE }      from '../config'
import { prepareStore }       from '../store'
import { configAPILocal }     from '../api/api.local'

const tags = `${TAGS}.service.local`

export const configServiceLocal = (
  { serviceName = SERVICE } =
  { serviceName:  SERVICE }
) => {
  write(`({ serviceName = '${serviceName}' })`, `${tags}.configServiceLocal`)
  prepareStore(serviceName)
  return manager.api.set(serviceName, configAPILocal())
}
