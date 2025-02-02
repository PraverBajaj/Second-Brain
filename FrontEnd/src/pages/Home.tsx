import { Brain, Sparkles, CloudLightning, Zap, ArrowRight } from 'lucide-react';

import Navbar from '../components/ui/Navbar';
import FeatureCard from '../components/ui/FeatureCard';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
     <Navbar/>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Digital Second Brain for
              <span className="text-indigo-600"> Everything</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Capture, organize, and never lose your valuable content. From tweets to documents,
              everything in one place.
            </p>
            <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
             
            </div>
          </div>

          {/* Preview Image */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60" 
              alt="Second Brain Dashboard" 
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need in one place</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you capture and organize your digital life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6 text-indigo-600" />}
              title="Smart Organization"
              description="Automatically categorize and tag your content for easy retrieval."
            />
            <FeatureCard
              icon={<CloudLightning className="w-6 h-6 text-indigo-600" />}
              title="Youtube and Twitter"
              description="Find anything in seconds with Embeddings"
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-indigo-600" />}
              title="Save Anything"
              description="Save content from anywhere"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to organize your digital life?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their productivity with Second Brain.
            </p>
            <Link to="/signup">
            <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium inline-flex items-center gap-2">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
                <span className="font-semibold">Second Brain</span>
              </div>
              <p className="text-gray-600 text-sm">
                Your digital life, organized.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p> Designed and Developed by Praver Bajaj</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default LandingPage