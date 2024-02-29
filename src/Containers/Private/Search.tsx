import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionListPublicationsAsync } from '../../Redux/Actions/ActionPublication'

const Search = () => {

    const dispatch: any = useDispatch()
    
    const [objetos, setObjetos] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const datos = await dispatch(actionListPublicationsAsync())
                setObjetos(datos)
            } catch (error) {
                
            }
        }
        fetchUser()
    }, [])
    

    const [searchInput, setSearchInput] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('Buscando:', searchInput)
    }

    const handleChange = (e: any) => {
        setSearchInput(e.target.value)
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="searchInput"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <button type="submit">Buscar</button>
            </form>
            <div>
                {objetos?.map((o: any, index: number) => (
                    <div key={index}>
                        <img style={{width:150, height:150}} src={o.Media} alt='imagen'></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search