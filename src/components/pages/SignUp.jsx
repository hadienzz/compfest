import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Utensils, Lock, User, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useSignUp } from "@/lib/useAuthentication"

export default function SignUpPage() {
    const { formik } = useSignUp()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 shadow-lg">
                            <Utensils className="h-12 w-12 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-slate-600">Sign Up to continue to SEA Catering</p>
                    </div>

                    {/* Login Card */}
                    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-2xl font-semibold text-center text-slate-800">Sign Up</CardTitle>
                        </CardHeader >

                        {/* Username Field */}
                        <CardContent>
                            <form autoComplete="off" className="space-y-6" onSubmit={formik.handleSubmit} >
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                                        Username
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="Enter your username"
                                            className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl bg-slate-50/50"
                                            onChange={formik.handleChange}
                                            name={'email'}
                                            values={formik.values.email}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            className="pl-10 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl bg-slate-50/50"
                                            onChange={formik.handleChange}
                                            name={'password'}
                                            values={formik.values.password}
                                        />
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500"
                                        />
                                        <Label htmlFor="remember" className="text-sm text-slate-600">
                                            Remember me
                                        </Label>
                                    </div>
                                    <Link to="/signin" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                        Sign in
                                    </Link>
                                </div>

                                {/* Sign Up Button */}
                                <Button type={'submit'} className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                    Sign Up
                                </Button>
                            </form>

                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-slate-500">
                        <p>© 2024 SEA Catering. All rights reserved.</p>
                    </div>
                </div>
            </div >
        </div >
    )
}
