import Promise              from 'bluebird'
import React, { PropTypes } from 'react'
import { write, warning }   from 'redux-journal'
import { manager }          from 'redux-manager'
import { locationSelect }   from 'redux-location'
import { locationTypes }    from 'redux-location'

import IconButton           from 'material-ui/IconButton'
import IconBeenHere         from 'material-ui/svg-icons/maps/beenhere'

const doIsOnceSuccess = () => {
  let beforeStatus = ''
  return (status) => {
    if (status == locationTypes.LOCATE_SUCCESS && beforeStatus != status) {
      beforeStatus = status
      return true
    }
    beforeStatus = status
  }
}

class LocationObserver extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      styleIconButton: styles.normal
    }
  }

  componentWillReceiveProps() {
    const location = locationSelect(this.props.location)
    const status = location.status()
    if (this.isOnceSuccess(status)) {
      this.setState({ styleIconButton: styles.success })
      Promise.delay(500).then(() => {
        this.setState({ styleIconButton: styles.normal })
      })
    }
  }

  isOnceSuccess = doIsOnceSuccess()

  render() {
    write('', 'location.observer.render')

    return (
      <IconButton style={ this.state.styleIconButton }>
        <IconBeenHere />
      </IconButton>
    )
  }
}

import {
  green100, yellow100
} from 'material-ui/styles/colors'

const styles = {
  normal:  { backgroundColor: yellow100 },
  success: { backgroundColor: green100 }
}

export default LocationObserver
