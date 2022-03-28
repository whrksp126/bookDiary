import React, { useState } from 'react'
import BookList from './BookList'
import UpDataBook from './UpDataBook'
import BookDetail from './BookDetail'
import Head from 'next/head'

const Center = () => {

  const [upDataOrList, setUpDataOrList]= useState(true)
  const [buttonState, setButtonState] = useState('관심');
  const [bookId, setBookId] = useState('');
  const [itemDelete, setItemDelete] = useState(false);
  const [searchPage ,setSearchPage] = useState(false);


  return (
    <>
    <Head>      
      <title>BookDiary</title>
    </Head>
      <div className="row no-gutters">
        
        {/* 오른 쪽 */}
        <div className="col-lg-4 d-lg-block" style={{display:'flex' , alignItems: 'center'}}>
          {/* 로고 */}
          <div className="col-12" >
          <img 
            className="img-fluid" 
            src="BookDiary-logo.png" 
            alt="로그인화면 이미지"
          />
          {/* 도서 상태 버튼 */}
          <div className="col-12">
            {/* <ButtonGroup className="btn-group-vertical col-12" style={{width:'100%'}} size="lg"> */}
            <button 
              style={{width: '100%', fontWeight: 'bold'}} 
              className="btn btn-outline-dark mb-1 p-3" 
              onClick={()=>{
                setButtonState('관심')
                setSearchPage(false)
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={30} 
                height={30} 
                style={{marginRight:' 5%'}} 
                fill="currentColor" 
                className="bi bi-box2-heart" 
                viewBox="0 0 16 16"
              ><path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982Z" />
              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5Zm0 1H7.5v3h-6l2.25-3ZM8.5 4V1h3.75l2.25 3h-6ZM15 5v10H1V5h14Z" />
              </svg>
            관  심 리 스 트 🤞</button>
            <button
              style={{width: '100%', fontWeight: 'bold'}} 
              className="btn btn-outline-dark my-2 p-3" 
              onClick={()=>{
                setButtonState('읽는중')
                setSearchPage(false)
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={30} 
                height={30} 
                style={{marginRight:' 5%'}} 
                fill="currentColor" 
                className="bi bi-journal-text" 
                viewBox="0 0 16 16"
              >
                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>현 재 리 스 트 ⌛
            </button>
            <button
              style={{width: '100%', fontWeight: 'bold'}} 
              className="btn btn-outline-dark my-2 p-3" 
              onClick={()=>{
                setButtonState('완독')
                setSearchPage(false)
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={30} 
                height={30} 
                style={{marginRight:' 5%'}} 
                fill="currentColor" 
                className="bi bi-journal-check" 
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>
              완  독 리 스 트 👍
            </button>
            {/* <Button variant="secondary" onClick={()=>{setButtonState('목표')}}>목  표</Button> */}
          {/* 도서 추가 버튼 */}
            { upDataOrList 
              ? 
              <button 
                className="btn btn-dark my-2 p-3" 
                style={{width: '100%', fontWeight: 'bold'}} 
                onClick={()=>{                
                  setUpDataOrList(false),
                  setBookId(''),
                  setItemDelete(false)
                  setSearchPage(false)
                }}
              >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={30} 
                height={30} 
                style={{marginRight:' 5%'}} 
                fill="currentColor" 
                className="bi bi-journal-plus" 
                viewBox="0 0 16 16"
              >
                <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>

                도 서 추 가 🙏</button>
              :
              <button 
                className="btn btn-dark my-2 p-3" 
                style={{width: '100%', fontWeight: 'bold'}} 
                onClick={()=>{
                setUpDataOrList(true),
                setItemDelete(false)
                setSearchPage(false)
                }}
              >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={30} 
                height={30} 
                style={{marginRight:' 5%'}} 
                fill="currentColor" 
                className="bi bi-postcard" 
                viewBox="0 0 16 16"
              ><path fillRule="evenodd" d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z" />
              </svg>

                도 서 목 록</button>
            }
            {/* {searchPage === false &&
              <>
            <button
              style={{width: '100%', fontWeight: 'bold'}} 
              className="btn btn-dark my-2 p-3" 
              onClick={()=>{
                setSearchPage(!searchPage);
              }}
            >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width={30} 
              height={30} 
              style={{marginRight:' 5%'}} 
              fill="currentColor" 
              className="bi bi-search" 
              viewBox="0 0 16 16"
            ><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
              도 서 검 색
            </button>  
              </>
            } */}
            
          </div>
          </div>
        </div>

        {/* 왼 쪽 */}
        <div className="col-lg-8 px-1 pt-1">
        <>
          {itemDelete === false 
        ? 
        <div>
          {upDataOrList 
          ? 
          <BookList 
            setUpDataOrList={setUpDataOrList} 
            setItemDelete={setItemDelete} 
            setBookId={setBookId} 
            buttonState={buttonState} 
            setButtonState={setButtonState} 
          /> 
          : 
          <UpDataBook 
            bookId={bookId} 
            setUpDataOrList={setUpDataOrList} 
            buttonState={buttonState}
          />}
        </div>
        : 
        <>
          <BookDetail 
            setUpDataOrList={setUpDataOrList} 
            setItemDelete={setItemDelete} 
            setBookId={setBookId} 
            bookId={bookId}
          />
        </>
        }
          </>  
        

        
          <div className="col-lg-5" style={{display:'flex',alignItems:'center'}}>

          </div>

          <div className="">
            <div className="row">
              <div className="col-lg-5">

              </div>
            </div>
          </div>
        
        </div>


      </div>
    </>
  )
}

export default Center