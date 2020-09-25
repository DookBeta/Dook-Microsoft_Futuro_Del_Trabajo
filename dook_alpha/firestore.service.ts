// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {


  constructor(
    private firestore: AngularFirestore
  ) { }

  create_user(collectionName,record) {
    return this.firestore.collection(collectionName).add(record);
  }

  read_users(collectionName) {
    return this.firestore.collection(collectionName).snapshotChanges();
  }
  get_users(user_id) {
      return this.firestore.collection('users',ref=>ref.where("uid", "==", user_id)).snapshotChanges();
    }
  get_userDetails(user_id){
    return this.firestore.doc('users/'+user_id).valueChanges();
  }

  read_userDetails(user_id){
    return this.firestore.doc('users/'+user_id).get();
  }

  get_offers(){
    return this.firestore.collection('offer').snapshotChanges();
  }

  filter_offer_by(type:string){
    return this.firestore.collection('offer',ref=> ref.where("aofi", "==", type)).snapshotChanges();
  }

  update_user(collectionName,user_id, record) {
    this.firestore.doc(collectionName + '/' + user_id).update(record);
  }

  delete_user(collectionName,user_id) {
    this.firestore.doc(collectionName + '/' + user_id).delete();
  }

  add_favorite(user_id:string, record:string) {
    this.firestore.doc('users/' + user_id).update({
      favorites: firebase.firestore.FieldValue.arrayUnion(record) // -> esto actualiza arrays sin duplciar
    });
  }
  add_userDetails(user_id, record_name, record){
    this.firestore.doc('users' + '/' + user_id).update({
      [record_name]: firebase.firestore.FieldValue.arrayUnion(record) // -> esto actualiza arrays sin duplciar
    });
  }

  update_userDetails(user_id, record_name,record){
    this.firestore.doc('users' + '/' + user_id).update({
      [record_name]: firebase.firestore.FieldValue.arrayRemove(record) 
    });
  }


  update_userData(user_id,record){
    this.firestore.doc('users/'+user_id).update(record)
  }


  remove_favorite(user_id:string, record:string) {
    this.firestore.doc('users' + '/' + user_id).update({
      favorites: firebase.firestore.FieldValue.arrayRemove(record) // -> esto borra valor del array favoritos
    });
  }


}
