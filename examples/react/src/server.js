require('redux-journal').enable()

import { write, error }     from 'redux-journal'
import Express              from 'express'

import webpack              from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig        from '../webpack.config'

const PORT = 3000
const app = new Express()

const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use((req, res) => { res.sendFile(__dirname + '/static/index.html') })

app.listen(PORT, (e) => {
  if (e) return error(e)
  write(`==> 🌎  0.0.0.0:${ PORT }`)
})
