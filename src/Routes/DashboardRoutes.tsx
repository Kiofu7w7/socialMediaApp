import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../Containers/Private/LandingPage'
import NewComer from '../Containers/Private/NewComer'
import PrivateCheckRouter from './PrivateCheckRoutes'
import { useDispatch } from 'react-redux'
import { getAuth } from 'firebase/auth'
import { actionListUserAsyn } from '../Redux/Actions/ActionsUser'
import Search from '../Containers/Private/Search'
import Profile from '../Components/Profile'
import SearchResults from '../Containers/Private/SearchResults'

type UserState = boolean | null

const DashBoard = () => {

    const dispatch:any = useDispatch()
    const [user, setUser] = useState<UserState>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const auth = await dispatch(actionListUserAsyn())
                if (auth.UID) {
                    setUser(true)
                }
            } catch (error) {
                setUser(false)
            }
        }
        fetchUser()
    }, [])

    if (user === null) { // Si el estado user es null, muestra un indicador de carga
        return <div>Loading...</div>
    }


    return (
        <>
            <Routes>
                <Route path='/newcomer' element={<NewComer />}></Route>
                <Route path='/landingpage' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />
                <Route path='/search' element={<PrivateCheckRouter isAutentication={user}><Search /></PrivateCheckRouter>} />
                <Route path='/search/:searchTerm' element={<PrivateCheckRouter isAutentication={user}><SearchResults /></PrivateCheckRouter>} />
                <Route path='/profile' element={<PrivateCheckRouter isAutentication={user}><Profile /></PrivateCheckRouter>} />
                <Route path='/*' element={<PrivateCheckRouter isAutentication={user}><LandingPage /></PrivateCheckRouter>} />  
            </Routes>
        </>
    )
}

export default DashBoard