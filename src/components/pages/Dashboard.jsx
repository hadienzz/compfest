import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
    Utensils,
    DollarSign,
    Users,
    TrendingUp,
    Play,
    Pause,
    X,
    Bell,
    User,
    BarChart3,
    PieChart,
    Activity,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

import useGetSubscriptionData from "@/lib/useGetSubscriptionData"
import useFormatPrice from "@/lib/useFormatPrice"
import useGetDataUser from "@/lib/useGetDataUser"
import useDeleteSubscription from "@/lib/useDeleteSubscription"
import { useNavigate } from "react-router-dom"
import { Input } from "../ui/input"

export default function DashboardPage() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [userType, setUserType] = useState("user")
    const [dateRange, setDateRange] = useState("30")
    const { totalRevenue, dataLength, newSubscription } = useGetSubscriptionData()

    const adminMetrics = {
        newSubscriptions: 45,
        monthlyRevenue: 125000000,
        reactivations: 12,
        growthRate: 15.3,
        totalSubscribers: 1247,
        churnRate: 3.2,
    }

    if (!token) {
        navigate('/signin')
    }

    const UserDashboard = () => {
        const [showPauseModal, setShowPauseModal] = useState(false)
        const [pauseStartDate, setPauseStartDate] = useState("")
        const [pauseEndDate, setPauseEndDate] = useState("")
        const { dataUser, dataUserLoading } = useGetDataUser()

        if (dataUserLoading) {
            return <p>Loading...</p>
        }


        const formatPrice = (price) => {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(price)
        }

        const handlePauseSubscription = () => {
            // Logic for pausing subscription
            console.log("Pausing subscription from", pauseStartDate, "to", pauseEndDate)
            setShowPauseModal(false)
            setPauseStartDate("")
            setPauseEndDate("")
        }



        return (
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                    <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
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
                                        <p className="font-bold text-lg text-emerald-600">{formatPrice(subscription.price)}</p>
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
                                    <div>
                                        <Label className="text-sm text-slate-600">Next Delivery</Label>
                                        <p className="font-medium">NEXT DELIVERY</p>
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
                                            onClick={() => setShowPauseModal(true)}
                                            className="border-amber-200 text-amber-600 hover:bg-amber-50 bg-transparent"
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
                                        >
                                            <Play className="h-4 w-4 mr-2" />
                                            Resume Subscription
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => useDeleteSubscription(subscription.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel Subscription
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>


                {/* Pause Subscription Modal */}
                {showPauseModal && (
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="w-full max-w-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Pause className="h-5 w-5 text-amber-600" />
                                    Pause Subscription
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-600">
                                    Select the date range for pausing your subscription. No charges will be applied during this period.
                                </p>

                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="pauseStart">Pause Start Date</Label>
                                        <Input
                                            id="pauseStart"
                                            type="date"
                                            value={pauseStartDate}
                                            onChange={(e) => setPauseStartDate(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="pauseEnd">Pause End Date</Label>
                                        <Input
                                            id="pauseEnd"
                                            type="date"
                                            value={pauseEndDate}
                                            onChange={(e) => setPauseEndDate(e.target.value)}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div className="bg-amber-50 p-3 rounded-lg">
                                    <p className="text-sm text-amber-800">
                                        <AlertCircle className="h-4 w-4 inline mr-1" />
                                        Your subscription will be automatically resumed after the selected end date.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setShowPauseModal(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handlePauseSubscription}
                                        className="flex-1 bg-amber-600 hover:bg-amber-700"
                                        disabled={!pauseStartDate || !pauseEndDate}
                                    >
                                        Confirm Pause
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

            </div>
        )
    }

    const AdminDashboard = () => (
        <div className="space-y-6">
            {/* Header with Date Range */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
                    <p className="text-slate-600">Monitor subscription metrics and growth</p>
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="dateRange" className="text-sm font-medium">
                        Date Range:
                    </Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                            <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">New Subscriptions</p>
                                <p className="text-2xl font-bold text-slate-800">{newSubscription.name}</p>
                            </div>
                            <div className="bg-emerald-100 p-3 rounded-full">
                                <Users className="h-6 w-6 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-slate-800">
                                    {`Rp ${useFormatPrice(totalRevenue)}`}
                                </p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <DollarSign className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Reactivations</p>
                                <p className="text-2xl font-bold text-slate-800">{adminMetrics.reactivations}</p>
                                <p className="text-sm text-amber-600">+3 from last week</p>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-full">
                                <Play className="h-6 w-6 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-600">Total Subscribers</p>
                                <p className="text-2xl font-bold text-slate-800">{dataLength}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            Subscription Growth
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 bg-gradient-to-t from-emerald-50 to-transparent rounded-lg flex items-end justify-center p-4">
                            <div className="flex items-end gap-2 h-full w-full">
                                {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                                    <div key={index} className="bg-emerald-500 rounded-t flex-1" style={{ height: `${height}%` }}></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-slate-600 mt-2">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-emerald-600" />
                            Plan Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { plan: "Protein Plan", percentage: 45, color: "bg-emerald-500" },
                                { plan: "Diet Plan", percentage: 30, color: "bg-blue-500" },
                                { plan: "Royal Plan", percentage: 15, color: "bg-purple-500" },
                                { plan: "Family Pack", percentage: 10, color: "bg-amber-500" },
                            ].map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{item.plan}</span>
                                        <span className="text-slate-600">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                        <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-emerald-600" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { action: "New subscription", user: newSubscription.name, time: "2 minutes ago", type: "success" },
                            { action: "Subscription paused", user: "Mike Chen", time: "15 minutes ago", type: "warning" },
                            { action: "Plan upgraded", user: "Anna Smith", time: "1 hour ago", type: "info" },
                            { action: "Subscription cancelled", user: "David Wilson", time: "2 hours ago", type: "error" },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <div
                                    className={`p-2 rounded-full ${activity.type === "success"
                                        ? "bg-emerald-100"
                                        : activity.type === "warning"
                                            ? "bg-amber-100"
                                            : activity.type === "info"
                                                ? "bg-blue-100"
                                                : "bg-red-100"
                                        }`}
                                >
                                    {activity.type === "success" ? (
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                    ) : activity.type === "warning" ? (
                                        <Pause className="h-4 w-4 text-amber-600" />
                                    ) : activity.type === "info" ? (
                                        <TrendingUp className="h-4 w-4 text-blue-600" />
                                    ) : (
                                        <AlertCircle className="h-4 w-4 text-red-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-sm text-slate-600">{activity.user}</p>
                                </div>
                                <span className="text-sm text-slate-500">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-600 p-2 rounded-lg">
                            <Utensils className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">SEA Catering</h1>
                            <p className="text-sm text-slate-600">Dashboard</p>
                        </div>
                    </div>

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
