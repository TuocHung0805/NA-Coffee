import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Item } from 'src/app/service/item';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-mod-item',
  templateUrl: './mod-agency.component.html',
  styleUrls: ['./mod-agency.component.css'],
})
export class ModAgencyComponent implements OnInit {
  ItemList: Item[] = [];
  RequestList: any[] = [];
  ItemObj: Item = {
    id: '',
    image: '',
    name: '',
    type: '',
    price: 0,
    quantity: 0,
    branch: '',
    description: '',
  };
  id: string = '';
  ItemImage: string = '';
  ItemName: string = '';
  ItemQuantity: number = 0;
  ItemPrice: number = 0;
  ItemType: string = '';
  ItemBranch: string = 'Q1';
  ItemDescription: string = '';
  agencies: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private data: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllItem();
    this.getAllRequest();
  }

  getAllItem() {
    this.data.getAllItem().subscribe(
      (res: any[]) => {
        this.ItemList = res
          .filter((e: any) => {
            const branchValue = e.payload.doc.data()?.branch; // Kiểm tra thông qua data()
            return branchValue === 'Q1';
          })
          .map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            data.branch = e.payload.doc.data()?.branch;
            return data;
          });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu sản phẩm');
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
        }).filter((item: any) => item.RType === 'item'); // Filter based on RType
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
      }
    );
  }


  resetFormAgency() {
    this.id = '';
    this.ItemName = '';
    this.ItemQuantity = 0;
    this.ItemPrice = 0;
    this.ItemType = '';
    this.ItemImage = '';
  }

  viewItemDetails(item: any) {
    // Chuyển đến trang chi tiết với id của mục
    this.router.navigate(['', item.uid]);
  }

  RequestAddItem(){
    if (
      this.ItemName === '' ||
      this.ItemPrice === 0 ||
      this.ItemType === '' ||
      this.ItemQuantity === 0||
      this.ItemImage === '' ||
      (this.ItemBranch === '')
    ) {
      alert('Điền đầy đủ thông tin');
      return;
    }
  
    this.ItemObj.name = this.ItemName;
    this.ItemObj.type = this.ItemType;
    this.ItemObj.quantity = this.ItemQuantity;
    this.ItemObj.price = this.ItemPrice;
    this.ItemObj.image = this.ItemImage;
    this.ItemObj.RType = 'item';
  

    this.ItemObj.branch = 'Q1';
  
    if (this.ItemType !== 'Cà phê') {
      if (isNaN(this.ItemObj.quantity)) {
        alert('Lỗi thêm sản phẩm')
        return;
      }
    }
  
    if (isNaN(this.ItemObj.price)) {
      alert('Lỗi thêm sản phẩm');
      return;
    }
  
    this.data.requestAddItem(this.ItemObj);
    this.showSuccessToast('Thêm sản phẩm thành công');
    this.resetFormAgency();
    this.selectedItem = null;
  }

  RequestModItem(){
    if (
      this.ItemName === '' ||
      this.ItemPrice === 0 ||
      this.ItemType === '' ||
      this.ItemQuantity === 0||
      this.ItemImage === '' ||
      (this.ItemBranch === '')
    ) {
      alert('Điền đầy đủ thông tin');
      return;
    }
  

    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID sản phẩm cần cập nhật');
      return;
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.type = this.ItemType;
    this.ItemObj.quantity = this.ItemQuantity;
    this.ItemObj.price = this.ItemPrice;
    this.ItemObj.image = this.ItemImage;
    this.ItemObj.RType = 'item';
  

    this.ItemObj.branch = 'Q1';

    this.data
      .requestUpdateItem(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật sản phẩm thành công');
        this.resetFormAgency();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật sản phẩm: ' + error);
      });
  
    this.selectedItem = null;
  }

  deleteRequest(item: Item) {
    if (window.confirm('Bấm xác nhận để xoá sản phẩm: ' + item.name + '?')) {
      this.data
        .deleteRequestItem(item)
        .then(() => {
          this.showSuccessToast('Xoá sản phẩm thành công');
          this.resetFormAgency();
          this.selectedItem = null;
        })
        .catch((error) => {
          alert('Lỗi khi xoá sản phẩm: ' + error);
        });
    }
  }

  selectedItem: Item | null = null;
  selectItem(item: Item) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;
    this.ItemType = item.type;
    this.ItemQuantity = item.quantity;
    this.ItemPrice = item.price;
    this.ItemImage = item.image;
    this.ItemBranch = item.branch;
    this.ItemDescription = item.description;
  }

  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success'],
    });
  }
}
