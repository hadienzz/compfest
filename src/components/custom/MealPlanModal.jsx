"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Utensils, Heart, X } from "lucide-react"
import { Link } from "react-router-dom"

export function MealPlanModal({ plan, isOpen, onClose }) {
  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 flex items-center justify-between">
            {plan.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-1 gap-6">
          <div className="space-y-4">
            <p className="text-gray-600 leading-relaxed">{plan.description}</p>


            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span className="text-sm">{plan.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm">{plan.servings}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span className="text-sm">{plan.calories}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-green-600" />
                <span className="text-sm">{plan.meals.length} meals</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Nutritional Breakdown</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-semibold text-green-600">{plan.macros.protein}</div>
                  <div className="text-gray-600">Protein</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{plan.macros.carbs}</div>
                  <div className="text-gray-600">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{plan.macros.fat}</div>
                  <div className="text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Plan Features</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Sample Meals Included</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {plan.meals.map((meal, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{meal}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to={'/subscription'} className="flex space-x-4 mt-8">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Subscribe to This Plan</Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
