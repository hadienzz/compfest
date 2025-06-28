import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react"

const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    message:
      "SEA Catering has completely transformed my eating habits! The meals are delicious, nutritious, and delivered right on time. I've lost 10kg in 3 months!",
    rating: 5,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Ahmad Rahman",
    message:
      "As a busy professional, SEA Catering saves me so much time. The customization options are amazing and the nutritional information helps me stay on track.",
    rating: 5,
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Maria Santos",
    message:
      "The variety of meals keeps me excited about healthy eating. Customer service is excellent and delivery is always punctual. Highly recommended!",
    rating: 4,
    date: "2024-01-08",
  },
  {
    id: 4,
    name: "David Chen",
    message:
      "Great quality ingredients and perfect portion sizes. The meal plans fit perfectly into my fitness routine. SEA Catering is the best investment I've made for my health.",
    rating: 5,
    date: "2024-01-05",
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(sampleTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 5,
  })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTestimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      message: formData.message,
      rating: formData.rating,
      date: new Date().toISOString().split("T")[0],
    }
    setTestimonials([newTestimonial, ...testimonials])
    setFormData({ name: "", message: "", rating: 5 })
    setShowForm(false)
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their lives with SEA Catering
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" size="sm" onClick={prevTestimonial} className="p-2">
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <div className="text-center flex-1">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex]?.name}</h4>
                      <div className="flex justify-center mt-1">
                        {renderStars(testimonials[currentIndex]?.rating || 0)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg italic leading-relaxed">
                    "{testimonials[currentIndex]?.message}"
                  </p>
                </div>

                <Button variant="ghost" size="sm" onClick={nextTestimonial} className="p-2">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-green-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mb-8">
          <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700 text-white">
            {showForm ? "Cancel" : "Share Your Experience"}
          </Button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <Card className="max-w-2xl mx-auto bg-white shadow-lg">
            <CardContent className="p-8">
              <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Share Your Experience</h4>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="Tell us about your experience with SEA Catering..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: i + 1 })}
                        className="p-1"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            i < formData.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
