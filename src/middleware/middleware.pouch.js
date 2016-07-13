import { manager }  from 'redux-manager'
import { types }    from '../actions'
import { SERVICE }  from '../config'

export function configMiddlewarePouch({ db, services = [ SERVICE ] }) {
  return services.map((service) => {
    return   {
      path: `/${service}/docs`,
      db,
      actions: {
        insert: payload => manager.dispatch({ type: types.INSERT, payload }, payload.ns),
        remove: payload => manager.dispatch({ type: types.REMOVE, payload }, payload.ns),
        update: payload => manager.dispatch({ type: types.UPDATE, payload }, payload.ns)
      },
      changeFilter: doc => doc.ns == service
    }
  })
}
