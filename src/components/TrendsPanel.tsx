
import { Card } from '@/components/ui/card';
import { TrendingUp, Hash, ArrowUp, Clock, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const TrendsPanel = () => {
  const [trends, setTrends] = useState([
    { 
      tag: '#AItools', 
      posts: '127K posts',
      growth: '+15%',
      category: 'Technology',
      volume: 'High'
    },
    { 
      tag: 'Instagram Algorithm 2025', 
      posts: '89K posts',
      growth: '+23%',
      category: 'Social Media',
      volume: 'Medium'
    },
    { 
      tag: '#ContentCreator', 
      posts: '245K posts',
      growth: '+8%',
      category: 'Creator Economy',
      volume: 'High'
    },
    { 
      tag: 'Personal Branding', 
      posts: '156K posts',
      growth: '+12%',
      category: 'Marketing',
      volume: 'Medium'
    },
    { 
      tag: '#DigitalNomad', 
      posts: '198K posts',
      growth: '+18%',
      category: 'Lifestyle',
      volume: 'High'
    },
    { 
      tag: 'LinkedIn Growth', 
      posts: '76K posts',
      growth: '+31%',
      category: 'Professional',
      volume: 'Rising'
    },
    { 
      tag: '#SocialMediaStrategy', 
      posts: '134K posts',
      growth: '+9%',
      category: 'Marketing',
      volume: 'Medium'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', 'Technology', 'Social Media', 'Marketing', 'Lifestyle', 'Professional', 'Creator Economy'];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'text-blue-600 bg-blue-50 border-blue-200',
      'Social Media': 'text-purple-600 bg-purple-50 border-purple-200',
      'Creator Economy': 'text-green-600 bg-green-50 border-green-200',
      'Marketing': 'text-orange-600 bg-orange-50 border-orange-200',
      'Lifestyle': 'text-pink-600 bg-pink-50 border-pink-200',
      'Professional': 'text-indigo-600 bg-indigo-50 border-indigo-200'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Rising':
        return 'text-orange-600 bg-orange-50';
      case 'Medium':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredTrends = selectedCategory && selectedCategory !== 'All'
    ? trends.filter(trend => trend.category === selectedCategory)
    : trends;

  const handleTrendClick = (trend: any) => {
    // Simulate adding trend to content suggestions
    console.log('Trend clicked:', trend.tag);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-lg p-6 sticky top-24">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Trending Now</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Updated 5 min ago
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">Filter by category:</p>
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                className={`text-xs px-2 py-1 rounded-full border transition-all duration-200 ${
                  (selectedCategory === category) || (selectedCategory === null && category === 'All')
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trends List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTrends.map((trend, index) => (
            <div 
              key={index}
              onClick={() => handleTrendClick(trend)}
              className="group p-4 rounded-lg border border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white/50 hover:shadow-md hover:border-slate-300/60 transition-all duration-200 cursor-pointer"
            >
              <div className="space-y-3">
                {/* Category and Volume Badges */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getCategoryColor(trend.category)}`}>
                    {trend.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getVolumeColor(trend.volume)}`}>
                    {trend.volume}
                  </span>
                </div>
                
                {/* Trend Name */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                      {trend.tag.startsWith('#') ? (
                        <Hash className="w-3 h-3" />
                      ) : null}
                      {trend.tag.replace('#', '')}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{trend.posts}</p>
                  </div>
                  
                  {/* Growth Indicator */}
                  <div className="flex items-center space-x-1 text-green-600">
                    <ArrowUp className="w-3 h-3" />
                    <span className="text-xs font-medium">{trend.growth}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="pt-4 border-t border-slate-200/60">
          <div className="flex items-start space-x-2 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
            <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-700">
              <p className="font-medium mb-1">💡 Pro Tip:</p>
              <p>Click on trends to get inspired! Use trending topics to create engaging content that resonates with your audience.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrendsPanel;
