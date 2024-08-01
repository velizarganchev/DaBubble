import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  toClock(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return formattedHours + ':' + formattedMinutes;
  }

  toDate(timestamp: number): string {
    const date = new Date(timestamp);
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${dayOfWeek}, ${day} ${month}`;
  }

  toRelativeDate(timestamp: number): string {
    const now = new Date();
    const date = new Date(timestamp);
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msInDay = 86400000;
    const diffInMs = midnight.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / msInDay) + 1;
    return this.getRelativeDay(diffInDays);
  }

  getRelativeDay(diffInDays: number): string {
    switch(diffInDays) {
      case 0: return 'heute';
      case 1: return 'gestern';
      case 2: return 'vorgestern';
    }
    return `vor ${diffInDays} Tagen`;
  }

  toRelativeDateWithClock(timestamp: number): string {
    const now = new Date();
    const date = new Date(timestamp);
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const msInDay = 86400000;
    const diffInMs = midnight.getTime() - date.getTime();
    if (diffInMs < msInDay) {
      return this.toClock(timestamp);
    } else {
      const diffInDays = Math.floor(diffInMs / msInDay);
      return this.getRelativeDay(diffInDays);
    }
  }
}
