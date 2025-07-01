import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useGetSubscriptionData from "@/lib/useGetSubscriptionData"
import useFormatPrice from "@/lib/useFormatPrice"
import {
    DollarSign,
    Users,
    TrendingUp,
    Play,
    Pause,
    BarChart3,
    PieChart,
    Activity,
    CheckCircle,
    AlertCircle,
} from "lucide-react"
import { SubscriptionList } from "../custom/SubscriptionList"
import useDecodeToken from "@/lib/useDecodeToken"
import useCancelSubscription from "@/lib/useCancelSubscription"


const AdminDashboard = () => {

    const [dateRange, setDateRange] = useState("30")
    const { totalRevenue, dataLength, newSubscription, cancelledSubs, loadingAdmin, lastPause, allData, } = useGetSubscriptionData()
    const token = localStorage.getItem('token')


    const userId = useDecodeToken(token)


    if (userId !== '108aef4e-b72e-4095-b64f-fd6e9be44338') {
        return (
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-red-400 text-6xl">404</h1>
                <p className="text-black text-2xl">Only admin can access this dashboard</p>
            </div>
        )
    }

    const adminMetrics = {
        newSubscriptions: 45,
        monthlyRevenue: 125000000,
        reactivations: 12,
        growthRate: 15.3,
        totalSubscribers: 1247,
        churnRate: 3.2,
    }


    if (loadingAdmin) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-600">New Subscriptions</p>
                                    <p className="text-2xl font-bold text-slate-800">{newSubscription?.name}</p>
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
                                { action: "New subscription", user: newSubscription?.name, type: "success" },
                                { action: "Subscription paused", user: lastPause?.name, type: "warning" },
                                { action: "Subscription cancelled", user: cancelledSubs?.name, type: "error" },
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

                <SubscriptionList
                    title="All Subscriptions Management"
                    icon={Users}
                    isAdminView={true}
                    showSearch={true}
                    showPagination={true}
                    onPause={(subscription) => console.log("Admin pause:", subscription)}
                    onResume={(subscription) => console.log("Admin resume:", subscription)}
                    onViewCustomer={(subscription) => console.log("View customer:", subscription)}
                    onManageSubscription={(subscription) => console.log("Manage subscription:", subscription)}
                />

            </div>
        </>
    )
}

export default AdminDashboard