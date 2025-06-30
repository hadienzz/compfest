import { supabase } from "@/config/supabaseClient";
import { useEffect, useState } from "react";

const useGetSubscriptionData = () => {
    const [dataLength, setDataLength] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [newSubscription, setNewSubscription] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from('subscription').select('*');

                if (error) {
                    throw error;
                }

                setDataLength(data.length); // Set dataLength ke state
                setTotalRevenue(data.reduce((acc, cur) => acc + cur.price, 0));
                setNewSubscription(data.at(-1))
            } catch (err) {
                console.error('Error fetching subscription data:', err);
            }
        };

        fetchData();
    }, []);

    return {
        dataLength,
        totalRevenue,
        newSubscription
    };
};

export default useGetSubscriptionData;
