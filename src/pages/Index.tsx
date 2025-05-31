
import { useState } from 'react';
import PostForm from '../components/PostForm';
import CaptionOutput from '../components/CaptionOutput';
import TrendsPanel from '../components/TrendsPanel';
import { Sparkles, TrendingUp } from 'lucide-react';

export interface Caption {
  platform: 'Twitter' | 'LinkedIn';
  content: string;
}

const Index = () => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCaptions = async (content: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock OpenAI API response with realistic captions
    const mockCaptions: Caption[] = [
      {
        platform: 'Twitter',
        content: `🚀 ${content}\n\nJust discovered this game-changing approach! Here's what I learned:\n\n✨ Key insights thread below 👇\n\n#Innovation #TechTrends #Growth`
      },
      {
        platform: 'LinkedIn',
        content: `${content}\n\nIn today's rapidly evolving digital landscape, staying ahead of the curve is essential for professionals across all industries.\n\nHere are my key takeaways:\n• Strategic thinking drives innovation\n• Collaboration amplifies results\n• Continuous learning is non-negotiable\n\nWhat's your experience with this? I'd love to hear your thoughts in the comments.\n\n#ProfessionalDevelopment #Leadership #Innovation`
      }
    ];
    
    setCaptions(mockCaptions);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Influencer Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <TrendingUp className="w-4 h-4" />
              <span>AI-Powered Content Creation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Post Form */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <PostForm onGenerate={handleGenerateCaptions} isGenerating={isGenerating} />
            </div>

            {/* Caption Output */}
            {captions.length > 0 && (
              <div className="animate-fade-in">
                <CaptionOutput captions={captions} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TrendsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
