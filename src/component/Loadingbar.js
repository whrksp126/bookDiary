import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

const Loadingbar = () => {
  return (

  <div className="col-xl-6">
  <div className="card placeholder-glow" aria-hidden="true">
    <img src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640" style={{width: '30%', margin:'0 auto 0'}} className="card-img-top " alt="..." />
    <Spinner animation="border" role="status" style={{margin: '0 auto 0'}}  >
    <span className="visually-hidden" >
      loading
    </span>
  </Spinner>
    <div className="card-body">
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-6" />
      </h5>
      <p className="card-text placeholder-glow">
        <span className="placeholder col-7" />
        <span className="placeholder col-4" />
        <span className="placeholder col-4" />
        <span className="placeholder col-6" />
        <span className="placeholder col-8" />
      </p>
      <a href="#" tabIndex={-1} className="btn btn-dark disabled placeholder col-6" />
    </div>
  </div>
</div>

  )
}

export default Loadingbar;