import axios from 'axios';
import {
  RAPID_HEADER,
  BASE_URL,
  GG_YOUTUBE_KEY,
  HOST_URL,
  YOUTUBE_MP3_KEY,
  YOUTUBE_QUERY_KEY,
  AXIOS_TIMEOUT,
} from './configs';

const axiosInstance = axios;

axiosInstance.defaults.timeout = AXIOS_TIMEOUT;

axiosInstance.interceptors.response.use((response) => {
  try {
    if (response.data) return response.data;
  } catch (error) {
    console.log('axiosInstance:::error', error);
  }
});

// setup APIs connect to Rapid
const axiosYoutubeToMP3 = axiosInstance.create({
  baseURL: BASE_URL.youtubeToMP3,
  headers: {
    [RAPID_HEADER.rapidKey]: YOUTUBE_MP3_KEY,
    [RAPID_HEADER.rapidHost]: HOST_URL.youtubeToMP3,
    'Content-Type': 'application/json',
  },
});

const axiosYoutubeQuery = axiosInstance.create({
  baseURL: BASE_URL.youtubeQuery,
  headers: {
    [RAPID_HEADER.rapidKey]: YOUTUBE_QUERY_KEY,
    [RAPID_HEADER.rapidHost]: HOST_URL.youtubeQuery,
    'Content-Type': 'application/json',
  },
});

// setup APIs connect to Google
const axiosGGYoutubeQuery = axiosInstance.create({
  baseURL: BASE_URL.youtubeGGQuery,
  paramsSerializer: (params) => {
    const combinedParams = { key: GG_YOUTUBE_KEY, ...params };

    // Serialize the combined params into a query string
    return new URLSearchParams(combinedParams).toString();
  },
  headers: {
    Accept: 'application/json',
  },
});

// setup APIs connect to custom Server
const axiosYoutubeCustom = axiosInstance.create({
  baseURL: BASE_URL.youtubeCustom,
  headers: {
    Accept: 'application/json',
  },
});

export {
  axiosYoutubeToMP3,
  axiosYoutubeQuery,
  axiosGGYoutubeQuery,
  axiosYoutubeCustom,
};
