import Promise from 'promise'
import tls from 'tls'
import MumbleClient from 'mumble-client'

function connect (host, port, options, callback) {
  return new Promise((resolve, reject) => {
    var socket = tls.connect(port, host, options.tls || {})
      .on('error', reject)
      .on('secureConnect', () => {
        if (socket.authorized) {
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
