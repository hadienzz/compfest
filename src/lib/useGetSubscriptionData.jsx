import { supabase } from "@/config/supabaseClient";
import { useQuery } from "@tanstack/react-query";

const useGetSubscriptionData = () => {
    const { data = [], isLoading, error } = useQuery({
        queryKey: ['subscription'],
        queryFn: async () => {
            const { data, error } = await supabase.from('subscription').select('*');
            if (error) throw error;
            return data;
        }
    });

    const dataLength = data.length;

    const activeSubs = data.filter((item) => item.status === 'Active');
    const totalRevenue = activeSubs.reduce((acc, cur) => acc + cur.price, 0);

    const lastCancelled = data.filter((item) => item.status === 'Cancelled').at(-1);
    const newSubscription = data.at(-1);
    const lastPause = data.filter((item) => item.status === 'Paused').at(-1)
    return {
        dataLength,
        totalRevenue,
        newSubscription,
        cancelledSubs: lastCancelled,
        allData: data,
        loadingAdmin: isLoading,
        lastPause,
        error,
    };
};

export default useGetSubscriptionData;
