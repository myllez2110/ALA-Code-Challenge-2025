import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, UserInsert, UserUpdate } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/UserService';
import { SnackBar } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent {
  user: any = {
    name: '',
    email: '',
    password: '',
    role: 'user'
  };
  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private snackBar: SnackBar
  ) {
    if (data) {
      this.user = { ...data };
      this.isEdit = true;
    }
  }

  onSubmit() {
    if (this.isEdit) {
      const updateUser: UserUpdate = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role
      };
      this.userService.UpdateById(updateUser).subscribe({
        next: () => {
          this.snackBar.open('User updated successfully', false);
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Error updating user', true);
          console.error(error);
        }
      });
    } else {
      const newUser: UserInsert = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        role: this.user.role
      };
      this.userService.Insert(newUser).subscribe({
        next: () => {
          this.snackBar.open('User created successfully', false);
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Error creating user', true);
          console.error(error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}