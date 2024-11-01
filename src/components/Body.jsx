import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ])
  return (
    <div className='bg-black'>
    <div className="bg-[url('/netflix-bg.jpg')]">
      <RouterProvider router={appRouter}/>
    </div>
    </div>
  )
}

export default Body
