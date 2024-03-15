import { getCookie } from "cookies-next"

const getUserData = () =>
{
    const getData = getCookie('userLogin')
    if (typeof getData !== 'undefined') {
        const userData = JSON.parse(getData)
        return userData
    } else {
        return null
    }



}

export default getUserData