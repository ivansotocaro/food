import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';


defineCustomElements(window);


@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
  standalone: false,
})
export class EditAccountModalPage implements OnInit {
  user: any = {};
  accuont_image: any;
  editFormAccount: FormGroup;

  formErrors = {
    name: [
      { type: 'required', message: 'El nombre es obligatoria' },
      {
        type: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres',
      },
    ],
    last_name: [
      { type: 'required', message: 'El apellido es obligatoria' },
      {
        type: 'minlength',
        message: 'El apellido debe tener al menos 3 caracteres',
      },
    ],
    image: new FormControl(''),
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private userService: UserService,
    private storage: Storage
  ) {
    this.editFormAccount = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      last_name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      image: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  async ngOnInit() {
    this.user = await this.storage.get('user');
    this.accuont_image = this.user.image;

    if (this.accuont_image) {
      this.editFormAccount.get('image')?.clearValidators();
      this.editFormAccount.get('image')?.updateValueAndValidity();
    }

  }

  async uploadPhotoAccount() {
    const uploadPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100,
    });

    this.accuont_image = uploadPhoto.dataUrl;
    this.editFormAccount.patchValue({
      image: this.accuont_image,
    });
  }

  async EditAccount(edit_data: any) {
    const { id } = await this.storage.get('user');

    const edit_params = {
      ...edit_data,
      image: this.accuont_image || edit_data.image,
      id,
    };

    this.userService
      .updateAccount(edit_params)
      .then((response: any) => {
        console.log(response);
        this.modalController.dismiss({
          null: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  closeModal() {
    this.modalController.dismiss({ null: null });
  }
}
