import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, NavLink, useParams, Routes, BrowserRouter, Link, useLocation} from 'react-router-dom';
import menuList from './json/list.json';
import LoginSupList from './json/LoginSupList.json';
import BoastList from './json/boastTestList.json';

let LoginMenuFlag = 0;
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
        <li><Link className='Login_menu_link' to="/Visitors">방</Link></li>
        <li><Link className='Login_menu_link' to="/BoastBoard">비</Link></li>
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
      <Link to={li.path} key={li.id}><div className="menu">{li.title}</div></Link>
    );
  }
  return(
    <div className="menu_row">
      {listTag}
    </div>
  );
}
function BoardHead(){
  LoginMenuFlag = 1;
  return(
    <header>
      <LoginRow/>
      <h2 className='Board_head'><Link to="/Home">GameRoom</Link></h2>
    </header>
  );
}

//==========================================================================================================

//==========================================================================================================
function NoticeBoardList() {
  let [list, setList] = useState([]);
  useEffect(() => {
    fetch('/board',{
      method: 'get',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem("access_token")
      }
      })
  .then(function(result){
    return result.json();
  })
  .then(function(data){
    setList(data.page.content);
  })
  },[]);
  const listTag = list.map((li)=>{
    return(
    <NavLink to={'/NoticeBoard/'+li.id} key={li.id}>
      <article className='NoticeBoard_post'>
        <h3>{li.title}</h3>
        {li.content}<hr/>
      </article>
    </NavLink>
    );
  });
  return(
    <div>
      <BoardHead/>
      <div className="NoticeBoard_Main">
        {listTag}
      </div>
      <div className='NoticeBoast_bottom'>
        <Link to="/NoticeBoard/edit">
          <div className='edit'>
            글쓰기
          </div>
        </Link>
      </div>
    </div>
  );
}

