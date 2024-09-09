import { useState } from 'react'
import InputLine from '../components/inputLine'
import { supabase } from '../supabase/supabaseClient'
import { redirect, useNavigate } from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate()

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

    const signInWithEmail = async (event) => {
        event.preventDefault()
        console.log('signInWithEmail');
            const { data, error } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: user.password,
              })
            if (error) {
                console.error('Error:', error.message)
                return
            }
            else{
                console.log('Data:', data);
                
            }
        }

    const redirectRegister = () => {
        navigate('/register')
        
    }

  return (
    <main>
        LoginPage
        <form onSubmit={signInWithEmail}>
            <InputLine label="Email" value={user.email} name='email' onChange={handleChange}/>
            <InputLine label="Password" value={user.password} name='password' onChange={handleChange}/>
            <button type="submit">Login</button>
            <button type="button" onClick={redirectRegister}>Register</button>
        </form>
    </main>
  )
}

export default LoginPage