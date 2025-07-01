import { useState } from "react"
import { Navigation } from "@/components/custom/Navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MapPin, Clock, User, MessageCircle } from "lucide-react"
import { CONTACT_INFORMATION, FAQ } from "@/store/data"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Contact form submitted:", formData)
        alert("Thank you for your message! We will get back to you within 24 hours.")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Get in <span className="text-green-600">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Have questions about our meal plans? Need a custom nutrition solution? We're here to help you on your
                        healthy eating journey.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-green-800">Send Us a Message</CardTitle>
                                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="08123456789"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <Select
                                                value={formData.subject}
                                                onValueChange={(value) => setFormData({ ...formData, subject: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a subject" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="general">General Inquiry</SelectItem>
                                                    <SelectItem value="meal-plans">Meal Plans Information</SelectItem>
                                                    <SelectItem value="custom-plan">Custom Meal Plan Request</SelectItem>
                                                    <SelectItem value="subscription">Subscription Support</SelectItem>
                                                    <SelectItem value="delivery">Delivery Questions</SelectItem>
                                                    <SelectItem value="nutrition">Nutrition Consultation</SelectItem>
                                                    <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            placeholder="Tell us how we can help you..."
                                            rows={6}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {/* Contact Details */}
                        <Card className="bg-white shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-green-800">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                {CONTACT_INFORMATION.map((item, idx) => (
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-100 p-3 rounded-full">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.header}</h4>
                                            <p className="text-gray-600">{item.text}</p>
                                            <p className="text-sm text-gray-500">{item.exp}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="bg-green-50 border-green-200">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-green-800">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Now: 08123456789
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    WhatsApp Chat
                                </Button>
                            </CardContent>
                        </Card>

                        {/* FAQ */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">Frequently Asked Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {FAQ.map((item, idx) => (
                                        <div key={idx}>
                                            <h5 className="font-semibold text-gray-900 mb-1">{item.question}</h5>
                                            <p className="text-sm text-gray-600">
                                                {item.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
