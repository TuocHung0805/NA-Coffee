import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/service/item';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  itemsCollection: AngularFirestoreCollection<Item>;
  searchResults: Item[] = [];
  items: Observable<Item[]>;
  selectedAgency = localStorage.getItem('selectedAgency');

  constructor(private afs: AngularFirestore, private router: Router, private cartService: CartService, private data: DataService, private authService: AuthService) {
    this.itemsCollection = this.afs.collection<Item>('Items');
    this.items = this.itemsCollection.valueChanges()

   }

  ngOnInit(): void {
    this.sortByName();

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

  onSortOrderChange(event: any) {
    const selectedValue = event.target.value;

    if (selectedValue === '0') {
      this.sortByPriceAscending();
    } else if (selectedValue === '1') {
      this.sortByPriceDescending();
    }
  }

  // Hàm để sắp xếp sản phẩm theo giá tiền tăng dần
  sortByPriceAscending() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => a.price - b.price))
    );
  }

  // Hàm để sắp xếp sản phẩm theo giá tiền giảm dần
  sortByPriceDescending() {
    this.items = this.items.pipe(
      map(items => items.sort((a, b) => b.price - a.price))
    );
  }

  goToItemDetail(product: Item) {
    this.router.navigate(['/detail', product.id]);
  }
  searchQuery: string = '';

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase(); // Chuyển query thành chữ thường

    if (query !== '') {
      // Perform the search using Firestore query
      this.itemsCollection.ref
        .get()
        .then((querySnapshot) => {
          // Clear the previous search results
          this.searchResults = [];

          // Iterate through the query results and add matching items to the searchResults array
          querySnapshot.forEach((doc) => {
            const item = doc.data() as Item;       
              this.searchResults.push(item);
          });
        })
        .catch((error) => {
          console.error('Error searching items:', error);
        });
    } else {
      // Clear the search results if the search query is empty
      this.searchResults = [];
    }
  }
  AddWishList(itemId: string) {
    if (this.authService.isLoggedIn) {
      this.data.addToWishList(itemId)
        .then(() => {
          console.log('Đã thêm vào danh sách yêu thích');
        })
        .catch((error) => {
          console.error('Lỗi khi thêm vào danh sách yêu thích:', error);
        });
    } else {
      console.error('Đăng nhập để thêm vào danh sách yêu thích');
    }
  }
}


