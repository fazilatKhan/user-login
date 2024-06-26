import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports:[FormsModule,CommonModule,RouterModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
  createForm!: FormGroup;
errorMessage!: string;
id:any=0;

  
constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private router: Router,
  private route:ActivatedRoute

) {
  this.createForms();
}

ngOnInit():void{
  this.id = this.route.snapshot.params['id'];
  if (this.id) {
   
    this.authService.getUser(this.id).subscribe(
      data => {
        this.createForm.patchValue(data.data);

      },
      error => {
        console.error('Error fetching student', error);
      }
    );
  }
}
createForms() {
  this.createForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

// register(){
//   if(!this.id){
//     const { username, password } = this.createForm.value; // Extract username and password from form

//     this.authService.register(username, password).subscribe(
//       (response) => {
//         console.log('Registe successful:', response);
//         Swal.fire({
//           icon: 'success',
//           title: 'Registration  Successful!'
//         }).then(() => {
//          // Correct navigation to user-list
//   this.router.navigate(['user-list']);
//         });
//       },
//       (error) => {
//         // Error handling
//         console.error('Login error:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Registration  Failed'
//         });
//       }
//     );
//   }
  
// }

register(): void {
  const { username, password } = this.createForm.value;

  if (this.id==0 ||this.id==undefined) {
    // Register new user
    this.authService.register(username, password).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!'
        }).then(() => {
          this.router.navigate(['user-list']);
        });
      },
      (error) => {
        console.error('Registration error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed'
        });
      }
    );
  } else {
   // Update existing user
   this.authService.updateUser(this.id, username, password).subscribe(
    (response) => {
      console.log('Update successful:', response);
      Swal.fire({
        icon: 'success',
        title: 'Update Successful!'
      }).then(() => {
        this.router.navigate(['user-list']);
      });
    },
    (error) => {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed'
      });
    }
  );
}
}
  userId(userId: any, username: any, password: any) {
    throw new Error('Method not implemented.');
  }
}


