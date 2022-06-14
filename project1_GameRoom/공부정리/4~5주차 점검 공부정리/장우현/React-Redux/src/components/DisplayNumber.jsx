<<<<<<< HEAD
import React, {Component} from 'react'
import store from '../store'
export default class DisplayNumber extends Component{
  state = {number:store.getState().number}
  constructor(props){
    super(props);
    store.subscribe(function(){
      this.setState({number:store.getState().number});
    }.bind(this));
  }
  render(){
    return (
      <div>
        <h1>DisplayNumber</h1>
        <input type="text" value={this.state.number} readOnly></input>
      </div>
    )
  }
}
=======
import React, {Component} from 'react'
import store from '../store'
export default class DisplayNumber extends Component{
  state = {number:store.getState().number}
  constructor(props){
    super(props);
    store.subscribe(function(){
      this.setState({number:store.getState().number});
    }.bind(this));
  }
  render(){
    return (
      <div>
        <h1>DisplayNumber</h1>
        <input type="text" value={this.state.number} readOnly></input>
      </div>
    )
  }
}
>>>>>>> c7b352568c7d820b6022189a776b8998b60587c9
