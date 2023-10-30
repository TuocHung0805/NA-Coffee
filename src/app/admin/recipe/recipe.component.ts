import { recipe } from 'src/app/service/recipe';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  today = new Date();
  ItemList: recipe[] = [];
  ItemObj: recipe = {
    id: '',
    name: '',
    ingredients: [],
    instructions:''
  };
  id: string = '';
  ItemName: string = '';
  ItemIngredient: { id: number, value: string }[] = [];;
  ItemInstructions:string ='';
  inputItems: number[] =[];

  constructor(private router: Router, private auth: AuthService, private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getAllItem();
  }
  getAllItem() {
    this.data.getAllItemRecipe().subscribe(
      (res) => {
        this.ItemList = res.map((e: any) => {
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
  resetForm() {
    this.id  = '';
    this.ItemName  = '';
    this.ItemIngredient =[];
    this.ItemInstructions ='';
  }

  addItem() {
    if (this.ItemName === '' || this.ItemInstructions === '' || this.ItemIngredient.length == 0) {
      alert('Điền đầy đủ thông tin và giá trị hợp lệ');
      return;
    }

    // Kiểm tra xem mảng ItemIngredient có chứa chuỗi rỗng không
    for (const ingredient of this.ItemIngredient) {
      if (ingredient.value === '') {
        alert('Mảng nguyên liệu không được chứa giá trị rỗng');
        return;
      }
    }

    this.ItemObj.name = this.ItemName;
    this.ItemObj.ingredients = this.ItemIngredient;
    this.ItemObj.instructions = this.ItemInstructions;

    // Đặt các thuộc tính khác ở đây

    this.data.addItemRecipe(this.ItemObj);
    this.showSuccessToast('Thêm công thức thành công');
    this.resetForm();
    this.selectedItem = null;
  }



  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000, // Thời gian hiển thị toast message (đơn vị: milliseconds)
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success']
    });
  }

  selectedItem: recipe | null = null;
  selectItem(item: recipe) {
    this.selectedItem = item;
    this.id = item.id;
    this.ItemObj = { ...item }; // Sao chép thuộc tính của sản phẩm để cập nhật
    this.ItemName = item.name;
    this.ItemIngredient = item.ingredients;
    this.ItemInstructions = item.instructions;
    // Đặt các thuộc tính khác ở đây
  }

  deleteItem(item: recipe) {
    if (window.confirm('Bấm xác nhận để xoá mã khuyến mãi: ' + item.id + '?')) {
      this.data
        .deleteItemRecipe(item)
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

  updateItem() {
    if (
      this.ItemName == ''||
      this.ItemIngredient.length == 0||
      this.ItemInstructions == ''
    ) {
      alert('Điền đầy đủ thông tin');
      return;
    }

    // Đảm bảo ItemObj có ID của sản phẩm cần cập nhật
    if (!this.ItemObj.id) {
      alert('Không tìm thấy ID sản phẩm cần cập nhật');
      return;
    }

    // Cập nhật ItemObj với dữ liệu hiện tại từ form
    this.ItemObj.name = this.ItemName;
    this.ItemObj.ingredients = this.ItemIngredient;
    this.ItemObj.instructions = this.ItemInstructions;

    // Gọi phương thức updateItem() từ DataService
    this.data
      .updateItemRecipe(this.ItemObj)
      .then(() => {
        this.showSuccessToast('Cập nhật công thức thành công');
        this.resetForm();
      })
      .catch((error) => {
        alert('Lỗi khi cập nhật sản phẩm: ' + error);
      });
    this.selectedItem = null;
  }

  addInput() {
    const newId = this.inputItems.length + 1; // Tạo một khóa duy nhất cho dòng mới
    this.inputItems.push(newId);
    this.ItemIngredient.push({ id: newId, value: '' });
  }
  removeInput(index: number) {
    this.ItemIngredient.splice(index, 1);
  }
}
