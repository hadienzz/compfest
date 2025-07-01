import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    Utensils,
    Play,
    Pause,
    X,
    Bell,
    User,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

import useFormatPrice from "@/lib/useFormatPrice"
import useGetDataUser from "@/lib/useGetDataUser"
import useCancelSubscription from "@/lib/useCancelSubscription"
import AdminDashboard from "./AdminDashboard"
import { Link, useNavigate } from "react-router-dom"
import useSelectDate from "@/lib/useSelectDate"
import { Input } from "../ui/input"
import useResumeSubs from "@/lib/useResumeSubs"


export default function DashboardPage() {
    const navigate = useNavigate()
    const [userType, setUserType] = useState("user")
    const { handleStatus } = useCancelSubscription()


    const UserDashboard = () => {
        const token = localStorage.getItem('token')
        const { dataUser, dataUserLoading } = useGetDataUser()
        const [showPauseForm, setShowPauseForm] = useState(false)
        const [selectedId, setSelectedId] = useState(null)
        const { formik } = useSelectDate(selectedId)
        const { mutate } = useResumeSubs()
        if (!token) {
            navigate('/signin')
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

        if (dataUserLoading) {
            return <p>Loading...</p>
        }


        return (
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">Hello!</h1>
                    <p className="opacity-90">Manage your healthy meal subscriptions and view transaction history</p>
                </div>

                {/* Active Subscriptions Section */}
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Utensils className="h-5 w-5 text-emerald-600" />
                            Active Subscriptions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {dataUser.map((subscription) => (
                            <div key={subscription.id} className="border border-slate-200 rounded-xl p-6 space-y-4">
                                {/* Subscription Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">{subscription.plan}</h3>
                                        <p className="text-sm text-slate-600">Subscription ID: {subscription.id}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className={
                                                subscription.status === "Active"
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                                    : subscription.status === "Paused"
                                                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                                        : "bg-red-100 text-red-700 hover:bg-red-100"
                                            }
                                        >
                                            {subscription.status === "Active" && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {subscription.status === "Paused" && <Pause className="h-3 w-3 mr-1" />}
                                            {subscription.status === "Cancelled" && <X className="h-3 w-3 mr-1" />}
                                            {subscription.status}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Subscription Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                        <Label className="text-sm text-slate-600">Total Price</Label>
                                        <p className="font-bold text-lg text-emerald-600">{useFormatPrice(subscription.price)}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <Label className="text-sm text-slate-600">Meals per Week</Label>
                                        <p className="font-semibold">{subscription.deliveryDays.length} meals</p>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                                    <div>
                                        <Label className="text-sm text-slate-600">Start Date</Label>
                                        <p className="font-medium">{subscription.createdAt.split('T')[0]}</p>
                                    </div>
                                    {subscription.pausedUntil && (
                                        <div>
                                            <Label className="text-sm text-slate-600">Paused Until</Label>
                                            <p className="font-medium text-amber-600">{subscription.pausedUntil}</p>
                                        </div>
                                    )}
                                </div>


                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 pt-4">
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleStatus(subscription.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel Subscription
                                    </Button>
                                </div>
                            </div>
                        ))}

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
                                        <Label className="text-sm font-medium text-amber-800">
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
                                        type="submit"
                                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                                    >
                                        Confirm Pause
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>




            </div>
        )
    }


    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to={'/'} className="cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="bg-emerald-600 p-2 rounded-lg">
                                <Utensils className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">SEA Catering</h1>
                                <p className="text-sm text-slate-600">Dashboard</p>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Dashboard Type Selector */}
                        <Select value={userType} onValueChange={setUserType}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User Dashboard</SelectItem>
                                <SelectItem value="admin">Admin Dashboard</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="ghost" size="sm">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                <div className="max-w-7xl mx-auto">{userType === "user" ? <UserDashboard /> : <AdminDashboard />}</div>
            </main>
        </div>
    )
}
