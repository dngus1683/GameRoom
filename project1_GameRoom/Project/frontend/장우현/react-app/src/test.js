import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, NavLink, useParams, Routes, BrowserRouter, Link} from 'react-router-dom';
import menuList from './json/list.json';
import postList from './json/PostList.json';
import replyList from './json/reply.json';
import SignUpList from './json/SignUpList.json';

let LoginMenuFlag = 0;
let LoginSupMenuFlag = 0;
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
  LoginMenuFlag = 0;
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
      {LoginMenuFlag ? <LoginMenuNav/> : null }
      <span className="login"><NavLink to="/Login"><img src={require('./Img/icon_Login.png')} alt="Login"/></NavLink></span>
      <span className="login"><NavLink to="/Login" className="login_a">로그인</NavLink></span>
    </div>
  );
}
function LoginMenuNav(){
  return(
    <nav className='Login_menu_nav'>
      <ul>
        <li><Link className='Login_menu_link' to="/NoticeBoard">게</Link></li>
        <li><Link className='Login_menu_link' to="/NoticeBoard">방</Link></li>
        <li><Link className='Login_menu_link' to="/NoticeBoard">비</Link></li>
        <li><Link className='Login_menu_link' to="/NoticeBoard">미</Link></li>
      </ul>
    </nav>
  )
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
  LoginMenuFlag = 1;
  return(
    <header>
      <LoginRow/>
      <h2 className='NoticeBoard_head'><Link to="/Home">GameRoom</Link></h2>
    </header>
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
          {li.main_text}<hr/>
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
  var listTag = [];
  var PostListTag = [];
  var params = useParams();
  var post_id = params.post_id;
  var selected_post = {
    title:'Sorry',
    main_text:'Not Found'
  }
  for(var i=0; i<props.PostList.length; i++){
    var li = props.PostList[i];
    PostListTag.push(
      <li className='NoticeBoard_sideList_li' key={li.id}><Link to={'/NoticeBoard/'+li.id}>{li.title}</Link></li>
    );
    if(li.id === Number(post_id)){
      selected_post = li;
    }
  }
  for(var i=0; i<props.Replylist.length; i++){
    var li = props.Replylist[i];
    listTag.push(
      <li className='NoticeBoard_post_reply_content_li' key={li.id}>
        <div className='NoticeBoard_post_reply_head'>{li.username}</div>
        <div>{li.content}</div>
      </li>
    );
  }
  return(
    <div>
      <NoticeBoard/>
      <section className="NoticeBoard_Main">
        <article className='NoticeBoard_post'>
          <h3>{selected_post.title}</h3><hr/>
          {selected_post.main_text}
        </article>
        <div className='NoticeBoard_post'>
          <span id='NoticeBoard_post_menu1'>
            <input type="button" id='NoticeBoard_post_menu1_button' value="좋아요"/>
            <Link to="/NoticeBoard">목록</Link>
          </span>
          <span id='NoticeBoard_post_menu2'>
            <Link className='NoticeBoard_post_menu2_content' to="/NoticeBoard">삭제하기</Link>
            <Link className='NoticeBoard_post_menu2_content' to="/NoticeBoard" id='NoticeBoard_post_menu2_content_correction'>수정하기</Link>
          </span>
        </div>
        <div className='NoticeBoard_post'>
          <h4 className='NoticeBoard_post_reply_head'>댓글</h4><hr/>
          <ul className='NoticeBoard_post_reply_content_ul'>
            {listTag}
          </ul><hr/>
          <div className='NoticeBoard_post_replySubmit'>
            <div>작성자 아이디</div>
            <textarea id='NoticeBoard_post_replySubmit_textarea'></textarea>
            <input id='NoticeBoard_post_replySubmit_button' type="button" value="등록"/>
          </div>
        </div>
      </section>
      <aside className='NoticeBoard_sideList'>
        <ul className='NoticeBoard_sideList_ul'>
          {PostListTag}
        </ul>
      </aside>
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
function Login(){
  return(
    <div>
      <LoginHead/>
      <LoginMain/>
      <LoginBottom/>
    </div>
  );
}

function LoginHead(){
  return(
    <h1 className="Login_Head"><Link to="/Home">GameRoom</Link></h1>
  );
}

function LoginMain(){
  return(
    <div className='Login_Main'>
      <input className="Login_Main_Content" type="text" placeholder='아이디'/><br/>
      <input className="Login_Main_Content" type="password" placeholder='비밀번호'/><br/>
      <div className='Login_Main_Content' id='Login_Main_Content_Checkbox'><label className='Login_Checkbox'><input type="checkbox" id='Login_Checkbox_Id'/>로그인 상태 유지</label></div><br/>
      <input className="Login_Main_Content" type="button" value="Login"/>
    </div>
  );
}

function LoginBottom(){
  return(
    <div className='Login_Bottom'>
      <Link className="Login_Bottom_Content" to='/Login/FindId'>아이디 찾기</Link>
      <a className="Login_Bottom_Content" href='#!'>비밀번호 찾기</a>
      <Link className="Login_Bottom_Content" to='/Login/SignUp' id='Login_Bottom__Content_SignUp'>회원가입</Link>
    </div>
  );
}


let ConvLoginSupInfo = {};

function FindId(){
  LoginSupMenuFlag = 0;
  return(
    <div>
      <LoginHead/>
      <div className='Login_Main'>
        <LoginSupMain/>
        <div className='Login_Sup_Content'>
          <input type="button"  value='조회'></input>
        </div>
      </div>
    </div>
  );
}
function SignUp(){
  LoginSupMenuFlag = 2;
  let [state, setState] = useState({state:0,data:0});
  let signUpInfo = ConvLoginSupInfo;
  return(
    <div>
      <LoginHead/>
      <div className='Login_Main'>
        <LoginSupMain/>
        <div className='Login_Sup_Content'>
          <input type="button"  value='가입' onClick={()=>{
            fetch('/auth/joinProc',{
              method: 'post',
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(signUpInfo)
              })
          .then(function(result){
            return result.json();
          })
          .then(function(json){
            setState(json);
            console.log(state);
            console.log(json);
          })
          }
          }></input>
        </div>
      </div>
    </div>
  );
}
function LoginSupMain(){
  let [loginSupInfo, setLoginSupInfo] = useState({});
  var pwFlag = 0;
  var listTag = [];
  var LoginSupList = SignUpList;
  const ChangeList = (targetIdx)=>{
    var targetContent = LoginSupList.splice(targetIdx,1);
    LoginSupList.splice(LoginSupList.length-1,0,targetContent);
  }

  for(var i=0; i<LoginSupList.length; i++){
    var li = LoginSupList[i];
    if(LoginSupMenuFlag === 0){
      if(li.title === "아이디" || li.title === "비밀번호") continue;
    }
    else if(LoginSupMenuFlag === 1 && pwFlag === 0){
      if(li.title === "비밀번호"){
        ChangeList(i);
        i = i-1;
        pwFlag = 1;
        continue;
      }
    }
    listTag.push(
      <div className='Login_Sup_Content' key={li.id}>
        <label htmlFor={li.tagId}>{li.title}</label>
        <input type={li.type} id={li.tagId} onChange={(event)=>{
          let CopyLoginSupInfo = {...loginSupInfo, [li.type]:event.target.value}
          setLoginSupInfo(CopyLoginSupInfo);
        }}></input>
      </div>
    );
  }
  ConvLoginSupInfo = loginSupInfo;
  return(
      {listTag}
  );
}
//==========================================================================================================

//==========================================================================================================
function App() {
  /*
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
*/

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Gate/>}></Route>
          <Route path="/Home" element={<Home list={menuList}/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Login/FindId" element={<FindId/>}></Route>
          <Route path="/Login/SignUp" element={<SignUp/>}></Route>
          <Route path='/NoticeBoard' element={<NoticeBoardList list={postList}/>}></Route>
          <Route path='/NoticeBoard/:post_id' element={<NoticeBoardPost PostList={postList} Replylist={replyList}/>}></Route>
          <Route path='/NoticeBoard/edit' element={<NoticeBoardEdit/>}></Route>
          <Route path="*" element="Not Found"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//==========================================================================================================