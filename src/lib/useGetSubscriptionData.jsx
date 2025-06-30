import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

const useGetSubscriptionData = () => {
    const getData = async () => {
        const response = await axios.get('http://localhost:3000/subscription')

        return response.data
    }

    const { data, isError, isLoading } = useQuery({
        queryFn: getData,
        queryKey: ['subscriptions']
    })

    return {
        subscriptionLength: data?.dataLength,
        totalRevenue: data?.totalRevenue,
        loadingData: isLoading
    }
}

export default useGetSubscriptionData