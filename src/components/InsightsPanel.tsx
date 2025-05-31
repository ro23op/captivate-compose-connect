
import { TrendingUp, Users, Heart, MessageCircle, Eye } from 'lucide-react';

const InsightsPanel = () => {
  // Mock analytics data - replace with real data from your analytics API
  const insights = {
    totalEngagement: 12450,
    followers: 8924,
    avgLikes: 156,
    avgComments: 23,
    reachGrowth: 18,
    bestTime: '3:00 PM',
    topPerformingPlatform: 'LinkedIn'
  };

  const engagementData = [
    { day: 'Mon', value: 120 },
    { day: 'Tue', value: 150 },
    { day: 'Wed', value: 180 },
    { day: 'Thu', value: 200 },
    { day: 'Fri', value: 160 },
    { day: 'Sat', value: 90 },
    { day: 'Sun', value: 110 }
  ];

  const maxValue = Math.max(...engagementData.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Followers</span>
          </div>
          <div className="text-lg font-bold text-slate-800">
            {insights.followers.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+{insights.reachGrowth}%</span>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-600">Engagement</span>
          </div>
          <div className="text-lg font-bold text-slate-800">
            {insights.totalEngagement.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">This month</div>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <MessageCircle className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-600">Avg Comments</span>
          </div>
          <div className="text-lg font-bold text-slate-800">
            {insights.avgComments}
          </div>
          <div className="text-xs text-purple-600">Per post</div>
        </div>

        <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-orange-600">Avg Likes</span>
          </div>
          <div className="text-lg font-bold text-slate-800">
            {insights.avgLikes}
          </div>
          <div className="text-xs text-orange-600">Per post</div>
        </div>
      </div>

      {/* Engagement Chart */}
      <div className="space-y-3">
        <h4 className="font-medium text-slate-700">Weekly Engagement</h4>
        <div className="space-y-2">
          {engagementData.map((item) => (
            <div key={item.day} className="flex items-center space-x-3">
              <span className="text-xs font-medium text-slate-600 w-8">
                {item.day}
              </span>
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 w-8">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Times */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
        <h4 className="font-medium text-indigo-700 mb-2">💡 Smart Insights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Best time to post:</span>
            <span className="font-medium text-slate-800">{insights.bestTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Top platform:</span>
            <span className="font-medium text-slate-800">{insights.topPerformingPlatform}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Engagement trend:</span>
            <span className="font-medium text-green-600">+{insights.reachGrowth}% ↗</span>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-200">
        <h4 className="font-medium text-amber-700 mb-2">🎯 Recommendations</h4>
        <ul className="space-y-1 text-xs text-slate-600">
          <li>• Post more during peak hours (2-4 PM)</li>
          <li>• Focus on LinkedIn for higher engagement</li>
          <li>• Use trending hashtags from your niche</li>
          <li>• Engage with comments within 1 hour</li>
        </ul>
      </div>
    </div>
  );
};

export default InsightsPanel;
