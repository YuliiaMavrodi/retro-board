import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Column } from '../models/column.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private dbPath = '/tutorials';

  tutorialsRef: AngularFireList<Column>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Column> {
    return this.tutorialsRef;
  }

  create(tutorial: Column): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}
