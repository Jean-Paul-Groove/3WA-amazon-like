import Dashboard from '../pages/Dashboard'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../store'

const ChecksUser = () => {

    const user = useAppSelector(state => state.user.currentUser)

  return user?.type === "SELLER" ? <Dashboard /> : <Navigate to="/account" replace/>
  
}

export default ChecksUser