'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'

export default function DesignShowcasePage() {
  const [selectedElements, setSelectedElements] = useState<{[key: string]: string}>({})

  const selectElement = (category: string, elementId: string) => {
    setSelectedElements(prev => ({
      ...prev,
      [category]: elementId
    }))
  }

  // Randomize glass shard animations
  useEffect(() => {
    const randomizeGlassShards = () => {
      const shards = document.querySelectorAll('.glass-shard, .glass-piece, .glass-triangle, .explosion-particle')
      shards.forEach((shard) => {
        const element = shard as HTMLElement
        const randomX = (Math.random() - 0.5) * 200 // -100px to 100px
        const randomY = (Math.random() - 0.5) * 100 // -50px to 50px
        const randomRotation = Math.random() * 720 // 0 to 720 degrees

        element.style.setProperty('--random-x', `${randomX}px`)
        element.style.setProperty('--random-y', `${randomY}px`)
        element.style.setProperty('--random-rotation', `${randomRotation}deg`)
      })
    }

    // Randomize on mount and periodically
    randomizeGlassShards()
    const interval = setInterval(randomizeGlassShards, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-16 lg:pt-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container-custom py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Design Showcase
            </h1>
            <p className="text-xl text-primary-200 mb-8">
              Explore amazing hover buttons, graphic elements, and interactive components. 
              Click on any element to select it for your website!
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm">Selected Elements: {Object.keys(selectedElements).length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Amazing Hover Buttons</h2>
            <p className="text-xl text-gray-600">Click to select your favorite button styles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Button 1: Slide Fill */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B1: Slide Fill Effect</h3>
              <button 
                className={`relative px-8 py-3 bg-transparent border-2 border-primary-600 text-primary-600 font-semibold rounded-lg overflow-hidden transition-colors duration-300 hover:text-white group ${selectedElements.buttons === 'B1' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B1')}
              >
                <span className="absolute inset-0 bg-primary-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">Get Started</span>
              </button>
              {selectedElements.buttons === 'B1' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 2: Glow Effect */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B2: Glow Effect</h3>
              <button 
                className={`px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/50 hover:scale-105 ${selectedElements.buttons === 'B2' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B2')}
              >
                Contact Us
              </button>
              {selectedElements.buttons === 'B2' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 3: 3D Push */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B3: 3D Push Effect</h3>
              <button 
                className={`px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-150 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md ${selectedElements.buttons === 'B3' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B3')}
              >
                Learn More
              </button>
              {selectedElements.buttons === 'B3' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 4: Gradient Shift */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B4: Gradient Shift</h3>
              <button 
                className={`px-8 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-blue-600 hover:to-primary-600 hover:scale-105 ${selectedElements.buttons === 'B4' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B4')}
              >
                View Services
              </button>
              {selectedElements.buttons === 'B4' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 5: Border Expand */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B5: Border Expand</h3>
              <button 
                className={`relative px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg border-2 border-transparent transition-all duration-300 hover:border-primary-600 hover:shadow-lg group ${selectedElements.buttons === 'B5' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B5')}
              >
                <span className="absolute inset-0 border-2 border-primary-600 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                <span className="relative">Call Now</span>
              </button>
              {selectedElements.buttons === 'B5' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 6: Neon Glow */}
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4 text-white">B6: Neon Glow</h3>
              <button
                className={`px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg transition-all duration-300 hover:text-white hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-400/50 hover:animate-pulse ${selectedElements.buttons === 'B6' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B6')}
              >
                Get Quote
              </button>
              {selectedElements.buttons === 'B6' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 7: Liquid Fill */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B7: Liquid Fill</h3>
              <button
                className={`relative px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-full overflow-hidden transition-all duration-500 hover:text-white group ${selectedElements.buttons === 'B7' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B7')}
              >
                <span className="absolute inset-0 bg-primary-600 transform scale-0 group-hover:scale-150 transition-transform duration-700 ease-out rounded-full"></span>
                <span className="relative z-10">Contact</span>
              </button>
              {selectedElements.buttons === 'B7' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 8: Magnetic Hover */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B8: Magnetic Hover</h3>
              <button
                className={`px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-2xl hover:shadow-purple-500/50 transform hover:-translate-y-1 hover:rotate-1 ${selectedElements.buttons === 'B8' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B8')}
              >
                Explore
              </button>
              {selectedElements.buttons === 'B8' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 9: Ripple Effect */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B9: Ripple Effect</h3>
              <button
                className={`relative px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700 group ${selectedElements.buttons === 'B9' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B9')}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></span>
                <span className="relative z-10">Click Me</span>
              </button>
              {selectedElements.buttons === 'B9' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 10: Morphing Shape */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B10: Morphing Shape</h3>
              <button
                className={`px-8 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-500 hover:bg-green-700 hover:rounded-full hover:px-12 transform hover:scale-110 ${selectedElements.buttons === 'B10' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B10')}
              >
                Transform
              </button>
              {selectedElements.buttons === 'B10' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 11: Split Text */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4">B11: Split Text</h3>
              <button
                className={`relative px-8 py-3 bg-red-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-red-700 group ${selectedElements.buttons === 'B11' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B11')}
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">Get Started</span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">Let's Go!</span>
              </button>
              {selectedElements.buttons === 'B11' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Button 12: Glitch Effect */}
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold mb-4 text-white">B12: Glitch Effect</h3>
              <button
                className={`relative px-8 py-3 bg-transparent border-2 border-red-500 text-red-500 font-semibold rounded-lg transition-all duration-300 hover:text-white hover:bg-red-500 group ${selectedElements.buttons === 'B12' ? 'ring-4 ring-green-400' : ''}`}
                onClick={() => selectElement('buttons', 'B12')}
              >
                <span className="relative z-10 group-hover:animate-pulse">HACK</span>
                <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></span>
              </button>
              {selectedElements.buttons === 'B12' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

          </div>
        </div>
      </section>

      {/* Graphic Elements Showcase */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Graphic Elements</h2>
            <p className="text-xl text-gray-600">Interactive cards, backgrounds, and visual elements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Floating Card */}
            <div 
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer ${selectedElements.cards === 'C1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C1')}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-600 text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">C1: Floating Card</h3>
              <p className="text-gray-600 text-sm">Smooth hover lift effect with enhanced shadow</p>
              {selectedElements.cards === 'C1' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Card 2: Gradient Border */}
            <div 
              className={`relative bg-white rounded-2xl p-6 shadow-lg cursor-pointer group ${selectedElements.cards === 'C2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C2')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-0.5">
                <div className="bg-white rounded-2xl w-full h-full"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">C2: Gradient Border</h3>
                <p className="text-gray-600 text-sm">Animated gradient border on hover</p>
                {selectedElements.cards === 'C2' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
              </div>
            </div>

            {/* Card 3: Glass Morphism */}
            <div
              className={`bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-xl hover:bg-white/30 transition-all duration-300 cursor-pointer ${selectedElements.cards === 'C3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C3')}
              style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'}}
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary-600 text-xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">C3: Glass Morphism</h3>
              <p className="text-gray-700 text-sm">Modern glass effect with backdrop blur</p>
              {selectedElements.cards === 'C3' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Card 4: Tilt Effect */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:rotate-3 hover:scale-105 ${selectedElements.cards === 'C4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C4')}
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">C4: Tilt Effect</h3>
              <p className="text-gray-600 text-sm">3D tilt with scale on hover</p>
              {selectedElements.cards === 'C4' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Card 5: Neumorphism */}
            <div
              className={`bg-gray-100 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-inner ${selectedElements.cards === 'C5' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C5')}
              style={{
                boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff'
              }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4" style={{
                boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff'
              }}>
                <span className="text-gray-600 text-xl">🔮</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">C5: Neumorphism</h3>
              <p className="text-gray-600 text-sm">Soft UI with inset shadows</p>
              {selectedElements.cards === 'C5' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Card 6: Holographic */}
            <div
              className={`relative bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden ${selectedElements.cards === 'C6' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('cards', 'C6')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">C6: Holographic</h3>
                <p className="text-white/90 text-sm">Shimmering hologram effect</p>
                {selectedElements.cards === 'C6' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Animation Effects */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Animation Effects</h2>
            <p className="text-xl text-gray-600">Hover over elements to see animations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Animation 1: Pulse */}
            <div
              className={`bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:animate-pulse transition-all duration-300 ${selectedElements.animations === 'A1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A1')}
            >
              <div className="text-3xl mb-2">💫</div>
              <h3 className="font-semibold mb-1">A1: Pulse</h3>
              <p className="text-sm opacity-90">Gentle pulsing effect</p>
              {selectedElements.animations === 'A1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 2: Bounce */}
            <div
              className={`bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:animate-bounce transition-all duration-300 ${selectedElements.animations === 'A2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A2')}
            >
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold mb-1">A2: Bounce</h3>
              <p className="text-sm opacity-90">Playful bounce effect</p>
              {selectedElements.animations === 'A2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 3: Spin */}
            <div
              className={`bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white text-center cursor-pointer group ${selectedElements.animations === 'A3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A3')}
            >
              <div className="text-3xl mb-2 group-hover:animate-spin transition-transform duration-500">⚙️</div>
              <h3 className="font-semibold mb-1">A3: Spin</h3>
              <p className="text-sm opacity-90">Smooth rotation</p>
              {selectedElements.animations === 'A3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 4: Scale */}
            <div
              className={`bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:scale-110 transition-transform duration-300 ${selectedElements.animations === 'A4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A4')}
            >
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold mb-1">A4: Scale</h3>
              <p className="text-sm opacity-90">Smooth scale up</p>
              {selectedElements.animations === 'A4' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 5: Wobble */}
            <div
              className={`bg-gradient-to-br from-yellow-500 to-orange-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:animate-bounce transition-all duration-300 ${selectedElements.animations === 'A5' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A5')}
              style={{
                animation: 'wobble 2s ease-in-out infinite'
              }}
            >
              <div className="text-3xl mb-2">🎪</div>
              <h3 className="font-semibold mb-1">A5: Wobble</h3>
              <p className="text-sm opacity-90">Playful wobble effect</p>
              {selectedElements.animations === 'A5' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 6: Flip */}
            <div
              className={`bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl p-6 text-white text-center cursor-pointer transition-all duration-500 hover:rotate-y-180 ${selectedElements.animations === 'A6' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A6')}
              style={{transformStyle: 'preserve-3d'}}
            >
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">A6: Flip</h3>
              <p className="text-sm opacity-90">3D flip animation</p>
              {selectedElements.animations === 'A6' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 7: Shake */}
            <div
              className={`bg-gradient-to-br from-red-500 to-pink-700 rounded-2xl p-6 text-white text-center cursor-pointer hover:animate-pulse transition-all duration-300 ${selectedElements.animations === 'A7' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A7')}
              onMouseEnter={(e) => {
                e.currentTarget.style.animation = 'shake 0.5s ease-in-out'
                setTimeout(() => {
                  e.currentTarget.style.animation = ''
                }, 500)
              }}
            >
              <div className="text-3xl mb-2">🔔</div>
              <h3 className="font-semibold mb-1">A7: Shake</h3>
              <p className="text-sm opacity-90">Attention-grabbing shake</p>
              {selectedElements.animations === 'A7' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Animation 8: Glow Pulse */}
            <div
              className={`bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl p-6 text-white text-center cursor-pointer transition-all duration-300 ${selectedElements.animations === 'A8' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('animations', 'A8')}
              style={{
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                animation: 'glow 2s ease-in-out infinite alternate'
              }}
            >
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold mb-1">A8: Glow Pulse</h3>
              <p className="text-sm opacity-90">Pulsing glow effect</p>
              {selectedElements.animations === 'A8' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>

          </div>
        </div>
      </section>

      {/* Glass Breaking Effects Section */}
      <section className="section-padding bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Glass Breaking Effects</h2>
            <p className="text-xl text-gray-600">Click to shatter - Satisfying glass breaking animations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Glass Break 1: Realistic Window Shatter */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB1')}
            >
              <h3 className="text-lg font-semibold mb-6">GB1: Realistic Window Shatter</h3>
              <div className="relative">
                <div
                  className="realistic-glass relative w-48 h-32 mx-auto cursor-pointer overflow-hidden rounded-lg border-4 border-gray-400"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.8) 50%, rgba(255,255,255,0.9) 100%)',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5), 0 8px 32px rgba(0,0,0,0.1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const glass = e.currentTarget;
                    glass.classList.add('realistic-shatter');
                    setTimeout(() => {
                      glass.classList.remove('realistic-shatter');
                    }, 4000);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-700 font-semibold">Click to Break</span>
                  </div>

                  {/* Impact point */}
                  <div className="impact-point absolute w-4 h-4 rounded-full bg-white/60 opacity-0" style={{left: '60%', top: '40%'}}></div>

                  {/* Realistic glass fragments - multiple layers */}
                  {[...Array(45)].map((_, i) => {
                    const size = Math.random() * 12 + 3;
                    const isLarge = size > 8;
                    return (
                      <div
                        key={i}
                        className="glass-fragment absolute bg-white/70 border border-gray-300/50"
                        style={{
                          width: `${size}px`,
                          height: `${size * (0.7 + Math.random() * 0.6)}px`,
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          clipPath: `polygon(
                            ${Math.random() * 20}% ${Math.random() * 20}%,
                            ${80 + Math.random() * 20}% ${Math.random() * 30}%,
                            ${70 + Math.random() * 30}% ${70 + Math.random() * 30}%,
                            ${Math.random() * 30}% ${60 + Math.random() * 40}%
                          )`,
                          animationDelay: `${Math.random() * 0.8}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                          filter: isLarge ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                          zIndex: isLarge ? 10 : 5
                        }}
                      />
                    );
                  })}

                  {/* Crack lines */}
                  <svg className="crack-lines absolute inset-0 w-full h-full opacity-0">
                    <defs>
                      <filter id="crack-glow">
                        <feGaussianBlur stdDeviation="0.5"/>
                        <feColorMatrix values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 1 0"/>
                      </filter>
                    </defs>
                    {[...Array(12)].map((_, i) => (
                      <path
                        key={i}
                        d={`M${60 + Math.random() * 20},${40 + Math.random() * 20} L${Math.random() * 100},${Math.random() * 100} L${Math.random() * 100},${Math.random() * 100}`}
                        stroke="rgba(200,200,200,0.8)"
                        strokeWidth="0.5"
                        fill="none"
                        filter="url(#crack-glow)"
                        style={{
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Realistic glass with impact point and fragments</p>
              {selectedElements.glassBreak === 'GB1' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Glass Break 2: Smartphone Screen Crack */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB2')}
            >
              <h3 className="text-lg font-semibold mb-6">GB2: Smartphone Screen Crack</h3>
              <div className="relative">
                <div
                  className="phone-screen relative w-32 h-48 mx-auto bg-black rounded-2xl cursor-pointer overflow-hidden border-4 border-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    const screen = e.currentTarget;
                    screen.classList.add('phone-crack');
                    setTimeout(() => {
                      screen.classList.remove('phone-crack');
                    }, 4000);
                  }}
                >
                  {/* Screen content */}
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Tap to Crack</span>
                  </div>

                  {/* Impact point with realistic spread */}
                  <div className="impact-center absolute w-3 h-3 rounded-full bg-white/80 opacity-0" style={{left: '65%', top: '35%'}}></div>

                  {/* Realistic spider web crack pattern */}
                  <svg className="spider-cracks absolute inset-0 w-full h-full opacity-0">
                    <defs>
                      <filter id="crack-shadow">
                        <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodColor="rgba(0,0,0,0.3)"/>
                      </filter>
                    </defs>

                    {/* Primary radial cracks from impact point */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 45) * Math.PI / 180;
                      const length = 40 + Math.random() * 30;
                      const startX = 65;
                      const startY = 35;
                      const endX = startX + Math.cos(angle) * length;
                      const endY = startY + Math.sin(angle) * length;

                      return (
                        <g key={`primary-${i}`}>
                          <path
                            d={`M${startX},${startY} L${endX},${endY}`}
                            stroke="rgba(255,255,255,0.9)"
                            strokeWidth="1.5"
                            fill="none"
                            filter="url(#crack-shadow)"
                            className="primary-crack"
                            style={{
                              animationDelay: `${i * 0.05}s`
                            }}
                          />
                          {/* Secondary branches */}
                          {[...Array(2)].map((_, j) => {
                            const branchAngle = angle + (j === 0 ? -0.3 : 0.3);
                            const branchLength = length * 0.6;
                            const branchStartX = startX + Math.cos(angle) * (length * 0.7);
                            const branchStartY = startY + Math.sin(angle) * (length * 0.7);
                            const branchEndX = branchStartX + Math.cos(branchAngle) * branchLength;
                            const branchEndY = branchStartY + Math.sin(branchAngle) * branchLength;

                            return (
                              <path
                                key={`branch-${i}-${j}`}
                                d={`M${branchStartX},${branchStartY} L${branchEndX},${branchEndY}`}
                                stroke="rgba(255,255,255,0.7)"
                                strokeWidth="1"
                                fill="none"
                                filter="url(#crack-shadow)"
                                className="branch-crack"
                                style={{
                                  animationDelay: `${(i * 0.05) + 0.3 + (j * 0.1)}s`
                                }}
                              />
                            );
                          })}
                        </g>
                      );
                    })}

                    {/* Connecting web cracks */}
                    {[...Array(6)].map((_, i) => (
                      <path
                        key={`web-${i}`}
                        d={`M${20 + i * 15},${20 + i * 10} Q${50 + i * 5},${30 + i * 8} ${80 - i * 10},${40 + i * 12}`}
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="0.8"
                        fill="none"
                        filter="url(#crack-shadow)"
                        className="web-crack"
                        style={{
                          animationDelay: `${0.8 + i * 0.1}s`
                        }}
                      />
                    ))}
                  </svg>

                  {/* Glass fragments around impact */}
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="micro-fragment absolute bg-white/60"
                      style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        left: `${65 + (Math.random() - 0.5) * 20}%`,
                        top: `${35 + (Math.random() - 0.5) * 20}%`,
                        clipPath: 'polygon(0% 0%, 100% 20%, 80% 100%, 20% 80%)',
                        animationDelay: `${1.5 + Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Realistic smartphone screen with spider web cracks</p>
              {selectedElements.glassBreak === 'GB2' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Glass Break 3: Car Windshield Shatter */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB3')}
            >
              <h3 className="text-lg font-semibold mb-6">GB3: Car Windshield Shatter</h3>
              <div className="relative">
                <div
                  className="windshield relative w-48 h-28 mx-auto cursor-pointer overflow-hidden rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(135,206,235,0.3) 0%, rgba(173,216,230,0.4) 30%, rgba(255,255,255,0.6) 70%, rgba(240,248,255,0.5) 100%)',
                    border: '3px solid #2c3e50',
                    borderBottom: '6px solid #34495e',
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.15)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const windshield = e.currentTarget;
                    windshield.classList.add('windshield-shatter');
                    setTimeout(() => {
                      windshield.classList.remove('windshield-shatter');
                    }, 5000);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-sm">Hit Windshield</span>
                  </div>

                  {/* Impact point with realistic spread */}
                  <div className="windshield-impact absolute w-6 h-6 rounded-full opacity-0"
                       style={{
                         left: '55%',
                         top: '45%',
                         background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 70%, transparent 100%)'
                       }}>
                  </div>

                  {/* Realistic windshield crack pattern */}
                  <svg className="windshield-cracks absolute inset-0 w-full h-full opacity-0">
                    <defs>
                      <filter id="windshield-glow">
                        <feGaussianBlur stdDeviation="0.8"/>
                        <feColorMatrix values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 1 0"/>
                      </filter>
                    </defs>

                    {/* Primary impact cracks - radiating outward */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) * Math.PI / 180;
                      const length = 25 + Math.random() * 35;
                      const startX = 55;
                      const startY = 45;
                      const endX = startX + Math.cos(angle) * length;
                      const endY = startY + Math.sin(angle) * length;

                      return (
                        <path
                          key={`windshield-primary-${i}`}
                          d={`M${startX},${startY} Q${startX + Math.cos(angle) * (length * 0.3)},${startY + Math.sin(angle) * (length * 0.3)} ${endX},${endY}`}
                          stroke="rgba(220,220,220,0.9)"
                          strokeWidth="2"
                          fill="none"
                          filter="url(#windshield-glow)"
                          className="windshield-primary-crack"
                          style={{
                            animationDelay: `${i * 0.08}s`
                          }}
                        />
                      );
                    })}

                    {/* Secondary stress cracks */}
                    {[...Array(20)].map((_, i) => {
                      const startX = 20 + Math.random() * 60;
                      const startY = 20 + Math.random() * 60;
                      const endX = startX + (Math.random() - 0.5) * 40;
                      const endY = startY + (Math.random() - 0.5) * 30;

                      return (
                        <path
                          key={`windshield-stress-${i}`}
                          d={`M${startX},${startY} L${endX},${endY}`}
                          stroke="rgba(200,200,200,0.6)"
                          strokeWidth="1"
                          fill="none"
                          filter="url(#windshield-glow)"
                          className="windshield-stress-crack"
                          style={{
                            animationDelay: `${1.2 + i * 0.05}s`
                          }}
                        />
                      );
                    })}

                    {/* Circular stress patterns around impact */}
                    {[...Array(4)].map((_, i) => (
                      <circle
                        key={`stress-circle-${i}`}
                        cx="55"
                        cy="45"
                        r={8 + i * 6}
                        stroke="rgba(210,210,210,0.4)"
                        strokeWidth="0.8"
                        fill="none"
                        filter="url(#windshield-glow)"
                        className="windshield-stress-circle"
                        style={{
                          animationDelay: `${0.5 + i * 0.2}s`
                        }}
                      />
                    ))}
                  </svg>

                  {/* Safety glass fragments that stay connected */}
                  {[...Array(35)].map((_, i) => (
                    <div
                      key={i}
                      className="safety-fragment absolute bg-white/40 border border-gray-200/60"
                      style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        clipPath: `polygon(
                          ${Math.random() * 30}% ${Math.random() * 30}%,
                          ${70 + Math.random() * 30}% ${Math.random() * 30}%,
                          ${70 + Math.random() * 30}% ${70 + Math.random() * 30}%,
                          ${Math.random() * 30}% ${70 + Math.random() * 30}%
                        )`,
                        animationDelay: `${2 + Math.random() * 1}s`,
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Realistic car windshield with safety glass behavior</p>
              {selectedElements.glassBreak === 'GB3' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Glass Break 4: Card Shatter */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB4')}
            >
              <h3 className="text-lg font-semibold mb-6">GB4: Card Shatter</h3>
              <div className="relative">
                <div
                  className="glass-card relative w-40 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg cursor-pointer overflow-hidden shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    const card = e.currentTarget;
                    card.classList.add('card-shatter');
                    setTimeout(() => {
                      card.classList.remove('card-shatter');
                    }, 2000);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-semibold">Break Me</span>
                  </div>

                  {/* Triangular shards */}
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="glass-triangle absolute bg-white/40"
                      style={{
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        animationDelay: `${Math.random() * 0.6}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Card breaks into triangular shards</p>
              {selectedElements.glassBreak === 'GB4' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Glass Break 5: Mirror Crack */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB5' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB5')}
            >
              <h3 className="text-lg font-semibold mb-6">GB5: Mirror Crack</h3>
              <div className="relative">
                <div
                  className="glass-mirror relative w-32 h-32 mx-auto bg-gradient-to-br from-gray-300 to-gray-400 rounded-full cursor-pointer overflow-hidden border-4 border-silver"
                  onClick={(e) => {
                    e.stopPropagation();
                    const mirror = e.currentTarget;
                    mirror.classList.add('mirror-crack');
                    setTimeout(() => {
                      mirror.classList.remove('mirror-crack');
                    }, 3000);
                  }}
                  style={{
                    background: 'radial-gradient(circle, #e2e6f0 0%, #9ca3af 100%)',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-700 text-sm">Crack</span>
                  </div>

                  {/* Radial cracks */}
                  <div className="crack-radial absolute inset-0 opacity-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-gray-600 origin-center"
                        style={{
                          width: '1px',
                          height: '60px',
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 45}deg) translateY(-30px)`,
                          transformOrigin: '0 30px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Mirror cracks in radial pattern</p>
              {selectedElements.glassBreak === 'GB5' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Glass Break 6: Explosion Shatter */}
            <div
              className={`bg-white rounded-2xl p-8 shadow-lg text-center ${selectedElements.glassBreak === 'GB6' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('glassBreak', 'GB6')}
            >
              <h3 className="text-lg font-semibold mb-6">GB6: Explosion Shatter</h3>
              <div className="relative">
                <div
                  className="glass-explosion relative w-32 h-32 mx-auto bg-gradient-to-br from-red-500 to-orange-600 rounded-lg cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    const explosion = e.currentTarget;
                    explosion.classList.add('explosion-shatter');
                    setTimeout(() => {
                      explosion.classList.remove('explosion-shatter');
                    }, 2500);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold">BOOM!</span>
                  </div>

                  {/* Explosion particles */}
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="explosion-particle absolute bg-yellow-300 rounded-full"
                      style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: '50%',
                        top: '50%',
                        animationDelay: `${Math.random() * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">Explosive glass particle burst</p>
              {selectedElements.glassBreak === 'GB6' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

          </div>
        </div>
      </section>

      {/* Background Effects */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Background Effects</h2>
            <p className="text-xl text-gray-300">Different background styles and patterns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Background 1: Animated Gradient */}
            <div
              className={`relative h-48 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.backgrounds === 'BG1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('backgrounds', 'BG1')}
              style={{
                background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                backgroundSize: '400% 400%',
                animation: 'gradient 15s ease infinite'
              }}
            >
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">BG1: Animated Gradient</h3>
                  <p className="text-sm opacity-90">Flowing color animation</p>
                  {selectedElements.backgrounds === 'BG1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Background 2: Particle Effect */}
            <div
              className={`relative h-48 bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.backgrounds === 'BG2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('backgrounds', 'BG2')}
            >
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">BG2: Particle Effect</h3>
                  <p className="text-sm opacity-90">Floating particles</p>
                  {selectedElements.backgrounds === 'BG2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Background 3: Matrix Rain */}
            <div
              className={`relative h-48 bg-black rounded-2xl overflow-hidden cursor-pointer ${selectedElements.backgrounds === 'BG3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('backgrounds', 'BG3')}
            >
              <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-green-400 text-xs font-mono opacity-70"
                    style={{
                      left: `${i * 6.67}%`,
                      animation: `matrix ${2 + Math.random() * 3}s linear infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  >
                    {Array.from({length: 20}, () => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-green-400">BG3: Matrix Rain</h3>
                  <p className="text-sm opacity-90 text-green-300">Falling code effect</p>
                  {selectedElements.backgrounds === 'BG3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Background 4: Geometric Patterns */}
            <div
              className={`relative h-48 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.backgrounds === 'BG4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('backgrounds', 'BG4')}
              style={{
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
                `
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">BG4: Geometric</h3>
                  <p className="text-sm opacity-90">Modern patterns</p>
                  {selectedElements.backgrounds === 'BG4' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Micro-Interactions Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Micro-Interactions</h2>
            <p className="text-xl text-gray-600">Subtle interactions that enhance user experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Micro 1: Progress Bar */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer ${selectedElements.micro === 'M1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('micro', 'M1')}
            >
              <h3 className="text-lg font-semibold mb-4">M1: Progress Bar</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-primary-600 h-2 rounded-full transition-all duration-1000 hover:w-full" style={{width: '60%'}}></div>
              </div>
              <p className="text-gray-600 text-sm">Animated progress indicator</p>
              {selectedElements.micro === 'M1' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Micro 2: Toggle Switch */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer ${selectedElements.micro === 'M2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('micro', 'M2')}
            >
              <h3 className="text-lg font-semibold mb-4">M2: Toggle Switch</h3>
              <div className="flex items-center justify-center mb-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <p className="text-gray-600 text-sm">Smooth toggle animation</p>
              {selectedElements.micro === 'M2' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Micro 3: Loading Spinner */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer ${selectedElements.micro === 'M3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('micro', 'M3')}
            >
              <h3 className="text-lg font-semibold mb-4">M3: Loading Spinner</h3>
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
              <p className="text-gray-600 text-sm">Elegant loading animation</p>
              {selectedElements.micro === 'M3' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

            {/* Micro 4: Floating Action Button */}
            <div
              className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer ${selectedElements.micro === 'M4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('micro', 'M4')}
            >
              <h3 className="text-lg font-semibold mb-4">M4: FAB</h3>
              <div className="flex justify-center mb-4">
                <button className="w-12 h-12 bg-primary-600 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white">
                  <span className="text-xl">+</span>
                </button>
              </div>
              <p className="text-gray-600 text-sm">Floating action button</p>
              {selectedElements.micro === 'M4' && <p className="text-green-600 mt-2 font-semibold">✓ Selected</p>}
            </div>

          </div>
        </div>
      </section>

      {/* Parallax Effects Section */}
      <section className="section-padding bg-gray-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Parallax Effects</h2>
            <p className="text-xl text-gray-300">Stunning depth and motion effects</p>
          </div>

          <div className="space-y-16">

            {/* Parallax 1: Multi-Layer Parallax */}
            <div
              className={`relative h-96 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.parallax === 'P1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('parallax', 'P1')}
            >
              {/* Background Layer - Slowest */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
                style={{
                  transform: 'translateZ(0)',
                  animation: 'parallaxSlow 20s ease-in-out infinite'
                }}
              ></div>

              {/* Middle Layer - Medium Speed */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-white/20 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `parallaxMedium ${15 + Math.random() * 10}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  />
                ))}
              </div>

              {/* Foreground Layer - Fastest */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: 'parallaxFast 10s ease-in-out infinite'
                }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">P1: Multi-Layer Parallax</h3>
                  <p className="text-sm opacity-90">Different layers moving at different speeds</p>
                  {selectedElements.parallax === 'P1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Parallax 2: 3D Depth Parallax */}
            <div
              className={`relative h-96 rounded-3xl overflow-hidden cursor-pointer perspective-1000 ${selectedElements.parallax === 'P2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('parallax', 'P2')}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: 'parallax3D 15s ease-in-out infinite'
                }}
              >
                {/* 3D Elements */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 bg-white/30 rounded-lg"
                    style={{
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 90}%`,
                      transform: `translateZ(${Math.random() * 100 - 50}px) rotateX(${Math.random() * 360}deg)`,
                      animation: `float3D ${10 + Math.random() * 10}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">P2: 3D Depth Parallax</h3>
                  <p className="text-sm opacity-90">Elements floating in 3D space</p>
                  {selectedElements.parallax === 'P2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Parallax 3: Text Reveal Parallax */}
            <div
              className={`relative h-96 bg-black rounded-3xl overflow-hidden cursor-pointer ${selectedElements.parallax === 'P3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('parallax', 'P3')}
            >
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-80"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 100%)',
                    animation: 'textReveal 8s ease-in-out infinite'
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3
                      className="text-4xl font-bold text-white mb-4"
                      style={{
                        animation: 'textFloat 6s ease-in-out infinite'
                      }}
                    >
                      PARALLAX
                    </h3>
                    <div className="text-center">
                      <h4 className="text-xl font-bold mb-2 text-cyan-300">P3: Text Reveal Parallax</h4>
                      <p className="text-sm opacity-90 text-white">Animated text with shape reveals</p>
                      {selectedElements.parallax === 'P3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Parallax Banners Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Parallax Banner Designs</h2>
            <p className="text-xl text-gray-600">Hero sections with stunning parallax effects</p>
          </div>

          <div className="space-y-12">

            {/* Banner 1: Floating Elements */}
            <div
              className={`relative h-80 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.banners === 'PB1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('banners', 'PB1')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                {/* Floating geometric shapes */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute ${i % 3 === 0 ? 'w-6 h-6 rounded-full' : i % 3 === 1 ? 'w-4 h-8 rounded-lg' : 'w-8 h-4 rounded-lg'} bg-white/20`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `floatBanner ${8 + Math.random() * 8}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">PB1: Floating Elements Banner</h3>
                  <p className="text-lg opacity-90 mb-4">Geometric shapes floating in space</p>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
                    Explore More
                  </button>
                  {selectedElements.banners === 'PB1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Banner 2: Wave Parallax */}
            <div
              className={`relative h-80 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.banners === 'PB2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('banners', 'PB2')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600">
                {/* Animated waves */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 bg-white/10"
                  style={{
                    clipPath: 'polygon(0 50%, 100% 80%, 100% 100%, 0 100%)',
                    animation: 'wave1 6s ease-in-out infinite'
                  }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 bg-white/20"
                  style={{
                    clipPath: 'polygon(0 70%, 100% 40%, 100% 100%, 0 100%)',
                    animation: 'wave2 8s ease-in-out infinite reverse'
                  }}
                ></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">PB2: Wave Parallax Banner</h3>
                  <p className="text-lg opacity-90 mb-4">Flowing wave animations</p>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
                    Dive In
                  </button>
                  {selectedElements.banners === 'PB2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Banner 3: Particle Storm */}
            <div
              className={`relative h-80 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.banners === 'PB3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('banners', 'PB3')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                {/* Particle storm effect */}
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `particleStorm ${3 + Math.random() * 4}s linear infinite`,
                      animationDelay: `${Math.random() * 3}s`,
                      opacity: Math.random() * 0.8 + 0.2
                    }}
                  />
                ))}
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">PB3: Particle Storm Banner</h3>
                  <p className="text-lg opacity-90 mb-4">Dynamic particle system</p>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
                    Enter Storm
                  </button>
                  {selectedElements.banners === 'PB3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

            {/* Banner 4: Morphing Shapes */}
            <div
              className={`relative h-80 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.banners === 'PB4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('banners', 'PB4')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-600">
                {/* Morphing blob shapes */}
                <div
                  className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full"
                  style={{
                    animation: 'morphBlob1 12s ease-in-out infinite',
                    filter: 'blur(1px)'
                  }}
                ></div>
                <div
                  className="absolute bottom-10 right-10 w-24 h-24 bg-white/30 rounded-full"
                  style={{
                    animation: 'morphBlob2 10s ease-in-out infinite reverse',
                    filter: 'blur(1px)'
                  }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/25 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: 'morphBlob3 8s ease-in-out infinite',
                    filter: 'blur(1px)'
                  }}
                ></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">PB4: Morphing Shapes Banner</h3>
                  <p className="text-lg opacity-90 mb-4">Organic shape transformations</p>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300">
                    Transform
                  </button>
                  {selectedElements.banners === 'PB4' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Scroll-Based Parallax Section */}
      <section className="section-padding bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Scroll-Based Parallax</h2>
            <p className="text-xl text-gray-600">Effects that respond to scroll position</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Scroll Parallax 1: Scale on Scroll */}
            <div
              className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.scrollParallax === 'SP1' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('scrollParallax', 'SP1')}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 transition-transform duration-1000 hover:scale-110"
                style={{
                  animation: 'scaleScroll 8s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">SP1: Scale on Scroll</h3>
                    <p className="text-sm opacity-90">Elements scale as you scroll</p>
                    {selectedElements.scrollParallax === 'SP1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Parallax 2: Fade & Slide */}
            <div
              className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.scrollParallax === 'SP2' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('scrollParallax', 'SP2')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600">
                <div
                  className="absolute inset-0 bg-white/20"
                  style={{
                    animation: 'slideReveal 6s ease-in-out infinite'
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div
                    style={{
                      animation: 'fadeSlide 6s ease-in-out infinite'
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">SP2: Fade & Slide</h3>
                    <p className="text-sm opacity-90">Smooth fade and slide effects</p>
                    {selectedElements.scrollParallax === 'SP2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Parallax 3: Rotation Parallax */}
            <div
              className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.scrollParallax === 'SP3' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('scrollParallax', 'SP3')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-green-600">
                <div
                  className="absolute inset-4 bg-white/20 rounded-full"
                  style={{
                    animation: 'rotateParallax 10s linear infinite'
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">SP3: Rotation Parallax</h3>
                    <p className="text-sm opacity-90">Elements rotate based on scroll</p>
                    {selectedElements.scrollParallax === 'SP3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Parallax 4: Staggered Animation */}
            <div
              className={`relative h-64 rounded-2xl overflow-hidden cursor-pointer ${selectedElements.scrollParallax === 'SP4' ? 'ring-4 ring-green-400' : ''}`}
              onClick={() => selectElement('scrollParallax', 'SP4')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600">
                {/* Staggered elements */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-8 h-8 bg-white/30 rounded-lg"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: '40%',
                      animation: `staggered 4s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center text-white text-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">SP4: Staggered Animation</h3>
                    <p className="text-sm opacity-90">Sequential element animations</p>
                    {selectedElements.scrollParallax === 'SP4' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2025 Cutting-Edge Trends */}
      <section className="section-padding bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-sm font-medium mb-6">
              <span className="mr-2">🚀</span>
              2025 Cutting-Edge Trends
            </div>
            <h2 className="text-4xl font-bold mb-4">Next-Gen Design Elements</h2>
            <p className="text-xl text-gray-300">The latest trends defining 2025 web design</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* 2025 Trend 1: AI-Powered Gradients */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T1' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T1')}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b)',
                  backgroundSize: '300% 300%',
                  animation: 'aiGradient 8s ease infinite'
                }}
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🤖</div>
                    <h3 className="text-xl font-bold mb-2">T1: AI-Powered Gradients</h3>
                    <p className="text-sm opacity-90">Dynamic color-shifting backgrounds</p>
                    {selectedElements.trends2025 === 'T1' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Trend 2: Quantum UI Elements */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T2' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T2')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900">
                {/* Quantum particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `quantumFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                      boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4'
                    }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚛️</div>
                    <h3 className="text-xl font-bold mb-2">T2: Quantum UI</h3>
                    <p className="text-sm opacity-90">Particle-based interactions</p>
                    {selectedElements.trends2025 === 'T2' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Trend 3: Neural Network Patterns */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T3' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T3')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                {/* Neural network connections */}
                <svg className="absolute inset-0 w-full h-full" style={{animation: 'neuralPulse 4s ease-in-out infinite'}}>
                  {[...Array(8)].map((_, i) => (
                    <g key={i}>
                      <circle
                        cx={`${20 + (i % 3) * 30}%`}
                        cy={`${30 + Math.floor(i / 3) * 25}%`}
                        r="3"
                        fill="#10b981"
                        style={{animation: `neuralNode ${2 + Math.random()}s ease-in-out infinite`}}
                      />
                      {i < 7 && (
                        <line
                          x1={`${20 + (i % 3) * 30}%`}
                          y1={`${30 + Math.floor(i / 3) * 25}%`}
                          x2={`${20 + ((i + 1) % 3) * 30}%`}
                          y2={`${30 + Math.floor((i + 1) / 3) * 25}%`}
                          stroke="#10b981"
                          strokeWidth="1"
                          opacity="0.6"
                          style={{animation: `neuralConnection ${3 + Math.random()}s ease-in-out infinite`}}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧠</div>
                    <h3 className="text-xl font-bold mb-2">T3: Neural Networks</h3>
                    <p className="text-sm opacity-90">AI-inspired connection patterns</p>
                    {selectedElements.trends2025 === 'T3' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Trend 4: Holographic Interfaces */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T4' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T4')}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500"
                style={{
                  animation: 'holographicShift 6s ease-in-out infinite'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 animate-pulse"></div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                    animation: 'scanlines 2s linear infinite'
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌈</div>
                    <h3 className="text-xl font-bold mb-2">T4: Holographic UI</h3>
                    <p className="text-sm opacity-90">Iridescent interface elements</p>
                    {selectedElements.trends2025 === 'T4' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Trend 5: Biometric Feedback UI */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T5' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T5')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-teal-900">
                {/* Heartbeat visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-20" viewBox="0 0 200 50">
                    <path
                      d="M0,25 L40,25 L45,10 L50,40 L55,25 L200,25"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                      style={{animation: 'heartbeat 2s ease-in-out infinite'}}
                    />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💓</div>
                    <h3 className="text-xl font-bold mb-2">T5: Biometric UI</h3>
                    <p className="text-sm opacity-90">Health-responsive interfaces</p>
                    {selectedElements.trends2025 === 'T5' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 Trend 6: Spatial Computing Elements */}
            <div
              className={`relative h-64 rounded-3xl overflow-hidden cursor-pointer ${selectedElements.trends2025 === 'T6' ? 'ring-4 ring-cyan-400' : ''}`}
              onClick={() => selectElement('trends2025', 'T6')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
                {/* 3D spatial grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(41, 57, 149, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(41, 57, 149, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                    animation: 'spatialGrid 8s ease-in-out infinite'
                  }}
                ></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🥽</div>
                    <h3 className="text-xl font-bold mb-2">T6: Spatial Computing</h3>
                    <p className="text-sm opacity-90">AR/VR-ready interfaces</p>
                    {selectedElements.trends2025 === 'T6' && <p className="text-cyan-300 mt-2 font-semibold">✓ Selected</p>}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Width Logo Parallax Banners */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full-Width Logo Parallax Banners</h2>
            <p className="text-xl text-gray-600">Stunning full-width banners with your company logo animations</p>
          </div>
        </div>

        {/* Banner 1: Floating Logo with Particles */}
        <div
          className={`relative w-screen left-1/2 transform -translate-x-1/2 h-96 mb-16 overflow-hidden cursor-pointer ${selectedElements.logoBanners === 'LB1' ? 'ring-8 ring-green-400' : ''}`}
          onClick={() => selectElement('logoBanners', 'LB1')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
            {/* Floating particles */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `logoParticleFloat ${8 + Math.random() * 8}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}

            {/* Main Logo - Parallax Effect */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'logoParallaxFloat 12s ease-in-out infinite'
              }}
            >
              <div className="relative">
                <img
                  src="/images/brand/ee-logo-horizontal-white.png"
                  alt="Engel & Engel Logo"
                  className="h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                    animation: 'logoGlow 4s ease-in-out infinite'
                  }}
                />

                {/* Logo reflection effect */}
                <div
                  className="absolute top-full left-0 right-0 h-32 opacity-30"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
                    transform: 'scaleY(-1)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)'
                  }}
                >
                  <img
                    src="/images/brand/ee-logo-horizontal-white.png"
                    alt="Logo Reflection"
                    className="h-32 w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Banner info overlay */}
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">LB1: Floating Logo with Particles</h3>
              <p className="text-sm opacity-90">Logo floats with particle effects and reflection</p>
              {selectedElements.logoBanners === 'LB1' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>
          </div>
        </div>

        {/* Banner 2: Rotating Logo with Geometric Patterns */}
        <div
          className={`relative w-screen left-1/2 transform -translate-x-1/2 h-96 mb-16 overflow-hidden cursor-pointer ${selectedElements.logoBanners === 'LB2' ? 'ring-8 ring-green-400' : ''}`}
          onClick={() => selectElement('logoBanners', 'LB2')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            {/* Geometric background patterns */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(41, 57, 149, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)
                `,
                animation: 'geometricShift 15s ease-in-out infinite'
              }}
            ></div>

            {/* Rotating logo */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'logoRotateParallax 20s linear infinite'
              }}
            >
              <div className="relative">
                <img
                  src="/images/brand/ee-logo-horizontal-white.png"
                  alt="Engel & Engel Logo"
                  className="h-40 w-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(41, 57, 149, 0.5))',
                    animation: 'logoScale 8s ease-in-out infinite'
                  }}
                />

                {/* Rotating rings around logo */}
                <div
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                  style={{
                    width: '200px',
                    height: '200px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'logoRing1 10s linear infinite'
                  }}
                ></div>
                <div
                  className="absolute inset-0 border border-purple-400/20 rounded-full"
                  style={{
                    width: '250px',
                    height: '250px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'logoRing2 15s linear infinite reverse'
                  }}
                ></div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">LB2: Rotating Logo with Geometric Patterns</h3>
              <p className="text-sm opacity-90">Logo rotates with animated rings and patterns</p>
              {selectedElements.logoBanners === 'LB2' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>
          </div>
        </div>

        {/* Banner 3: Morphing Logo with Liquid Background */}
        <div
          className={`relative w-screen left-1/2 transform -translate-x-1/2 h-96 mb-16 overflow-hidden cursor-pointer ${selectedElements.logoBanners === 'LB3' ? 'ring-8 ring-green-400' : ''}`}
          onClick={() => selectElement('logoBanners', 'LB3')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            {/* Liquid morphing shapes */}
            <div
              className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full"
              style={{
                animation: 'liquidMorph1 18s ease-in-out infinite',
                filter: 'blur(2px)'
              }}
            ></div>
            <div
              className="absolute bottom-10 right-10 w-32 h-32 bg-white/15 rounded-full"
              style={{
                animation: 'liquidMorph2 14s ease-in-out infinite reverse',
                filter: 'blur(2px)'
              }}
            ></div>
            <div
              className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/12 rounded-full"
              style={{
                animation: 'liquidMorph3 16s ease-in-out infinite',
                filter: 'blur(2px)'
              }}
            ></div>

            {/* Morphing logo */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'logoMorphParallax 12s ease-in-out infinite'
              }}
            >
              <img
                src="/images/brand/ee-logo-horizontal-white.png"
                alt="Engel & Engel Logo"
                className="h-36 w-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.4))',
                  animation: 'logoMorph 10s ease-in-out infinite'
                }}
              />
            </div>

            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">LB3: Morphing Logo with Liquid Background</h3>
              <p className="text-sm opacity-90">Logo morphs with flowing liquid shapes</p>
              {selectedElements.logoBanners === 'LB3' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>
          </div>
        </div>

        {/* Banner 4: 3D Perspective Logo */}
        <div
          className={`relative w-screen left-1/2 transform -translate-x-1/2 h-96 mb-16 overflow-hidden cursor-pointer ${selectedElements.logoBanners === 'LB4' ? 'ring-8 ring-green-400' : ''}`}
          onClick={() => selectElement('logoBanners', 'LB4')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-cyan-900 to-blue-900">
            {/* 3D grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                animation: 'grid3D 12s ease-in-out infinite',
                transform: 'perspective(500px) rotateX(30deg)'
              }}
            ></div>

            {/* 3D Logo */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                perspective: '1000px',
                animation: 'logo3DContainer 16s ease-in-out infinite'
              }}
            >
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  animation: 'logo3D 12s ease-in-out infinite'
                }}
              >
                <img
                  src="/images/brand/ee-logo-horizontal-white.png"
                  alt="Engel & Engel Logo"
                  className="h-44 w-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.6))',
                    animation: 'logo3DGlow 6s ease-in-out infinite'
                  }}
                />
              </div>
            </div>

            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold mb-2">LB4: 3D Perspective Logo</h3>
              <p className="text-sm opacity-90">Logo in 3D space with perspective grid</p>
              {selectedElements.logoBanners === 'LB4' && <p className="text-green-300 mt-2 font-semibold">✓ Selected</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Selection Summary */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Selections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Button Style</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.buttons || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Card Style</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.cards || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Animation</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.animations || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Background</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.backgrounds || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Micro-Interaction</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.micro || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Parallax Effect</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.parallax || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Parallax Banner</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.banners || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Scroll Parallax</h3>
                <p className="text-primary-600 font-mono text-xs">{selectedElements.scrollParallax || 'None'}</p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">🚀 2025 Trend</h3>
                <p className="text-gradient bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent font-mono text-xs font-bold">
                  {selectedElements.trends2025 || 'None'}
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">🏢 Logo Banner</h3>
                <p className="text-gradient bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent font-mono text-xs font-bold">
                  {selectedElements.logoBanners || 'None'}
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">💥 Glass Break</h3>
                <p className="text-gradient bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-mono text-xs font-bold">
                  {selectedElements.glassBreak || 'None'}
                </p>
              </div>

            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Design Element Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{Object.keys(selectedElements).length}</div>
                  <div className="text-xs text-gray-600">Selected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-xs text-gray-600">Buttons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">6</div>
                  <div className="text-xs text-gray-600">Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-xs text-gray-600">Animations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">4</div>
                  <div className="text-xs text-gray-600">Backgrounds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <div className="text-xs text-gray-600">Micro-UI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">3</div>
                  <div className="text-xs text-gray-600">Parallax</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">8</div>
                  <div className="text-xs text-gray-600">P-Banners</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    61+
                  </div>
                  <div className="text-sm text-gray-700 font-semibold mb-2">Total Design Elements Available</div>
                  <div className="flex justify-center items-center space-x-2 text-xs text-gray-600 flex-wrap gap-2">
                    <span className="bg-cyan-100 px-2 py-1 rounded-full">🚀 2025 Ready</span>
                    <span className="bg-purple-100 px-2 py-1 rounded-full">✨ AI-Powered</span>
                    <span className="bg-pink-100 px-2 py-1 rounded-full">🌟 Next-Gen</span>
                    <span className="bg-blue-100 px-2 py-1 rounded-full">🏢 Logo Banners</span>
                    <span className="bg-red-100 px-2 py-1 rounded-full">💥 Glass Effects</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center space-y-2">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white text-sm font-medium">
                  <span className="mr-2">🎯</span>
                  Including 6 Exclusive 2025 Cutting-Edge Trends
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full text-white text-sm font-medium">
                  <span className="mr-2">🏢</span>
                  4 Full-Width Logo Parallax Banners
                </div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-sm font-medium">
                  <span className="mr-2">💥</span>
                  6 Satisfying Glass Breaking Effects
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Tell me which elements you'd like to use and on which pages!
              </p>
              <Button>
                Apply Selected Elements
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
