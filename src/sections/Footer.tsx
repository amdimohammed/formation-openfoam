import { Mail, Phone, MapPin, ExternalLink, Github, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Formation <span className="text-[#FF6B35]">OpenFOAM</span>
            </h3>
            <p className="text-white/70 mb-6 max-w-md">
              Formation professionnelle complète sur OpenFOAM, le logiciel CFD open-source. 
              De l'installation à la simulation industrielle, maîtrisez la mécanique des fluides numérique.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.openfoam.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-colors"
              >
                <ExternalLink size={18} />
              </a>
              <a 
                href="https://github.com/OpenFOAM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-colors"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://wiki.openfoam.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-colors"
              >
                <BookOpen size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF6B35]">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#beginner" className="text-white/70 hover:text-white transition-colors">
                  Niveau Débutant
                </a>
              </li>
              <li>
                <a href="#intermediate" className="text-white/70 hover:text-white transition-colors">
                  Niveau Intermédiaire
                </a>
              </li>
              <li>
                <a href="#tutorial" className="text-white/70 hover:text-white transition-colors">
                  Tutoriel Cavité
                </a>
              </li>
              <li>
                <a href="#downloads" className="text-white/70 hover:text-white transition-colors">
                  Fiches à télécharger
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FF6B35]">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/70">
                <Mail size={16} />
                <span>formation@openfoam.fr</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone size={16} />
                <span>+33 (0)1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin size={16} className="mt-1" />
                <span>123 Avenue des Ingénieurs<br />75000 Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Formation OpenFOAM. Tous droits réservés.
            </p>
            <p className="text-white/50 text-sm">
              OpenFOAM® est une marque déposée d'OpenCFD Limited.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
