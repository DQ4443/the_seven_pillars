export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI";

export interface ClassSession {
  id: string;
  day: DayOfWeek;
  time: string;
  subject: {
    en: string;
    zh: string;
  };
  yearLevel: string;
  isTBD?: boolean;
}

export const timetableData: ClassSession[] = [
  // Monday
  {
    id: "mon-1",
    day: "MON",
    time: "4:15-5:45 PM",
    subject: { en: "Y8 Maths", zh: "8年级数学" },
    yearLevel: "8",
  },
  {
    id: "mon-2",
    day: "MON",
    time: "5:45-7:15 PM",
    subject: { en: "Pre-VCE Chemistry", zh: "Pre-VCE 化学" },
    yearLevel: "Pre-VCE",
  },
  {
    id: "mon-3",
    day: "MON",
    time: "7:15-8:45 PM",
    subject: { en: "Y10 Maths", zh: "10年级数学" },
    yearLevel: "10",
  },

  // Tuesday
  {
    id: "tue-1",
    day: "TUE",
    time: "4:15-5:45 PM",
    subject: { en: "Y9 Maths", zh: "9年级数学" },
    yearLevel: "9",
  },
  {
    id: "tue-2",
    day: "TUE",
    time: "5:45-7:15 PM",
    subject: { en: "Y10 Maths", zh: "10年级数学" },
    yearLevel: "10",
  },
  {
    id: "tue-3",
    day: "TUE",
    time: "7:15-8:45 PM",
    subject: { en: "Y8-9 Science", zh: "8-9年级科学课" },
    yearLevel: "8-9",
  },

  // Wednesday
  {
    id: "wed-1",
    day: "WED",
    time: "4:15-5:45 PM",
    subject: { en: "Pre-VCE Methods", zh: "PRE-VCE 中数 1&2" },
    yearLevel: "Pre-VCE",
  },
  {
    id: "wed-2",
    day: "WED",
    time: "5:45-7:15 PM",
    subject: { en: "Y7 Maths", zh: "7年级数学" },
    yearLevel: "7",
  },

  // Thursday
  {
    id: "thu-1",
    day: "THU",
    time: "4:15-5:45 PM",
    subject: { en: "Y8 Maths", zh: "8年级数学" },
    yearLevel: "8",
  },
  {
    id: "thu-2",
    day: "THU",
    time: "5:45-7:15 PM",
    subject: { en: "Y9 Maths", zh: "9年级数学" },
    yearLevel: "9",
  },
  {
    id: "thu-3",
    day: "THU",
    time: "7:15-8:45 PM",
    subject: { en: "Pre-VCE Methods", zh: "PRE-VCE 中数 1&2" },
    yearLevel: "Pre-VCE",
  },

  // Friday
  {
    id: "fri-1",
    day: "FRI",
    time: "4:15-5:45 PM",
    subject: { en: "Y6 Maths", zh: "6年级数学" },
    yearLevel: "6",
  },
  {
    id: "fri-2",
    day: "FRI",
    time: "5:45-7:15 PM",
    subject: { en: "TBD", zh: "待定" },
    yearLevel: "",
    isTBD: true,
  },
  {
    id: "fri-3",
    day: "FRI",
    time: "7:15-8:45 PM",
    subject: { en: "TBD", zh: "待定" },
    yearLevel: "",
    isTBD: true,
  },
];

export const days: DayOfWeek[] = ["MON", "TUE", "WED", "THU", "FRI"];

export const timeSlots = ["4:15-5:45 PM", "5:45-7:15 PM", "7:15-8:45 PM"];

export function getClassesByDay(day: DayOfWeek): ClassSession[] {
  return timetableData.filter((session) => session.day === day);
}

export function getClassByDayAndTime(day: DayOfWeek, time: string): ClassSession | undefined {
  return timetableData.find((session) => session.day === day && session.time === time);
}
