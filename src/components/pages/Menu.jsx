import { useState } from "react"
import { Navigation } from "@/components/custom/navigation"
import { MealPlanModal } from "@/components/custom/MealPlanModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Heart, Eye } from "lucide-react"

const mealPlans = [
    {
        id: 1,
        name: "Weight Loss Pro",
        price: "Rp 450,000/week",
        description:
            "Designed for effective weight loss with balanced nutrition and portion control. Perfect for those looking to shed pounds while maintaining energy levels.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "21 meals",
        calories: "1,200-1,400/day",
        features: [
            "Calorie-controlled portions",
            "High protein, low carb focus",
            "Metabolism-boosting ingredients",
            "Nutritionist-approved recipes",
            "Weekly progress tracking",
            "Free consultation included",
        ],
        meals: [
            "Grilled Chicken Salad",
            "Quinoa Buddha Bowl",
            "Salmon with Steamed Vegetables",
            "Turkey Lettuce Wraps",
            "Greek Yogurt Parfait",
            "Vegetable Stir-fry",
        ],
        macros: {
            protein: "35%",
            carbs: "30%",
            fat: "35%",
        },
    },
    {
        id: 2,
        name: "Muscle Builder",
        price: "Rp 550,000/week",
        description:
            "High-protein meals designed to support muscle growth and recovery. Ideal for athletes and fitness enthusiasts looking to build lean muscle mass.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "21 meals",
        calories: "2,000-2,200/day",
        features: [
            "High protein content (40g+ per meal)",
            "Post-workout recovery meals",
            "Complex carbohydrates for energy",
            "Creatine-rich ingredients",
            "Timing-optimized nutrition",
            "Supplement recommendations",
        ],
        meals: [
            "Beef and Sweet Potato Bowl",
            "Protein-Packed Smoothie Bowl",
            "Grilled Chicken Breast with Rice",
            "Tuna and Quinoa Salad",
            "Egg White Omelet",
            "Lean Beef Stir-fry",
        ],
        macros: {
            protein: "40%",
            carbs: "35%",
            fat: "25%",
        },
    },
    {
        id: 3,
        name: "Balanced Lifestyle",
        price: "Rp 400,000/week",
        description:
            "Well-rounded meals for maintaining a healthy lifestyle. Perfect for busy professionals who want nutritious, convenient meals without specific fitness goals.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "21 meals",
        calories: "1,600-1,800/day",
        features: [
            "Balanced macronutrient profile",
            "Variety of cuisines",
            "Fresh, seasonal ingredients",
            "Moderate portion sizes",
            "Family-friendly options",
            "Flexible meal timing",
        ],
        meals: [
            "Mediterranean Chicken Bowl",
            "Asian Fusion Salad",
            "Italian Herb Salmon",
            "Mexican-Style Quinoa Bowl",
            "Thai Curry with Vegetables",
            "Classic Caesar Salad",
        ],
        macros: {
            protein: "25%",
            carbs: "45%",
            fat: "30%",
        },
    },
    {
        id: 4,
        name: "Keto Deluxe",
        price: "Rp 500,000/week",
        description:
            "Low-carb, high-fat meals following ketogenic principles. Designed to help your body enter and maintain ketosis for optimal fat burning.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "21 meals",
        calories: "1,500-1,700/day",
        features: [
            "Under 20g net carbs per day",
            "High healthy fat content",
            "Ketosis-supporting ingredients",
            "MCT oil included",
            "Electrolyte balance maintained",
            "Keto-friendly snacks included",
        ],
        meals: [
            "Avocado and Bacon Salad",
            "Keto Cauliflower Mac & Cheese",
            "Butter Garlic Salmon",
            "Zucchini Noodle Carbonara",
            "Keto Fat Bomb Smoothie",
            "Cheese-Stuffed Chicken",
        ],
        macros: {
            protein: "25%",
            carbs: "5%",
            fat: "70%",
        },
    },
    {
        id: 5,
        name: "Vegetarian Delight",
        price: "Rp 380,000/week",
        description:
            "Plant-based meals packed with nutrients and flavor. Perfect for vegetarians or anyone looking to incorporate more plant-based nutrition into their diet.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "21 meals",
        calories: "1,400-1,600/day",
        features: [
            "100% plant-based ingredients",
            "Complete protein combinations",
            "Rich in fiber and antioxidants",
            "Seasonal vegetable focus",
            "Sustainable sourcing",
            "Vegan options available",
        ],
        meals: [
            "Lentil and Quinoa Power Bowl",
            "Chickpea Curry with Brown Rice",
            "Stuffed Bell Peppers",
            "Mediterranean Hummus Wrap",
            "Tofu Stir-fry with Vegetables",
            "Black Bean and Sweet Potato Bowl",
        ],
        macros: {
            protein: "20%",
            carbs: "55%",
            fat: "25%",
        },
    },
    {
        id: 6,
        name: "Family Pack",
        price: "Rp 800,000/week",
        description:
            "Nutritious meals designed for the whole family. Larger portions and kid-friendly options that don't compromise on health and nutrition.",
        image: "/placeholder.svg?height=300&width=400",
        duration: "7 days",
        servings: "42 meals (2 people)",
        calories: "1,800-2,000/day per person",
        features: [
            "Family-sized portions",
            "Kid-approved recipes",
            "Variety for different tastes",
            "Easy reheating instructions",
            "Nutritional education materials",
            "Bulk pricing savings",
        ],
        meals: [
            "Family-Style Chicken Teriyaki",
            "Homestyle Meatballs with Pasta",
            "Baked Cod with Roasted Vegetables",
            "Turkey and Vegetable Casserole",
            "Healthy Chicken Nuggets",
            "Vegetable Fried Rice",
        ],
        macros: {
            protein: "30%",
            carbs: "40%",
            fat: "30%",
        },
    },
]

export default function MenuPage() {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                        {mealPlans.map((plan) => (
                            <Card key={plan.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={plan.image || "/placeholder.svg"}
                                        alt={plan.name}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                    <Badge className="absolute top-4 right-4 bg-green-600 text-white">{plan.price}</Badge>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
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
                                        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Subscribe</Button>
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
