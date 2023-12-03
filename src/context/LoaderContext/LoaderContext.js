import { useState, createContext, useContext } from 'react';

import './LoaderContext.css';

const LoaderContext = createContext();

const Loader = () => {
    return <div className='loader-container' >
        <img src="https://dhunjam.in/wp-content/uploads/2023/12/GIF_2.gif"  alt='Loading...' />
    </div>
}


export const LoaderProvider = ({children}) => {

    const [ isLoading, setLoader ] = useState(false);
    
   return <LoaderContext.Provider value={{isLoading, setLoader}} >
        { isLoading && <Loader /> }
        {children}
    </LoaderContext.Provider>
}

export const useLoader = () => useContext(LoaderContext);