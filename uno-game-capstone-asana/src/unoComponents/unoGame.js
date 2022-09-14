import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket 
const url = 'http://localhost:3002'

function Game (props){
    const data = queryString.parse(props.location.search)
    
  //initialize socket state
  const [room, setRoom] = useState(data.roomCode)
  const [roomFull, setRoomFull] = useState(false)
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])






}