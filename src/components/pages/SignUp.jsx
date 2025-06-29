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
                                    <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Sign Up Button */}
                                <Button type={'submit'} className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                                    Sign Up
                                </Button>
                            </form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50 rounded-xl bg-transparent">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </Button>
                                <Button variant="outline" className="h-12 border-slate-200 hover:bg-slate-50 rounded-xl bg-transparent">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sign Up Link */}
                    {/* <div className="text-center mt-6">
                        <p className="text-slate-600">
                            Don't have an account?{" "}
                            <Link href="/contact" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                Contact us to get started
                            </Link>
                        </p>
                    </div> */}

                    {/* Footer */}
                    <div className="text-center mt-8 text-sm text-slate-500">
                        <p>© 2024 SEA Catering. All rights reserved.</p>
                    </div>
                </div>
            </div >
        </div >
    )
}
