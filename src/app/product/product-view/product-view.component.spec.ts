import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductViewComponent } from './product-view.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('ProductViewComponent', () => {
  let component: ProductViewComponent;
  let fixture: ComponentFixture<ProductViewComponent>;
  let productService: ProductsService;
  let activatedRoute: ActivatedRoute;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductViewComponent],
      providers: [ProductsService, ActivatedRoute,ToastrService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    toastrService = TestBed.inject(ToastrService);

   
  });

  it('should call getProduct with the correct id', () => {
    fixture.detectChanges();

    expect(productService.getProduct).toHaveBeenCalledWith(101);
  });

  it('should set the productDetails property', () => {
    fixture.detectChanges();

    expect(component.productDetails).toEqual({ name: 'Product 1', description: 'Description 1' });
  });

  it('should set the size property', () => {
    const productSize = 'Large';
    component.createSize(productSize);

    expect(component.size).toBe(productSize);
  });

  it('should update the productDetails.productSize property', () => {
    const productSize = 'Large';
    component.productDetails = { productSize: '' };
    component.createSize(productSize);

    expect(component.productDetails.productSize).toBe(productSize);
  });

  it('should log the productSize to the console', () => {
    const productSize = 'Large';
    spyOn(console, 'log');

    component.createSize(productSize);

    expect(console.log).toHaveBeenCalledWith('wedf', productSize);
  });


 
});