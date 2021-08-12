export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProfilePhotoBase {
  url: string;
  width: number;
  height: number;
  position: number;
  centerX: number;
  centerY: number;
}

export interface ProfilePhoto extends ProfilePhotoBase {
  id: string;
  memberId: number;
}
