import { EventItem, EventInput } from "@/src/types/event";

const STORAGE_KEY = "events";
const DELAY = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const seedEvents: EventItem[] = [
  {
    id: 1,
    title: "React Workshop",
    description: "Hands-on workshop on React hooks and performance.",
    date: "2026-09-05",
    time: "10:00",
    location: "Lab 1",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Career Guidance Session",
    description: "Session with industry mentors about career paths.",
    date: "2026-09-12",
    time: "14:00",
    location: "Auditorium",
    createdAt: new Date().toISOString(),
  },
];

function getStoredEvents(): EventItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedEvents));
    return seedEvents;
  }
  return JSON.parse(raw) as EventItem[];
}

function saveEvents(events: EventItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export async function getEvents(): Promise<EventItem[]> {
  await delay(DELAY);
  return getStoredEvents().sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export async function createEvent(data: EventInput): Promise<EventItem> {
  await delay(DELAY);
  const events = getStoredEvents();
  const newEvent: EventItem = {
    ...data,
    id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  events.push(newEvent);
  saveEvents(events);
  return newEvent;
}

export async function deleteEvent(id: number): Promise<void> {
  await delay(DELAY);
  const events = getStoredEvents().filter((e) => e.id !== id);
  saveEvents(events);
}