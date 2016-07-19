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

class LocationBadge extends React.Component {
  constructor(props, context) {
    super(props, context)
    const { serviceName = SERVICE } = props
    const location = locationSelect(props.location)
    this.state = {
      serviceName,

      badge: {
        badgeContent: 0,
        badgeStyle: styles.badge,
        secondary: true,
      },

      button: {
        tooltip: 'location',
        onTouchTap: this.request,
      },
    }
  }

  componentDidMount = () => {
    manager.dispatch(locationActions.locate({ check: true, delay: 2000 }), this.state.serviceName)
  }

  updateBadge = (payload) => this.setState({ badge: { ...this.state.badge, ...payload }})

  componentWillReceiveProps(nextProps) {
    const location$ = locationSelect(nextProps.location)
    const badgeContent = location$.docs.length()
    this.updateBadge({ badgeContent })
  }

  render() {
    const {
      badge,
      button
    } = this.state

    return (
      <Badge { ...badge }>
        <IconButton { ...button }>
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
