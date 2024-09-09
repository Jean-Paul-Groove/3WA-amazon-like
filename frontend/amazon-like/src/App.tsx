import { useState, useEffect } from 'react'
import { supabase } from './supabase/supabaseClient'
import LoginPage from './pages/LoginPage'
import Account from './pages/Account'
import { useAuth } from './context/AuthContext'


function App() {

  const [session, setSession] = useState(null)

  const { setUser } = useAuth()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session', session);
      
      setSession(session)
      
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <main>
      {!session ? <LoginPage /> : <Account  key={session.user.id} session={session} />}
    </main>
  )
}

export default App
