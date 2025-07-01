import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { SubscriptionCard } from "./SubscriptionCard"
import { Utensils } from "lucide-react"
import useGetSubscriptionData from "@/lib/useGetSubscriptionData"

export function SubscriptionList({
    title,
    icon: Icon = Utensils,
    isAdminView = false,
    showSearch = false,
    onPause,
    onResume,
    onCancel,
    onModify,
    onViewCustomer,
    onManageSubscription,
    onViewTransactions,
    handleOpenPause,
    selectedid
}) {


    const { allData, } = useGetSubscriptionData()

    return (
        <>
            {
                allData.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-slate-600">No subscriptions found matching your criteria.</p>
                    </div>
                )
            }

            <Card className="border-0 shadow-lg" >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-emerald-600" />
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    {allData.map((item, idx) => (
                        <SubscriptionCard
                            selectedid={selectedid}
                            key={idx}
                            isAdminView={isAdminView}
                            subscription={item}
                            onPause={onPause}
                            onResume={onResume}
                            onCancel={onCancel}
                            onModify={onModify}
                            onViewCustomer={onViewCustomer}
                            onManageSubscription={onManageSubscription}
                            onViewTransactions={onViewTransactions}
                        />

                    ))}


                </CardContent>
            </Card >
        </>
    )
}
