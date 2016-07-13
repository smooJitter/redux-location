import { write, error }           from 'redux-journal'
import { manager }                from 'redux-manager'
import { call, fork, put, take }  from 'redux-saga/effects'
import { types }                  from './actions'
import { TAGS }                   from './config'

const tags = `${TAGS}.saga`

export const configSaga = () => {
  const api = (serviceName) => {
    const API = manager.api.get(serviceName)
    if (!API) throw new Error(`manager.api.get('${serviceName}') == undefined`)
    return API
  }

  function *locate(action) {
    const { __ns__ } = action
    write(`(action: { __ns__: ${__ns__} })`, `${tags}.*locate`)
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

  function *watchLocate() {
    while (true) {
      const action = yield take(types.LOCATE)
      yield fork(locate, action)
    }
  }

  function *root() {
    yield fork(watchLocate)
  }

  return { root, locate }
}

export const saga = configSaga()
