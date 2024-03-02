import { FilterData } from '@/types';

export const removeBlank = (object: FilterData) => Object.fromEntries(Object.entries(object).filter(([_, value]) => value !== ''));

export const sanitiseValue = (value: string | null): string => (value ?? '').toLowerCase().trim().replace(/ /g, '-');
