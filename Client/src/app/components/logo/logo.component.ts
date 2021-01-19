import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from 'src/app/services/order.service';
import { AdminService} from '../../services/admin.service';
import {store} from '../../redux/store';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {
  public products: number = 0;
  public orders:number = 0;
  public categories: number = 0;
  public user: UserModel;

  constructor(private myProductsService: ProductsService, private myOrderServices: OrderService, private adminService: AdminService) { }

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;
    });

    this.myProductsService.getAllProducts()
      .subscribe(res => this.products = res.length, err => alert(err.message));
    this.myOrderServices.getAllOrder()
      .subscribe(res => this.orders = res.length, err => alert(err.message));
    this.adminService.getAllCategories()
      .subscribe(res => this.categories = 3, err => alert(err.message));
  }

}
