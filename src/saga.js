import { write, error }           from 'redux-journal'
import { manager }                from 'redux-manager'
import { delay }                  from 'redux-saga'
import { call, fork, put, take }  from 'redux-saga/effects'
import { select as selectState }  from 'redux-saga/effects'
import { types }                  from './actions'
import { TAGS }                   from './config'
import { select }                 from './select'

const tags = `${TAGS}.saga`

export const configSaga = () => {
  const api = (serviceName) => {
    const API = manager.api.get(serviceName)
    if (!API) {
      const ERROR = `manager.api.get('${serviceName}') == undefined`
      write(ERROR, `${tags}.configSaga.api`)
      throw new Error(ERROR)
    }
    return API
  }

  function *locate(action) {
    const { __ns__ } = action
    write(`(action: { __ns__: '${__ns__}' })`, `${tags}.*locate`)
    try {
      yield put({ __ns__, type: types.LOCATE_REQUEST })
      const position = yield call(api(__ns__).locate, action.payload)
      yield put({ __ns__, type: types.INSERT, payload: { ...position }})
      yield put({ __ns__, type: types.LOCATE_SUCCESS })
    } catch (e) {
      error(e)
      yield put({ __ns__, type: types.LOCATE_FAILURE, payload: { error: e }})
    }
  }

  function *locateDelayed(action) {
    const { __ns__, payload } = action
    write(`(action: { __ns__: '${__ns__}' })`, `${tags}.*locateDelayed`)
    try {
      yield put({ __ns__, type: types.LOCATE_REQUEST })
      yield call(delay, payload.delay)
      const state = yield selectState(state => state[__ns__])
      const location$ = select(state)
      if (!payload.check || (payload.check && !location$.docs.length())) {
          const position = yield call(api(__ns__).locate, action.payload)
          yield put({ __ns__, type: types.INSERT, payload: { ...position }})
      }
      yield put({ __ns__, type: types.LOCATE_SUCCESS })
    } catch (e) {
      error(e)
      yield put({ __ns__, type: types.LOCATE_FAILURE, payload: { error: e }})
    }
  }

  function *watchLocate() {
    while (true) {
      const action = yield take(types.LOCATE)
      const { payload = {} } = action
      if (payload.delay) {
        yield fork(locateDelayed, action)
      } else {
        yield fork(locate, action)
      }
    }
  }

  function *docsMaxOverRemove(action) {
    const { __ns__ } = action
    write(`(action: { __ns__: '${__ns__}' })`, `${tags}.docsMaxOverRemove`)
    const state = yield selectState(state => state[__ns__])
    const location$ = select(state)
    if (location$.config.docsMaxOverRemove()) {
      const docsMax = location$.config.docsMax()
      const length  = location$.docs.length()
      const last = location$.docs.last()
      if (length > docsMax) {
        write(`REMOVE ${last._id}`, `${tags}.docsMaxOverRemove`)
        yield put({ __ns__, type: types.REMOVE, payload: { _id: last._id }})
      }
    }
  }

  function *watchInsert() {
    while (true) {
      const action = yield take(types.INSERT)
      yield fork(docsMaxOverRemove, action)
    }
  }

  function *root() {
    yield fork(watchLocate)
    yield fork(watchInsert)
  }

  return { root }
}

export const saga = configSaga()
