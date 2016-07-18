import { connect }          from 'react-redux'
import LocationBadge        from './location.badge.src'
import { SERVICE }          from '../config'

export default connect(state => ({ location: state[SERVICE] }))(LocationBadge)
