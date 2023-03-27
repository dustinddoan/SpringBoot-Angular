import { Component } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  products: Product[] = [];
  currentCategory: number = 1;

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }
  listProducts() {
    const hasCatergoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCatergoryId) {
      this.currentCategory = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategory = 1;
    }


    this.productService.getProductList(this.currentCategory).subscribe((data) => {
      this.products = data;
    });
  }
}
