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
