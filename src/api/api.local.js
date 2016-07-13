import Promise          from 'bluebird'
import isNode           from 'detect-node'
import { write, error } from 'redux-journal'
import { TAGS }         from '../config'

const tags = `${TAGS}.api.local`

const configAPILocal = () => {
  const locate = () => new Promise((resolve, reject) => {
    write('', `${tags}.locate()`)
    if (isNode) return reject(new Error('Your platform does not support geolocation'))
    navigator.geolocation.getCurrentPosition((result) => {
      const { coords: { latitude, longitude }} = result
      const position = { lat: latitude, lng: longitude }
      write(`resolve(position = ${JSON.stringify(position)})`, `${tags}.locate()`)
      resolve(position)
    }, (_error) => {
      error(_error, `${tags}.locate()`)
      reject(_error)
    }, {
      enableHighAccuracy: true,
      timeout: 5000
    })
  })

  return { locate }
}

export { configAPILocal }
