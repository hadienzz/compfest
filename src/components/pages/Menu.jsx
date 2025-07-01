import { useState } from "react"
import { Navigation } from "@/components/custom/Navigation"
import { MealPlanModal } from "@/components/custom/MealPlanModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, Eye } from "lucide-react"
import { useCheckToken } from "@/lib/useCheckToken"
import { MEAL_PLANS } from "@/store/data"



export default function MenuPage() {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { handleCheck } = useCheckToken()

    const openModal = (plan) => {
        setSelectedPlan(plan)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedPlan(null)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Our <span className="text-green-600">Meal Plans</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Choose from our carefully crafted meal plans designed to meet your specific health and fitness goals. Each
                        plan is created by nutritionists and prepared with the freshest ingredients.
                    </p>
                </div>
            </section>

            {/* Meal Plans Grid */}
            <section className="py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MEAL_PLANS.map((plan) => (
                            <Card key={plan.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">

                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <Badge className="top-4 right-4 bg-green-600 text-white">{plan.price}</Badge>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{plan.description}</p>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4 text-green-600" />
                                            <span className="text-gray-600">{plan.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Users className="h-4 w-4 text-green-600" />
                                            <span className="text-gray-600">{plan.servings}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Heart className="h-4 w-4 text-green-600" />
                                            <span className="text-gray-600">{plan.calories}</span>
                                        </div>
                                    </div>

                                    {/* Features Preview */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {plan.features.slice(0, 2).map((feature, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {feature}
                                                </Badge>
                                            ))}
                                            {plan.features.length > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{plan.features.length - 2} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => openModal(plan)}
                                            variant="outline"
                                            className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            See More Details
                                        </Button>
                                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={handleCheck}>Subscribe</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4 bg-green-600 text-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Can't Find the Perfect Plan?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Contact our nutrition experts to create a custom meal plan tailored specifically to your needs.
                    </p>
                    <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                        Get Custom Plan
                    </Button>
                </div>
            </section>

            {/* Modal */}
            <MealPlanModal plan={selectedPlan} isOpen={isModalOpen} onClose={closeModal} />
        </div>
    )
}
