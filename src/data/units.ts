import type { Unit, UnitId } from '../types';
import { unit } from './unit-io';

export const units: Record<UnitId, Unit> = { io: unit };
