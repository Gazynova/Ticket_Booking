import { CartItem } from './category.model';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  paymentId: string;
  date: Date;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  customerName?: string;
  customerEmail?: string;
}
