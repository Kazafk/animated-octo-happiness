export default function Hero() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Portfolio Technique</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Découvrez une collection complète de projets, frameworks et outils
          partagés avec la communauté tech. Explorez, apprenez et contribuez.
        </p>
        <p className="text-lg opacity-90">
          {/* Le nombre de projets sera mis à jour dynamiquement */}
        </p>
      </div>
    </section>
  );
}
