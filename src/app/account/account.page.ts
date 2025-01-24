import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {

  user_data: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    followed_users: [],
    following_users: [],
  }

  constructor(private userService: UserService, private storage: Storage) {}

  async ngOnInit() {

    let {id}: any = await this.storage.get('user');
    console.log(id + ' account');
    this.userService.getUsers(id)
    .then((response: any) => {

      this.storage.set('user', response);
      this.user_data = response;
    }).catch((error) => {

      console.log(error);

    });

  }

  async takePhone() {

    const capturePhone = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    console.log(capturePhone.dataUrl);
    this.user_data.image = capturePhone.dataUrl;
    this.updateUser();
  }


  async updateUser() {

    this.userService.updateUser(this.user_data)
    .then((response: any) => {
      console.log(response);
      // this.storage.set('user', response);
      // this.user_data = response;
    }).catch((error) => {

      console.log(error);

    });

  }


}
