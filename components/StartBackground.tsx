'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react' // Usamos el icono de estrella en lugar de corazón

const StarBackground = () => {
  const [stars, setStars] = useState<Array<{x: number, y: number, scale: number, duration: number}>>([])

  useEffect(() => {
    // Generamos las estrellas con propiedades aleatorias
    const newStars = Array(30).fill(null).map(() => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 20 + 10
    }))
    setStars(newStars)
  }, [])

  if (stars.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-400" // Color dorado/brillante para las estrellas
          initial={{ 
            x: star.x,
            y: star.y,
            scale: star.scale
          }}
          animate={{
            y: -100,
            transition: {
              duration: star.duration,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          <Star size={24} fill="currentColor" /> {/* Usamos el icono de estrella */}
        </motion.div>
      ))}
    </div>
  )
}

export default StarBackground
