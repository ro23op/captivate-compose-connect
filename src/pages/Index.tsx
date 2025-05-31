
import { useState } from 'react';
import PostForm from '../components/PostForm';
import CaptionGenerator from '../components/CaptionGenerator';
import TrendsPanel from '../components/TrendsPanel';
import ContentCalendar from '../components/ContentCalendar';
import InsightsPanel from '../components/InsightsPanel';
import RecentPosts from '../components/RecentPosts';
import { Sparkles, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

export interface Post {
  id: string;
  content: string;
  platforms: string[];
  image?: string;
  scheduledDate?: Date;
  status: 'posted' | 'scheduled' | 'failed';
  createdAt: Date;
}

export interface Caption {
  platform: string;
  content: string;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleCaptionsGenerated = (captions: string[]) => {
    setGeneratedCaptions(captions);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Features */}
          <div className="lg:col-span-8 space-y-8">
            {/* Unified Multi-Platform Posting */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-slate-800">Create & Publish</h2>
              </div>
              <PostForm onPostCreated={handlePostCreated} generatedCaptions={generatedCaptions} />
            </div>

            {/* AI Caption Generator */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <CaptionGenerator onCaptionsGenerated={handleCaptionsGenerated} />
            </div>

            {/* Content Calendar */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">Content Calendar</h2>
              </div>
              <ContentCalendar posts={posts} />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Trending Topics */}
            <TrendsPanel />

            {/* Smart Insights */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <BarChart3 className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-slate-800">Smart Insights</h3>
              </div>
              <InsightsPanel />
            </div>

            {/* Recent Posts */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-6">
              <RecentPosts posts={posts.slice(0, 5)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
