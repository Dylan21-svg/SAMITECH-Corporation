import { useRef, useState } from 'react';
import { Image as ImageIcon, Loader2, FolderOpen, Upload, X } from 'lucide-react';
import {
  compressImageFileToDataUrl,
  SAMITECH_MEDIA_LIBRARY,
  type MediaAssetPreset,
} from '../../lib/mediaAssets';
import { uploadFileToCloudStorage } from '../../lib/firebase';
import { ResilientImage } from '../ResilientImage';

interface MediaFieldPickerProps {
  label: string;
  value: string;
  onChange: (nextUrl: string) => void;
  helperText?: string;
}

const LIBRARY_CATEGORIES: ('All' | MediaAssetPreset['category'])[] = [
  'All',
  'Hardware',
  'Services',
  'Projects',
  'Team',
  'Brand',
];

export function MediaFieldPicker({
  label,
  value,
  onChange,
  helperText,
}: MediaFieldPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryFilter, setLibraryFilter] =
    useState<'All' | MediaAssetPreset['category']>('All');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploadError(null);
    setUploading(true);
    try {
      const cloudUrl = await uploadFileToCloudStorage(file, 'samitech-media');
      if (cloudUrl) {
        onChange(cloudUrl);
        return;
      }
      const dataUrl = await compressImageFileToDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to process image file.');
    } finally {
      setUploading(false);
    }
  };

  const filteredAssets =
    libraryFilter === 'All'
      ? SAMITECH_MEDIA_LIBRARY
      : SAMITECH_MEDIA_LIBRARY.filter((a) => a.category === libraryFilter);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        {helperText && (
          <span className="text-[11px] text-slate-500">{helperText}</span>
        )}
      </div>

      <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70">
        <div className="w-20 h-16 rounded-lg overflow-hidden border border-slate-200 bg-white shrink-0">
          {value ? (
            <ResilientImage
              src={value}
              alt={label}
              fallbackTitle={label}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or select/upload below..."
            className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#003BFF]"
          />

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#003BFF]" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#003BFF]" />
              )}
              <span>{uploading ? 'Optimizing...' : 'Upload Photo'}</span>
            </button>

            <button
              type="button"
              onClick={() => setLibraryOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF3FF] hover:bg-[#DCE6FA] border border-[#C7D7F9] text-xs font-semibold text-[#003BFF] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{libraryOpen ? 'Hide Library' : 'SAMITECH Assets'}</span>
            </button>
          </div>

          {uploadError && (
            <p className="text-[11px] font-medium text-[#DC2626]">{uploadError}</p>
          )}
        </div>
      </div>

      {libraryOpen && (
        <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {LIBRARY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setLibraryFilter(cat)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                    libraryFilter === cat
                      ? 'bg-[#07133B] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLibraryOpen(false)}
              aria-label="Close asset picker"
              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
            {filteredAssets.map((asset) => {
              const selected = value === asset.src;
              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => {
                    onChange(asset.src);
                    setLibraryOpen(false);
                  }}
                  className={`group rounded-lg overflow-hidden border text-left transition-all cursor-pointer ${
                    selected
                      ? 'border-[#003BFF] ring-2 ring-[#003BFF]/25'
                      : 'border-slate-200 hover:border-[#003BFF]/60'
                  }`}
                >
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={asset.src}
                      alt={asset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="px-1.5 py-1 text-[10px] font-medium text-slate-700 truncate bg-white">
                    {asset.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
