import * as upgradeCosts from './upgrade-costs-values.json';
import { Buildings } from './buildings';

interface IUpgradeCosts {
  // unfortunately keys are not type-safe here, as the only types accepted for object keys are `string` or `number`
  [key: string]: Buildings;
}

export const UpgradeCosts = upgradeCosts as IUpgradeCosts;
