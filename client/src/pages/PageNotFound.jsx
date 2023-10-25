import React from 'react'
import "../styles/PageNotFound.scss"
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className='PageNotFound'>
        <div class="mars"></div>
        <img src="https://assets.codepen.io/1538474/404.svg" class="logo-404" alt=''/>
        <img src="https://assets.codepen.io/1538474/meteor.svg" class="meteor" alt=''/>
        <p class="title">Oh no!!</p>
        <p class="subtitle">
            You’re either misspelling the URL <br /> or requesting a page that's no longer here.
        </p>
        <div align="center">
            <Link class="btn-back" to="/">Back to previous page</Link>
        </div>
        <img src="https://assets.codepen.io/1538474/astronaut.svg" class="astronaut" alt=''/>
        <img src="https://assets.codepen.io/1538474/spaceship.svg" class="spaceship" alt=''/>
    </div>
  )
}
