import { useState } from 'react'
import InputLine from '../components/InputLine/InputLine'
import { supabase } from '../supabase/supabaseClient'
import { useNavigate } from "react-router-dom"
import checkSession from '../bridge/checkSession'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { setCurrentUSer } from '../store/userReducer'
const LoginPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [ newUser, setNewUser ] = useState({
        email: '',
        password: ''
    })

    const handleChange = (evt: any)=> {
        setNewUser({
            ...newUser,
            [evt.target.name]: evt.target.value
        })
    }

    const signInWithEmail = async (event:any) => {
        event.preventDefault()
            const { error } = await supabase.auth.signInWithPassword({
                email: newUser.email,
                password: newUser.password,
              })
            if (error) {
                console.error('Error:', error.message)
                return
            }
            else{
                const userData = await checkSession(false)
                if(userData){
                    dispatch(setCurrentUSer(userData))
                    navigate('/account')
                }
                else{
                    console.log("Identitfiant inconnu");
                    await supabase.auth.signOut();
                    
                }
            }
        }

    const redirectRegister = () => {
        navigate('/register')
        
    }

  return (
    <main className='auth-page'>


        <h2>Connexion</h2>
            <form onSubmit={signInWithEmail} className='auth-container'>
                <InputLine label="Email" value={newUser.email} name='email' onChange={handleChange}/>
                <InputLine label="Password" value={newUser.password} name='password' onChange={handleChange}/>
                <button type="submit">Login</button>
                <button type="button" onClick={redirectRegister}>Register</button>
            </form>

    </main>
  )
}

export default LoginPage