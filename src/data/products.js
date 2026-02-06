// Re-export desde store para compatibilidad
export { categories, sizes, colors, FREE_SHIPPING_THRESHOLD } from '../store/useStore';

// Para componentes que importan products directamente
// deben usar useStore().products en su lugar
export const products = [];
export const collections = [];
export const users = [];
export const coupons = [];
