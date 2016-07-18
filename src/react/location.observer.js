import Promise              from 'bluebird'
import React, { PropTypes } from 'react'
import { connect }          from 'react-redux'
import { write, warning }   from 'redux-journal'
import { manager }          from 'redux-manager'

import IconButton           from 'material-ui/IconButton'
import IconBeenHere         from 'material-ui/svg-icons/maps/beenhere'

import { types }            from '../actions'
import { TAGS, SERVICE }    from '../config'
import { select }           from '../select'

const tags = `${TAGS}.react.location.observer`

const doIsOnceSuccess = (beforeStatus = '') => status => {
  if (status == types.LOCATE_SUCCESS && beforeStatus != status) {
    beforeStatus = status
    return true
  }
  beforeStatus = status
}

class LocationObserver extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      styleIconButton: styles.normal
    }
  }

  componentWillReceiveProps(nextProps) {
    const location = select(nextProps.location)
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
    return (
      <IconButton style={ this.state.styleIconButton }>
        <IconBeenHere />
      </IconButton>
    )
  }
}

LocationObserver.propTypes = {
  location: PropTypes.object.isRequired
}

import {
  green100, yellow100
} from 'material-ui/styles/colors'

const styles = {
  normal:  { backgroundColor: yellow100 },
  success: { backgroundColor: green100 }
}

export { LocationObserver as LocationObserver$ }
export default connect(state => ({ location: state[SERVICE] }))(LocationObserver)
