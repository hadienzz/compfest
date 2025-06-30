// <div>
//     <h5 className="font-semibold text-gray-900 mb-1">How do I customize my meal plan?</h5>
//     <p className="text-sm text-gray-600">
//         Contact Brian directly to discuss your dietary preferences and create a personalized plan.
//     </p>
// </div>

import { Clock, MapPin, Phone, User } from "lucide-react"


export const FAQ = [
    {
        question: 'How do I customize my meal plan?',
        answer: ' Contact Brian directly to discuss your dietary preferences and create a personalized plan.'
    },
    {
        question: 'What areas do you deliver to?',
        answer: 'We deliver to all major cities across Indonesia. Contact us to confirm delivery to your area.'
    },
    {
        question: 'Can I cancel my subscription?',
        answer: ' Yes, you can cancel anytime with 48 hours notice. Contact us for assistance.'
    },
]

export const CONTACT_INFORMATION = [
    { icon: <User className="h-6 w-6 text-green-600" />, header: 'Manager', text: 'Brian', exp: 'Available for consultations and custom meal planning', },
    { icon: <Phone className="h-6 w-6 text-green-600" />, header: 'Phone Number', text: '08123456789', exp: 'Call or WhatsApp for immediate assistance', },
    { icon: <MapPin className="h-6 w-6 text-green-600" />, header: 'Service Area', text: 'All Major Cities in Indonesia', exp: 'Jakarta, Surabaya, Bandung, Medan, Semarang, and more', },
    {
        icon: <Clock className="h-6 w-6 text-green-600" />, header: 'Business Hours', text: `Monday - Friday: 8:00 AM - 8:00 PM
        <br/>  Saturday - Sunday: 9:00 AM - 6:00 PM`, exp: 'Response time: Within 24 hours',
    },
]

export const MEAL_PLANS = [
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