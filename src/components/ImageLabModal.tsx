import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLabModal({ isOpen, onClose }: ImageLabModalProps) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('gemini-3.1-flash-image-preview');
  const [size, setSize] = useState('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          model,
          size: model === 'gemini-3-pro-image-preview' ? size : undefined
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(`data:image/jpeg;base64,${data.imageBase64}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#030508]/80 backdrop-blur-md"
        />
        
        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#080B10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left panel - Controls */}
          <div className="w-full md:w-1/3 border-r border-white/5 p-6 bg-[#0A0D14] flex flex-col">
            <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              Image Lab
            </h3>

            <form onSubmit={handleGenerate} className="flex flex-col gap-5 flex-1">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-light">Model</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors"
                >
                  <option value="gemini-3.1-flash-image-preview">Flash Image Preview (Fast)</option>
                  <option value="gemini-3-pro-image-preview">Pro Image Preview (High Quality)</option>
                </select>
              </div>

              {model === 'gemini-3-pro-image-preview' && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-light">Resolution</label>
                  <div className="flex gap-2">
                    {['1K', '2K', '4K'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                          size === s 
                            ? 'bg-teal-500/20 border-teal-500/50 text-teal-200' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 flex-1">
                <label className="text-sm text-gray-400 font-light">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-teal-500/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="text-red-400 text-xs p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Image</>
                )}
              </button>
            </form>
          </div>

          {/* Right panel - Preview */}
          <div className="w-full md:w-2/3 min-h-[300px] md:min-h-[500px] bg-[#030508] relative flex items-center justify-center p-6">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-4 text-teal-500/50 animate-pulse">
                <div className="w-16 h-16 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-light tracking-wide">Synthesizing visual data...</p>
              </div>
            ) : generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-gray-600">
                <ImageIcon className="w-12 h-12 stroke-1" />
                <p className="text-sm font-light tracking-wide">Your creation will appear here</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
