import React, { useState, useEffect, useRef } from 'react'
import {addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import {auth, db} from '../../firebase-config';
import Loadingbar from './Loadingbar';

import { Editor } from '@tinymce/tinymce-react'; 
import Router from 'next/router';
import Search from './search';

//여기서 부터 검색
import { bookSearch } from './api';

// 여기까지 검색

const UpDataBook = ({ bookId, buttonState, setUpDataOrList}) => {
  
  const handleEditorChange = (e) => {
    // console.log(
    //   'Content was updated:',
    //   e.target.getContent()
    // );
  }

  const editorRef = useRef(null);
  const log = (e) => {
    if (editorRef.current && eventValue !== '관심') {
      setBookMemo(editorRef.current.getContent());
    }
  };


  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [eventValue, setEventValue] = useState('');
  const [category, setCategory] = useState('');
  const [bookLink, setBookLink] = useState('');
  const [bookTotalPagesNumber, setBookTotalPagesNumber] = useState('');
  const [bookMemo, setBookMemo] = useState('');

  const [pageNow, setPageNow] = useState('');
  const [startBook, setStartBook] = useState('');
  const [mayEndBook, setMayEndBook] = useState('');
  const [endBook, setEndBook] = useState('');

  const [loading, setLoading] = useState(true);

  let today = new Date();
  // -------------------------------------------
  //파일 미리볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");
  
  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };
  // --------------------------------------------------
  
  // const booksCollectionRef = collection(db, 'books')


  const onSubmit = () => {
    if(bookId !== ''){
      createBookData();
      alert('createBookData가 실행됨')
    }else{
      saveBookData();
      alert('saveBookData가 실행됨')
    }
  }

  // book 데이터 수정
  const createBookData = async () => {
      
      await setDoc(doc(db, 'books', bookId), {
        title,
        writer,
        status: eventValue,
        category,
        fileImage,
        bookLink,
        bookTotalPagesNumber,
        bookMemo,
        pageNow,
        startBook,
        mayEndBook,
        endBook,
        createdAt : today,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      }
      ,Router.push('/')
      // setUpDataOrList(true)
    )
      
  }
  
  //-------------------------
  // 초기 새로운 책 데이터 추가

  // const booksCollectionRef = collection(db, 'books')

  // console.log(booksCollectionRef)

  const saveBookData = async () => {
    const booksCollectionRef = collection(db, 'books')
    await addDoc(booksCollectionRef, {
      title,
      writer,
      status: eventValue,
      category,
      fileImage,
      bookLink,
      bookTotalPagesNumber,
      bookMemo,
      pageNow,
      startBook,
      mayEndBook,
      endBook,
      createdAt : today,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }
    ,setUpDataOrList(true)
    // ,Router.push('/')
    ).catch((error)=>{alert(error.message)})
  }

  const SelectItem = (eventKey) => {
    setEventValue(eventKey)
  }

  // 초기에 아무 데이터가 없을 경우 도서 추가 버튼 클릭 시 자동으로 관심 도서 추가가 되도록함
  useEffect(()=>{
    setEventValue('관심')
    setLoading(false);
  },[])

  //관심,읽는중,완독 버튼을 클릭하였을 때 도서 추가목록에서 상태 값과 연동되도록 하기 위한 코드
  useEffect(()=>{
    setEventValue(buttonState)
  },[buttonState])

  // 수정 버튼 클릭시 클릭한 문서의 id 데이터만 버튼
  const getId  = async () => {
    const docRef = doc(db, 'books', bookId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const idBookData = docSnap.data()
      // console.log(idBookData);
      setTitle(idBookData?.title)
      setWriter(idBookData?.writer)
      setCategory(idBookData?.category)
      setBookLink(idBookData?.bookLink)
      setFileImage(idBookData?.fileImage)
      setBookTotalPagesNumber(idBookData?.bookTotalPagesNumber)
      setBookMemo(idBookData?.bookMemo)
      setEventValue(idBookData?.status)
      setPageNow(idBookData?.pageNow)
      setStartBook(idBookData?.startBook)
      setMayEndBook(idBookData?.mayEndBook)
      setEndBook(idBookData?.endBook)
      setLoading(false);
      setIsAleardyBook(false);
    }else{
      console.log('그런 문서가 없습니다!')
    }
  }
  useEffect(()=>{
    if(bookId !== '' && bookId !== undefined){
      getId();
    }
  },[bookId])


  //여기서 부터 검색 부분
  const [searchText, setSearchText] = useState('');
  const [searchBookData, setSearchBookData] = useState(null);
  const [isAleardyBook, setIsAleardyBook] = useState(true);

  const onSearchButton = (e) => {
    e.preventDefault();
    if(searchBookData !== ''){
      console.log('실행됨')
      console.log(searchBookData)
      bookSearchHandler();
    }
  }
  const bookSearchHandler = async () => {
    const params = {
      query: searchText,
    }
    const {data} = await bookSearch(params)
    .catch((error)=>{
      console.log(error.message)
    });
    setSearchBookData(data.documents);
  }

  // 도서 검색에 값이 없으면 이전 검색 데이터를 지워 줌
  useEffect(()=>{
    if(searchText === ''){
      setSearchBookData(null)
    }
  },[searchText])

  const getBookData = (book) => {
    setTitle(book.title)
    setWriter(book.authors)
    setFileImage(book.thumbnail)
    setBookLink(book.url)
  }


  // 여기까지 검색부분

  return (
    <>
    {/* 여기부터 검색 */}
      {/* <Search /> */}
      <>{
        isAleardyBook &&
        
      
      <div style={{margin :"0px 8px"}}>
      <form className="row" onSubmit={onSearchButton}>
        <div className="col-12" style={{marginBottom:'10px'}}>
          <input 
            value={searchText} 
            onChange={(e)=>{
              setSearchText(e.target.value)
            }}
            required 
            type="text" 
            className="form-control" 
            placeholder="도서 제목을 입력해 주세요..."
          />
        </div>
      </form>    
      <div>
        <div className="row"> 
        {searchText !== ''  && searchBookData?.map((book)=>
            <div key={book.isbn} className="col-xl-6">
              <div className="card text-dark bg-light mb-3" style={{maxWidth: '540px'}}>
                <div className="row g-0">
                  <div className="col-md-4 col-4" style={{margin:'1px auto 1px'}} >
                   {/* 책 커버 이미지 필수 */}
                    <img src={book.thumbnail} className="img-fluid rounded-start " alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="mx-2 my-2">
                      {/* 책 제목 필수 */}
                      <h5 className="card-title text-truncate">{book.title}</h5>
                      <div style={{display: 'flex', justifyContent:"space-between"}}>
                      {/* 책 작가 필수 */}
                      <h6 className="card-subtitle mb-1 text-muted text-truncate">{book.authors[0]}</h6>
                    </div>
                    {/* 구매하기 버튼 관심 */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <a target='_blank' href={book.url} rel='noreferrer'>
                        <button type="button" className="btn btn-outline-dark btn-sm">
                          구매 하기 💸
                         </button>
                      </a>
                      <a href="#addBookData">
                      <button type="button" 
                        className="btn btn-outline-dark btn-sm" 
                        onClick={()=>{getBookData(book)}}>
                        도서 정보 받아오기 🔖
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )}
    </div>
    </div>
    </div>
    }</>
    {/* 여기까지 검색 부분 */}
    
      {loading ? (<div><Loadingbar/></div>) : (<div>

      <div id="addBookData" className="col-12" >
        <div className="card text-dark bg-light mb-3" style={{maxWidth:'1200px'}}>
          <div className="row g-0 d-md-flex justify-content-md-end">

            {fileImage && (
            <div className="col-md-4" style={{margin:'1px auto 1px', width:'30%', paddingTop:'10px'}} >
            {/* 책 커버 이미지 필수 */}
              <img src={fileImage} className="img-fluid rounded-start" style={{width: '100%'}} alt="표지 이미지" />
            </div>
            )}

            <form className={fileImage ? 'col-md-8' : 'col-12' } onSubmit={onSubmit}>
              <div className="row mx-2 my-2">
                {/* 제목 필수 */}
                <div className="col-md-9">
                  <label className="form">제목</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="제목을 입력하세요..."
                    value={title}
                    required
                    onChange={(event)=>{
                      setTitle(event.target.value)
                    }} />

                </div>
                  {/* 상태 필수 */}
                <div className="col-md-3">
                  <label className="form">상태</label>
                  <select className="form-select" 
                    value={eventValue}
                    required
                    onChange={(event)=>{
                      setEventValue(event.target.value)}
                    } >
                    <option>관심</option>
                    <option>읽는중</option>
                    <option>완독</option>
                  </select>
                </div>

                {/* 작가 필수 */}
                <div className="col-md-6">
                  <label className="form">작가</label>
                  <input type="text" className="form-control" placeholder="작가를 입력하세요..." 
                    value={writer} 
                    required
                    onChange={(event)=>{
                      setWriter(event.target.value)
                    }}
                  />
                </div>
                {/* 카테고리 필수 */}
                <div className="col-md-6">
                  <label className="form">카테고리</label>
                  <input type="text" className="form-control" placeholder="카테고리를 입력하세요..."        
                  value={category}
                  required
                  onChange={(event)=>{
                   setCategory(event.target.value)
                  }}/>
                </div>
                {/* 이미지 필수 URL */}
                <div className="col-md-6">
                  <label className="form">이미지 URL</label>
                  <input type="text" className="form-control" placeholder="이미지 URL을 입력하세요..." 
                    value={fileImage} 
                    required
                    onChange={(event)=>{
                      setFileImage(event.target.value)
                    }}
                  />
                </div>
                {/* 구매링크 필수 */}
                <div className="col-md-6">
                  <label className="form">링크</label>
                  <input type="text" className="form-control" placeholder="책 구매 링크를 입력하세요..." 
                    value={bookLink}
                    required
                    onChange={(event)=>{
                      setBookLink(event.target.value)
                    }}
                  />
                </div>
                {/* 전체 페이지 수 필수 */}
                <div className="col-md-4">
                  <label className="form">전체 페이지 수</label>
                  <input type="text" className="form-control" placeholder="전체 페이지 수를 입력하세요..." 
                    value={bookTotalPagesNumber}
                    required
                    onChange={(event)=>{
                      setBookTotalPagesNumber(event.target.value)
                    }}
                  />
                </div>
                {eventValue !== '관심' &&                
                // 현재 페이지 읽는중, 완독
                <>
                <div className="col-md-4">
                  <label className="form">현재 페이지</label>
                  <input type="text" className="form-control" placeholder="현재 페이지를 입력하세요..." 
                    value={pageNow} 
                    required
                    onChange={(event)=>{
                      setPageNow(event.target.value)
                    }}
                  />
                </div>
                {/* 독서 시작 일 읽는중, 완독 */}
                <div className="col-md-4">
                  <label className="form">독서 시작 일</label>
                  <input type="date" className="form-control" placeholder="독서 시작을 입력하세요..." 
                    value={startBook} 
                    required
                    onChange={(event)=>{
                      setStartBook(event.target.value)
                    }}
                  />
                </div>
                {/* 완독 목표 일 읽는중, 완독 */}
                <div className="col-md-4">
                  <label className="form">완독 예정 일</label>
                  <input type="date" className="form-control" placeholder="완독 목표 일을 입력하세요..." 
                    value={mayEndBook} 
                    required
                    onChange={(event)=>{
                      setMayEndBook(event.target.value)
                    }}
                  />
                </div>
                </>
                }
                {/* 완독 일 필수 완독*/}
                {eventValue === '완독' && 
                <div className="col-md-4">
                  <label className="form">완독 일</label>
                  <input type="date" className="form-control" placeholder="완독 일을 입력하세요..." 
                    value={endBook} 
                    required
                    onChange={(event)=>{
                      setEndBook(event.target.value)
                    }}
                  />
                </div>
                }
                {/* 메모 필수 */}
                <div className="col-12 d-grid ">
                  <label className="form">메모</label>
                  {/* 관심을 때는 메모 내용이 작음 */}
                  {eventValue === '관심' ?
                  <div className="form-floating">
                    <textarea className="form-control" 
                      style={{height: 80}} 
                      required
                      value={bookMemo.replace(/(<([^>]+)>)/ig,"").split('\n').join('')} 
                      onChange={(e)=>{setBookMemo(e.target.value)}}
                    />
                  </div>
                  :
                  <>
                    <Editor
                    required
                    initialValue={`${bookMemo}`}
                    onInit={(evt, editor) => editorRef.current = editor}
                    apiKey="0qimyng0rpp6zypegcvukvielbp82am0x6y03ps511xflkvi"
                    init={{
                      height: 300,
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
                  </>
                  }
                  {eventValue !== "관심" &&<button className="btn btn-outline-dark" onClick={log}>저 장 📌</button>}
                </div>
              </div>
                  {eventValue === '관심' &&<button className="btn btn-outline-dark">저 장 📌</button>}
            </form> 
            {/* {bookId !== '' 
            ? 
            <button className="btn btn-outline-dark mt-4" type="submit">수 정</button>
            : 
            <button type="submit" className="btn btn-outline-dark mt-4">B o o k 저 장</button>
          } */}
          </div>
        </div>
      </div>
      </div>)}


{/* <h4>this is UpDataBook component</h4>
    <div>
      <label>제목 :</label>
      <input 
        placeholder="제목..." 
        value={title}
        onChange={(event)=>{
          setTitle(event.target.value)
        }}
      />
    </div>
    <div>
      <label>작가 :</label>
      <input 
        placeholder="작가..."
        value={writer} 
        onChange={(event)=>{
          setWriter(event.target.value)
        }}
      />
    </div>
    <div>
      <label>상태 :</label>
    <DropdownButton onSelect={SelectItem} title={eventValue ? `${eventValue}` : '상태를 선택해주세요'}>
      <Dropdown.Item eventKey="관심">---------관  심---------</Dropdown.Item>
      <Dropdown.Item eventKey="읽는중">--------읽는중--------</Dropdown.Item>
      <Dropdown.Item eventKey="완독">---------완  독---------</Dropdown.Item>
    </DropdownButton>
    </div>
    <div>
      <label>카테고리 :</label>
      <input 
        placeholder="카테고리..." 
        value={category}
        onChange={(event)=>{
          setCategory(event.target.value)
        }}
      />
    </div> */}

{/* 이미지 */}
{/* <label>이미지 :</label>
      <div>
        {fileImage && (
          <Image
            loader={fileImage}
            alt="책 표지 이미지"
            src={fileImage}
            width={200} 
            height={300}
            unoptimized
          />
        )}
        <div style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <input 
            placeholder="URL..."
            value={fileImage} 
            onChange={(event)=>{
              setFileImage(event.target.value)
            }}
          />                  
          <button onClick={() => deleteFileImage()}>삭제
          </button>
        </div>
      </div> */}
{/* ------- */}

{/* 링크 */}
{/* <div>
      <label>링크 :</label>
      <input 
       placeholder="https://example.com"
       type="url"
       value={bookLink}
       onChange={(event)=>{
        setBookLink(event.target.value)
      }}
       pattern="https://.*" size="30"
       />
</div> */}
{/* ---------- */}
{/* <div>
      <label>전체 페이지 수 :</label>
      <input  
        placeholder="전체 페이지 수..." 
        value={bookTotalPagesNumber}
        onChange={(event)=>{
          setBookTotalPagesNumber(event.target.value)
        }}
      />
    </div>

    {eventValue !== '관심' && 
      <>
        <div>
          <label>현재 페이지 :</label>
          <input 
            placeholder="현재 페이지..."
            value={pageNow} 
            onChange={(event)=>{
              setPageNow(event.target.value)
            }}
          />
        </div>
        <div>
          <label>독서 시작 일 :</label>
          <input
            type="date" 
            placeholder="독서 시작 일..."
            value={startBook} 
            onChange={(event)=>{
              setStartBook(event.target.value)
            }}
          />
        </div>
        <div>
          <label>완독 예정 일 :</label>
          <input
            type="date" 
            placeholder="완독 예정 일..."
            value={mayEndBook} 
            onChange={(event)=>{
              setMayEndBook(event.target.value)
            }}
          />
        </div>
        {eventValue === "완독" && 
          <div>
            <label>완독 일 :</label>
            <input
              type="date" 
              placeholder="완독 일..."
              value={endBook} 
              onChange={(event)=>{
                setEndBook(event.target.value)
              }}
            />
          </div>
        }
      </>
    } */}
{/* <div>
      <label>기록할 내용 :</label>
      <textarea 
        placeholder="기록할 내용..."
        value={bookMemo} 
        onChange={(event)=>{
          setBookMemo(event.target.value)
        }}
      />
    </div>
    {bookId !== '' ? <button onClick={createBookData}>수정</button> : <button onClick={saveBookData}>저장</button>} */}
    </>
  )
}

export default UpDataBook