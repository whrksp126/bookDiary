import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db, auth } from '../../firebase-config';
import Loadingbar from './Loadingbar';
import { Editor } from '@tinymce/tinymce-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router'
import Router from 'next/router';

const BookDetail = ({ setUpDataOrList, bookId, soData, setItemDelete,}) => {

  const router = useRouter()

  const [itemDetailData, setItemDeleteData] = useState([])

  const [title, setTitle] = useState(soData.title);
  const [writer, setWriter] = useState(soData.writer);
  // const [eventValue, setEventValue] = useState(soData.status);
  const [status, setStatus] = useState(soData.status);
  const [category, setCategory] = useState(soData.category);
  const [bookLink, setBookLink] = useState(soData.bookLink);
  const [bookTotalPagesNumber, setBookTotalPagesNumber] = useState(soData.bookTotalPagesNumber);
  const [bookMemo, setBookMemo] = useState(soData.bookMemo);
  const [pageNow, setPageNow] = useState(soData.pageNow);
  const [startBook, setStartBook] = useState(soData.startBook);
  const [mayEndBook, setMayEndBook] = useState(soData.mayEndBook);
  const [endBook, setEndBook] = useState(soData.endBook);
  const [fileImage, setFileImage] = useState(soData.fileImage);

  const [loading, setLoading] = useState(false);

  const [buttonChange, setButtonChange] = useState(false)

  let today = new Date();


  const editorRef = useRef(null);

  // const log = () => {
  //   if (editorRef.current) {
  //     setBookMemo(editorRef.current.getContent())
  //     alert('log 함수가 실행됨')
  //     // setButtonChange(true);
  //   }
  // }

  const [value, setValue] = useState(`${bookMemo}`);
  const [text, setText] = useState('');
  

  // book 데이터 수정
  const createBookData = async () => {
    // alert('createBookData 함수가 실행됨', bookMemo)
    await setDoc(doc(db, 'books', bookId), {
      title,
      writer,
      status,
      category,
      fileImage,
      bookLink,
      bookTotalPagesNumber,
      bookMemo: value,
      pageNow,
      startBook,
      mayEndBook,
      endBook,
      createdAt : today,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }    // setUpDataOrList(true);
    ,Router.push('/')
    // ,setItemDelete(false)
    // ,setUpDataOrList(true)
    )
  }


 // 클릭 한 해당 book 데이터 불러오기
//   const getId  = async () => {
//       const docRef = doc(db, 'books', bookId);
//       const docSnap = await getDoc(docRef);
//       if(docSnap.exists()){
//         const idBookData = docSnap.data()
//         setItemDeleteData(idBookData);
//         setTitle(idBookData?.title)
//         setWriter(idBookData?.writer)
//         setCategory(idBookData?.category)
//         setBookLink(idBookData?.bookLink)
//         setFileImage(idBookData?.fileImage)
//         setBookTotalPagesNumber(idBookData?.bookTotalPagesNumber)
//         setBookMemo(idBookData?.bookMemo)
//         setEventValue(idBookData?.status)
//         setPageNow(idBookData?.pageNow)
//         setStartBook(idBookData?.startBook)
//         setMayEndBook(idBookData?.mayEndBook)
//         setEndBook(idBookData?.endBook)
//         setLoading(false);
    

//   }else{
//     console.log('그런 문서가 없습니다!')
//   }}
// useEffect(()=>{
//   if(bookId !== '' && bookId !== undefined){
//     getId();
//   }
// },[bookId])

// 해당 book 삭제
const deleteBook = async (id) => {
  // alert에 title을 받아오기 위한 로직

  // confirm은 alert인데 반환값이 있고 그 값이 true 또는 false 인 것
  // find 함수를 사용하여 해당 id의 데이터 모두를 받아옴
  const returnValue = confirm(`'${itemDetailData.title}' 을 삭제하시겠습니까?`)
  // alert(returnValue);
  if(returnValue){
    const bookDoc = doc(db, "books", bookId)
    await deleteDoc(bookDoc);
    console.log('삭제됨')
    // setItemDelete(false)
    // setUpDataOrList(true)
    Router.push('/')
  } else {
    // 페이지 렌더링 없이 컴포넌트만 업데이트 하기 위해
    // setUpDataOrList(false);
    // setUpDataOrList(true);
  }
}


let data1 = dayjs(mayEndBook,'YYYY-MM-DD')
let data2 = dayjs(startBook,'YYYY-MM-DD')
let data3 = dayjs(endBook,'YYYY-MM-DD')


  return (


    <>
      {/* {loading ? (<div><Loadingbar/></div>) : ( */}
      <div>
        <div className="card mb-3" style={{maxWidth:'20000px'}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={fileImage} className="img-fluid rounded-start" alt="..."  />
              <div style={{paddingLeft: '10px'}}>
              <div>제목 : {title}</div>
              <div>작가 : {writer}</div>
              <div>카테고리 : {category}</div>
              <div>독서 기간 : {Math.floor(dayjs().diff(data2,'day',true))} 일</div>
              <div>목표 성공 여부 : {Math.floor(data1.diff(data3,'day',true)) >= 0 ? '성공:)' : '실패:<'}</div>
              <div>완독률 : {Math.round((pageNow/bookTotalPagesNumber)*100)} %</div>
              <div>전체 페이지 수 : {bookTotalPagesNumber}</div>
              <div>현재 페이지 : {pageNow}</div>
              <div>독서 시작 일 : {startBook}</div>
              <div>완독 목표 일 : {mayEndBook}</div>
              <div>완독 일 : {endBook}</div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
            <>
              <div>
                <Editor
                value={value}
                onInit={(evt, editor) => {
                  setText(editor.getContent({format: 'text'}));
                }}
                apiKey="0qimyng0rpp6zypegcvukvielbp82am0x6y03ps511xflkvi"
                onEditorChange={(newValue, editor) => {
                  setValue(newValue);
                  setText(editor.getContent({format: 'text'}));
                }}
                init={{
                  height: 800,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image', 
                    'charmap print preview anchor help',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste wordcount'
                  ],
                  toolbar:
                    'undo redo | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help'
                }}
                />
              </div>
              <button 
                className="btn btn-outline-dark col-12" 
                onClick={()=>{createBookData()}}
                style={{marginBottom:'3%'}}  
              >메모 저장 📌</button>
              <button className="btn btn-outline-dark col-4" style={{}} onClick={()=>{
                Router.push('/')
              }}>돌아가기</button>
              <button className="btn btn-outline-dark col-4" style={{}} onClick={()=>{
                Router.push(`/create/${bookId}`)
              }}>책 수정 🔧</button>
              <button className="btn btn-outline-danger col-4" onClick={()=>{
                deleteBook(itemDetailData.id), Router.push('/')
              }}>책 삭제 🔥</button>
            </>
            </div>
        </div>
      </div>
    </div>
  </div>
 {/* )} */}




{/* {loading ? (<div><Loadingbar/></div>) : (<div>
      {itemDetailData.fileImage &&             
        <Image
        loader={itemDetailData.fileImage}
        alt="책 표지 이미지"
        src={itemDetailData.fileImage}
        width={200} 
        height={300}
        unoptimized
      />}
      <h1>{itemDetailData.title}</h1>
      <h6>{itemDetailData.writer}</h6>
      <h6>{itemDetailData.category}</h6>
      <h6>독서 시작 일 : {itemDetailData.startBook}</h6>
      <h6>완독 목표 일 : {itemDetailData.mayEndBook}</h6>
      <h6>완독 일 : {itemDetailData.endBook}</h6> */}
{/* 관심이면 아무것도 안보이고 읽는 중 이면 오늘날짜 - startbook, 완료 면 endbook - startBook */}
{/* <h6>도서 기간 : {itemDetailData.startBook} ~ {itemDetailData.endBook} </h6>

      <h6>전체 페이지 : {itemDetailData.bookTotalPagesNumber} 쪽</h6>
      <h6>현재 페이지 : {itemDetailData.pageNow} 쪽</h6>
      <h6>완독 률 : 100 %</h6> */}
{/* 상태가 관심이면 total만 나오고 읽는 중 또는 완료면 pagenow/totalpagesNumber, */}
{/* <h6>{itemDetailData.pageNow} / {itemDetailData.bookTotalPagesNumber} 쪽</h6>

      <h6>목표 달성 여부 : 성공</h6>
      <div>
      <h4>기록할 내용 :</h4>
      <textarea 
        placeholder="기록할 내용..."
        value={bookMemo} 
        onChange={(event)=>{
          setBookMemo(event.target.value)
        }}
      />
      </div>
      <button onClick={()=>{deleteBook(itemDetailData.id)}}>삭제</button>
      <button onClick={()=>{
        setUpDataOrList(false);
        setItemDelete(false)
      }}>수정</button>
      <button onClick={()=>{createBookData()}}>저장</button>      
    </div>)} */}

    </>
  )
}

export default BookDetail