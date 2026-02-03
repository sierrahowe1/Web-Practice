import React, { useState, useEffect } from 'react'

import './App.css'


export default function App() {
  const [resourceType, setResourceType] = useState('posts');

  useEffect(() => {
    console.log(`Resource type changed to: ${resourceType}`)

    return () => {
      console.log(`return from resource change: ${resourceType}`)
    }

  }, [resourceType])

  return (
    <>
    <div>
      <button onClick={() => setResourceType("posts")}>Posts</button>
      <button onClick={() => setResourceType("users")}>Users</button>
      <button onClick={() => setResourceType("comments")}>Comments</button>
    </div>
    <h1>{resourceType}</h1>
    </>

  )

}


