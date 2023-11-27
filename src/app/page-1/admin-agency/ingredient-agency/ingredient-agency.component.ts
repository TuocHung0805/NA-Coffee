import { ingredient } from 'src/app/service/ingredient';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient-agency.component.html',
  styleUrls: ['./ingredient-agency.component.css']
})
export class IngredientAgencyComponent implements OnInit {
  ItemList: ingredient[] = [];
  ItemObj: ingredient = {
    id: '',
    name: '',
    nameLowercase: '',
    quantity: 0,
    importDate: '',
    origin: '',
    exp: '',
    ml: '',
    branch:'Q1'
  };
  id: string = '';
  ItemName: string = '';
  ItemQuantity: number = 0;
  ItemImportDate: string ='';
  ItemOrigin: string = '';
  ItemExp: string = '';
  ItemMl: string ='';
  RequestList: any[] = [];

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
    this.getAllRequest();
  }

  getAllItem() {
    this.data.getAllItemIngredient().subscribe(
      (res) => {
        this.ItemList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          return data;
        });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
      }
    );
  }

  getAllRequest() {
    this.data.getAllRequest().subscribe(
      (res) => {
        this.RequestList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
  
  
          return data;
        }).filter((item: any) => item.RType === 'ingredient'); // Filter based on RType
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
      }
    );
  }

  resetForm() {
    this.id = '';
    this.ItemName = '';
    this.ItemQuantity = 0;
    this.ItemOrigin = '';
    this.ItemExp  = '';
    this.ItemMl = '';
  }


  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {

      duration: 3000 , // Thời gian hiển thị toast message (đơn vị: milliseconds)

      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  selectedItem: ingredient | null = null;

  selectItem(item: ingredient) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;

    this.ItemOrigin = item.origin;
    this.ItemExp = item.exp;

    this.ItemQuantity = item.quantity;
    this.ItemImportDate = item.importDate;
    // Đặt các thuộc tính khác ở đây
  }

  RequestAddItem(){
    if (

      this.ItemName === '' ||
      this.ItemQuantity === 0
    ) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.quantity = this.ItemQuantity;
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.importDate = this.ItemImportDate;
    this.ItemObj.branch = 'Q1'
    this.ItemObj.RType = 'ingredient'

    this.data.requestAddIngredient(this.ItemObj);
    this.showSuccessToast('Yêu cầu nguyên liệu thành công');
    this.resetForm();
    this.selectedItem = null;
  }

  RequestModItem(){
    if (

      this.ItemName === '' ||
      this.ItemQuantity === 0
    ) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    // Đảm bảo ItemObj có ID của nguyên liệu cần cập nhật
    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID nguyên liệu cần cập nhật');

      return;
    }

    // Cập nhật ItemObj với dữ liệu hiện tại từ form
    this.ItemObj.name = this.ItemName;
    this.ItemObj.quantity = this.ItemQuantity;
    this.ItemObj.nameLowercase = this.ItemName.toLowerCase();
    this.ItemObj.importDate = this.ItemImportDate;
    this.ItemObj.branch = 'Q1'

    // Gọi phương thức updateItem() từ DataService
    this.data
      .requestUpdateIngredient(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật yêu cầu nguyên liệu thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật sản phẩm: ' + error);
      });
    this.selectedItem = null;
  }

  deleteRequest(item: ingredient) {
    if (window.confirm('Bấm xác nhận để xoá công thức: ' + item.name + '?')) {
      this.data
        .deleteRequestIngredient(item)
        .then(() => {
          this.showSuccessToast('Xoá công thức thành công')
          this.resetForm();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá công thức: ' + error);
        });
    }
  }
}
