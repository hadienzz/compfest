import { supabase } from "@/config/supabaseClient"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const usePauseSubs = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ id, date }) => {
            const { data, error } = await supabase
                .from('subscription')
                .update({ status: 'Paused', pausedAt: date })
                .eq('id', id)
            if (error) {
                console.log(error)
                return
            }
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['subscription'])
        }
    })

    return {
        mutate,
        isPending
    }
}

export default usePauseSubs
