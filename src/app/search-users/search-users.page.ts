import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false,
})
export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasMoreUsers: boolean = true;

  constructor(private UserService: UserService, private storage: Storage) {}

  ngOnInit() {
    this.loadUser();
  }

  async loadUser(event?: any) {

    const currentUser = await this.storage.get('user');
    const followingUser =currentUser.following_users || [];

    this.UserService.listUsers(this.page, this.limit, this.query)
      .then((response: any) => {
        console.log(response.users);
        if (response.users.length > 0) {
          const updateUser = response.users.map((user: any) => ({
              ...user,
              is_following: followingUser.some((followedUser: any) => followedUser.id = user.id)
          }))
          this.users = [...this.users, ...response.users];
          this.page++;
        } else {
          this.hasMoreUsers = false;
        }

        if (event) {
          event.target.complete();
        }
      })
      .catch((error) => {
        console.log(error);
        event.target.complete();
      });
  }

  searchUser(event?: any) {
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasMoreUsers = true;
    this.loadUser();
  }

  follow(userID: any) {
    console.log("follow" + userID)
  }

  unfollow(userID: any) {
    console.log(userID)
  }


  toggleFollow(user: any) {
    console.log(user);
    if (user.is_following) {
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }

  }


}
