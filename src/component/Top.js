import React, { useState} from 'react'
import {
  onAuthStateChanged,
} from 'firebase/auth';
import {auth} from '../../firebase-config'

const Top = () => {

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (
    <>
    <div style={{marginTop:'5%'}}>
      <span>👨‍💻<span style={{fontWeight:"bold"}}>{user?.displayName}</span> 님의 독서📚 기록입니다.</span>
      </div>
    </>
  )
}

export default Top