import { supabase } from "@/config/supabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useCancelSubscription = () => {
    const queryClient = useQueryClient()


    const { mutate, isError } = useMutation({
        mutationFn: async (id) => {
            const { data, error } = await supabase.from('subscription').update({ status: 'Cancelled' }).eq('id', id)

            if (error) {
                console.error(error)
                return
            }

            return data

        },
        mutationKey: ['subscription'],
        onSuccess: () => {
            queryClient.invalidateQueries(['subscription'])
        }
    })

    const handleStatus = (id) => {
        mutate(id)
    }

    return {
        handleStatus
    }
}

export default useCancelSubscription