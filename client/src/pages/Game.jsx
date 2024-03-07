import { useEffect, useState } from 'react'
import useVerifyUser from '../hooks/useVerifyUser'
import { Link } from 'react-router-dom'
const GAME_URL = "../../maze-game/index.html"

function ButtonLink({ to, children }) {
  return <Link to={to}><button>{children}</button></Link>;
}



export default function Game() {


  return (
    <>
      <h1>The Legend of Dizzy</h1>

      <div id="maze_container"></div>
      <div>
      <iframe src={GAME_URL} width={540} height={600}></iframe>
    </div>
    
    </>
  )
}
