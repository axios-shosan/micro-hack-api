export interface Coach {
  id: number;
  name: string;
  picture: string;
  active: boolean;
}

export interface RequestCoach {
  id: number;
  teamId: number;
  coachId: number;
  status: RequestStatus;
  archived: number;
}

export interface CraeteCoach {
  name: string;
  picture: string;
}

export interface createRequestCoach {
  teamId: number;
  coachId: number;
}

export enum RequestStatus {
  requested,
  inSearch,
  coming,
  resolved,
  canceled,
}
