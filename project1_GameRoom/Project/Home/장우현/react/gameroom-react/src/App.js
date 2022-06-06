import './App.css';
import React, {useState} from 'react'

function LoginRow(){
  return(
    <div class="login_row">
      <div class="login">
        <a href="Login.html"><img src={require('./Img/icon_Login.png')}/></a>
      </div>
      <div class="login">
        <a href="Login.html" class="login_a">로그인</a>
      </div>
    </div>
  );
}

function Head(){
  return(
    <div>
      <h1 class="Home_head">GameRoom</h1>
    </div>
  );
}

function MenuRow(props){
  var listTag = [];
  for(var i=0;i<props.list.length;i++){
    var li = props.list[i];
    listTag.push(
        <div class="menu"><a>{li.title}</a></div>
    )
  }
  return(
    <div class="menu_row">
      {listTag}
    </div>
  );
}


function App() {
  const [menu, setMenu] = useState();


  fetch('list.json')
  .then(function(result){
    return result.json();
  })
  .then(function(json){
    console.log(json);
    this.setState({list:{
      items:json,
      isLoading: false
    }});
  })
  return (
    <div className="App">
      <LoginRow/>
      <Head/>
      <MenuRow list={list.json}/>
    </div>
  );
}

export default App;
