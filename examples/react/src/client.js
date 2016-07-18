require('redux-journal').enable()

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import PouchDB              from 'pouchdb'

import { manager }          from 'redux-manager'
import { locationConfig }   from 'redux-location'

require('redux-location').locationLocal()
require('redux-location').locationPersist({ db: PouchDB('redux-location'), serviceList: [locationConfig.SERVICE] })

manager.enableLogger(require('redux-logger')())
const store = manager.getStore()

import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme          from 'material-ui/styles/getMuiTheme'

import { LocationBadge }    from 'redux-location'
import { LocationButton }   from 'redux-location'
import { LocationObserver } from 'redux-location'

const muiTheme = getMuiTheme({ palette: { accent1Color: require('material-ui/styles/colors').deepOrange500 }})

const render = () => ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <LocationBadge/>
        <LocationButton/>
        <LocationObserver/>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

render()
