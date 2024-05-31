import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodItemService } from '../food-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items$: Observable<any>;

  constructor(private foodItemService: FoodItemService, private router: Router) {
    this.items$ = this.foodItemService.items$;
    this.items$.subscribe(items => {
      items.forEach((item: any) => item.expanded = false);
    });
  }

  goToAddItem() {
    this.router.navigate(['/add']);
  }

  goToEditItem(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteItem(id: number) {
    this.foodItemService.deleteItem(id);
  }

  toggleExpand(item: any) {
    item.expanded = !item.expanded;
  }

  getCardBgClass(index: number) {
    const classes = ['card-bg-1', 'card-bg-2', 'card-bg-3', 'card-bg-4'];
    return classes[index % classes.length];
  }
}
