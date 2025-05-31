
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Twitter, Linkedin, Check, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Caption } from '../pages/Index';

interface CaptionOutputProps {
  captions: Caption[];
}

const CaptionOutput = ({ captions }: CaptionOutputProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      toast({
        title: "Copied!",
        description: "Caption copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy caption",
        variant: "destructive",
      });
    }
  };

  const handlePost = (platform: string, content: string) => {
    // Simulate posting to social media
    console.log(`Posting to ${platform}:`, content);
    toast({
      title: `Posted to ${platform}!`,
      description: "Your content has been shared successfully",
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      case 'LinkedIn':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getPlatformColors = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return {
          gradient: 'from-blue-500 to-sky-500',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700'
        };
      case 'LinkedIn':
        return {
          gradient: 'from-blue-600 to-blue-700',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700'
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">✨ AI-Generated Captions</h3>
        <p className="text-slate-600">Platform-optimized content ready to share</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {captions.map((caption, index) => {
          const colors = getPlatformColors(caption.platform);
          return (
            <Card 
              key={index} 
              className="p-6 bg-white/80 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className={`flex items-center justify-between mb-4 p-3 ${colors.bg} ${colors.border} border rounded-lg`}>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 bg-gradient-to-r ${colors.gradient} rounded-lg text-white`}>
                    {getPlatformIcon(caption.platform)}
                  </div>
                  <span className={`font-semibold ${colors.text}`}>
                    {caption.platform}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(caption.content, index)}
                  className="h-8 w-8 p-0"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-sm">
                    {caption.content}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePost(caption.platform, caption.content)}
                    className={`flex-1 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-200 hover:shadow-lg`}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post to {caption.platform}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CaptionOutput;
