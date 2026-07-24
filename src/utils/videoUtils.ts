import { VideoPlatform } from '../types';

export interface ParsedVideoInfo {
  platform: VideoPlatform;
  embedId: string;
  embedUrl: string;
  thumbnailUrl: string;
}

/**
 * Extracts YouTube or Vimeo ID and constructs embed + thumbnail URLs
 */
export function parseVideoUrl(url: string): ParsedVideoInfo | null {
  if (!url || typeof url !== 'string') return null;

  const trimmed = url.trim();

  // 1. Check YouTube
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      platform: 'youtube',
      embedId: videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }

  // 2. Check Vimeo
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      platform: 'vimeo',
      embedId: videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&color=d4af37&title=0&byline=0&portrait=0`,
      thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`,
    };
  }

  return null;
}

/**
 * Fallback thumbnail generator for aesthetic representation if video host blocks CORS thumbnail
 */
export function getOptimizedThumbnail(video: { thumbnailUrl: string; platform: VideoPlatform; embedId: string }): string {
  if (video.platform === 'youtube') {
    return `https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`;
  }
  if (video.platform === 'vimeo') {
    return `https://vumbnail.com/${video.embedId}.jpg`;
  }
  return video.thumbnailUrl;
}
