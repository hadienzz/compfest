import { supabase } from "@/config/supabaseClient"

const useDeleteSubscription = async (id) => {
    const { data, error } = await supabase.from('subscription').delete().eq('id', id)

    if (error) {
        console.error('Error deleting subscription: ', error.message)
        return
    }
    console.log('Delete success ', data)
    window.location.reload()
}

export default useDeleteSubscription