import Promise from 'promise'
import tls from 'tls'
import MumbleClient from 'mumble-client'

function connect (host, port, options, callback) {
  const tlsOptions = options.tls || {}
  const rejectUnauthorized = 'rejectUnauthorized' in tlsOptions
    ? tlsOptions.rejectUnauthorized
    : true
  return new Promise((resolve, reject) => {
    var socket = tls.connect(port, host, tlsOptions)
      .on('error', reject)
      .on('secureConnect', () => {
        if (socket.authorized || !rejectUnauthorized) {
          resolve(socket)
        } else {
          reject(socket.authorizationError)
        }
      })
  }).then(socket => {
    return new MumbleClient(options).connectDataStream(socket)
  }).nodeify(callback)
}

export default connect
