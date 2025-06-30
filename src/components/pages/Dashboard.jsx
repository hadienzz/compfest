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
    Settings,
    Bell,
    User,
    BarChart3,
    PieChart,
    Activity,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react"

import useGetSubscriptionData from "@/lib/useGetSubscriptionData"
import useFormatPrice from "@/lib/useFormatPrice"

export default function DashboardPage() {
    const [userType, setUserType] = useState("user") // "user" or "admin"
    const [dateRange, setDateRange] = useState("30")
    const { subscriptionLength, loadingData, totalRevenue } = useGetSubscriptionData()


    // Mock data
    const userSubscription = {
        plan: "Protein Plan",
        status: "Active",
        nextDelivery: "2024-01-15",
        mealsPerWeek: 14,
        price: "Rp 560,000",
        startDate: "2023-12-01",
    }

    const adminMetrics = {
        newSubscriptions: 45,
        monthlyRevenue: 125000000,
        reactivations: 12,
        growthRate: 15.3,
        totalSubscribers: 1247,
        churnRate: 3.2,
    }

    const UserDashboard = () => (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
                <h1 className="text-2xl font-bold mb-2">Hello!</h1>
                <p className="opacity-90">Manage your healthy meal subscription</p>
            </div>

            {/* Active Subscription Card */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-emerald-600" />
                        Active Subscription
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <Label className="text-sm text-slate-600">Current Plan</Label>
                                <p className="font-semibold text-lg">{userSubscription.plan}</p>
                            </div>
                            <div>
                                <Label className="text-sm text-slate-600">Status</Label>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        {userSubscription.status}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm text-slate-600">Monthly Cost</Label>
                                <p className="font-semibold text-lg text-emerald-600">{userSubscription.price}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <Label className="text-sm text-slate-600">Next Delivery</Label>
                                <p className="font-semibold">{userSubscription.nextDelivery}</p>
                            </div>
                            <div>
                                <Label className="text-sm text-slate-600">Meals per Week</Label>
                                <p className="font-semibold">{userSubscription.mealsPerWeek} meals</p>
                            </div>
                            <div>
                                <Label className="text-sm text-slate-600">Member Since</Label>
                                <p className="font-semibold">{userSubscription.startDate}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                        <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
                            <Pause className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Pause Subscription</h3>
                        <p className="text-sm text-slate-600 mb-4">Temporarily pause your deliveries</p>
                        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                            Pause
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                        <div className="bg-amber-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
                            <Settings className="h-6 w-6 text-amber-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Modify Plan</h3>
                        <p className="text-sm text-slate-600 mb-4">Change your meal preferences</p>
                        <Button
                            variant="outline"
                            className="w-full border-amber-200 text-amber-600 hover:bg-amber-50 bg-transparent"
                        >
                            Modify
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                        <div className="bg-red-100 p-3 rounded-full w-12 h-12 mx-auto mb-4">
                            <X className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Cancel Subscription</h3>
                        <p className="text-sm text-slate-600 mb-4">End your subscription</p>
                        <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            Cancel
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-emerald-600" />
                        Recent Deliveries
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { date: "2024-01-10", status: "Delivered", meals: 7 },
                            { date: "2024-01-03", status: "Delivered", meals: 7 },
                            { date: "2023-12-27", status: "Delivered", meals: 7 },
                        ].map((order, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="font-medium">{order.date}</p>
                                    <p className="text-sm text-slate-600">{order.meals} meals delivered</p>
                                </div>
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{order.status}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )

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
                                <p className="text-2xl font-bold text-slate-800">{adminMetrics.newSubscriptions}</p>
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
                                    {loadingData && <p>Loading...</p>}
                                    {!loadingData && `Rp ${useFormatPrice(totalRevenue)}`}
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
                                {loadingData && <p className="text-2xl font-bold text-slate-800">Loading...</p>}
                                {!loadingData && <p className="text-2xl font-bold text-slate-800">{subscriptionLength}</p>}
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
                            { action: "New subscription", user: "Sarah Johnson", time: "2 minutes ago", type: "success" },
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
