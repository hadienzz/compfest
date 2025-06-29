import { useState, useEffect } from "react"
import { Navigation } from "@/components/custom/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, Check, Phone, Mail, MapPin, AlertCircle } from "lucide-react"
import useAddSubscription from "@/lib/useAddSubscription"

const planOptions = [
    {
        id: "diet",
        name: "Diet Plan",
        price: 30000,
        description: "Balanced nutrition for healthy weight management",
    },
    {
        id: "protein",
        name: "Protein Plan",
        price: 40000,
        description: "High-protein meals for muscle building and recovery",
    },
    {
        id: "royal",
        name: "Royal Plan",
        price: 60000,
        description: "Premium ingredients with gourmet preparation",
    },
]

const mealTypeOptions = [
    { id: "breakfast", name: "Breakfast", icon: "🌅" },
    { id: "lunch", name: "Lunch", icon: "☀️" },
    { id: "dinner", name: "Dinner", icon: "🌙" },
]

const deliveryDayOptions = [
    { id: "monday", name: "Monday", short: "Mon" },
    { id: "tuesday", name: "Tuesday", short: "Tue" },
    { id: "wednesday", name: "Wednesday", short: "Wed" },
    { id: "thursday", name: "Thursday", short: "Thu" },
    { id: "friday", name: "Friday", short: "Fri" },
    { id: "saturday", name: "Saturday", short: "Sat" },
    { id: "sunday", name: "Sunday", short: "Sun" },
]

