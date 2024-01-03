import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, ProductData } from 'src/app/interfaces/shop';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() data: Product = {
    _id: '0',
    image_url: null,
    name: 'Error',
    description: 'Error',
    original_price: null,
    price: 0,
  };
  @Output() addProductToCart = new EventEmitter<ProductData>();

  quantity = 1;

  onQuantityChange(quantity: number): void {
    this.quantity = quantity;
  }

  addToCart(): void {
    const productData = {
      product: this.data,
      quantity: this.quantity,
    };

    this.addProductToCart.emit(productData)
  }
}
