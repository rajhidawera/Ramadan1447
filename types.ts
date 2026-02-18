
export interface Koan {
  text: string;
  source: string;
}

export enum ZenMode {
  IDLE = 'IDLE',
  BREATHING = 'BREATHING',
  MEDITATION = 'MEDITATION',
  REFLECTING = 'REFLECTING'
}
