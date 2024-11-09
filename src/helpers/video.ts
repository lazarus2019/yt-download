import { fileTypes } from '@/configs/common';

export const getFileTypeLabel = (fileType: string, quality: string) => {
  if (fileType === fileTypes.VIDEO) return `${quality}p (.mp4)`;

  return `MP3 - ${quality}kbps`;
};
