
export interface Rate {
  id: number;
  pisoValue: number;
  timeValue: number;
  timeUnit: 'minutes' | 'hours' | 'days';
}

export interface GpioPin {
  id: string;
  function: string;
  pin: number;
}
