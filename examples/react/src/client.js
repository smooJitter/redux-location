require('redux-journal').enable()

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import { manager }          from 'redux-manager'
import { locationLocal }    from 'redux-location'

const service2 = 'location2'
const service3 = 'location3'

locationLocal()
locationLocal(service2)
locationLocal(service3)

manager.enableLogger(require('redux-logger')())
const store = manager.getStore()

import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme          from 'material-ui/styles/getMuiTheme'
import { deepOrange500 }    from 'material-ui/styles/colors'

import Location             from './component/location'

const muiTheme = getMuiTheme({ palette: { accent1Color: deepOrange500 }})

const render = () => ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <Location />
        <Location serviceName={ service2 } />
        <Location serviceName={ service3 } />
      </div>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

render()
store.subscribe(render)
