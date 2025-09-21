
export enum Gender {
  Lelaki = 'Lelaki',
  Perempuan = 'Perempuan',
}

export enum ClassLevel {
  T4 = 'Tahun 4',
  T5 = 'Tahun 5',
  T6 = 'Tahun 6',
}

export interface SegakScore {
  bmi: number;
  naikTurunBangku: number;
  tekanTubi: number;
  ringkukTubi: number;
  jangkauanMelunjur: number;
}

export interface Student {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  icNumber: string;
  class: ClassLevel;
  phase1: SegakScore;
  phase2: SegakScore;
}
