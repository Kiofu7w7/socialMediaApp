import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../Containers/Private/LandingPage'
import NewComer from '../Containers/Private/NewComer'

const DashBoard = () => {

    return (
        <>
            <Routes>
                <Route path='/home' element={<LandingPage />}></Route>
                <Route path='/newcomer' element={<NewComer />}></Route>
                <Route path='/*' element={<Navigate to="/home" />} />
            </Routes>
        </>
    )
}

export default DashBoard