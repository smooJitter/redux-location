import { configAPILocal }         from './api/api.local'
import { configMiddlewarePouch }  from './middleware/middleware.pouch'
import { configServiceLocal }     from './service/service.local'

import { types, actions }         from './actions'
import * as config                from './config'
import { configPersist }          from './persist'
import { reducer }                from './reducer'
import { saga, configSaga }       from './saga'
import { select }                 from './select'
import { prepareStore }           from './store'

export {
  actions               as locationActions, actions,
  config                as locationConfig, config,
  configAPILocal        as locationConfigAPILocal, configAPILocal,
  configMiddlewarePouch as locationConfigMiddlewarePouch, configMiddlewarePouch,
  configPersist         as locationPersist, configPersist,
  configServiceLocal    as locationLocal, configServiceLocal,
  configSaga            as locationConfigureSaga, configSaga,
  prepareStore          as locationPrepareStore, prepareStore,
  reducer               as locationReducer, reducer,
  saga                  as locationSaga, saga,
  select                as locationSelect, select,
  types                 as locationTypes, types,
}
