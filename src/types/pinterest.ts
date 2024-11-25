export interface PinterestAccount {
  id: string;
  name: string;
  profileImage: string;
  boardCount: number;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  pinCount: number;
  selected?: boolean;
}

export interface ScheduledPin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  boardId: string;
  scheduledDate: Date;
  status: 'pending' | 'published' | 'failed';
}