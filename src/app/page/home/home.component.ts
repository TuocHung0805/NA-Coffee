import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Item } from 'src/app/service/item';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products$: Observable<Item[]>;
  filteredProducts$: Observable<Item[]> = of([]);
  constructor(private afs: AngularFirestore){
    this.products$ = this.afs.collection<Item>('Items').valueChanges();
  }
  ngOnInit(): void {
    this.products$ = this.afs.collection<Item>('Items').valueChanges();
    this.filteredProducts$ = this.products$;
  }
}
