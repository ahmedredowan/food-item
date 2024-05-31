import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItemService } from '../food-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  name: string = '';
  description: string = '';
  price: number = 0;

  constructor(private foodItemService: FoodItemService, private router: Router) {}

  addItem() {
    if (this.name && this.description && this.price) {
      this.foodItemService.addItem({ name: this.name, description: this.description, price: this.price });
      this.router.navigate(['/']);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
