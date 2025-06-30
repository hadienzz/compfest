import { supabase } from "@/config/supabaseClient"
import { useMutation } from "@tanstack/react-query"
import useDecodeToken from "./useDecodeToken"

const useAddSubscription = () => {
    const token = localStorage.getItem('token')

    const { mutate } = useMutation({
        mutationFn: async (body) => {
            const { name, phone, price, mealTypes, deliveryDays, allergies, plan } = body.submissionData
            const userId = useDecodeToken(token)

            const subscriptionData = {
                userId,
                name,
                phone,
                price: Number(price),
                mealTypes,
                deliveryDays,
                allergies,
                plan
            }

            const { data, error } = await supabase.from('subscription').insert([subscriptionData])

            if (error) {
                console.log(error)
                return
            }

            return data
        },
        mutationKey: ['subscription']
    })


    return {
        mutate
    }
}

export default useAddSubscription