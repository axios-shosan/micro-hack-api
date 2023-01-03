export interface CheckIn {
  id: number;
  sessionName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCheckIn {
  sessionName: string;
}

export interface CheckInUser {
  id: number;
  userCheckId: string;
  checkInId: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateCheckInUser {
  userCheckInId: string;
  checkInId: number;
}
