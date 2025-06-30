import { supabase } from "@/config/supabaseClient";
import { useEffect, useState } from "react";

const useGetSubscriptionData = () => {
    const [dataLength, setDataLength] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [newSubscription, setNewSubscription] = useState([])
    const [cancelledSubs, setCancelledSubs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from('subscription').select('*');
                const lastCancelled = data.filter((item) => item.status === 'Cancelled')
                const activeSubs = data.filter((item) => item.status === 'Active')
                if (error) {
                    throw error;
                }

                setDataLength(data.length);
                setTotalRevenue(activeSubs.reduce((acc, cur) => acc + cur.price, 0));
                setNewSubscription(data.at(-1))
                setCancelledSubs(lastCancelled.at(-1))
            } catch (err) {
                console.error('Error fetching subscription data:', err);
            }
        };

        fetchData();
    }, []);

    return {
        dataLength,
        totalRevenue,
        newSubscription,
        cancelledSubs
    };
};

export default useGetSubscriptionData;
