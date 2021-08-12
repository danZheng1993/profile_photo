import axios from 'axios';

import { CONFIG } from '../config';
import { ProfilePhoto, ProfilePhotoBase } from '../models/Profile';

export const apiClient = axios.create({
  baseURL: CONFIG.apiBaseUrl,
});

export const fetchPhotos = (memberId: number) => {
  return apiClient.get(`/member/${memberId}/photos`);
}

export const postPhoto = (memberId: number, photoDetails: ProfilePhotoBase) => {
  return apiClient.post(`/member/${memberId}/photos`, photoDetails);
}

export const updatePhoto = (photoId: string, photoDetails: ProfilePhotoBase) => {
  return apiClient.put(`/photos/${photoId}`, photoDetails);
}

export const deletePhoto = (photoId: string) => {
  return apiClient.delete(`/photos/${photoId}`);
}
