require('redux-journal').enable()

import PouchDB              from 'pouchdb'

const db = PouchDB('data/location', { db: require('memdown') })

import { manager }          from 'redux-manager'
import { locationActions }  from 'redux-location'
import { locationLocal }    from 'redux-location'
import { locationPersist }  from 'redux-location'

locationLocal()
locationPersist({ db })

manager.enableLogger(require('redux-node-logger')())
manager.getStore()

manager.dispatch(locationActions.insert({ name: 'n1' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n2' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n3' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n4' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n5' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n6' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n7' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n8' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n9' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n10' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n11' }), 'location')
manager.dispatch(locationActions.insert({ name: 'n12' }), 'location')
