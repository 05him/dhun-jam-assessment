import './OtherRoutes.css';

export const Unauthorized = () => {
    return<>
        <h1> 401 - Unauthorized </h1>
        <p> You are not authorized to access this page directly </p>
    </> 
}

export const NotFound = () => {
    return <>
        <h1> 404 - Not found </h1>
        <p> Oopss.. The page you are looking for dont exist </p>
    </>
}