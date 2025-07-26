//Add an interface for Panchanga in TypeScript

export interface Panchanga {
  date: string; // ISO date string
  day: string;
  sunrise: string; // ISO datetime string
  sunset: string; // ISO datetime string
  moonrise: string; // ISO datetime string
  moonset: string; // ISO datetime string
  paksha: string;
  ritu: string;
  ayana: string;
  tithi: TithiDetail[];
  nakshatra: NakshatraDetail[];
  yoga: YogaDetail[];
  karana: KaranaDetail[];
  muhurta: Muhurta;
  hindu_maasa: HinduMaasa;
  vikram_samvat: Samvat;
  shaka_samvat: Samvat;
}

// Stub interfaces for nested types (expand as needed)
export interface TithiDetail {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
}
export interface NakshatraDetail {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}
export interface YogaDetail {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}
export interface KaranaDetail {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}
export interface Muhurta {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}
export interface HinduMaasa {
  purnimanta: string;
  amanta: string;
  is_adhika_maasa: string;
}
export interface Samvat {
  year: number;
  name: string;
}
