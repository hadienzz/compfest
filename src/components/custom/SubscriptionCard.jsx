import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CheckCircle, Pause, X, Play, Settings, User, DollarSign, AlertCircle } from "lucide-react"
import useGetSubscriptionData from "@/lib/useGetSubscriptionData"
import useFormatPrice from "@/lib/useFormatPrice"
import { useState } from "react"
import { Input } from "../ui/input"
import useSelectDate from "@/lib/useSelectDate"
import useResumeSubs from "@/lib/useResumeSubs"
import useCancelSubscription from "@/lib/useCancelSubscription"

export function SubscriptionCard({ subscription }) {
    const getStatusBadge = (status) => {
        const baseClasses = "hover:bg-current"
        switch (status) {
            case "Active":
                return `bg-emerald-100 text-emerald-700 ${baseClasses}`
            case "Paused":
                return `bg-amber-100 text-amber-700 ${baseClasses}`
            case "Cancelled":
                return `bg-red-100 text-red-700 ${baseClasses}`
            default:
                return `bg-slate-100 text-slate-700 ${baseClasses}`
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "Active":
                return <CheckCircle className="h-3 w-3 mr-1" />
            case "Paused":
                return <Pause className="h-3 w-3 mr-1" />
            case "Cancelled":
                return <X className="h-3 w-3 mr-1" />
            default:
                return null
        }
    }

    const { loadingAdmin } = useGetSubscriptionData()
    const [showPauseForm, setShowPauseForm] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const { formik } = useSelectDate(selectedId)
    const { mutate } = useResumeSubs()
    const { cancelSubs } = useCancelSubscription()

    if (loadingAdmin) {
        return (
            <p>Loading...</p>
        )
    }

    const openPauseForm = (id) => {
        setSelectedId(id)
        setShowPauseForm(true)
    }

    const closePauseForm = () => {
        setShowPauseForm(false)
        setSelectedId(null)
    }

    const handleResume = (id) => {
        mutate(id)
    }

    return (
        <>
            <div className="border border-slate-200 rounded-xl p-6 space-y-4">
                {/* Subscription Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{subscription.plan}</h3>
                        <p className="text-sm text-slate-600">
                            {`User: ${subscription.name} • ID:${subscription.id}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={getStatusBadge(subscription.status)}>
                            {getStatusIcon(subscription.status)}
                            {subscription.status}
                        </Badge>
                    </div>
                </div>

                {/* Subscription Details Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-4`}>
                    <div className="space-y-1">
                        <Label className="text-sm text-slate-600">Meal Types</Label>
                        <div className="flex flex-wrap gap-1">
                            {subscription.mealTypes.map((meal, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {meal}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-sm text-slate-600">Delivery Days</Label>
                        <div className="flex flex-wrap gap-1">
                            {subscription.deliveryDays.map((day, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {day}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-sm text-slate-600"> Monthly Price</Label>
                        <p className="font-bold text-lg text-emerald-600">{useFormatPrice(subscription.price)}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-sm text-slate-600">MEALS PER WEEK</Label>
                        <p className="font-semibold">{subscription.mealTypes.length} meals</p>
                    </div>

                </div>

                {/* Additional Info */}
                <div
                    className={`grid grid-cols-1  md:grid-cols-4" gap-4 pt-4 border-t border-slate-100`}
                >
                    <div>
                        <Label className="text-sm text-slate-600">Contact</Label>
                        <p className="font-medium text-sm">{subscription.name}</p>
                        <p className="font-medium text-sm">{subscription.phone}</p>
                    </div>

                    {subscription.pausedAt && (
                        <div>
                            <Label className="text-sm text-slate-600">Paused Until</Label>
                            <p className="font-medium text-sm">{subscription.pausedAt}</p>
                        </div>
                    )}

                </div>

                <div className="flex flex-wrap gap-3 pt-4">

                    <>
                        {subscription.status === 'Active' && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => cancelSubs(subscription.id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel Subscription
                            </Button>
                        )}


                        {subscription.status === "Active" && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-amber-200 text-amber-600 hover:bg-amber-50 bg-transparent"
                                onClick={() => openPauseForm(subscription.id)}
                            >
                                <Pause className="h-4 w-4 mr-2" />
                                Pause Subscription
                            </Button>
                        )}
                        {subscription.status === "Paused" && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                                onClick={() => handleResume(subscription.id)}
                            >
                                <Play className="h-4 w-4 mr-2" />
                                Resume Subscription
                            </Button>
                        )}
                    </>
                    {showPauseForm && (
                        <form className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-4" onSubmit={formik.handleSubmit}>
                            <div className="flex items-center gap-2 mb-3">
                                <Pause className="h-5 w-5 text-amber-600" />
                                <h4 className="font-semibold text-amber-800">Pause Subscription</h4>
                            </div>

                            <p className="text-sm text-amber-700 mb-4">
                                Select the date range for pausing your subscription. No charges will be applied during this period.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div>
                                    <Label htmlFor={`pauseEnd-${subscription.id}`} className="text-sm font-medium text-amber-800">
                                        Pause End Date
                                    </Label>
                                    <Input
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values.date}
                                        name={'date'}
                                        type="date"
                                        className="mt-1 border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </div>
                            </div>

                            <div className="bg-amber-100 p-3 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    <AlertCircle className="h-4 w-4 inline mr-1" />
                                    Your subscription will be automatically resumed after the selected end date.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
                                    onClick={closePauseForm}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                                >
                                    Confirm Pause
                                </Button>
                            </div>
                        </form>
                    )}




                </div>
            </div>
        </>
    )
}
