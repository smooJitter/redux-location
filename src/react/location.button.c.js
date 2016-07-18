import { connect }          from 'react-redux'
import LocationButton       from './location.button'
import { SERVICE }          from '../config'

export default connect(state => ({ location: state[SERVICE] }))(LocationButton)
