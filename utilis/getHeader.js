import { getCookie } from "cookies-next"
import { LOGIN_DATA_KEY } from "./constants"

const getHeader = (isFormdata = false) =>
{
    const getData = getCookie(LOGIN_DATA_KEY)
    if (typeof getData !== 'undefined') {
        const userData = JSON.parse(getData)
        return isFormdata ? {
            headers: {
                'Authorization': `Bearer ${userData?.token}`,
                'Accept': 'application/json',
                "Content-Type": "multipart/form-data"

            }

        } : {
            headers: {
                'Authorization': `Bearer ${userData?.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        }
    } else {
        return null
    }
}

export default getHeader