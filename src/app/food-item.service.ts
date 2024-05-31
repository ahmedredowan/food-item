import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private items = new BehaviorSubject<FoodItem[]>([]);
  items$ = this.items.asObservable();
  private nextId = 1;

  addItem(item: Omit<FoodItem, 'id'>) {
    const newItem = { ...item, id: this.nextId++ };
    this.items.next([...this.items.value, newItem]);
  }

  updateItem(updatedItem: FoodItem) {
    const items = this.items.value.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    this.items.next(items);
  }

  deleteItem(id: number) {
    this.items.next(this.items.value.filter(item => item.id !== id));
  }

  getItemById(id: number): FoodItem | undefined {
    return this.items.value.find(item => item.id === id);
  }
}
