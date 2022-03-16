import React, { useContext, useState } from 'react'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {auth, provider} from '../../firebase-config'
import { useRouter } from 'next/router';
import { userContext } from '../../context/userContext';

const SingIn = ( {setHaveAcount} ) => {
  const {setIsAuth} = useContext(userContext);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result)=>{
      // 로그인 여부를 확인하기 위해 로컬스토리지에 저장하는 것
      localStorage.setItem('isAuth', true);
      localStorage.setItem('uid', auth.currentUser.uid);
      setIsAuth(true);
      router.push('/');
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')


  // const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // })

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      )
        // console.log(user)
        localStorage.setItem('isAuth', true);
        localStorage.setItem('uid', auth.currentUser.uid);
        setLoginEmail('');
        setLoginPassword('');
        setIsAuth(true);
        router.push('/')        
      } catch (error) {
        console.log(error.message)
      }
    }

    return (
    <>
    <h4>로그인을 해주세요</h4>
          <form onSubmit={login}>
            <div className="form-row">

              <div className="col-lg-7">
                {/* <label htmlFor="exampleInputEmail1" className="form-label">이메일</label> */}
                <input 
                  type="email" 
                  className="form-control my-3 p-3" 
                  id="exampleInputEmail1" 
                  aria-describedby="emailHelp" 
                  value={loginEmail}
                  required
                  placeholder="이메일을 입력해주세요..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value)
                  }}
                />
                <div id="emailHelp" className="form-text">test1@test.test or test2@test.test</div>
              </div>
            </div>  
            <div className="form-row">
              <div className="col-lg-7">
                {/* <label htmlFor="exampleInputPassword1" className="form-label">비밀번호</label> */}
                <input 
                  type="password" 
                  className="form-control my-3 p-3" 
                  id="exampleInputPassword1"
                  value={loginPassword}
                  required
                  placeholder="비밀번호를 입력해주세요..."
                  onChange={(event) => {
                  setLoginPassword(event.target.value)
                  }} 
                />
                <div id="emailHelp" className="form-text">testtest</div>
              </div>
            </div>

            <div className="form-row">
              <div className="col-lg-7">
                <button 
                  className="btn btn-primary my-3 p-3" 
                  type="submit" 
                  style={{width: '100%', fontWeight: 'bold'}} 
                >로그인
                </button>
              </div>
            </div>
            <div className="form-text">구글 계정이 있으시면, 회원가입 없이 이용가능합니다.</div>

            <div className="form-row">
              <div className="col-lg-7">
              <button 
                className="btn btn-success my-3 p-3 mb-5" 
                type="button" 
                style={{width: '100%',fontWeight: 'bold'}} 
                onClick={signInWithGoogle}
              >
                <i className="bi bi-google">
                </i>구글 로그인</button>
              </div>
            </div>

            <div className="form-text">
                계정이 없으면 회원가입을 해주세요.
                <button className="btn btn-link btn-sm" onClick={()=>{setHaveAcount(false)}}>
                  회원가입
                </button>
              </div>
            
          </form>


      {/* <h2>This is SingIn Component</h2>
      <div>
        <div>
          <h3>로그인</h3>
          <input 
            value={loginEmail}
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value)
            }} 
          />
          <input 
            value={loginPassword}
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value)
            }} 
          />
          <button onClick={login}>로그인</button>
        </div>
        <div>
          <h3>Google 계정 로그인</h3>
          <button onClick={signInWithGoogle}>Google</button>
        </div>
      </div> */}
    </>
  )
}

export default SingIn