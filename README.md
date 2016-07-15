## redux-location [![NPM version][npm-image]][npm-url] [![Discord][discord-image]][discord-url]
===============================================================================================
Redux service to request and store multiple user geolocation

![alt tag](https://raw.githubusercontent.com/lokhmakov/redux-location/master/docs/redux-location%20react%20scene%201.gif)

![alt tag](https://raw.githubusercontent.com/lokhmakov/redux-location/master/docs/redux-location%20react%20scene%202.gif)

## FEATURES
* Service architecture (redux-manager powered)
* Journaling (redux-journal powered)
* PouchDB persist state (pouch-redux-middleware powered)

## INSTALL
### Stable
`npm i -S redux-location`
### Dev
`npm i -S lokhmakov/redux-location`

## EXAMPLES
### REACT
`npm run react`

#### client.js
```js
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

locationLocal({ serviceName: service1 })
locationPersist({ db: PouchDB('redux-location'), serviceList: [service1] })

locationLocal({ serviceName: service2 })
locationLocal({ serviceName: service3 })

manager.enableLogger(require('redux-logger')())
const store = manager.getStore()

import React                from 'react'
import ReactDOM             from 'react-dom'
import { Provider }         from 'react-redux'
import { connect }          from 'react-redux'

import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme          from 'material-ui/styles/getMuiTheme'

import { LocationBadge }    from 'redux-location'
import { LocationButton }   from 'redux-location'
import { LocationObserver } from 'redux-location'

const LocationBadge1    = connect(state => ({ location: state[service1] }))(LocationBadge)
const LocationBadge2    = connect(state => ({ location: state[service2] }))(LocationBadge)
const LocationBadge3    = connect(state => ({ location: state[service3] }))(LocationBadge)
const LocationButton3   = connect(state => ({ location: state[service3] }))(LocationButton)
const LocationObserver3 = connect(state => ({ location: state[service3] }))(LocationObserver)

const muiTheme = getMuiTheme({ palette: { accent1Color: require('material-ui/styles/colors').deepOrange500 }})

const render = () => ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <LocationBadge1 serviceName={ service1 } />
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

```

### NODE-API
`npm run node`

```js
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
```

### PERSIST
`npm run persist`

![alt tag](https://raw.githubusercontent.com/lokhmakov/redux-location/master/docs/redux-location%20node-persist%20scene%201.gif)

```js
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
```

[npm-url]: https://npmjs.org/package/redux-location
[npm-image]: https://img.shields.io/npm/v/redux-location.svg?style=flat

[discord-url]: https://discord.gg/CSJq3CU
[discord-image]: https://discordapp.com/api/servers/203409883263926272/widget.png?style=button
