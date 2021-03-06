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
      <span>π¨βπ»<span style={{fontWeight:"bold"}}>{user?.displayName}</span> λμ λμπ κΈ°λ‘μλλ€.</span>
      </div>
    </>
  )
}

export default Top