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
defineCustomElements(window);


@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
  standalone: false,
})
export class EditAccountModalPage implements OnInit {
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
    image: [{ type: 'required', message: 'La imagen es obligatoria' }],
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
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

  ngOnInit() {}

  EditAccount(edit_data: any){
    console.log(edit_data)
  }

  closeModal() {
    this.modalController.dismiss({ null: null });
  }
}
