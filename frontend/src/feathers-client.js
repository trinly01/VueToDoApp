import 'babel-polyfill'
import feathers from 'feathers'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'
import store from './store'
import rx from 'feathers-reactive'
import RxJS from 'rxjs'

const socket = io('http://localhost:3030', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .configure(rx(RxJS, {idField: '_id'}))
  // Register feathers-vuex by passing the store and options
  .configure(feathersVuex(store, {
    idField: '_id',
    auth: {
      userService: '/users'
    }
  }))

// For every service created, a Vuex store module will be created.
feathersClient.service('tasks')

export default feathersClient
