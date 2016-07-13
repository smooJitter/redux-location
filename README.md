## redux-location [![NPM version][npm-image]][npm-url] [![Gitter][gitter-image]][gitter-url]
Redux service to request and store multiple user geolocation

## FEATURES
* Service architecture (redux-manager powered)
* Journaling (redux-journal powered)
* PouchDB persist state (pouch-redux-middleware powered)

## INSTALL
### Stable
`npm i -S redux-location`
### Dev:
`npm i -S lokhmakov/redux-location`
## Examples
### REACT
`npm run react`

![alt tag](https://raw.githubusercontent.com/lokhmakov/redux-location/master/docs/redux-location%20react%20scene%201.gif)

![alt tag](https://raw.githubusercontent.com/lokhmakov/redux-location/master/docs/redux-location%20react%20scene%202.gif)

#### client.js
```js
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
```

#### component/location.js
```js
import React, { PropTypes } from 'react'
import { manager }          from 'redux-manager'
import { locationActions }  from 'redux-location'
import { locationSelect }   from 'redux-location'

import Badge                from 'material-ui/Badge'
import IconButton           from 'material-ui/IconButton'
import IconMyLocation       from 'material-ui/svg-icons/maps/my-location'

class Location extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { serviceName = 'location' } = props
    this.state = { serviceName }
  }

  serviceState = () => manager.getStore().getState()[this.state.serviceName]
  onRequest = () => { manager.dispatch(locationActions.locate(), this.state.serviceName) }

  render() {
    const state = this.serviceState()
    const badgeContent = state ? locationSelect.docsNumber(state) : 0

    return (
      <Badge
        {...{ badgeContent }}
        badgeStyle={ styles.badge }
        secondary={ true }
      >
        <IconButton tooltip='location' onClick={ this.onRequest }>
          <IconMyLocation />
        </IconButton>
      </Badge>
    )
  }
}

Location.propTypes = { serviceName: PropTypes.string }

const styles = {
  badge: { top: 12, right: 12 }
}

export default Location
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

[npm-url]: https://npmjs.org/package/redux-location
[npm-image]: https://img.shields.io/npm/v/redux-location.svg?style=flat

[gitter-url]: https://gitter.im/lokhmakov/redux-manager?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