function NoticeBoardPost(){
  let [list, setList] = useState([]);
  let [reply, setReply] = useState({});
  let replyTag = null;
  var boardId = 0;
  var PostListTag = [];
  var params = useParams();
  var post_id = params.post_id;
  var selected_post = {
    title:'Sorry',
    content:'Not Found'
  }

  useEffect(() => {
    fetch('/board',{
      method: 'get',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem("access_token")
      }
      })
  .then(function(result){
    return result.json();
  })
  .then(function(data){
    setList(data.page.content);
  })
  },[list,reply]);

  for(var i=0; i<list.length; i++){
    var li = list[i];
    PostListTag.push(
      <li className='NoticeBoard_sideList_li' key={li.id}><Link to={'/NoticeBoard/'+li.id}>{li.title}</Link></li>
    );
    if(li.id === Number(post_id)){
      boardId = li.id;
      selected_post = li;
      replyTag = li.replys.map((rly)=>{
        return(
          <li className='NoticeBoard_post_reply_content_li' key={rly.id}>
            <div className='NoticeBoard_post_reply_head'>{li.user.username}</div>
            <div>{rly.content}</div>
          </li> 
        );
      })
    }
  }
  return(
    <div>
      <BoardHead/>
      <section className="NoticeBoard_Main">
        <article className='NoticeBoard_post'>
          <h3>{selected_post.title}</h3><hr/>
          {selected_post.content}
        </article>
        <div className='NoticeBoard_post'>
          <span id='NoticeBoard_post_menu1'>
            <input type="button" id='NoticeBoard_post_menu1_button' value="좋아요"/>
            <Link to="/NoticeBoard">목록</Link>
          </span>
          <span id='NoticeBoard_post_menu2'>
            <Link className='NoticeBoard_post_menu2_content' to="/NoticeBoard" onClick={()=>{
              fetch('/api/board/'+boardId,{
                method:'delete',
                headers:{ 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': localStorage.getItem("access_token")
                }               
                })
                .then(function(result){
                  if(result.status === 200){
                    window.location.replace('/NoticeBoard');
                  }
                })
                .then(function(data){
                })
              }
            }>삭제하기</Link>
            <Link className='NoticeBoard_post_menu2_content' to="/NoticeBoard/edit" state={selected_post} id='NoticeBoard_post_menu2_content_correction'>수정하기</Link>
          </span>
        </div>
        <div className='NoticeBoard_post'>
          <h4 className='NoticeBoard_post_reply_head'>댓글</h4><hr/>
          <ul className='NoticeBoard_post_reply_content_ul'>
           {replyTag}
          </ul><hr/>
          <div className='NoticeBoard_post_replySubmit'>
            <div>작성자 아이디</div>
            <textarea id='NoticeBoard_post_replySubmit_textarea' onChange={(event)=>{
                let CopyReply = {...reply, content:event.target.value}
                setReply(CopyReply);
              }}></textarea>
            <input id='NoticeBoard_post_replySubmit_button' type="button" value="등록" onClick={()=>{
              fetch('/api/board/'+boardId+'/reply',{
                method: 'post',
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': localStorage.getItem("access_token")
                },
                body:JSON.stringify(reply)
                })
            }}/>
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
  let [edit, setEdit] = useState({});
  const location = useLocation();
  useEffect(()=>{
    if(location.state){
      setEdit({
        title: location.state.title,
        content: location.state.content
      })
    }
  },[]);

  
  return(
    <div>
      <BoardHead/>
      <div className="NoticeBoard_Main">
        <div className="NoticeBoard_edit_form">
              <input type="text" name="username" className="form-control" value={edit ? edit.title || "" : null} placeholder= '제목' id="NoticeBoard_edit_title" onChange={(event)=>{
                var CopyEdit = {...edit, title:event.target.value}
                setEdit(CopyEdit);
              }}/>
        </div>
        <div className="NoticeBoard_edit_form">
            <textarea className="form-control summernote" id="NoticeBoard_edit_content" value={edit ? edit.content || "": null} onChange={(event)=>{
              var CopyEdit = {...edit, content:event.target.value}
              setEdit(CopyEdit);
            }}></textarea>
        </div>
        <div className="NoticeBoard_edit_form">
            <input type="button" className="form-control summernote" id="NoticeBoard_edit_button" value="작성" onClick={()=>{
              var boardId = null;
              if(location.state){
                boardId = location.state.id;
              }
              fetch('/api/board/'+ (boardId ? boardId: ""),{
                method:(boardId ? 'put' : 'post'),
                headers:{ 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': localStorage.getItem("access_token")
                },
                body:JSON.stringify(edit)
              }).then(function(result){
                if(result.status === 200){
                  window.location.replace('/NoticeBoard');
                }
              }).then(function(data){
              })
            }}></input>
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
  let [loginInfo, setLoginInfo] = useState({})
  return(
    <div className='Login_Main'>
      <input className="Login_Main_Content" type="text" placeholder='아이디' onChange={(event)=>{
          let CopyLoginInfo = {...loginInfo, username:event.target.value}
          setLoginInfo(CopyLoginInfo);
        }
      }/><br/>
      <input className="Login_Main_Content" type="password" placeholder='비밀번호' onChange={(event)=>{
          let CopyLoginInfo = {...loginInfo, password:event.target.value}
          setLoginInfo(CopyLoginInfo);
        }
      }/><br/>
      <div className='Login_Main_Content' id='Login_Main_Content_Checkbox'><label className='Login_Checkbox'><input type="checkbox" id='Login_Checkbox_Id'/>로그인 상태 유지</label></div><br/>
      <input className="Login_Main_Content" type="button" value="Login" onClick={()=>{
        fetch('/login',{
          method: 'post',
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(loginInfo)
          })
      .then(function(result){
        return result;
      })
      .then(function(data){
        let jwtToken = data.headers.get("Authorization");
        if(jwtToken){
          localStorage.setItem("access_token", jwtToken);
          window.location.replace('/Home');
        }
        else{
          alert("아이디와 비밀번호가 맞지 않습니다.");
        }
      })
      }}/>
    </div>
  );
}

