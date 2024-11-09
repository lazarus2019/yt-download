import { fileTypes } from '@/configs/common';

export const tableConvertHeaders = ['File type', 'Format', 'Action'];

export const downloadTypes = [
  {
    label: 'Audio',
    icon: 'video',
    type: fileTypes.AUDIO,
  },
  {
    label: 'Video',
    icon: 'video',
    type: fileTypes.VIDEO,
  },
];
