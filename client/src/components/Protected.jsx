import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({Component}) => {
    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem('token')
        if(!auth){
            navigate('/login');
        }
    }, [])
  return (
    <div>
      <Component />
    </div>
  )
}

export default Protected
