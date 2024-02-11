import { createContext, useState, useContext } from "react";
export const Mycontext = createContext();

const Context = ({ children }) => {
    const [StudentArrayFromAttendencePage, setStudentArrayFromAttendencePage] = useState([{ name: 'Ayush Bahuguna', id: '57531' }]);
    return (
        <Mycontext.Provider value={{ StudentArrayFromAttendencePage, setStudentArrayFromAttendencePage }}>
            {children}
        </Mycontext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(Mycontext);
}

export default Context
export { useGlobalContext }


