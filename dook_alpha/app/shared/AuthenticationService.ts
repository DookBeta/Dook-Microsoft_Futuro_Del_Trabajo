import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./users";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Storage } from '@capacitor/core';
import { FirestoreService } from '../firestore.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public user: CurrentUserService,
    private firestore: FirestoreService
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.user.setObject(user);
        //Storage.set({key:'user',value:JSON.stringify(user)})
        //localStorage.setItem('user', JSON.stringify(this.userData));
       // JSON.parse(localStorage.getItem('user'));
      } else {
        this.user.removeUser();
        this.user.setObject(null);
        //Storage.remove({key:'user'})
       // localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
 async SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  SendVerificationMail() {
    this.ngFireAuth.user.subscribe((user)=>{
      user.sendEmailVerification();
    })
      this.router.navigate(['verify-email']);
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Se ha enviado un correo con los pasos para recuperar contraseña.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  isLoggedIn(): Promise<boolean> {
    return this.user.getUser().then((res)=>{
      console.log(res);
      return (res !== null && res['emailVerified'] == true) ? true : false;
    });
  }


  // Returns true when user's email is verified
   get isEmailVerified() {
    return this.ngFireAuth.currentUser.then((res)=>{
      return res.emailVerified;
    })
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['tabs']);
        })
      this.SetLocalData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }


 async SetLocalData(user){
    // Storage.set({key:'user',value:JSON.stringify(user)});
    this.user.setObject(user);
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Store user in localStorage
  // SetUserData(user) {
    
  // }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      // Storage.remove({key:'user'});
      this.user.removeUser();
      this.router.navigate(['login']);
    })
  }

}