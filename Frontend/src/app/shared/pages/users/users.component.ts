import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/UserService';
import { UserDialogComponent } from '../../dialogs/user/user-dialog.component';
import { SnackBar } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: SnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.GetList().subscribe({
      next: (users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.snackBar.open('Error loading users', true);
        console.error(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.DeleteById(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted successfully', false);
          this.loadUsers();
        },
        error: (error) => {
          this.snackBar.open('Error deleting user', true);
          console.error(error);
        }
      });
    }
  }
}