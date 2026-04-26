export { elyzior } from './elyzior';
export { vibe } from './vibe';

export type Brand = 'elyzior' | 'vibe';
export type UserType = 'first-time' | 'loyalty';

export interface BrandVariant {
  brand: Brand;
  userType: UserType;
}
