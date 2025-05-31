
import { Card } from '@/components/ui/card';
import { TrendingUp, Hash, ArrowUp, Clock } from 'lucide-react';

const TrendsPanel = () => {
  const trends = [
    { 
      tag: '#AItools', 
      posts: '127K posts',
      growth: '+15%',
      category: 'Technology'
    },
    { 
      tag: 'Instagram Algorithm 2025', 
      posts: '89K posts',
      growth: '+23%',
      category: 'Social Media'
    },
    { 
      tag: '#ContentCreator', 
      posts: '245K posts',
      growth: '+8%',
      category: 'Creator Economy'
    },
    { 
      tag: 'Personal Branding', 
      posts: '156K posts',
      growth: '+12%',
      category: 'Marketing'
    },
    { 
      tag: '#DigitalNomad', 
      posts: '198K posts',
      growth: '+18%',
      category: 'Lifestyle'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'text-blue-600 bg-blue-50',
      'Social Media': 'text-purple-600 bg-purple-50',
      'Creator Economy': 'text-green-600 bg-green-50',
      'Marketing': 'text-orange-600 bg-orange-50',
      'Lifestyle': 'text-pink-600 bg-pink-50'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50';
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

        {/* Trends List */}
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div 
              key={index}
              className="group p-4 rounded-lg border border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-white/50 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="space-y-2">
                {/* Category Badge */}
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(trend.category)}`}>
                  {trend.category}
                </span>
                
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

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200/60">
          <p className="text-xs text-slate-500 text-center">
            💡 Click on trends for content inspiration
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TrendsPanel;
