import { supabase } from "@/config/supabaseClient"
import useDecodeToken from "./useDecodeToken"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

const useGetDataUser = () => {
    const token = localStorage.getItem('token')
    const decodeToken = useDecodeToken(token)

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const { data, error } = await supabase.from('subscription').select('*').eq('userId', decodeToken)
            if (error) {
                console.error(error)
                return
            }
            return data
        },
        queryKey: ['subscription']
    })


    return {
        dataUser: data,
        dataUserLoading: isLoading
    }
}

export default useGetDataUser