
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';

interface PostFormProps {
  onGenerate: (content: string) => void;
  isGenerating: boolean;
}

const PostForm = ({ onGenerate, isGenerating }: PostFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onGenerate(content);
    }
  };

  const suggestions = [
    "Share your morning routine for productivity",
    "Latest trends in AI and automation",
    "Tips for building a personal brand",
    "Behind the scenes of your creative process"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          Create Your Next Viral Post
        </h2>
        <p className="text-slate-600">Enter your content idea and let AI generate platform-optimized captions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="content" className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Your Content Idea
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Share your thoughts, insights, or experiences..."
            className="min-h-[120px] resize-none border-slate-200 focus:border-purple-300 focus:ring-purple-200 rounded-xl text-base"
            disabled={isGenerating}
          />
          <div className="text-xs text-slate-500">
            {content.length}/280 characters
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-600">💡 Need inspiration? Try these:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setContent(suggestion)}
                className="text-left p-3 text-sm bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg border border-blue-200/50 transition-all duration-200 hover:shadow-md"
                disabled={isGenerating}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!content.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-blue-200/50 transition-all duration-200 hover:shadow-xl hover:shadow-blue-300/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating AI Captions...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Platform Captions
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
