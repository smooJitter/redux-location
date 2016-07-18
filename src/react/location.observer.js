import { connect }          from 'react-redux'
import LocationObserver     from './location.observer.src'
import { SERVICE }          from '../config'

export default connect(state => ({ location: state[SERVICE] }))(LocationObserver)
