import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) {}

  posts: any;
  ngOnInit() {
    this.postService
      .getPosts()
      .then((response: any) => {
        console.log(response);
        this.posts = response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async addPost() {

    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps: {},
    });

    return await modal.present();

  }

}
