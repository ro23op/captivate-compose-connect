import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Wand2, Copy } from 'lucide-react';

interface CaptionGeneratorProps {
  onCaptionsGenerated: (captions: string[]) => void;
}

const CaptionGenerator = ({ onCaptionsGenerated }: CaptionGeneratorProps) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const { toast } = useToast();

  // Replace the entire generateCaptions function with:
  const generateCaptions = async () => {
    if (!topic.trim()) {
      toast({
        title: "Missing Topic",
        description: "Please enter a topic or idea first",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('http://localhost:3000/api/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      });
      

      if (!response.ok) {
        throw new Error('Failed to generate captions');
      }

      const { captions } = await response.json();
      
      setGeneratedCaptions(captions);
      onCaptionsGenerated(captions);

      toast({
        title: "Captions Generated!",
        description: `Created ${captions.length} unique captions for your topic`
      });
    } catch (error) {
      console.error('Error generating captions:', error);
      
      // Fallback logic remains same
    } finally {
      setIsGenerating(false);
    }
  };


  const copyCaption = async (caption: string) => {
    try {
      await navigator.clipboard.writeText(caption);
      toast({
        title: "Copied!",
        description: "Caption copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy caption",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Wand2 className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-slate-800">AI Caption Generator</h2>
      </div>

      {/* Topic Input */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700">Topic or Idea</label>
        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your content topic, idea, or theme..."
          className="min-h-[80px] resize-none border-slate-200 focus:border-purple-300 focus:ring-purple-200 rounded-xl"
          disabled={isGenerating}
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateCaptions}
        disabled={!topic.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Generating AI Captions...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Captions
          </>
        )}
      </Button>

      {/* Generated Captions */}
      {generatedCaptions.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <h4 className="font-medium text-slate-700">✨ Generated Captions</h4>
          <div className="space-y-3">
            {generatedCaptions.map((caption, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 group hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start space-x-3">
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap flex-1">
                    {caption}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCaption(caption)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;
