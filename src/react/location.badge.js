import Promise              from 'bluebird'
import React, { PropTypes } from 'react'
import { write }            from 'redux-journal'
import { manager }          from 'redux-manager'
import { locationActions }  from 'redux-location'
import { locationSelect }   from 'redux-location'

import Badge                from 'material-ui/Badge'
import IconButton           from 'material-ui/IconButton'
import IconMyLocation       from 'material-ui/svg-icons/maps/my-location'

import { TAGS, SERVICE }    from '../config'

const tags = `${TAGS}.react.location.badge`

const oneDelayedRequest = (delay, callback, promise) =>
  () => promise = promise ? promise : Promise.delay(delay)
    .then(() => {
      callback()
      promise = undefined
    })

class LocationBadge extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { serviceName = SERVICE } = props
    const location = locationSelect(props.location)
    this.state = {
      badgeContent: 0,
      serviceName
    }
  }

  componentDidMount = () => {
    Promise.delay(2000).then(() => {
      const location = locationSelect(this.props.location)
      const doc = location.docs.first()
      if (!doc) this.request()
    })
  }

  componentWillReceiveProps(nextProps) {
    const location = locationSelect(nextProps.location)
    if (location) {
      this.setState({ badgeContent: location.docs.length() })
    }
  }

  request = oneDelayedRequest(2000, () => {
    manager.dispatch(locationActions.locate(), this.state.serviceName)
  })

  render() {
    return (
      <Badge
        badgeContent={ this.state.badgeContent }
        badgeStyle={ styles.badge }
        secondary={ true }
      >
        <IconButton tooltip='location' onClick={ this.request }>
          <IconMyLocation />
        </IconButton>
      </Badge>
    )
  }
}

LocationBadge.propTypes = {
  location:     PropTypes.object.isRequired,
  serviceName:  PropTypes.string
}

const styles = {
  badge: { top: 12, right: 12 }
}

export default LocationBadge
