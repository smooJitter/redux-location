import { connect }          from 'react-redux'
import LocationButton       from './location.button.src'
import { SERVICE }          from '../config'

export default connect(state => ({ location: state[SERVICE] }))(LocationButton)
