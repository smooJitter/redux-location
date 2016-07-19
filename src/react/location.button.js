import Promise              from 'bluebird'
import React, { PropTypes } from 'react'
import { write, warning }   from 'redux-journal'
import { manager }          from 'redux-manager'
import { locationActions }  from 'redux-location'
import { locationSelect }   from 'redux-location'

import IconButton           from 'material-ui/IconButton'
import IconMyLocation       from 'material-ui/svg-icons/maps/my-location'

import { TAGS, SERVICE }    from '../config'

const tags = `${TAGS}.react.location.button`

class LocationButton extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { serviceName = SERVICE } = props
    this.state = {
      serviceName,

      button: {
        tooltip: 'location',
        tooltipPosition: this.props.tooltipPosition || 'bottom-left',
        onTouchTap: this.onTouchTap,
      },
    }
  }

  componentDidMount() {
    manager.dispatch(locationActions.locateDelayed({ check: true, delay: 2000 }), this.state.serviceName)
  }

  componentWillReceiveProps(nextProps) {
    const location = locationSelect(nextProps.location)
    const doc = location.docs.first()
    if (doc && doc.lat && doc.lng) {
      this.setState({ textLocation: `location (${Number(doc.lat).toFixed(2)}, ${Number(doc.lng).toFixed(2)})` })
    }
  }

  onTouchTap = () => {
    manager.dispatch(locationActions.locateDelayed({ delay: 2000 }), this.state.serviceName)
    if (this.props.onTouchTap) this.props.onTouchTap()
  }

  render() {
    write(``, `${tags}.render`)
    return (
      <IconButton { ...this.state.button }>
        <IconMyLocation />
      </IconButton>
    )
  }
}

LocationButton.propTypes = {
  location:         PropTypes.object.isRequired,
  serviceName:      PropTypes.string,
  tooltipPosition:  PropTypes.string,
  onTouchTap:       PropTypes.func,
}

export default LocationButton
