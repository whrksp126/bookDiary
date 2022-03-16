import React, { useContext, useEffect, useRef, useState } from 'react'
import { userContext } from '../context/userContext';
import SignUp from '../src/component/SignUp'
import SignIn from '../src/component/SingIn'
import { useRouter } from 'next/router';

const Login = () => {
  const {isAuth, setIsAuth} = useContext(userContext);
  const router = useRouter();
  const isMounted = useRef(false)

  const setLoginUseEffect = () => {
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')));
    // console.log(isMounted.current,isAuth)
    if(isMounted.current &&  isAuth){
      router.push('/');
    }
  }
  useEffect(()=>{
    isMounted.current = true;
    setLoginUseEffect();
    return () => {isMounted.current = false}
  },[isAuth])

  
  // useEffect(()=>{
  //   setIsAuth(JSON.parse(localStorage.getItem('isAuth')));
  //   console.log(isAuth)
  //   if(isAuth){
  //     router.push('/');
  //   }

  // },[isAuth, router, setIsAuth])

  const [haveAcount, setHaveAcount] = useState(true);

  return (
    <>
      <div className="my-5 mx-3">
        <div className="container ">

          <div className="row no-gutters">
            <div className="col-lg-5 d-none d-lg-block" style={{display:'flex',alignItems:'center'}} >
              <img 
                className="img-fluid" 
                src="photoshop-4503992_1920.jpg" 
                alt="로그인화면 이미지"
                style={{
                  borderRadius:"30px"
                }}
              />
            </div>
            
            <div className="col-lg-7 px-5 pt-1">
              <div className="col-lg-5" style={{display:'flex',alignItems:'center'}} >
                <img 
                  className="img-fluid" 
                  src="BookDiary-logo.png" 
                  alt="로그인화면 이미지"
                  style={{
                    borderRadius:"30px"
                  }}
                />
              </div>
              {
                haveAcount ? <SignIn setHaveAcount={setHaveAcount} /> : <SignUp setHaveAcount={setHaveAcount}/>
              }
            </div>
          </div>

        </div>
      </div>
    </>
  )
  
}

export default Login