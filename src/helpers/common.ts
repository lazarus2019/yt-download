export const convertSecondsToMinutes = (seconds: number): string => {
  const fixedSeconds = Math.round(seconds);
  const minutes = Math.floor(fixedSeconds / 60);
  const remainingSeconds = fixedSeconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export const convertFileSize = (size: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};
