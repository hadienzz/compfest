import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Truck, Heart, MapPin, Phone, User, Clock, Shield, Star, Leaf } from "lucide-react"
import { Navigation } from "@/components/custom/navigation"
import { TestimonialsSection } from "@/components/custom/Testimonials"
import { Link } from "react-router-dom"

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            🇮🇩 Now Serving All Across Indonesia
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthy Meals,
            <span className="text-green-600 block">Anytime, Anywhere</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Welcome to SEA Catering, your trusted partner for customizable healthy meal services. We deliver nutritious,
            delicious meals tailored to your preferences across all major cities in Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={'/subscription'}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Utensils className="mr-2 h-5 w-5" />
                Order Now
              </Button>
            </Link>
            <Link to={'/contact'}>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Healthy meals from SEA Catering"
              width={800}
              height={400}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SEA Catering?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best healthy meal experience, from customization to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Meal Customization */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Meal Customization</h4>
                <p className="text-gray-600 leading-relaxed">
                  Personalize your meals according to your dietary preferences, allergies, and nutritional goals. Every
                  meal is crafted just for you.
                </p>
              </CardContent>
            </Card>

            {/* Indonesia-wide Delivery */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Indonesia-wide Delivery</h4>
                <p className="text-gray-600 leading-relaxed">
                  We deliver to all major cities across Indonesia, ensuring fresh, healthy meals reach you wherever you
                  are.
                </p>
              </CardContent>
            </Card>

            {/* Nutritional Information */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Detailed Nutrition Info</h4>
                <p className="text-gray-600 leading-relaxed">
                  Get complete nutritional breakdowns for every meal, helping you make informed choices for your health
                  journey.
                </p>
              </CardContent>
            </Card>

            {/* Fresh Ingredients */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Fresh Ingredients</h4>
                <p className="text-gray-600 leading-relaxed">
                  We source only the freshest, highest-quality ingredients to ensure every meal is both nutritious and
                  delicious.
                </p>
              </CardContent>
            </Card>

            {/* Fast Delivery */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Timely Delivery</h4>
                <p className="text-gray-600 leading-relaxed">
                  Reliable delivery schedules ensure your meals arrive fresh and on time, fitting perfectly into your
                  daily routine.
                </p>
              </CardContent>
            </Card>

            {/* Quality Assurance */}
            <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Quality Guaranteed</h4>
                <p className="text-gray-600 leading-relaxed">
                  Every meal meets our strict quality standards, ensuring you receive safe, hygienic, and delicious food
                  every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Healthy Journey?</h3>
              <p className="text-xl text-gray-600">
                Get in touch with us today and let's create the perfect meal plan for you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h4>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Manager</p>
                        <p className="text-gray-600">Brian</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Phone Number</p>
                        <p className="text-gray-600">08123456789</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Service Area</p>
                        <p className="text-gray-600">All Major Cities in Indonesia</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now: 08123456789
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-semibold mb-4">Start Your Healthy Lifestyle Today!</h4>
                  <p className="mb-6 opacity-90">
                    Join thousands of satisfied customers who have transformed their eating habits with SEA Catering.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>Personalized meal plans</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>Fresh, quality ingredients</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-yellow-300" />
                      <span>Convenient delivery</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-white text-green-600 hover:bg-gray-100">
                    <Utensils className="mr-2 h-5 w-5" />
                    Order Your First Meal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-green-600 p-2 rounded-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="text-xl font-bold">SEA Catering</h5>
                <p className="text-sm text-gray-400">Healthy Meals, Anytime, Anywhere</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">Contact Manager Brian</p>
              <p className="text-green-400 font-semibold">08123456789</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} SEA Catering. All rights reserved. Serving healthy meals across Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
