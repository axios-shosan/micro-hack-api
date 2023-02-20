export interface Announcement {
  id: number;
  title: string;
  description: string;
  place: string;
}

export interface CreateAnnouncement {
  title: string;
  place: string;
  description: string;
}
