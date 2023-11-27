import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Item } from 'src/app/service/item';
import { Observable, map, from } from 'rxjs';

@Component({
  selector: 'app-home-agency',
  templateUrl: './home-agency.component.html',
  styleUrls: ['./home-agency.component.css']
})
export class HomeAgencyComponent implements OnInit{
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  
  constructor(private afs: AngularFirestore, private router: Router, private cartService: CartService, private authService: AuthService, private data: DataService) {
    this.itemsCollection = this.afs.collection<Item>('Items');
    this.items = this.itemsCollection.valueChanges()
    this.filterQ1Items();
   }

  ngOnInit(): void {
    this.sortByName();

  }
  filterQ1Items() {
    const promise = this.itemsCollection.ref.where('branch', '==', 'Q1').get();

    this.items = from(promise).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => doc.data() as Item))
    );
  }

  addToCart(product: Item) {
    // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product);
  }

   // Hàm để sắp xếp sản phẩm theo tên theo bảng chữ cái
   sortByName() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }
}
