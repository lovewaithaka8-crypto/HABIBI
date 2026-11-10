import React, { useState, useEffect } from 'react';
import { Camera, ImagePlus, X, Heart, Maximize2, Trash2 } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { getStoredPhotos, saveStoredPhotos } from '../utils/storage';
import { romanticAudio } from '../utils/audio';

// Default curated romantic photos generated for Habibti
const defaultPhotos: MemoryPhoto[] = [
  {
    id: 'def-1',
    url: '/src/assets/images/romantic_holding_hands_1794335604061.jpg',
    caption: 'Tender hands intertwined in the golden sunset glow 🌅💍',
    date: 'A Golden Moment',
    isDefault: true,
  },
  {
    id: 'def-2',
    url: '/src/assets/images/romantic_candlelit_date_1794335603544.jpg',
    caption: 'Candlelit tea, rose petals & endless conversations ☕🕯️',
    date: 'Our Warm Evenings',
    isDefault: true,
  },
  {
    id: 'def-3',
    url: '/src/assets/images/romantic_sunset_stroll_1794335605255.jpg',
    caption: 'Walking together along the ocean shore into the dusk 🌊🏝️',
    date: 'By Your Side',
    isDefault: true,
  },
  {
    id: 'def-4',
    url: '/src/assets/images/romantic_rose_bouquet_1794335605795.jpg',
    caption: 'Velvet roses wrapped in silk, made to match your beauty 🌹🌸',
    date: 'For My Queen',
    isDefault: true,
  },
];

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<MemoryPhoto[]>(defaultPhotos);
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const custom = getStoredPhotos();
    if (custom.length > 0) {
      setPhotos([...defaultPhotos, ...custom]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    romanticAudio.playSparkle();

    const newPhotos: MemoryPhoto[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        processed++;
        if (processed === files.length) setIsUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const item: MemoryPhoto = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: result,
            caption: file.name.replace(/\.[^/.]+$/, ''),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            isDefault: false,
          };
          newPhotos.push(item);
        }

        processed++;
        if (processed === files.length) {
          setPhotos((prev) => {
            const updated = [...prev, ...newPhotos];
            const uploadedOnly = updated.filter((p) => !p.isDefault);
            saveStoredPhotos(uploadedOnly);
            return updated;
          });
          setIsUploading(false);
        }
      };

      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleDeletePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== photoId);
      const uploadedOnly = updated.filter((p) => !p.isDefault);
      saveStoredPhotos(uploadedOnly);
      return updated;
    });
    if (activePhoto?.id === photoId) {
      setActivePhoto(null);
    }
  };

  return (
    <section id="memories" className="scroll-mt-24 my-10">
      <div className="card p-6 sm:p-10 shadow-xl transition-all">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            <span>Our Memories</span>
            <span>📸💕</span>
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Add your favourite pictures together to cherish forever.
          </p>
        </div>

        {/* Upload Button Area */}
        <div className="flex justify-center mb-8">
          <label className="relative inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-rose-100 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-full transition-all cursor-pointer shadow-sm hover:scale-[1.02]">
            <ImagePlus className="w-4 h-4 text-rose-300" />
            <span>{isUploading ? 'Adding Memories...' : 'Upload Our Photos 📸'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="sr-only"
            />
          </label>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                setActivePhoto(photo);
                romanticAudio.playSparkle();
              }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-950/40 border border-rose-500/20 hover:border-rose-400/60 transition-all duration-300 shadow-md hover:shadow-rose-950/50 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-rose-950/40">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* View Icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/60 backdrop-blur-sm text-rose-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Delete button if uploaded */}
                {!photo.isDefault && (
                  <button
                    type="button"
                    onClick={(e) => handleDeletePhoto(photo.id, e)}
                    title="Remove photo"
                    className="absolute top-3 left-3 p-1.5 rounded-full bg-red-950/70 hover:bg-red-800 text-rose-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="p-3 text-left">
                {photo.date && (
                  <div className="text-[11px] font-medium text-rose-300/70 uppercase tracking-wider mb-0.5">
                    {photo.date}
                  </div>
                )}
                <p className="text-xs text-rose-100 line-clamp-1 font-medium">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Subtext */}
        <div className="mt-8 text-center text-xs text-rose-300/60 flex items-center justify-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-rose-400/70" />
          <span>Every picture holds a feeling only we know.</span>
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-stone-900 border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Close photo"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 text-rose-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] bg-black/40 flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-stone-900/95 flex items-center justify-between gap-4 border-t border-rose-500/20">
                <div>
                  {activePhoto.date && (
                    <span className="text-xs text-rose-300/70 font-mono block mb-1">
                      {activePhoto.date}
                    </span>
                  )}
                  <h3 className="font-serif-romantic text-base sm:text-lg text-rose-100 font-semibold">
                    {activePhoto.caption}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-rose-500/20 text-rose-300">
                    <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
