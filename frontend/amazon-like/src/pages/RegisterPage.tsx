import { useState } from 'react'
import InputLine from '../components/inputLine'
import { supabase } from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

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

    const signUpNewUser = async (event) => {
        event.preventDefault()
        console.log('signInWithEmail');
            const { data, error } = await supabase.auth.signUp({
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

        const redirectLogin = () => {
            navigate('/login')
            
        }

  return (
    <main>
        Register Page
        <form onSubmit={signUpNewUser}>
            <InputLine label="Email" value={user.email} name='email' onChange={handleChange}/>
            <InputLine label="Password" value={user.password} name='password' onChange={handleChange}/>
            <button type="submit">Register</button>
            <button type="button" onClick={redirectLogin}>Login</button>
        </form>
    </main>
  )
}

export default RegisterPage