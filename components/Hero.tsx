'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-bold mb-4"
        >
          Portfolio Technique
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
        >
          Découvrez une collection complète de projets, frameworks et outils partagés avec la
          communauté tech. Explorez, apprenez et contribuez.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg opacity-90"
        >
          {/* Le nombre de projets sera mis à jour dynamiquement */}
        </motion.p>
      </div>
    </section>
  );
}
