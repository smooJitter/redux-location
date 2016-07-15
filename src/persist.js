import { manager }                from 'redux-manager'
import { configMiddlewarePouch }  from 'redux-manager'
import { PERSIST, SERVICE }       from './config'
import { types }                  from './actions'

export const configPersist = ({ db, serviceList = [SERVICE] }) => {
  let services = {}
  serviceList.map(serviceName => services[serviceName] = {
    INSERT: types.INSERT,
    REMOVE: types.REMOVE,
    UPDATE: types.UPDATE
  })
  manager.middleware.set(PERSIST, configMiddlewarePouch({ db, services }))
}
