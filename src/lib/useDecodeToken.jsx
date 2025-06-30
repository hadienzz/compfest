import { jwtDecode } from "jwt-decode"

const useDecodeToken = (token) => {
    try {
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.sub
        return userId
    } catch (err) {
        console.error(err)
    }
}

export default useDecodeToken