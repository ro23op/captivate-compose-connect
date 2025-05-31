
import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Circle } from 'lucide-react';
import { Post } from '../pages/Index';

interface ContentCalendarProps {
  posts: Post[];
}

const ContentCalendar = ({ posts }: ContentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getStatusIcon = (status: Post['status']) => {
    switch (status) {
      case 'posted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'posted':
        return 'bg-green-50 border-green-200';
      case 'scheduled':
        return 'bg-blue-50 border-blue-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const upcomingPosts = posts.filter(post => post.status === 'scheduled').slice(0, 3);
  const recentPosts = posts.filter(post => post.status === 'posted').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.status === 'posted').length}
          </div>
          <div className="text-sm text-green-600">Posted</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {posts.filter(p => p.status === 'scheduled').length}
          </div>
          <div className="text-sm text-blue-600">Scheduled</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">
            {posts.length}
          </div>
          <div className="text-sm text-purple-600">Total</div>
        </div>
      </div>

      {/* Upcoming Posts */}
      {upcomingPosts.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Upcoming Posts</span>
          </h4>
          <div className="space-y-2">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className={`p-3 rounded-lg border ${getStatusColor(post.status)} transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">
                      {post.content.substring(0, 60)}...
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(post.status)}
                      <span className="text-xs text-slate-500">
                        {post.scheduledDate ? formatDate(post.scheduledDate) : 'No date'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-xs px-2 py-1 bg-white rounded-full border"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Recent Posts</span>
          </h4>
          <div className="space-y-2">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className={`p-3 rounded-lg border ${getStatusColor(post.status)} transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">
                      {post.content.substring(0, 60)}...
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(post.status)}
                      <span className="text-xs text-slate-500">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {post.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="text-xs px-2 py-1 bg-white rounded-full border"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-slate-600 mb-2">No Posts Yet</h4>
          <p className="text-slate-500">Create your first post to see it appear in your calendar</p>
        </div>
      )}
    </div>
  );
};

export default ContentCalendar;
