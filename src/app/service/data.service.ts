import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { Promotion } from './promotion';
import { ingredient } from './ingredient';
import { recipe } from './recipe';
import { user } from './user';
import { agency } from './agency';
import { blog } from './blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore) {}

  async addToWishList(itemId: string): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user) {
      const userRef = this.afs.collection('users').doc(user.uid);

      // Lấy thông tin người dùng từ Firestore
      const userDoc = await userRef.get().toPromise();
      const userData = userDoc!.data() as user;

      // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích hay chưa
      if (userData.wishList && userData.wishList.includes(itemId)) {
        return; // Nếu đã có, không thêm lại
      }

      // Thêm vào danh sách yêu thích
      if (!userData.wishList) {
        userData.wishList = [itemId];
      } else {
        userData.wishList.push(itemId);
      }

      // Cập nhật thông tin người dùng trong Firestore
      await userRef.update(userData);
    }
  }

  async deleteWishList(itemId: string): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user')!);

    if (user) {
      const userRef = this.afs.collection('users').doc(user.uid);

      // Lấy thông tin người dùng từ Firestore
      const userDoc = await userRef.get().toPromise();
      const userData = userDoc!.data() as user;

      // Kiểm tra xem sản phẩm có trong danh sách yêu thích hay không
      if (!userData.wishList || !userData.wishList.includes(itemId)) {
        return;
      }

      // Xóa khỏi danh sách yêu thích
      userData.wishList = userData.wishList.filter((id) => id !== itemId);

      // Cập nhật thông tin người dùng trong Firestore
      await userRef.update(userData);
    }
  }

  addItem(item: Item) {
    const itemId = this.afs.createId(); // Tạo một ID mới
    item.id = itemId;
    const itemDoc = this.afs.doc<Item>(`/Items/${itemId}`);

    // Thêm sản phẩm vào collection
    return itemDoc.set(item);
  }

  getAllItem() {
    return this.afs.collection('/Items').snapshotChanges();
  }

  deleteItem(item: Item) {
    return this.afs.doc('/Items/' + item.id).delete();
  }

  updateItem(item: Item) {
    return this.afs.doc('/Items/' + item.id).update(item);
  }

  /* Danh sÃ¡ch API user */
  getAllItemUser() {
    return this.afs.collection('/users').snapshotChanges();
  }

  updateItemUser(item: user) {
    return this.afs.doc('/users/' + item.uid).update(item);
  }

  /* Danh sÃ¡ch API thÃ´ng bÃ¡o */
  getAllItemNotification() {
    return this.afs.collection('/notification').snapshotChanges();
  }

  // /* Danh sÃ¡ch API mÃ£ khuyáº¿n mÃ£i */
  getAllItemPromotion() {
    return this.afs.collection('/promotion').snapshotChanges();
  }

  addItemPromotion(item: Promotion) {
    item.id = this.afs.createId();
    return this.afs.collection('/promotion').add(item);
  }

  deleteItemPromotion(item: Promotion) {
    return this.afs.doc('/promotion/' + item.id).delete();
  }

  updateItemPromotion(item: Promotion) {
    return this.afs.doc('/promotion/' + item.id).update(item);
  }

  getAllItemRecipe() {
    return this.afs.collection('/recipe').snapshotChanges();
  }

  addItemRecipe(item: recipe) {
    item.id = this.afs.createId();
    return this.afs.collection('/recipe').add(item);
  }

  deleteItemRecipe(item: recipe) {
    return this.afs.doc('/recipe/' + item.id).delete();
  }

  updateItemRecipe(item: recipe) {
    return this.afs.doc('/recipe/' + item.id).update(item);
  }

  getAllItemIngredient() {
    return this.afs.collection('/ingredient').snapshotChanges();
  }

  addItemIngredient(item: ingredient) {
    const itemId = this.afs.createId(); // Tạo một ID mới
    item.id = itemId;
    const itemDoc = this.afs.doc<ingredient>(`/ingredient/${itemId}`);

    // Thêm sản phẩm vào collection
    return itemDoc.set(item);
  }

  deleteItemIngredient(item: ingredient) {
    return this.afs.doc('/ingredient/' + item.id).delete();
  }

  updateItemIngredient(item: ingredient) {
    return this.afs.doc('/ingredient/' + item.id).update(item);
  }

  getAllItemAgency() {
    return this.afs.collection('/Agency').snapshotChanges();
  }

  addItemAgency(item: agency) {
    const itemId = this.afs.createId(); // Tạo một ID mới
    item.id = itemId;
    const itemDoc = this.afs.doc<agency>(`/Agency/${itemId}`);

    // Thêm sản phẩm vào collection
    return itemDoc.set(item);
  }

  deleteItemAgency(item: agency) {
    return this.afs.doc('/Agency/' + item.id).delete();
  }

  updateItemAgency(item: agency) {
    return this.afs.doc('/Agency/' + item.id).update(item);
  }
  getAllItemBlog() {
    return this.afs.collection('/Blog').snapshotChanges();
  }

  addItemBlog(item: blog) {
    item.id = this.afs.createId();
    return this.afs.collection('/Blog').add(item);
  }

  deleteItemBlog(item: blog) {
    return this.afs.doc('/Blog/' + item.id).delete();
  }

  updateItemBlog(item: blog) {
    return this.afs.doc('/Blog/' + item.id).update(item);
  }

  requestAddItem(item: Item) {
    item.id = this.afs.createId();
    return this.afs.collection('/Requirement').add(item);
  }

  requestUpdateItem(item: Item) {
    return this.afs.doc('/Requirement' + item.id).update(item);
  }

  getAllRequest() {
    return this.afs.collection('/Requirement').snapshotChanges();
  }
  deleteRequestItem(item: Item) {
    return this.afs.doc('/Requirement/' + item.id).delete();
  }

  requestAddIngredient(item: ingredient) {
    item.id = this.afs.createId();
    return this.afs.collection('/Requirement').add(item);
  }

  requestUpdateIngredient(item: ingredient) {
    return this.afs.doc('/Requirement' + item.id).update(item);
  }

  deleteRequestIngredient(item: ingredient) {
    return this.afs.doc('/Requirement/' + item.id).delete();
  }

  requestAddBlog(item: blog) {
    item.id = this.afs.createId();
    return this.afs.collection('/Requirement').add(item);
  }

  requestUpdateBlog(item: blog) {
    return this.afs.doc('/Requirement' + item.id).update(item);
  }

  deleteRequestBlog(item: blog) {
    return this.afs.doc('/Requirement/' + item.id).delete();
  }

  getItemsByIds(itemIds: string[]): Observable<any[]> {
    return this.afs.collection('Items', ref => ref.where('id', 'in', itemIds)).valueChanges();
  }
}
