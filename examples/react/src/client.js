require('react-tap-event-plugin')()
require('redux-journal').enable()

import { write }            from 'redux-journal'

import PouchDB              from 'pouchdb'
import { locationConfig }   from 'redux-location'

require('redux-location').locationLocal()
require('redux-location').locationPersist({ db: PouchDB(locationConfig.SERVICE), serviceList: [locationConfig.SERVICE] })

import { manager }          from 'redux-manager'

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

const tags = `${locationConfig.TAGS}.examples.react.client`

const onTouchTap = () => {
  write(``, `${tags}.onTouchTap`)
}

const render = () => ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <LocationBadge/>
        <LocationButton { ...{ onTouchTap } } />
        <LocationObserver/>
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

render()
