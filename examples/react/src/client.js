require('redux-journal').enable()

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import PouchDB              from 'pouchdb'

import { manager }          from 'redux-manager'
import { locationLocal }    from 'redux-location'
import { locationPersist }  from 'redux-location'

const service1 = 'location'
const service2 = 'location2'
const service3 = 'location3'

locationLocal()
locationPersist({ db: PouchDB('redux-location')})

locationLocal(service2)
locationLocal(service3)

manager.enableLogger(require('redux-logger')())
const store = manager.getStore()

import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'
import { connect }          from 'react-redux'

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme          from 'material-ui/styles/getMuiTheme'
import { deepOrange500 }    from 'material-ui/styles/colors'

import LocationBadge        from 'redux-location/react/location.badge'
import LocationButton       from 'redux-location/react/location.button'
import LocationObserver     from 'redux-location/react/location.observer'

const LocationBadge1 = connect(state => ({ location: state[service1] }))(LocationBadge)
const LocationBadge2 = connect(state => ({ location: state[service2] }))(LocationBadge)
const LocationBadge3 = connect(state => ({ location: state[service3] }))(LocationBadge)
const LocationButton3 = connect(state => ({ location: state[service3] }))(LocationButton)
const LocationObserver3 = connect(state => ({ location: state[service3] }))(LocationObserver)

const muiTheme = getMuiTheme({ palette: { accent1Color: deepOrange500 }})

const render = () => ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <LocationBadge1   serviceName={ service1 } />
        <LocationBadge2   serviceName={ service2 } />
        <LocationBadge3   serviceName={ service3 } />
        <LocationButton3  serviceName={ service3 } />
        <LocationObserver3 />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)



render()
