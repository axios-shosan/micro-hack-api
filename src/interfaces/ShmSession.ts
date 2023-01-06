export interface ShareMomentSesssion {
  id: number;
  sessionName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShmSession {
  sessionName: string;
  active: boolean;
}
