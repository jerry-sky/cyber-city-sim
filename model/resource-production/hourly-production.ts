import * as hourlyProduction from './hourly-production-values.json';
import { Buildings } from './buildings';

interface IHourlyProduction {
  // unfortunately keys are not type-safe here, as the only types accepted for object keys are `string` or `number`
  [key: string]: Buildings;
}

export const HourlyProduction = hourlyProduction as IHourlyProduction;