export default function SubscriptionPage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        plan: "",
        mealTypes: [],
        deliveryDays: [],
        allergies: "",
    })

    const { mutate } = useAddSubscription()

    const [totalPrice, setTotalPrice] = useState(0)
    const [errors, setErrors] = useState({})


    // Calculate total price whenever form data changes
    useEffect(() => {
        if (formData.plan && formData.mealTypes.length > 0 && formData.deliveryDays.length > 0) {
            const selectedPlan = planOptions.find((plan) => plan.id === formData.plan)
            if (selectedPlan) {
                const planPrice = selectedPlan.price
                const mealTypesCount = formData.mealTypes.length
                const deliveryDaysCount = formData.deliveryDays.length
                const multiplier = 4.3

                const calculatedPrice = planPrice * mealTypesCount * deliveryDaysCount * multiplier
                setTotalPrice(calculatedPrice)
            }
        } else {
            setTotalPrice(0)
        }
    }, [formData.plan, formData.mealTypes, formData.deliveryDays])

    const handleMealTypeChange = (mealType, checked) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                mealTypes: [...prev.mealTypes, mealType],
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                mealTypes: prev.mealTypes.filter((type) => type !== mealType),
            }))
        }
    }

    const handleDeliveryDayChange = (day, checked) => {
        if (checked) {
            setFormData((prev) => ({
                ...prev,
                deliveryDays: [...prev.deliveryDays, day],
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                deliveryDays: prev.deliveryDays.filter((d) => d !== day),
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^08\d{8,11}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid Indonesian phone number (08xxxxxxxxx)"
        }

        if (!formData.plan) {
            newErrors.plan = "Please select a meal plan"
        }

        if (formData.mealTypes.length === 0) {
            newErrors.mealTypes = "Please select at least one meal type"
        }

        if (formData.deliveryDays.length === 0) {
            newErrors.deliveryDays = "Please select at least one delivery day"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            const selectedPlan = planOptions.find((plan) => plan.id === formData.plan)
            const submissionData = {
                ...formData,
                name: selectedPlan?.name,
                planPrice: selectedPlan?.price,
                price: totalPrice,
                mealTypesCount: formData.mealTypes.length,
                deliveryDaysCount: formData.deliveryDays.length,
            }

            mutate({ submissionData })


            alert(
                `Subscription successful! Total: ${formatPrice(totalPrice)}\n\nWe will contact you at ${formData.phone} for payment confirmation.`,
            )

            // Reset form
            setFormData({
                name: "",
                phone: "",
                plan: "",
                mealTypes: [],
                deliveryDays: [],
                allergies: "",
            })
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price)
    }

    const getSelectedPlan = () => {
        return planOptions.find((plan) => plan.id === formData.plan)
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Subscribe to <span className="text-green-600">SEA Catering</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Customize your meal plan and let us take care of your healthy eating journey. Choose your preferred meals,
                        delivery schedule, and we'll handle the rest!
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Subscription Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-green-800">Create Your Subscription</CardTitle>
                                <p className="text-gray-600">Fill out the form below to customize your meal plan subscription.</p>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Full Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                className={errors.name ? "border-red-500" : ""}
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                Active Phone Number *
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="08123456789"
                                                className={errors.phone ? "border-red-500" : ""}
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.phone}
                                                </p>
                                            )}
                                            <p className="text-gray-500 text-sm mt-1">
                                                We'll use this number for payment confirmation and order updates
                                            </p>
                                        </div>
                                    </div>

                                    {/* Plan Selection */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Plan Selection *</h3>
                                        <RadioGroup
                                            value={formData.plan}
                                            onValueChange={(value) => setFormData({ ...formData, plan: value })}
                                            className="space-y-3"
                                        >
                                            {planOptions.map((plan) => (
                                                <div
                                                    key={plan.id}
                                                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors"
                                                >
                                                    <RadioGroupItem value={plan.id} id={plan.id} />
                                                    <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                                                        <div className="flex justify-between items-start w-full">
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                                                                <p className="text-sm text-gray-600">{plan.description}</p>
                                                            </div>
                                                            <Badge className="bg-green-600 text-white">{formatPrice(plan.price)}/meal</Badge>
                                                        </div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.plan && (
                                            <p className="text-red-500 text-sm flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.plan}
                                            </p>
                                        )}
                                    </div>

                                    {/* Meal Types */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Meal Types *</h3>
                                        <p className="text-sm text-gray-600">Select one or more meal types (at least one required)</p>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {mealTypeOptions.map((meal) => (
                                                <div
                                                    key={meal.id}
                                                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors"
                                                >
                                                    <Checkbox
                                                        id={meal.id}
                                                        checked={formData.mealTypes.includes(meal.id)}
                                                        onCheckedChange={(checked) => handleMealTypeChange(meal.id, checked)}
                                                    />
                                                    <Label htmlFor={meal.id} className="flex-1 cursor-pointer">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-2xl">{meal.icon}</span>
                                                            <span className="font-medium">{meal.name}</span>
                                                        </div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.mealTypes && (
                                            <p className="text-red-500 text-sm flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.mealTypes}
                                            </p>
                                        )}
                                    </div>

                                    {/* Delivery Days */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Delivery Days *</h3>
                                        <p className="text-sm text-gray-600">Choose which days you want your meals delivered</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                            {deliveryDayOptions.map((day) => (
                                                <div key={day.id} className="flex flex-col items-center">
                                                    <Checkbox
                                                        id={day.id}
                                                        checked={formData.deliveryDays.includes(day.id)}
                                                        onCheckedChange={(checked) => handleDeliveryDayChange(day.id, checked)}
                                                    />
                                                    <Label htmlFor={day.id} className="mt-2 text-center cursor-pointer">
                                                        <div className="text-sm font-medium">{day.short}</div>
                                                        <div className="text-xs text-gray-600">{day.name}</div>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.deliveryDays && (
                                            <p className="text-red-500 text-sm flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.deliveryDays}
                                            </p>
                                        )}
                                    </div>

                                    {/* Allergies */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Allergies & Dietary Restrictions</h3>
                                        <Textarea
                                            value={formData.allergies}
                                            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                                            placeholder="Please list any allergies, dietary restrictions, or special requests..."
                                            rows={3}
                                        />
                                        <p className="text-sm text-gray-500">
                                            This information helps us prepare meals that are safe and suitable for you
                                        </p>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                                        disabled={totalPrice === 0}
                                    >
                                        Subscribe Now - {formatPrice(totalPrice)}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Price Calculator */}
                        <Card className="bg-green-50 border-green-200 sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-green-800 flex items-center">
                                    <Calculator className="mr-2 h-5 w-5" />
                                    Price Calculator
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {formData.plan && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Selected Plan:</span>
                                            <span className="font-semibold">{getSelectedPlan()?.name}</span>
                                        </div>
                                    )}

                                    {formData.plan && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Price per meal:</span>
                                            <span className="font-semibold">{formatPrice(getSelectedPlan()?.price || 0)}</span>
                                        </div>
                                    )}

                                    {formData.mealTypes.length > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Meal types:</span>
                                            <span className="font-semibold">{formData.mealTypes.length}</span>
                                        </div>
                                    )}

                                    {formData.deliveryDays.length > 0 && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Delivery days:</span>
                                            <span className="font-semibold">{formData.deliveryDays.length}</span>
                                        </div>
                                    )}

                                    {totalPrice > 0 && (
                                        <>
                                            <div className="border-t pt-4">
                                                <div className="text-sm text-gray-600 mb-2">Calculation:</div>
                                                <div className="text-xs text-gray-500 space-y-1">
                                                    <div>
                                                        {formatPrice(getSelectedPlan()?.price || 0)} × {formData.mealTypes.length} ×{" "}
                                                        {formData.deliveryDays.length} × 4.3
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-lg font-bold text-gray-900">Monthly Total:</span>
                                                    <span className="text-2xl font-bold text-green-600">{formatPrice(totalPrice)}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {totalPrice === 0 && (
                                        <div className="text-center text-gray-500 py-4">
                                            <Calculator className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">Complete the form to see your monthly total</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-gray-700">08123456789</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-gray-700">Manager: Brian</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-gray-700">Serving all Indonesia</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Benefits */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">Subscription Benefits</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {[
                                        "Fresh meals delivered daily",
                                        "Customizable meal plans",
                                        "No long-term commitment",
                                        "Nutritionist-approved recipes",
                                        "Free delivery across Indonesia",
                                        "24/7 customer support",
                                    ].map((benefit, index) => (
                                        <li key={index} className="flex items-center space-x-2">
                                            <Check className="h-4 w-4 text-green-600" />
                                            <span className="text-sm text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
