import { write }                from 'redux-journal'
import { manager }              from 'redux-manager'
import createSagaMiddleware     from 'redux-saga'
import { TAGS, SAGA }           from './config'
import { reducer }              from './reducer'
import { saga }                 from './saga'

const tags = `${TAGS}.saga`

export const prepareStore = (serviceName = 'location') => {
  write(`(serviceName = '${ serviceName }')`, `${tags}.prepareStore`)
  manager.enableSaga(createSagaMiddleware())
  manager.reducer.set(serviceName, reducer, true)
  manager.saga.set(SAGA, saga.root)
}
