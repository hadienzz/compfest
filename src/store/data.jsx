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