function LoginBottom(){
  return(
    <div className='Login_Bottom'>
      <Link className="Login_Bottom_Content" to='/Login/FindId'>아이디 찾기</Link>
      <Link className="Login_Bottom_Content" to='/Login/ChangePw'>비밀번호 찾기</Link>
      <Link className="Login_Bottom_Content" to='/Login/SignUp' id='Login_Bottom__Content_SignUp'>회원가입</Link>
    </div>
  );
}

function FindId(){
  let [findIdInfo, setFindIdInfo] = useState({});
  var CopyList = [...LoginSupList];
  CopyList.splice(0,2);

  const listTag = CopyList.map((li)=>{
    return(
      <div className='Login_Sup_Content' key={li.id}>
        <label htmlFor={li.tagId}>{li.title}</label>
        <input type={li.type} id={li.tagId} onChange={(event)=>{
          let CopysFindIdInfo = {...findIdInfo, [li.params]:event.target.value}
          setFindIdInfo(CopysFindIdInfo);
        }}></input>
      </div>
    )
  });
  return(
    <div>
      <LoginHead/>
      <div className='Login_Main'>
        {listTag}
        <div className='Login_Sup_Content'>
          <input type="button"  value='조회' onClick={()=>{
            fetch('/auth/findId',{
              method:'post',
              headers:{ 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body:JSON.stringify(findIdInfo)
            }).then(function(result){
              return result.json();
            })
            .then(function(data){
              if(data.data === "아이디 찾기 실패"){
                alert("해당 정보에 맞는 아이디가 존재하지 않습니다.");
              }
              else{
                alert("귀하의 아이디는 " + data.userId + " 입니다.");
                window.location.replace('/Login');
              }
            });
          }}></input>
        </div>
      </div>
    </div>
  );
}

function ChangePw(){
  let [changePwInfo, setChangePwInfo] = useState({});
  var CopyList = [...LoginSupList];
  const CopyListTarget = CopyList.splice(1,1);
  CopyList.splice(CopyList.length,0,CopyListTarget[0]);

  const listTag = CopyList.map((li)=>{
    return(
      <div className='Login_Sup_Content' key={li.id}>
        <label htmlFor={li.tagId}>{li.title}</label>
        <input type={li.type} id={li.tagId} onChange={(event)=>{
          let CopyChangePwInfo = {...changePwInfo, [li.params]:event.target.value}
          setChangePwInfo(CopyChangePwInfo);
        }}></input>
      </div>
    );
  });
  return(
    <div>
      <LoginHead/>
      <div className='Login_Main'>
        {listTag}
        <div className='Login_Sup_Content'>
          <input type="button"  value='가입' onClick={()=>{
            fetch('/auth/changePw',{
              method: 'put',
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(changePwInfo)
              })
          .then(function(result){
            return result.json();
          })
          .then(function(data){
            if(data === 1){
              alert("비밀번호가 변경되었습니다.");
              window.location.replace('/Login');
            }
            else{
              alert("해당 회원정보는 존재하지 않습니다.");
            }
          })
          }
          }></input>
        </div>
      </div>
    </div>
  );
}
function SignUp(){
  const [signUpInfo, setSignUpInfo] = useState({});
  const listTag = LoginSupList.map((li)=>{
    return(
    <div className='Login_Sup_Content' key={li.id}>
      <label htmlFor={li.tagId}>{li.title}</label>
      <input type={li.type} id={li.tagId} onChange={(event)=>{
        var CopysignUpInfo = {...signUpInfo, [li.params]:event.target.value}
        setSignUpInfo(CopysignUpInfo);
      }}></input>
    </div>
    );
  });
  return(
    <div>
      <LoginHead/>
      <div className='Login_Main'>
        {listTag}
        <div className='Login_Sup_Content'>
          <input type="button"  value='가입' onClick={()=>{
            console.log(signUpInfo);
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
          .then(function(data){
            console.log(data);
            if(data.status === 500){
              alert("이미 가입된 회원입니다.");
            }
            else{
              alert("회원가입이 완료되었습니다.");
              window.location.replace('/Login');
            }
          })
          }
          }></input>
        </div>
      </div>
    </div>
  );
}
//==========================================================================================================

//==========================================================================================================
function Visitors(){
  return(
    <div>
      <BoardHead/>
      <VisitorsMain/>
    </div>
  );
}
function VisitorsMain(){
  let [list, setList] = useState([]);
  let [content, setContent] = useState({});
  useEffect(()=>{
    fetch('/visitors',{
      method:'get',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem("access_token")
      }
    })
    .then(function(result){
      return result.json();
    })
    .then(function(data){
      setList(data.page.content);
    })
  },[list,content]);
  const listTag = list.map((li)=>{
    return(
      <div className="visitors_content" key={li.id}>
        <h4>{li.user.username}</h4>
        {li.content}
      </div>
    );
  });
  return(
    <section className='Visitors_Main'>
      <div className="Visitors_Main_border">
        <div className="Visitors_Main_edit">
          아이디
          <br/>
          <textarea placeholder="내용을 입력해주세요" className="visitors_write" name="아이디" onChange={(event)=>{
            let CopyContent = {...content, content:event.target.value}
            setContent(CopyContent);
          }}></textarea>
          <input type="button" value="작성" onClick={()=>{
            fetch('/api/visitors',{
              method:'post',
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem("access_token")
              },
              body:JSON.stringify(content)
            })
          }}></input>
        </div>
        {listTag}
      </div>
    </section>
  );
}
//==========================================================================================================

