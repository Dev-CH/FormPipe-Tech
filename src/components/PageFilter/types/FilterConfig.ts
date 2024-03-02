type FilterType = 'select' | 'text' | 'radio';

export interface FilterConfig {
  type: FilterType,
  name: string,
  label: string,
  placeholder?: string,
  data?: string[],
  defaultValue?: string,
}

export interface FilterData {
  [name: string]: string,
}
