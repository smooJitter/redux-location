import { configAPILocal }     from './api/api.local'
import { configServiceLocal } from './service/service.local'

import { types, actions }     from './actions'
import * as config            from './config'
import { configPersist }      from './persist'
import { reducer }            from './reducer'
import { saga, configSaga }   from './saga'
import { select }             from './select'
import { prepareStore }       from './store'

export {
  actions               as locationActions,
  config                as locationConfig,
  configAPILocal        as locationConfigAPILocal,
  configPersist         as locationPersist,
  configServiceLocal    as locationLocal,
  configSaga            as locationConfigureSaga,
  prepareStore          as locationPrepareStore,
  reducer               as locationReducer,
  saga                  as locationSaga,
  select                as locationSelect,
  types                 as locationTypes,
}
