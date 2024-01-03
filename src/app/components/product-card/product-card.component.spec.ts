import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { QuantityComponentStub } from '../shared/quantity/quantity.component.stub';
import { ButtonComponentStub } from '../shared/button/button.component.stub';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        QuantityComponentStub,
        ButtonComponentStub,
      ],
      imports: [
        RouterTestingModule,
      ],
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onQuantityChange', () => {
    beforeEach(() => {
      component.quantity = 3;
      component.onQuantityChange(10);
    });

    it('should set the received quantity', () => {
      expect(component.quantity).toEqual(10);
    });
  });

  describe('#onQuantityChange', () => {
    let addProductToCartSpy: jasmine.Spy;
    const productData = {
      product: {
        _id: '5',
        image_url: null,
        name: 'Error',
        description: 'Error',
        original_price: null,
        price: 0,
      },
      quantity: 5,
    };

    beforeEach(() => {
      addProductToCartSpy = jasmine.createSpy();
      component.addProductToCart.subscribe(addProductToCartSpy);

      component.quantity = productData.quantity;
      component.data = productData.product;

      component.addToCart();
    });

    it('should emit the product data and quantity to addProductToCart', () => {
      expect(addProductToCartSpy).toHaveBeenCalledOnceWith(productData);
    });
  });
});
