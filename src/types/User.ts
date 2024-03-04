export interface User {
  id: string;
  name: string;
  avatar: string;
  gender: 'female' | 'male';
  hair: 'black' | 'brown' | 'blonde' | 'red' | 'grey';
  eyes: 'brown' | 'blue' | 'green';
  glasses: boolean;
}

export interface UserPaginate {
  _limit: number;
  _page: number;
}

export type Direction = 'asc' | 'desc';

export type Sortable = keyof User;

export interface UserOrdering {
  _sort: Sortable;
  _order: Direction;
}
