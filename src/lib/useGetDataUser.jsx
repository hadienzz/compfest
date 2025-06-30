import { supabase } from "@/config/supabaseClient"
import useDecodeToken from "./useDecodeToken"
import { useEffect, useState } from "react"

const useGetDataUser = () => {
    const [dataUser, setDataUser] = useState([])
    const [dataUserLoading, setDataUserLoading] = useState(false)
    const token = localStorage.getItem('token')
    const decodeToken = useDecodeToken(token)

    useEffect(() => {
        const handleGetDataUser = async () => {
            setDataUserLoading(true)
            const { data, error } = await supabase.from('subscription').select('*').eq('userId', decodeToken)
            if (error) {
                console.error(error)
                return
            }

            setDataUser(data)
            setDataUserLoading(false)
        }
        handleGetDataUser()
        console.log(dataUser)
    }, [])

    return {
        dataUser,
        dataUserLoading
    }
}

export default useGetDataUser