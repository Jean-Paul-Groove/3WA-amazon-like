import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import checkSession from './bridge/checkSession'

function App() {
  const navigate = useNavigate()

  const init = async () => {
    const userData = await checkSession(true);
    console.log('userData init:',userData.data);
    
    if (userData) {
      console.log("App userData de checkSession", userData);
      navigate("/account");
    }
    else{
      navigate("/first-connection");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      Chargement en cours....
    </main>
  )
}

export default App
