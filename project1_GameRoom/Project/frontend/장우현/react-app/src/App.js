import './App.css';
import React, {useState, useEffect} from 'react'
import {Route, NavLink, useParams, Routes, BrowserRouter, Link} from 'react-router-dom'

//==========================================================================================================
function Gate(){
  return(
    <div>
      <h1 id='ateg_h1'> GameRoom </h1>
      <h2 id='gate_h2'> Invitation </h2>
      <div id='gate_div'>
        <Link to="/Home"><img src={require("./Img/icon_On.png")} alt="Home" width="75"/></Link>
      </div>
    </div>
  );
}
//==========================================================================================================

//==========================================================================================================
function Home(props){
  return(
    <div>
      <LoginRow/>
      <Head/>
      <MenuRow list={props.list}/>
    </div>
  );
}

function LoginRow(){
  return(
    <div className="login_row">
      <div className="login">
        <NavLink to="/Login"><img src={require('./Img/icon_Login.png')} alt="Login"/></NavLink>
      </div>
      <div className="login">
        <NavLink to="/Login" className="login_a">로그인</NavLink>
      </div>
    </div>
  );
}

function Head(){
  return(
    <div>
      <h1 className="Home_head"><Link to="/">GameRoom</Link></h1>
    </div>
  );
}

function MenuRow(props){
  var listTag = [];
  for(var i=0;i<props.list.length;i++){
    var li = props.list[i];
    listTag.push(
      <Link to='/NoticeBoard' key={li.id}><div className="menu">{li.title}</div></Link>
    );
  }
  return(
    <div className="menu_row">
      {listTag}
    </div>
  );
}

//==========================================================================================================

//==========================================================================================================
function NoticeBoard(){
  return(
    <div>
      <LoginRow/>
      <h2 className='NoticeBoard_head'><Link to="/Home">GameRoom</Link></h2>
    </div>
  );
}

function NoticeBoardList(props) {
  var listTag = [];
  for(var i=0; i<props.list.length; i++){
    var li = props.list[i];
    listTag.push(
      <NavLink to={'/NoticeBoard/'+li.id} key={li.id}>
        <article className='NoticeBoard_post'>
          <h3>{li.title}</h3>
          {li.main_text}
          <hr ></hr>
        </article>
      </NavLink>
    );
  }
  return(
    <div>
      <NoticeBoard/>
      <div className="NoticeBoard_Main">
        {listTag}
      </div>
      <div className='NoticeBoard_bottom'>
        <Link to="/NoticeBoard/edit">
          <div className='NoticeBoard_edit'>
            글쓰기
          </div>
        </Link>
      </div>
    </div>
  );
}

function NoticeBoardPost(props){
  var params = useParams();
  var post_id = params.post_id;
  var selected_post = {
    title:'Sorry',
    main_text:'Not Found'
  }
  for(var i=0; i<props.list.length; i++){
    var li = props.list[i];
    if(li.id === Number(post_id)){
      selected_post = li;
      break;
    }
  }
  return(
    <div>
      <NoticeBoard/>
      <div className="NoticeBoard_Main">
        <article className='NoticeBoard_post'>
          <h3>{selected_post.title}</h3>
          <hr ></hr>
          {selected_post.main_text}
        </article>
      </div>
    </div>
  );
}

function NoticeBoardEdit() {
  return(
    <div>
      <NoticeBoard/>
      <div className="NoticeBoard_Main">
        <div className="NoticeBoard_edit_form">
              <input type="text" name="username" className="form-control" placeholder="제목" id="NoticeBoard_edit_title"/>
        </div>
        <div className="NoticeBoard_edit_form">
            <textarea className="form-control summernote" id="NoticeBoard_edit_content"></textarea>
        </div>
        <div className="NoticeBoard_edit_form">
            <input type="button" className="form-control summernote" id="NoticeBoard_edit_button" value="작성"></input>
        </div>
      </div>
    </div>
  );
}
//==========================================================================================================

//==========================================================================================================
function App() {
  const [menu, setMenu] = useState([]);
  const [post,setPost] = useState([]);
  const fetch_list = (list,setState)=> {
    fetch(list,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      })
  .then(function(result){
    return result.json();
  })
  .then(function(json){
    setState(json);
  })
  }
  // useEffect를 사용하지 않고 바로 fetch를 한다면, useState로 인해 rendering이 무한으로 실행된다.
  // 때문에 앱이 실행될 때, 최초로 한번만 fetch하도록 useEffect를 사용한다.
  useEffect(() => {
    fetch_list('list.json',setMenu);
    fetch_list('PostList.json',setPost);
  },[menu, post]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Gate/>}></Route>
          <Route path="/Home" element={<Home list={menu}/>}></Route>
          <Route path='/NoticeBoard' element={<NoticeBoardList list={post}/>}></Route>
          <Route path='/NoticeBoard/:post_id' element={<NoticeBoardPost list={post}/>}></Route>
          <Route path='/NoticeBoard/edit' element={<NoticeBoardEdit/>}></Route>
          <Route path="*" element="Not Found"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//==========================================================================================================