export interface Tag {
  id: number;
  userId: number;
  shareMomentId: number;
}

export interface CreateTag {
  userId: number;
  shareMomentId: number;
}
