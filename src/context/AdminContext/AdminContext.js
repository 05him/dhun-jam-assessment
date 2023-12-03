import { createContext, useContext, useReducer } from "react";

const AdminContext = createContext();

const adminDataHandler = ( data, action ) => {
    switch(action.type){
        case 'INITIAL_DATA' : return {...data, ...action.newData, isLoggedIn: true};

        default: throw Error('Some error occured in handeling initial data');
    }
}

export const AdminProvider = ({children}) => {

    const [ adminData, updateAdminData ] = useReducer(adminDataHandler, { isLoggedIn: false });

    const addInitialAdminData = newData => updateAdminData({ type: 'INITIAL_DATA', newData });

    return <AdminContext.Provider value={{ adminData, addInitialAdminData }} >
        {children}
    </AdminContext.Provider>
}

export const useAdmin = () => useContext(AdminContext);