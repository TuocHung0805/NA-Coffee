import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-dashboard-agency',
  templateUrl: './dashboard-agency.component.html',
  styleUrls: ['./dashboard-agency.component.css']
})
export class DashboardAgencyComponent implements OnInit{
  orders: any[] = [];
  p: number = 1;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrdersHistory();
  }

  status = false;
  addToggle() {
    this.status = !this.status;
  }

  newOrdersCount: number = 0;
  totalSales: number = 0;


  convertTimestampToDate(timestamp: any): Date {
    // Kiểm tra nếu timestamp là đối tượng Timestamp của Firestore
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate();
    }
    return new Date(); // Trả về một giá trị ngày mặc định nếu không thể chuyển đổi
  }


  getOrdersHistory() {
    // Gọi phương thức "getAllOrdersSortedByDate()" trong "OrderService" để lấy lịch sử đơn hàng đã sắp xếp theo ngày tạo
    this.orderService.getAllOrdersSortedByDate().subscribe((data) => {
      this.orders = data.map((order) => order.payload.doc.data());

      // Tính số đơn hàng và tổng doanh thu trong ngày
      const today = new Date();
      this.newOrdersCount = this.orders.filter((order) => {
        const orderDate = order.orderTime.toDate();
        const branchValue = order.payload.doc.data()?.branch;
        return orderDate.getDate() === today.getDate() &&
               orderDate.getMonth() === today.getMonth() &&
               orderDate.getFullYear() === today.getFullYear() &&
               branchValue === 'Q1';

      }).length;

      this.totalSales = this.orders
        .filter((order) => {
          const orderDate = order.orderTime.toDate();
          const branchValue = order.payload.doc.data()?.branch;
          return orderDate.getDate() === today.getDate() &&
                 orderDate.getMonth() === today.getMonth() &&
                 orderDate.getFullYear() === today.getFullYear() &&
                 branchValue === 'Q1';
        })
        .reduce((acc, order) => acc + order.total, 0);
    });
  }






}
