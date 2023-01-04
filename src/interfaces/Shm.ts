export interface ShareMomentSesssion {
  id: number;
  sessionName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShm {
  sessionName: string;
  acitve: boolean;
}
