import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
export const Mycontext = createContext();

const Context = ({ children }) => {
    const [acessToken, setacessToken] = useState('');
    const [user, setuser] = useState('');
    const [StudentArrayFromAttendencePage, setStudentArrayFromAttendencePage] = useState([
        // { name: 'Ayush Bahuguna',
        '57531'
        // }
    ]);

    const getUserData = async () => {
        const UserData = await AsyncStorage.getItem('userData');
        setuser(UserData);
        const token = await AsyncStorage.getItem('acessToken')
        setacessToken(token);
    };

    useEffect(() => { getUserData() }, [])

    setInterval(async () => {
        if (user) {
            const refreshToken = JSON.parse(user)?.refresh;
            const config = { headers: { "Content-Type": "application/json" } };
            const { data, error } = await axios.post(`https://attendance-app-besv.onrender.com/auth/token/refresh/`, { "refresh": refreshToken }, config)
            console.log('new token');
            if (data?.access) { setacessToken(data?.access) }
            await AsyncStorage.setItem('acessToken', data?.access)
        }
    }, 588888)

    return (
        <Mycontext.Provider value={{ StudentArrayFromAttendencePage, setStudentArrayFromAttendencePage, acessToken, setacessToken }}>
            {children}
        </Mycontext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(Mycontext);
}

export default Context
export { useGlobalContext }


