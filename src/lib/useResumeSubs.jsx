import { supabase } from "@/config/supabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useResumeSubs = () => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async (id) => {
            console.log(id)
            const { data, error } = await supabase.from('subscription').update({ status: 'Active', pausedAt: null }).eq('id', id)
            if (error) {
                consple.log(error)
                return
            }
            return data
        },
        mutationKey: ['subscription'],
        onSuccess: () => {
            queryClient.invalidateQueries(['subscription'])
        }
    })

    return {
        mutate
    }

}

export default useResumeSubs