# mumble-client-tcp

This module provides the tcp transport protocol for the [mumble-client] module for use in Nodejs.

### Usage

Node-style callback:
```javascript
var connect = require('mumble-client-tcp')
connect('example.com', 64738, {
  tls: {...}, // The options passed to tls.connect, use for client cert
  username: 'Test',
  password: 'Pass123'
}, function (err, client) {
  if (err) throw err;

  // Connection established
  console.log('Welcome message:', client.welcomeMessage)
  console.log('Actual username:', client.self.username)
})
```

[Promise]:
```javascript
var connect = require('mumble-client-tcp')
connect('example.com', 64738, {
  tls: {...}, // The options passed to tls.connect, use for client cert
  username: 'Test',
  password: 'Pass123'
}).done(function (client) {
  // Connection established
  console.log('Welcome message:', client.welcomeMessage)
  console.log('Actual username:', client.self.username)
}, function (err) {
  console.log('Connection failed:', err)
})
```

### License
MIT

[mumble-client]: https://github.com/johni0702/mumble-client
[Promise]: https://github.com/then/promise
