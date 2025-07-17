// src/types.ts

// Existing types (keep them as needed)
export interface CartItemType {
  id: number;
  name: string;
  price: number;
  img: string; // Or imageUrl, based on your context
  quantity: number;
}


export interface State {
  id: string;
  name: string;
  lgas: LGA[];
}

export interface LGA {
  id: string;
  name: string;
}

// Type for the full shipping address details
export interface ShippingAddress {
  state: string; // The selected state's name or ID
  lga: string; // The selected LGA's name or ID
  homeAddress: string;
  phoneNumber: string;
}
// src/types/product.ts
export interface Product {
  id?: string; // Optional for new products
  name: string;
  description: string;
  price: number;
  imageUrl: string[]; // Array of URLs for images
  videoUrl?: string; // Optional video URL
  // ... other product details
}