import { useRouter } from 'next/router'
import UpDataBook from '../../src/component/UpDataBook'

const Post = () => {
  const router = useRouter()
  const  bookId  = router.query.id

  return (
  <>
    <div className="container" style={{paddingTop:'5%'}}>
      <UpDataBook bookId={bookId}/>
    </div>
  </>
  )
}

export default Post