import { connect }          from 'react-redux'
import LocationBadge        from './location.badge'
import { SERVICE }          from '../config'

export default connect(state => ({ location: state[SERVICE] }))(LocationBadge)
