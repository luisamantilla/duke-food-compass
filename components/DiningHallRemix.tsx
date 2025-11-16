'use client'

import { useState } from 'react'
import { ChefHat, Sparkles, Check } from 'lucide-react'
import remixData from '@/lib/data/remixes.json'

// Types
interface DiningHall {
  id: string
  name: string
  stations: string[]
  addons: string[]
}

interface RemixIdea {
  title: string
  ingredients: string[]
  steps: string[]
  whyItWorks: string
  stations: string[]
  addons: string[]
}

export default function DiningHallRemix() {
  const [selectedHall, setSelectedHall] = useState<string>('')
  const [selectedStations, setSelectedStations] = useState<string[]>([])
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [remixes, setRemixes] = useState<RemixIdea[]>([])
  const [showResults, setShowResults] = useState(false)

  const diningHalls = remixData.diningHalls as DiningHall[]
  const currentHall = diningHalls.find(h => h.id === selectedHall)

  const handleStationToggle = (station: string) => {
    setSelectedStations(prev =>
      prev.includes(station)
        ? prev.filter(s => s !== station)
        : [...prev, station]
    )
  }

  const handleAddonToggle = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon)
        ? prev.filter(a => a !== addon)
        : [...prev, addon]
    )
  }

  const generateRemixes = () => {
    if (!selectedHall || selectedStations.length === 0) return

    // Get preset remixes for this hall
    const presetRemixes = remixData.presetRemixes.filter(
      r => r.diningHall === selectedHall &&
      r.stations.some(s => selectedStations.includes(s))
    )

    // Generate rule-based remixes
    const generatedRemixes = generateRuleBasedRemixes(
      selectedHall,
      selectedStations,
      selectedAddons
    )

    // Combine and deduplicate
    const allRemixes = [...presetRemixes, ...generatedRemixes]
    const uniqueRemixes = allRemixes.slice(0, 3)

    setRemixes(uniqueRemixes as RemixIdea[])
    setShowResults(true)
  }

  const reset = () => {
    setShowResults(false)
    setRemixes([])
    setSelectedStations([])
    setSelectedAddons([])
  }

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          {/* Dining Hall Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Dining Hall
            </label>
            <select
              value={selectedHall}
              onChange={(e) => {
                setSelectedHall(e.target.value)
                setSelectedStations([])
                setSelectedAddons([])
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            >
              <option value="">Choose a dining hall...</option>
              {diningHalls.map(hall => (
                <option key={hall.id} value={hall.id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stations Selection */}
          {currentHall && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Available Stations
                <span className="ml-2 text-xs font-normal text-gray-500">
                  (Select at least 1)
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentHall.stations.map(station => (
                  <button
                    key={station}
                    onClick={() => handleStationToggle(station)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedStations.includes(station)
                        ? 'border-orange-500 bg-orange-50 text-orange-900'
                        : 'border-gray-200 hover:border-orange-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{station}</span>
                      {selectedStations.includes(station) && (
                        <Check className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Selection */}
          {currentHall && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Optional Add-ons
                <span className="ml-2 text-xs font-normal text-gray-500">
                  (Optional)
                </span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentHall.addons.map(addon => (
                  <button
                    key={addon}
                    onClick={() => handleAddonToggle(addon)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedAddons.includes(addon)
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : 'border-gray-200 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{addon}</span>
                      {selectedAddons.includes(addon) && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          {selectedHall && selectedStations.length > 0 && (
            <button
              onClick={generateRemixes}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              <ChefHat className="w-5 h-5" />
              Generate Meal Hacks
            </button>
          )}
        </>
      ) : (
        <>
          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-600" />
                Your Meal Hacks
              </h2>
              <button
                onClick={reset}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Try Again
              </button>
            </div>
            <p className="text-gray-600">
              Here are 3 creative ways to remix {currentHall?.name}
            </p>
          </div>

          {/* Remix Results */}
          <div className="space-y-6">
            {remixes.map((remix, index) => (
              <RemixCard key={index} remix={remix} number={index + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Remix Card Component
function RemixCard({ remix, number }: { remix: RemixIdea; number: number }) {
  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-orange-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-2">
              <span className="text-white text-xs font-bold">HACK #{number}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {remix.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Ingredients */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
              1
            </span>
            Ingredients
          </h4>
          <ul className="space-y-2">
            {remix.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-sm">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assembly Steps */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              2
            </span>
            Assembly Steps
          </h4>
          <ol className="space-y-2">
            {remix.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-700">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-sm flex-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Why It Works */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-bold text-green-900 uppercase tracking-wide mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Why It Works
          </h4>
          <p className="text-sm text-green-800 leading-relaxed">
            {remix.whyItWorks}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {remix.stations.map(station => (
            <span
              key={station}
              className="inline-flex items-center bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full text-xs font-medium"
            >
              {station}
            </span>
          ))}
          {remix.addons?.map(addon => (
            <span
              key={addon}
              className="inline-flex items-center bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium"
            >
              + {addon}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// Rule-based generation logic
function generateRuleBasedRemixes(
  diningHall: string,
  stations: string[],
  addons: string[]
): RemixIdea[] {
  const remixes: RemixIdea[] = []

  // Rule 1: If Pizza + any other station → Pizza Fusion
  if (stations.includes('Pizza') && stations.length > 1) {
    const otherStation = stations.find(s => s !== 'Pizza')
    remixes.push({
      title: `The ${otherStation} Pizza Remix`,
      stations: ['Pizza', otherStation!],
      addons: addons.slice(0, 2),
      ingredients: [
        `1 slice of pizza from Pizza station`,
        `Toppings from ${otherStation} station`,
        ...addons.slice(0, 2).map(a => a),
        `Extra cheese if available`
      ],
      steps: [
        `Get a fresh slice of pizza`,
        `Add toppings from ${otherStation} station while pizza is hot`,
        addons.length > 0 ? `Drizzle with ${addons[0]}` : 'Season to taste',
        `Fold in half for easy eating`,
        `Enjoy your fusion creation`
      ],
      whyItWorks: `Pizza is the perfect base for any topping. The ${otherStation} items add unique flavors and textures that transform a basic slice into something special. The warm cheese helps everything stick together.`
    })
  }

  // Rule 2: If Salad Bar + Grill/Burgers → Loaded Bowl
  if ((stations.includes('Salad Bar') && stations.includes('Grill')) ||
      (stations.includes('Salad Bar') && stations.includes('Burgers'))) {
    const proteinStation = stations.includes('Grill') ? 'Grill' : 'Burgers'
    remixes.push({
      title: 'The Power Bowl',
      stations: ['Salad Bar', proteinStation],
      addons: addons.slice(0, 2),
      ingredients: [
        `Mixed greens from salad bar`,
        `Grilled protein from ${proteinStation}`,
        `Cherry tomatoes`,
        `Cucumbers`,
        `Shredded cheese`,
        ...addons.slice(0, 2).map(a => a)
      ],
      steps: [
        `Start with a base of mixed greens`,
        `Add your choice of grilled protein, chopped into pieces`,
        `Top with cherry tomatoes and cucumbers`,
        `Sprinkle shredded cheese`,
        addons.length > 0 ? `Dress with ${addons.join(' and ')}` : 'Add your favorite dressing',
        `Toss everything together`
      ],
      whyItWorks: `Hot protein over cold, crisp veggies creates the perfect temperature and texture contrast. It's a complete meal with protein, carbs, and vitamins all in one bowl. Way more interesting than a plain salad.`
    })
  }

  // Rule 3: If Asian/Asian Station → Asian Fusion Bowl
  if (stations.some(s => s.includes('Asian') || s.includes('Ginger'))) {
    const asianStation = stations.find(s => s.includes('Asian') || s.includes('Ginger'))
    remixes.push({
      title: 'DIY Fusion Bowl',
      stations: [asianStation!, ...(stations.includes('Salad Bar') ? ['Salad Bar'] : [])],
      addons: addons.filter(a => a.includes('Sauce') || a.includes('Soy')),
      ingredients: [
        `Base of rice or noodles from ${asianStation}`,
        `Stir-fried vegetables`,
        `Protein of choice`,
        stations.includes('Salad Bar') ? 'Fresh vegetables from salad bar' : 'Additional veggies',
        ...addons.filter(a => a.includes('Sauce') || a.includes('Soy')).map(a => a)
      ],
      steps: [
        `Fill bowl with rice or noodles as base`,
        `Add stir-fried items from ${asianStation}`,
        stations.includes('Salad Bar') ? 'Top with fresh veggies for crunch' : 'Add extra vegetables',
        `Mix in your choice of protein`,
        addons.length > 0 ? `Season with ${addons.filter(a => a.includes('Sauce'))[0] || addons[0]}` : 'Add soy sauce to taste',
        `Stir everything together and enjoy`
      ],
      whyItWorks: `Combining hot and cold elements adds textural variety. The fresh vegetables provide a crisp contrast to the warm stir-fry. It's like a deconstructed spring roll in a bowl - healthy, filling, and packed with flavor.`
    })
  }

  // Rule 4: If Dessert/Bakery + anything → Sweet Remix
  if (stations.includes('Dessert') || stations.includes('Bakery')) {
    const sweetStation = stations.find(s => s.includes('Dessert') || s.includes('Bakery'))
    const otherStation = stations.find(s => s !== sweetStation)

    if (otherStation) {
      remixes.push({
        title: `Sweet ${otherStation} Surprise`,
        stations: [sweetStation!, otherStation],
        addons: addons.filter(a => ['Honey', 'Chocolate', 'Syrup'].some(sw => a.includes(sw))),
        ingredients: [
          `Baked item from ${sweetStation}`,
          `Base from ${otherStation}`,
          ...addons.filter(a => ['Honey', 'Chocolate', 'Syrup'].some(sw => a.includes(sw))).map(a => a),
          `Whipped cream or ice cream if available`
        ],
        steps: [
          `Get your base from ${otherStation}`,
          `Top with crumbled or sliced ${sweetStation} items`,
          addons.length > 0 ? `Drizzle with ${addons.filter(a => ['Honey', 'Syrup'].some(sw => a.includes(sw)))[0] || 'syrup'}` : 'Add sweet toppings',
          `Add whipped cream or ice cream`,
          `Mix or layer as desired`
        ],
        whyItWorks: `Sometimes the best desserts come from unexpected combinations. The contrast between textures and temperatures makes every bite interesting. It's like creating your own signature dessert without any baking required.`
      })
    }
  }

  // Rule 5: If only one station selected → Simple Enhancement
  if (stations.length === 1 && addons.length > 0) {
    remixes.push({
      title: `Enhanced ${stations[0]}`,
      stations: [stations[0]],
      addons: addons,
      ingredients: [
        `Base item from ${stations[0]}`,
        ...addons.map(a => a),
        `Any available toppings`
      ],
      steps: [
        `Get your favorite item from ${stations[0]}`,
        `Enhance with ${addons[0]}`,
        addons.length > 1 ? `Add ${addons[1]} for extra flavor` : 'Add extra toppings',
        `Layer additional add-ons as desired`,
        `Enjoy your customized creation`
      ],
      whyItWorks: `Sometimes simple is best. The right combination of add-ons can completely transform a basic dish. These enhancements add layers of flavor without overcomplicating the meal.`
    })
  }

  return remixes.slice(0, 3)
}
