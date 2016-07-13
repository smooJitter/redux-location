require('redux-journal').enable()

import PouchDB              from 'pouchdb'
import { manager }          from 'redux-manager'
import { locationActions }  from 'redux-location'
import { locationLocal }    from 'redux-location'
import { locationPersist }  from 'redux-location'

const db = PouchDB('data/location', { db: require('memdown') })

locationLocal()
locationPersist({ db })

manager.enableLogger(require('redux-node-logger')())
manager.getStore()

manager.dispatch(locationActions.insert({ lat: 'latitude', lng: 'longitude' }), 'location')
