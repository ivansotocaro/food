import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ModalController } from '@ionic/angular';
import { EditAccountModalPage } from '../edit-account-modal/edit-account-modal.page';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  user_data: any = {
    username: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    followed_users: [],
    following_users: [],
  };

  constructor(
    private userService: UserService,
    private storage: Storage,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    let { id }: any = await this.storage.get('user');

    this.userService
      .getUsers(id)
      .then((response: any) => {
        this.storage.set('user', response);
        this.user_data = response;
        console.log(this.user_data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async takePhone() {
    const capturePhone = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.user_data.image = capturePhone.dataUrl;
    this.updateUser();
  }

  async updateUser() {
    this.userService
      .updateUser(this.user_data)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  async editAccount(){

    const modal = await this.modalController.create({
      component: EditAccountModalPage ,
      componentProps: {},
    });

    return await modal.present();

  }

}
