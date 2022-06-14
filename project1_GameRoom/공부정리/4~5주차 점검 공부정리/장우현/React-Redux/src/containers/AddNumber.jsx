<<<<<<< HEAD
import AddNumber from "../components/AddNumber"
import React, {Component} from "react";
import store from '../store'
export default class extends Component{
  render(){
    return <AddNumber onClick={function(size){
        store.dispatch({type:'INCREMENT', size:size});
    }.bind(this)}></AddNumber>
  }
}
=======
import AddNumber from "../components/AddNumber"
import React, {Component} from "react";
import store from '../store'
export default class extends Component{
  render(){
    return <AddNumber onClick={function(size){
        store.dispatch({type:'INCREMENT', size:size});
    }.bind(this)}></AddNumber>
  }
}
>>>>>>> c7b352568c7d820b6022189a776b8998b60587c9
