import PouchMiddleware            from 'pouch-redux-middleware'
import { manager }                from 'redux-manager'
import { configMiddlewarePouch }  from './middleware/middleware.pouch'
import { PERSIST }                from './config'

export const configPersist = ({ db, services }) => manager.middleware.set(PERSIST,
  PouchMiddleware(configMiddlewarePouch({
    db, services
  }))
)
