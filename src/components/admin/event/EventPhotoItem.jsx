import React, { useState, useEffect } from 'react';
import { Trash2, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { uploadFileToSupabaseStorage } from '../../../utils/cloudSync';
import {
  normalizeImageUrl,
  compressImageFile,
  resolveSocialImageUrl,
} from '../../../utils/eventStatus';

export default function EventPhotoItem({
  imgObj,
  idx,
  targetEvent,
  eventForm,
  handleRemoveImageField,
  handleImageFieldChange
}) {
  const [isResolving, setIsResolving] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [imgObj.url]);

  const handleUrlInput = async (rawVal) => {
    const trimmed = (rawVal || '').trim();
    setLoadError(false);

    const isSocialUrl = /(?:x|twitter)\.com\/[^/]+\/(status|article)\/\d+/i.test(trimmed);

    if (isSocialUrl) {
      handleImageFieldChange(idx, 'url', trimmed);
      setIsResolving(true);
      try {
        const resolved = await resolveSocialImageUrl(trimmed);
        if (resolved && resolved !== trimmed) {
          handleImageFieldChange(idx, 'url', resolved);
        }
      } catch (err) {
        console.warn('Could not auto-resolve social URL:', err);
      } finally {
        setIsResolving(false);
      }
    } else {
      handleImageFieldChange(idx, 'url', normalizeImageUrl(rawVal));
    }
  };

  return (
    <div className="p-2.5 rounded-lg bg-[#0B0E14] border border-white/10 space-y-2 relative group">
      <div className="flex items-center justify-between text-[11px] font-bold text-white/80">
        <span>
          Photo #{idx + 1} {idx === 0 ? '(Main Cover Photo)' : ''}
        </span>

        <button
          type="button"
          onClick={() => handleRemoveImageField(idx)}
          className="text-red-400 hover:text-red-300 p-1 flex items-center gap-1 bg-red-950/60 border border-red-500/40 px-2 py-0.5 rounded"
          title="Remove / delete photo"
        >
          <Trash2 className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[10px]">Remove Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-bold text-[#FFD700]">
              Image URL *
            </label>

            <label className="cursor-pointer text-[10px] font-extrabold text-[#FFD700] hover:text-white bg-[#FF5722]/30 hover:bg-[#FF5722]/60 border border-[#FF5722]/60 px-2 py-0.5 rounded flex items-center gap-1 transition-colors shadow">
              <Upload className="w-3 h-3 text-[#FFD700]" />

              <span>📁 Upload from PC</span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async e => {
                  const file = e.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  try {
                    const eventFolder =
                      targetEvent?.id || eventForm.title || 'event';

                    const storageRes = await uploadFileToSupabaseStorage(
                      file,
                      eventFolder
                    );

                    if (storageRes.success && storageRes.publicUrl) {
                      handleImageFieldChange(idx, 'url', storageRes.publicUrl);
                    } else {
                      console.warn(
                        'Supabase storage upload failed:',
                        storageRes.message
                      );

                      const compressedDataUrl = await compressImageFile(file);

                      handleImageFieldChange(idx, 'url', compressedDataUrl);

                      alert(
                        `⚠️ Could not upload directly to Supabase Storage (${storageRes.message || 'Check Admin -> Cloud Sync credentials & Storage RLS policies'}). Image saved to browser cache.`
                      );
                    }
                  } catch (err) {
                    console.error(err);

                    const compressedDataUrl = await compressImageFile(file);

                    handleImageFieldChange(idx, 'url', compressedDataUrl);
                  }

                  e.target.value = '';
                }}
              />
            </label>
          </div>

          <input
            type="text"
            value={imgObj.url}
            onChange={e => handleUrlInput(e.target.value)}
            onPaste={async e => {
              const pasted = e.clipboardData.getData('text');
              if (/(?:x|twitter)\.com/i.test(pasted)) {
                e.preventDefault();
                await handleUrlInput(pasted);
              }
            }}
            onBlur={async e => {
              if (/(?:x|twitter)\.com/i.test(e.target.value)) {
                await handleUrlInput(e.target.value);
              }
            }}
            placeholder="https://... or click Upload from PC"
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs font-mono"
          />

          {isResolving && (
            <div className="flex items-center gap-1.5 text-[10px] text-[#FFD700] mt-1 font-medium animate-pulse">
              <Loader2 className="w-3 h-3 animate-spin text-[#FFD700]" />
              <span>Extracting direct photo from X (Twitter)...</span>
            </div>
          )}

          <span className="text-[9px] text-[#94A3B8] block mt-0.5">
            💡 Tip: Paste an X/Twitter post or photo link, or right-click the image & select &quot;Copy Image Address&quot;!
          </span>
        </div>

        <div>
          <label className="text-[10px] font-bold text-[#FFD700] block mb-0.5">
            Caption / Title
          </label>

          <input
            type="text"
            value={imgObj.caption}
            onChange={e =>
              handleImageFieldChange(idx, 'caption', e.target.value)
            }
            placeholder="e.g. Malayappa swami Chinna Sesha Vahanam"
            className="w-full px-2.5 py-1.5 rounded-lg bg-[#141923] border border-[#D4AF37]/40 text-white text-xs"
          />
        </div>
      </div>

      {imgObj.url && (
        <>
          {isResolving ? (
            <div className="h-20 w-full rounded-xl border border-[#D4AF37]/40 mt-1 bg-[#141923] flex items-center justify-center gap-2 text-xs text-[#FFD700]">
              <Loader2 className="w-4 h-4 animate-spin text-[#FFD700]" />
              <span>Fetching photo from X (Twitter)...</span>
            </div>
          ) : loadError ? (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 mt-1 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Could not load image directly from this URL</span>
              </div>
              {/(?:x|twitter)\.com/i.test(imgObj.url) ? (
                <p className="text-[11px] leading-relaxed text-slate-300">
                  This is an X (Twitter) webpage link. In Twitter/X, <strong className="text-white">right-click the photo</strong> and click <strong className="text-amber-300">&quot;Copy Image Address&quot;</strong> (or &quot;Copy Image Link&quot;), then paste it here — or click <strong className="text-amber-300">&quot;📁 Upload from PC&quot;</strong>.
                </p>
              ) : (
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Please ensure the URL points directly to an image file (<code className="text-amber-300 font-mono">.jpg, .png, .webp</code>), or click <strong className="text-amber-300">&quot;📁 Upload from PC&quot;</strong>.
                </p>
              )}
            </div>
          ) : (
            <div className="h-24 w-full rounded-xl overflow-hidden border border-[#D4AF37]/40 mt-1 bg-[#141923] relative">
              <img
                src={normalizeImageUrl(imgObj.url)}
                alt="Photo Preview"
                className="w-full h-full object-cover"
                onError={() => setLoadError(true)}
                onLoad={() => setLoadError(false)}
              />

              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/80 rounded text-[9px] text-[#FFD700] font-bold border border-[#FFD700]/30">
                Live Preview
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
