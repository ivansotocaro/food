import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private postService: PostService) {}

  posts: any;
  ngOnInit() {

    this.postService.getPosts()
    .then((response: any) => {
      console.log(response);
      this.posts =  response
    }).catch((error) => {
      console.log(error);
    });

  }

}
