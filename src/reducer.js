import cuid                 from 'cuid'
import { combineReducers }  from 'redux'
import { types }            from './actions'

const initial = {
  status: { value: '', error: '' },
  docs: []
}

const configReducer = () => {
  const status = (state = initial.status, action) => {
    const { payload } = action
    switch (action.type) {
      case types.LOCATE_REQUEST: return Object.assign({}, state, { value: types.LOCATE_REQUEST })
      case types.LOCATE_SUCCESS: return Object.assign({}, state, { value: types.LOCATE_SUCCESS })
      case types.LOCATE_FAILURE: return Object.assign({}, state, { value: types.LOCATE_FAILURE, error: payload.error })
      default: return state
    }
  }

  const docs = (state = initial.docs, action) => {
    const { payload, __ns__ } = action
    switch(action.type) {
      case types.INSERT: return [ { ...payload, ns: __ns__, _id: payload._id ? payload._id : cuid() }, ...state ]
      case types.UPDATE: return state.map((doc) => doc._id === payload._id ? { ...doc, ...payload } :  doc)
      case types.REMOVE: return state.filter(doc => doc._id !== payload._id)
      default: return state
    }
  }

  return combineReducers({ status, docs })
}

export const reducer = configReducer()
