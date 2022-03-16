import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth';
import {auth} from '../../firebase-config'
import { Container } from 'react-bootstrap';


const SignUp = ({setHaveAcount}) => {

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [subPassword, setSubPassword] = useState('')
  const [displayName, setDisplayName] = useState('');

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const register = async (event) => {
    event.preventDefault();
    if(registerPassword === subPassword){
      try {
        await createUserWithEmailAndPassword(
          auth, 
          registerEmail, 
          registerPassword
        )

      } catch (error) {
        if(error.message === 'Firebase: Error (auth/email-already-in-use).'){
          alert('이미 사용중인 이메일 입니다.')
        }else if(error.message === 'Firebase: Error (auth/invalid-email).'){
          alert('잘못된 이메일 양식 입니다.')
        }else if(error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
          alert('비밀번호는 6자 이상이어야 합니다')
        }else{
          alert(error.message)
        }
        
      }
      updateProfile(auth.currentUser, {
        displayName: displayName
      }).then(()=>{
        setDisplayName('');
        // console.log('displayName Update succes')
        alert(`${displayName}님 회원가입을 해주셔서 감사합니다.`)
        // console.log(user)
        setRegisterEmail('');
        setRegisterPassword('');
        setHaveAcount(true)
        logout(auth);
      }).catch((error) =>{
        console.log(error.message)
      })
    } else {
      alert('비밀번호가 일치하지 않습니다.')
    }

  }

  const logout = () => {
    signOut(auth);
    console.log('logout이 실행됨');
  }

  return (
    <>
    <h4>회원가입을 해주세요</h4>
      <form onSubmit={register}>
        <div className="form-row">
          <div className="col-lg-7">
            <input 
              type="email" 
              className="form-control my-4 p-3" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp"           
              value={registerEmail}
              placeholder="이메일을 입력해주세요..." 
              onChange={(event) => {
              setRegisterEmail(event.target.value)
              }} 
            />
          </div>  
        </div>

        <div className="form-row">
          <div className="col-lg-7">
          <input 
            type="password" 
            className="form-control my-4 p-3" 
            id="exampleInputPassword1" 
            value={registerPassword}
            placeholder="비밀번호를 입력해주세요..."
            onChange={(event) => {
              setRegisterPassword(event.target.value)
            }} 
          />
          </div>
        </div>

        <div className="form-row">
          <div className="col-lg-7">
          <input 
            type="password" 
            className="form-control my-4 p-3" 
            id="exampleInputPassword1" 
            value={subPassword}
            placeholder="비밀번호를 다시 입력해주세요..."
            onChange={()=>{
              setSubPassword(event.target.value)
            }}
          />
          </div>
        </div>

        <div className="form-row">
          <div className="col-lg-7">
          <input 
            type="text"  
            className="form-control my-4 p-3" 
            id="exampleInputPassword1"
            value={displayName}
            placeholder="이름, 닉네임을 입력해주세요..."
            onChange={(event)=>{
              setDisplayName(event.target.value)
            }}
          />
          </div>
        </div>

        <div className="form-row">
          <div className="col-lg-7">
            <button type="submit" style={{width: '100%',fontWeight: 'bold'}} className="btn btn-primary my-3 p-3">회원가입</button>
          </div>
        </div>

        <div className="form-text">
          이미 생성된 계정이 있으면 로그인을 해주세요.
          <button className="btn btn-link btn-sm" onClick={()=>{setHaveAcount(true)}}>
            로그인
          </button>
        </div>
      </form>


      {/* <h2>This is signUp Component</h2>
      <div>
        <h3>사용자 등록</h3>
        <input 
          value={registerEmail}
          placeholder="Email..." 
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }} 
        />
        <input 
          value={registerPassword}
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value)
          }} 
        />
        <input 
          value={displayName}
          placeholder="Name..."
          onChange={(event)=>{
            setDisplayName(event.target.value)
          }}
        />
        <button onClick={register}>사용자 생성</button>
      </div> */}
    </>
  )
}

export default SignUp
