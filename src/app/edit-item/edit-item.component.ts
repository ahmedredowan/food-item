import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../food-item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;

  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const item = this.foodItemService.getItemById(this.id);
    if (item) {
      this.name = item.name;
      this.description = item.description;
      this.price = item.price;
    }
  }

  updateItem() {
    if (this.name && this.description && this.price) {
      this.foodItemService.updateItem({ id: this.id, name: this.name, description: this.description, price: this.price });
      this.router.navigate(['/']);
    }
  }

  clearFields() {
    this.name = '';
    this.description = '';
    this.price = 0;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
