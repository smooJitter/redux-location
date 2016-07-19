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

const doOnce = (value, beforeStatus = '') => status => {
  const result = status == value && beforeStatus != status
  beforeStatus = status
  return result
}

class LocationObserver extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      button: {
        style: styles.normal,
      },
    }
  }

  isOnceRequest = doOnce(types.LOCATE_REQUEST)
  isOnceSuccess = doOnce(types.LOCATE_SUCCESS)
  isOnceFailure = doOnce(types.LOCATE_FAILURE)

  updateButton = payload => this.setState({ button: { ...this.state.button, ...payload }})

  componentWillReceiveProps(nextProps) {
    const location = select(nextProps.location)
    const status = location.status()

    if (this.isOnceRequest(status)) this.updateButton({ style: styles.request })
    if (this.isOnceSuccess(status)) {
      this.updateButton({ style: styles.success })
      Promise.delay(2000).then(() => this.updateButton({ style: styles.normal }))
    }
    if (this.isOnceFailure(status)) this.updateButton({ style: styles.failure })
  }

  render() {
    const {
      button
    } = this.state

    return (
      <IconButton { ...button }>
        <IconBeenHere />
      </IconButton>
    )
  }
}

LocationObserver.propTypes = {
  location: PropTypes.object.isRequired
}

import {
  cyan100, green100, red100, yellow100
} from 'material-ui/styles/colors'

const styles = {
  normal:  { backgroundColor: cyan100 },
  request: { backgroundColor: yellow100 },
  success: { backgroundColor: green100 },
  failure: { backgroundColor: red100 }
}

export default LocationObserver
