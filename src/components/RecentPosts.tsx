
import { CheckCircle, Clock, XCircle, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import { Post } from '../pages/Index';

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts = ({ posts }: RecentPostsProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-3 h-3 text-blue-500" />;
      case 'linkedin':
        return <Linkedin className="w-3 h-3 text-blue-700" />;
      case 'facebook':
        return <Facebook className="w-3 h-3 text-blue-600" />;
      case 'instagram':
        return <Instagram className="w-3 h-3 text-pink-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: Post['status']) => {
    switch (status) {
      case 'posted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
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

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
      
      {posts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">No recent posts</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="space-y-2">
                {/* Content Preview */}
                <p className="text-sm text-slate-700 line-clamp-2">
                  {post.content.length > 80 
                    ? `${post.content.substring(0, 80)}...` 
                    : post.content
                  }
                </p>
                
                {/* Platforms */}
                <div className="flex items-center space-x-2">
                  {post.platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center space-x-1 px-2 py-1 bg-white rounded-full border"
                    >
                      {getPlatformIcon(platform)}
                      <span className="text-xs font-medium">{platform}</span>
                    </div>
                  ))}
                </div>
                
                {/* Status and Date */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(post.status)}
                    <span className="text-slate-500 capitalize">{post.status}</span>
                  </div>
                  <span className="text-slate-400">
                    {post.status === 'scheduled' && post.scheduledDate
                      ? formatDate(post.scheduledDate)
                      : formatDate(post.createdAt)
                    }
                  </span>
                </div>

                {/* Image Preview */}
                {post.image && (
                  <div className="mt-2">
                    <img
                      src={post.image}
                      alt="Post attachment"
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
