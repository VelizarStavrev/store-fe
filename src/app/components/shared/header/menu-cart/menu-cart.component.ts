import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-cart',
  templateUrl: './menu-cart.component.html',
  styleUrls: ['./menu-cart.component.scss'],
})
export class MenuCartComponent {
  cartItems: {
    imageURL: string,
    name: string,
    quantity: number,
    price: number,
  }[] = [
      {
        imageURL: 'https://www.pexonpcs.co.uk/cdn/shop/products/DSC9737.jpg?v=1654084431&width=1946',
        name: 'Example extremely long name that has to be handled',
        quantity: 2,
        price: 99.99,
      },
      {
        imageURL: 'https://www.pexonpcs.co.uk/cdn/shop/products/DSC9737.jpg?v=1654084431&width=1946',
        name: 'Example extremely 2 long name that has to be handled',
        quantity: 1,
        price: 5.99,
      },
      {
        imageURL: 'https://www.pexonpcs.co.uk/cdn/shop/products/DSC9737.jpg?v=1654084431&width=1946',
        name: 'Example extremely 3 long name that has to be handled',
        quantity: 5,
        price: 0.99,
      },
    ]; // TO DO - implement when the cart service is available

  totalPrice = 0; // TO DO - implement when the cart service is available
}
