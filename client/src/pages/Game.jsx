import { useEffect, useState } from 'react'
import useVerifyUser from '../hooks/useVerifyUser'
import { Link } from 'react-router-dom'

function ButtonLink({ to, children }) {
  return <Link to={to}><button>{children}</button></Link>;
}



export default function Game() {


  return (
    <>
      <h1>The Legend of Dizzy</h1>

      <div id="maze_container"></div>
    
    </>
  )
}
