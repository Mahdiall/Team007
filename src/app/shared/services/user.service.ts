import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AppUser} from '../models/app-user';




@Injectable()
export class UserService {
  constructor(private afs: AngularFirestore) {
  }

  save(user: firebase.User) {
    const afsUser = this.afs.doc<AppUser>('users/' + user.uid);

    let appUser: AppUser;
    appUser = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL
    };
    return afsUser.update(appUser).catch(() => afsUser.set(appUser));
  }



  get(uid: string): Observable<AppUser> {
    //return this.afs.collection('users').doc(uid).valueChanges();

    return this.afs.doc<AppUser>('users/' + uid).valueChanges();

    //   return afsUser.valueChanges();
  }

}
