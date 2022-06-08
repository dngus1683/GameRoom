import './App.css';
import React, {useState, useEffect} from 'react'

function Gate(){
  return(
    <div>
      <h1 id='gate_h1'> GameRoom </h1>
      <h2 id='gate_h2'> Invitation </h2>
      <div id='gate_div'>
        <a href="Home.html"><img src={require("./Img/icon_On.png")} width="75"/></a>
      </div>
    </div>
  );
}

function LoginRow(){
  return(
    <div className="login_row">
      <div className="login">
        <a href="Login.html"><img src={require('./Img/icon_Login.png')}/></a>
      </div>
      <div className="login">
        <a href="Login.html" className="login_a">로그인</a>
      </div>
    </div>
  );
}

function Head(){
  return(
    <div>
      <h1 className="Home_head"><a href="Gate.html">GameRoom</a></h1>
    </div>
  );
}

function MenuRow(props){
  var listTag = [];
  for(var i=0;i<props.list.length;i++){
    var li = props.list[i];
    listTag.push(
        <div className="menu" key={li.id}><a>{li.title}</a></div>
    )
  }
  return(
    <div className="menu_row">
      {listTag}
    </div>
  );
}


function App() {
  const [menu, setMenu] = useState([]);
  const fetch_list = ()=> {
    fetch('list.json')
  .then(function(result){
    return result.json();
  })
  .then(function(json){
    setMenu(json);
  })
  }
  // useEffect를 사용하지 않고 바로 fetch를 한다면, useState로 인해 rendering이 무한으로 실행된다.
  // 때문에 앱이 실행될 때, 최초로 한번만 fetch하도록 useEffect를 사용한다.
  useEffect(() => {
    fetch_list();
  });

  return (
    <div className="App">
      <LoginRow/>
      <Head/>
      <MenuRow list={menu}/>
      <Gate/>
    </div>
  );
}

export default App;
