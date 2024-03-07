import { useEffect, useState } from 'react'
import useVerifyUser from '../hooks/useVerifyUser'
import { Link } from 'react-router-dom'

function ButtonLink({ to, children }) {
  return <Link to={to}><button>{children}</button></Link>;
}

import "/node_modules/bootstrap/dist/css/bootstrap.min.css"


export default function Game() {

  

  return (
    <>
      <div>
        Game window goes here
      </div>
      <button>Restart</button>
      {/* High score page? */}
      <ButtonLink to="/high">High Scores</ButtonLink>
    
    </>
  )
}
