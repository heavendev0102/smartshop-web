export type ProductType = "New Arrivals" | "Bestsellers" | "Featured";

export interface Product {
  id: number;
  description: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating:number;
  discount?: number;
  discountPrice?: number;
  type: ProductType;
  company?: string;
  stock:number,
  totalsold:number,
  totalRevenue:number,
}

// export type Category = {
//     id: number;
//     name: string;
//     icon: React.ElementType;
// };

export interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  password: string;
}

export interface SignInFormInputs {
  email: string,
  password: string,
}


export interface SignUpFormInputsWithProfile extends SignUpFormInputs {
  id: number;
 profile:string|undefined|null;
}

export interface ContactFormInputs {
  name: string,
  email: string,
  subject: string,
  message: string,
}


interface cartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface CartItem extends cartProduct {
  quantity: number;
}

export interface CartStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: cartProduct , qty : number) => void;
  clearCart: () => void;
  getTotalQty: () => number;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
}

export type addressDetails = {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    type?: string;
};

export type shipDetails = {
    method?: string;
    charge?: number;
    estimatedDays?: string;
    estimatedDeliveryDate?: string;
};


export interface OrderType{
    orderId : string ;
    paymentMethod : string;
    totalAmount : string;
}


export interface Category {
  id: number;
  name: string;
  slug: string;
  icon_url: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface Section {
  id: number;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  image_url: string;
  current_price: string;
  original_price: string;
  discount_percent: number;
  is_active: boolean;
  categories: Category[];
  sections: Section[];
  created_date: string;
  modified_date: string;
}

export interface ProductSection {
  name: string;
  slug: string;
  products: Product[];
}

export interface StorefrontResponse {
  categories: Category[];

  new_arrivals: ProductSection;

  bestsellers: ProductSection;

  featured: ProductSection;
}