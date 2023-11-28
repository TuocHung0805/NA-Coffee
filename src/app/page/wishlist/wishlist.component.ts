import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { user } from 'src/app/service/user';
import { CartService } from 'src/app/service/cart.service';
import { Item } from 'src/app/service/item';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  WishList: any[] = [];
  userInfo: user | any;
  isLoggedIn: boolean = false;
  constructor(
    private authService: AuthService,
    private data: DataService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.afAuth.authState.subscribe((user: any) => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.authService.getUserInfo(user.uid).subscribe((userInfo) => {
          this.userInfo = userInfo || {};
          const wishlistItemIds = this.userInfo.wishList || [];
          this.data.getItemsByIds(wishlistItemIds).subscribe((items) => {
            this.WishList = items;
          });
        });
      }
    });
  }

  addToCart(product: Item) {
    // Gọi hàm addToCart từ CartService để thêm sản phẩm vào giỏ hàng
    this.cartService.addToCart(product);
  }

  deleteWishList(itemID: string) {
    this.data.deleteWishList(itemID);
  }
}
