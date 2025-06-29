import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const useAddSubscription = () => {
    const token = localStorage.getItem('token')

    const { mutate } = useMutation({
        mutationFn: async (body) => {
            const { name, phone, price, mealTypes, deliveryDays, allergies } = body.submissionData

            const subscriptionData = {
                name,
                phone,
                price,
                mealTypes,
                deliveryDays,
                allergies
            }

            const result = await axios.post('http://localhost:3000/subscription', subscriptionData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return result.data
        },
        mutationKey: ['subscription']

    })

    return {
        mutate
    }
}

export default useAddSubscription