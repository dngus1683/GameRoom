<<<<<<< HEAD
import {createStore} from 'redux'

export default createStore(function(state, action){
  if(state === undefined){
    return {number:0}
  }
  if(action.type === 'INCREMENT'){
    return {...state, number:state.number + action.size}
  }
  return state;
})
=======
import {createStore} from 'redux'

export default createStore(function(state, action){
  if(state === undefined){
    return {number:0}
  }
  if(action.type === 'INCREMENT'){
    return {...state, number:state.number + action.size}
  }
  return state;
})
>>>>>>> c7b352568c7d820b6022189a776b8998b60587c9
