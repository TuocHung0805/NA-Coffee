import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item, Comment } from 'src/app/service/item';
import { CartService } from 'src/app/service/cart.service';
import { user } from 'src/app/service/user';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit{
  item: Item | undefined;
  items: any[]=[];
  newComment: Comment = { id: '', username: '', text: '' }; // Dùng để lưu trữ bình luận mới
  user: user | null = null; // Biến để lưu trữ thông tin người dùng đăng nhập
  isLoggedIn: boolean = false;
  selectedColor: string | null = null; // Màu sản phẩm được chọn
  thumbnailImages: { image: string; id: string }[] = [];
  showFullContent: boolean = false;

  constructor(private router: Router,private afs: AngularFirestore, private route: ActivatedRoute, private cartService: CartService, private authService: AuthService, private data: DataService){}

  ngOnInit(): void {
    // Lấy thông tin sản phẩm từ tham số URL
    this.route.paramMap.subscribe((params) => {
      const itemId = params.get('id')!;

      this.afs
        .collection('Items')
        .doc<Item>(itemId)
        .valueChanges()
        .subscribe((item) => {
          console.log(item);

          this.item = item;
          this.selectedColor = null;

          // Sau khi nhận thông tin sản phẩm, thực hiện truy vấn Firestore để tìm các sản phẩm cùng tên
          if (this.item) {
            this.afs
              .collection('Items', (ref) => ref.where('name', '==', this.item?.name))
              .get()
              .subscribe((querySnapshot) => {
                // Duyệt qua các sản phẩm tìm thấy để lấy hình ảnh và ID và lưu vào mảng thumbnailImages
                const thumbnailImages: { image: string; id: string }[] = [];
                querySnapshot.forEach((doc) => {
                  const product = doc.data() as Item;
                  // Kiểm tra ID của sản phẩm để không lấy hình thumbnail của sản phẩm chính
                  if (product.id !== this.item?.id) {
                    thumbnailImages.push({ image: product.image, id: product.id });
                  }
                });
                // Gán mảng thumbnailImages vào biến thumbnailImages của component
                this.thumbnailImages = thumbnailImages;
              });
          }
        });

        // Sử dụng doc để truy cập vào tài liệu trong collection "Items" dựa trên itemId
    this.afs
    .collection('Items')
    .doc(itemId)
    .valueChanges()
    .subscribe((item) => {
      if (item) {
        console.log(item);

        // Xử lý dữ liệu item ở đây
      } else {
        console.log("Không tìm thấy sản phẩm với ID:", itemId);
      }
    });
    });

    this.authService.afAuth.authState.subscribe((user: any) => {
      this.user = user;
      this.isLoggedIn = this.authService.isLoggedIn;
      // Nếu người dùng đã đăng nhập và có thông tin người dùng, gán displayName vào ô tên bình luận một cách tự động
      if (this.isLoggedIn && this.user) {
        this.authService.getNameFromFirestore(this.user.uid).subscribe(
          (displayName: string) => {
            // Gán displayName vào ô tên bình luận, nếu không có thì để giá trị mặc định ''
            this.newComment.username = displayName || '';
          },
          (error) => {
            console.log('Lỗi khi lấy thông tin người dùng từ Firestore: ', error);
            // Xử lý lỗi nếu cần thiết
          }
        );
      }
    });
    this.getAllItemRandom(3);
  }

  
  getAllItemRandom(count: number) {
    this.data.getAllItem().subscribe(
      (res) => {
        const allItems = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
  
        // Sắp xếp mảng ngẫu nhiên và chọn số lượng cần thiết
        const shuffledItems = this.shuffleArray(allItems);
        this.items = shuffledItems.slice(0, count);
      },
      (err) => {
        alert('Lỗi khi xử lý dữ liệu nguyên liệu');
      }
    );
  }
  
  // Hàm sắp xếp mảng ngẫu nhiên
  private shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  toggleContent() {
    this.showFullContent = !this.showFullContent;
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  submitComment() {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (this.isLoggedIn && this.user) {
      // Kiểm tra nếu tên và nội dung bình luận không rỗng thì mới thêm vào mảng bình luận của sản phẩm
      if (
        this.newComment.text.trim() !== ''
      ) {
        if (!this.item?.comments) {
          this.item!.comments = [];
        }
        // Tạo đối tượng bình luận mới và thêm vào mảng
        const comment = {
          id: this.generateCommentId(),
          username: this.newComment.username,
          text: this.newComment.text,
        };
        this.item!.comments!.push(comment);
        // Lưu thông tin sản phẩm với bình luận mới vào Firestore
        this.afs
          .collection('Items')
          .doc(this.item!.id)
          .update(this.item!)
          .then(() => {
            // Xóa nội dung bình luận mới sau khi đã thêm vào
            this.newComment = { id: '', username: '', text: '' };
          })
          .catch(() => {
            alert('Lỗi khi comment: ');
          });
      } else {
        // Hiển thị thông báo yêu cầu nhập đầy đủ thông tin bình luận
        alert('Nhập nội dung bình luận');
      }
    } else {
      // Hiển thị thông báo yêu cầu đăng nhập nếu người dùng chưa đăng nhập
      alert('Yêu cầu đăng nhập để bình luận');
    }
  }

  // Hàm tạo mã duy nhất cho bình luận
  generateCommentId(): string {
    // Đoạn mã tạo mã duy nhất có thể thay đổi tùy theo yêu cầu của bạn
    // Ví dụ: sử dụng thư viện UUID để tạo mã duy nhất
    return 'comment_' + new Date().getTime().toString();
  }

  goToItemDetail(product: Item) {
    this.router.navigate(['/detail', product.id]);
    this.getAllItemRandom(5);
  }
}

