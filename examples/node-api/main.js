require('redux-journal').enable()

import { write, error }   from 'redux-journal'
import { manager }        from 'redux-manager'
import { locationLocal }  from 'redux-location'

const api = locationLocal()

manager.enableLogger(require('redux-node-logger')())
manager.getStore()

api.locate().then((position) => {
  write(position)
}).catch((e) => {
  error(e)
})
