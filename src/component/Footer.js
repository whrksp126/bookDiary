import React, { useContext} from 'react'
import {
  signOut,
} from 'firebase/auth';
import {auth} from '../../firebase-config'
import { useRouter } from 'next/router';
import { userContext } from '../../context/userContext';

const Footer = () => {

  const { setIsAuth} = useContext(userContext);

  const router = useRouter();
  
  const logout = () => {
     signOut(auth).then(()=>{
      localStorage.clear();
      router.push('/Login')
      setIsAuth(false);
    })
    console.log('logout이 실행됨')
    // window.location.pathname = '/Login'
  }
  return (
    <>
    <div style={{borderTop: '1px solid', marginTop: '5%',}}>
      <div className="form-text" style={{marginTop:'2%'}}>웹이름: bookdiary 용도: 독서활동기록 제작완료일: 2022-03-15, 제작기간: 14일, 버전:  0.0.1 제작자: GH</div>
      <div className="form-text">Next.js react.js javascript firebase bootstrap tinymce day.js</div>
      <div className="" style={{marginTop: '3%', marginBottom: '5%'}}>
        로그아웃을 원하시면 
        <button className="btn btn-link" onClick={logout} style={{ color:'red'}}>
        로그아웃
        </button>
        을 클릭해 주세요.
      </div>
      
    </div>
    </>
  )
}

export default Footer