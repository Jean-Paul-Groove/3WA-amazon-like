import React from 'react'

const RegisterPage = () => {

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt: any)=> {
        setUser({
            ...user,
            [evt.target.name]: evt.target.value
        })
    }

    
  return (
    <div>RegisterPage</div>
  )
}

export default RegisterPage