//==========================================================================================================
function BoastBoard(){
  return(
    <div>
      <BoardHead/>
      <BoastBoardMain/>
    </div>
  );
}
function BoastBoardMain(){
  let [list, setList] = useState([]);
  const listTag = BoastList.map((li,idx,FullList)=>{
    if(idx%2 === 1){
      return false;
    }
    else{
      var semiList = [li,FullList[idx+1]];
      const semiListTag = semiList.map((semiLi, semiIdx)=>{
        if(!semiLi){
          semiLi = {title:"", content:""}
        }
        return(
          <div className="BoastBoard_Main_BoastBoard" key={semiIdx}>
            <div className="title">
              {semiLi.title}
            </div>
            <div className="content">
              {semiLi.content}
            </div>
          </div>
        );
      })
      return(
        <div className="row" key={idx}>
          {semiListTag}
        </div>
      );
    }
  })
  return(
    <section>
      <div className="BoastBoard_Main">
        {listTag}
      </div>

      <div className='NoticeBoast_bottom'>
        <Link to="/BoastBoard/edit">
          <div className='edit'>
            글쓰기
          </div>
        </Link>
      </div>
    </section>
  );
}
//==========================================================================================================

//==========================================================================================================
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Gate/>}></Route>
          <Route path="/Home" element={<Home list={menuList}/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Login/FindId" element={<FindId/>}></Route>
          <Route path="/Login/ChangePw" element={<ChangePw/>}></Route>
          <Route path="/Login/SignUp" element={<SignUp/>}></Route>
          <Route path='/NoticeBoard' element={<NoticeBoardList/>}></Route>
          <Route path='/NoticeBoard/:post_id' element={<NoticeBoardPost/>}></Route>
          <Route path='/NoticeBoard/edit' element={<NoticeBoardEdit/>}></Route>
          <Route path='/Visitors' element={<Visitors/>}></Route>
          <Route path='/BoastBoard' element={<BoastBoard/>}></Route>
          <Route path="*" element="Not Found"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
//==========================================================================================================