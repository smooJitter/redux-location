import { warning }          from 'redux-journal'
import { TAGS }             from './config'

const tags = `${TAGS}.select`

export const select = (state) => {
  if (!state) warning(`state is ${state}`, `${tags}`)

  const status = ()      => state.status.value
  const error  = ()      => state.status.error

  let docs = {}
  docs.byIndex = (index) => state.docs[index]
  docs.first   = ()      => state.docs[0]
  docs.last    = ()      => state.docs[state.docs.length - 1]
  docs.length  = ()      => state.docs.length

  let config = {}
  config.docsMax           = () => state.config.docsMax
  config.docsMaxOverRemove = () => state.config.docsMaxOverRemove

  return { config, docs, status, error }
}

