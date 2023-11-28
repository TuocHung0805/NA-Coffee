import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-voucher-page',
  templateUrl: './voucher-page.component.html',
  styleUrls: ['./voucher-page.component.css']
})
export class VoucherPageComponent {
  voucherList: any[] = [];

  constructor(private data: DataService, private clipboard: Clipboard, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.getAllItem();
  }

  getAllItem() {
    this.data.getAllItemPromotion().subscribe(
      (res) => {
        this.voucherList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          return data;
        });
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu sản phẩm');
      }
    );
  }

  copy(item: any){
    this.clipboard.copy(item.id);
    this.showSuccessToast('Đã copy voucher')
  }

  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 30000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success'],
    });
  }
}
