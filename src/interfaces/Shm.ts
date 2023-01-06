export interface ShareMoment {
  id: number;
  title: string;
  sessionId: number;
  userId: number;
  picture1: string;
  picture2: string;
}

export interface CreateShm {
  title: string;
  userId: number;
  sessionId: number;
  picture1: string;
  picture2: string;
}
