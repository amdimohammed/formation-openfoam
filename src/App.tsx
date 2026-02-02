import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { LevelSection } from './sections/LevelSection';
import { TutorialSection } from './sections/TutorialSection';
import { DownloadSection } from './sections/DownloadSection';
import { Footer } from './sections/Footer';
import { trainingLevels } from './data/trainingData';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        
        {/* Level Sections */}
        {trainingLevels.map((level, index) => (
          <LevelSection 
            key={level.id} 
            level={level} 
            isReversed={index % 2 === 1}
          />
        ))}
        
        <TutorialSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
