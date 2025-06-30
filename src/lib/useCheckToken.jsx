import { useNavigate } from "react-router-dom"

export const useCheckToken = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleCheck = () => {
        if (!token) {
            navigate('/signin')
        } else {
            navigate('/subscription')
        }
    }

    return {
        handleCheck
    }
}

