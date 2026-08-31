export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: string;
}

export type EventInput = Omit<EventItem, "id" | "createdAt">;