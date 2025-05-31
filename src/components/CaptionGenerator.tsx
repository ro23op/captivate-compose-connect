
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
      // Replace with your OpenAI API key
      const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here';
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a social media expert. Generate 5 engaging, platform-optimized captions for different social media platforms. Make them catchy, relevant, and include appropriate hashtags. Vary the style and length for different platforms.'
            },
            {
              role: 'user',
              content: `Generate 5 different social media captions for this topic: "${topic}". Make them diverse in style - some short and punchy, others more detailed. Include relevant hashtags.`
            }
          ],
          max_tokens: 1000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate captions');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Split the response into individual captions
      const captions = content.split('\n\n').filter((caption: string) => caption.trim().length > 0);
      
      setGeneratedCaptions(captions);
      onCaptionsGenerated(captions);

      toast({
        title: "Captions Generated!",
        description: `Created ${captions.length} unique captions for your topic`
      });
    } catch (error) {
      console.error('Error generating captions:', error);
      
      // Fallback with mock captions if API fails
      const mockCaptions = [
        `🚀 ${topic}\n\nJust discovered this game-changing approach! Here's what I learned:\n\n✨ Key insights below 👇\n\n#Innovation #Growth #ContentCreator`,
        `${topic} 💭\n\nIn today's fast-paced world, staying ahead means embracing new ideas.\n\nWhat's your take on this? Drop your thoughts below! 👇\n\n#Thought #Leadership #Community`,
        `Quick thoughts on ${topic}:\n\n• Game-changing potential\n• Easy to implement\n• Immediate results\n\nWho else is trying this? 🙋‍♀️\n\n#Tips #Productivity #Success`,
        `${topic} is trending and here's why you should care:\n\nIt's not just another fad - it's a fundamental shift in how we approach [industry/topic].\n\nSwipe to see my analysis ➡️\n\n#Analysis #Trends #Future`,
        `POV: You just discovered ${topic} 🤯\n\nMind = blown 🤯\nProductivity = through the roof 📈\nResults = immediate ⚡\n\nTry it and thank me later!\n\n#Mindblown #Productivity #Results`
      ];
      
      setGeneratedCaptions(mockCaptions);
      onCaptionsGenerated(mockCaptions);

      toast({
        title: "Generated Sample Captions",
        description: "Using sample captions. Add your OpenAI API key for custom generation."
      });
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
