import {User} from './user';

export interface NavigationState {
  userId?: number;
  users?: User[]; // Массив пользователей
}
