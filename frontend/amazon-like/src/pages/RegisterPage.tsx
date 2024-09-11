import { useState } from 'react'
import InputLine from '../components/InputLine/InputLine'
import { supabase } from '../supabase/supabaseClient'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

    const navigate = useNavigate()

    const [ newUser, setnewUser ] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt: any)=> {
        setnewUser({
            ...newUser,
            [evt.target.name]: evt.target.value
        })
    }

    const signUpNewnewUser = async (event) => {
        event.preventDefault()
        console.log('signInWithEmail');
            const { data, error } = await supabase.auth.signUp({
                email: newUser.email,
                password: newUser.password,
              })
            if (error) {
                console.error('Error:', error.message)
                return
            }
            else{
                navigate('/login')
            }
        }

        const redirectLogin = () => {
            navigate('/login')
            
        }

  return (
    <main className='auth-page'>
            <h2>Inscription</h2>
            <form onSubmit={signUpNewnewUser} className='auth-container'>
                <InputLine label="Email" value={newUser.email} name='email' onChange={handleChange}/>
                <InputLine label="Password" value={newUser.password} name='password' onChange={handleChange}/>
                <button type="submit">Register</button>
                <button type="button" onClick={redirectLogin}>Login</button>
            </form>
    </main>
  )
}

export default RegisterPage