import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // RouterModule,
     HttpClientModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = []; // Assuming you have a User model or interface

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUser();
    // Initialize users array with mock data (replace with actual data retrieval logic)
  //   this.users = [
  //     { id: 1, username: 'user1', createdAt: '2024-06-25T07:22:55.000Z', updatedAt: '2024-06-25T07:22:55.000Z' },
  //     { id: 2, username: 'user2', createdAt: '2024-06-25T07:22:55.000Z', updatedAt: '2024-06-25T07:22:55.000Z' },
  //     // Add more users as needed
  //   ];
  }
  getAllUser(){
     this.authService.getAllUser().subscribe(
       (response:any) => {
    //     console.log(response);
    //   });

    if (response.statusCode === 200 && response.status === 'success') {
      this.users = response.data;
    } else {
      console.error('Failed to fetch user data', response.message);
    }
  }, error => {
    console.error('Error fetching user data', error);
  });
  }

  editUser(user: any): void {
    this.router.navigateByUrl(`create-user/${user.id}`)
  }

  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe(() => {
      // Assuming you want to reload the user list after deletion
      this.getAllUser();
    });
  }
  createuser(){
    this.router.navigate(['create-user']);
  }
}
