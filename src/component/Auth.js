import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import {auth} from '../../firebase-config'

const Auth = () => {

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [displayName, setDisplayName] = useState('');

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword
      )
      console.log(user)
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (error) {
      console.log(error.message)
    }
    updateProfile(auth.currentUser, {
      displayName: displayName
    }).then(()=>{
      setDisplayName('');
      console.log('displayName Update succes')
    }).catch((error) =>{
      console.log(error.message)
    })
  }
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword
      )
      console.log(user)
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.log(error.message)
    }
  }
  const logout = async () => {
    await signOut(auth);
  }

  return (
    <div>
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
      </div>
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
      <h4>사용자 로그인 : {user?.displayName}</h4>
      <button onClick={logout}>로그아웃</button>
    </div>
  )
}

export default Auth