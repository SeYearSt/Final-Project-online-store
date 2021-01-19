import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import {OrderModel} from '../../models/order';
import {OrderService} from '../../services/order.service';
import {UserModel} from '../../models/user';
import {Router, Routes} from '@angular/router';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders: OrderModel[];
  public user: UserModel;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    store.subscribe(() => {
      this.user = store.getState().user;

      if (!this.user.isAdmin) {
        this.router.navigate(['/home']);
      }
    });

    this.orderService.getAllOrder()
      .subscribe(res => this.orders = res, error => alert(error.message));

    console.log(this.orders);
  }

}
