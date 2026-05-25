'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="bg-light border-12 border-primary py-24">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 border-8 border-dark bg-primary text-light p-8 inline-block"
        >
          <h1 className="text-8xl font-black leading-tight">
            PORTFOLIO
            <br />
            TECHNIQUE
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mb-12"
        >
          <p className="text-3xl font-black text-dark mb-6 leading-tight">
            Découvrez une collection <span className="bg-accent px-2">RADICALE</span> de projets,
            frameworks et outils partagés avec la communauté tech.
          </p>
          <div className="h-2 bg-dark w-32 mb-6"></div>
          <p className="text-xl font-bold text-dark leading-relaxed">
            Explorez, apprenez et contribuez à une vision ouvertement ambitieuse de
            l&apos;innovation technique.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-dark"
        >
          <p className="text-2xl font-black">— 5 PROJETS MAJEURS</p>
        </motion.div>
      </div>
    </section>
  );
}
