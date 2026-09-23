import { useEffect, useState } from "react";

/* ─── Rolling schedule for the "efir09" 2-day intensive ───
 * Day 1 starts today at 19:00 MSK. After 18:40 MSK it rolls over to
 * tomorrow (so the countdown never shows a start time that has already
 * passed). Day 2 is always the day right after Day 1.
 */
const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;
const CUTOFF_HOUR = 18;
const CUTOFF_MINUTE = 40;
const MSK_TZ = "Europe/Moscow";

function mskDateAt19(year: number, month: number, day: number, dayOffset: number): Date {
  // 19:00 MSK = 16:00 UTC (Moscow has a fixed UTC+3 offset, no DST)
  return new Date(Date.UTC(year, month, day + dayOffset, 16, 0, 0));
}

export interface Efir09Schedule {
  day1Date: Date;
  day2Date: Date;
}

export function getEfir09Schedule(now: Date = new Date()): Efir09Schedule {
  const shifted = new Date(now.getTime() + MSK_OFFSET_MS);
  const year = shifted.getUTCFullYear();
  const month = shifted.getUTCMonth();
  const day = shifted.getUTCDate();
  const hours = shifted.getUTCHours();
  const minutes = shifted.getUTCMinutes();

  const afterCutoff = hours > CUTOFF_HOUR || (hours === CUTOFF_HOUR && minutes >= CUTOFF_MINUTE);
  const day1Offset = afterCutoff ? 1 : 0;

  return {
    day1Date: mskDateAt19(year, month, day, day1Offset),
    day2Date: mskDateAt19(year, month, day, day1Offset + 1),
  };
}

export function useEfir09Schedule(): Efir09Schedule {
  const [schedule, setSchedule] = useState(() => getEfir09Schedule());
  useEffect(() => {
    const t = setInterval(() => setSchedule(getEfir09Schedule()), 60000);
    return () => clearInterval(t);
  }, []);
  return schedule;
}

function dayMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: MSK_TZ }).format(date);
}

function dayNum(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", timeZone: MSK_TZ }).format(date);
}

function monthNameLabel(date: Date): string {
  // "long" gives nominative ("сентябрь"); extract the genitive form
  // ("сентября") from the day+month formatter instead, which Intl renders
  // in genitive case for ru-RU.
  return dayMonthLabel(date).split(" ")[1];
}

function shortDate(date: Date): string {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", timeZone: MSK_TZ }).format(date);
}

export interface Efir09DateLabels {
  day1Label: string;
  day2Label: string;
  rangeLabel: string;
  rangeShortLabel: string;
}

export function formatEfir09Dates(day1Date: Date, day2Date: Date): Efir09DateLabels {
  const day1Label = dayMonthLabel(day1Date);
  const day2Label = dayMonthLabel(day2Date);
  const month1 = monthNameLabel(day1Date);
  const month2 = monthNameLabel(day2Date);

  const rangeLabel =
    month1 === month2 ? `${dayNum(day1Date)} и ${dayNum(day2Date)} ${month1}` : `${day1Label} и ${day2Label}`;

  const short1 = shortDate(day1Date);
  const short2 = shortDate(day2Date);
  const rangeShortLabel =
    month1 === month2 ? `${short1.split(".")[0]}–${short2}` : `${short1}–${short2}`;

  return { day1Label, day2Label, rangeLabel, rangeShortLabel };
}

export function toGCalTimestamp(date: Date): string {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}