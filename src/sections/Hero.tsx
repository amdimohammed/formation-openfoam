import { ArrowDown, BookOpen, Users, Clock, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8 animate-fade-in-up">
            <Award size={18} />
            <span>Formation Professionnelle Certifiante</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up stagger-1">
            Formation <span className="text-[#FF6B35]">OpenFOAM</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-4 animate-fade-in-up stagger-2">
            De la théorie à la simulation CFD industrielle
          </p>
          
          <p className="text-lg text-white/60 mb-12 animate-fade-in-up stagger-3">
            4 jours · 20 modules · 2 niveaux de compétence
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up stagger-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="mx-auto mb-2 text-[#FF6B35]" size={28} />
              <div className="text-2xl font-bold text-white">28h</div>
              <div className="text-sm text-white/70">de formation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <BookOpen className="mx-auto mb-2 text-[#FF6B35]" size={28} />
              <div className="text-2xl font-bold text-white">20</div>
              <div className="text-sm text-white/70">modules</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="mx-auto mb-2 text-[#FF6B35]" size={28} />
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-sm text-white/70">niveaux</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Award className="mx-auto mb-2 text-[#FF6B35]" size={28} />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-white/70">pratique</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-5">
            <a 
              href="#beginner" 
              className="px-8 py-4 bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Niveau Débutant
            </a>
            <a 
              href="#intermediate" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all border border-white/30"
            >
              Niveau Intermédiaire
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/50" size={24} />
      </div>
    </section>
  );
}
