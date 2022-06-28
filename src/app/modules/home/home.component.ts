import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName = this.userService.getUserData().nome;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {  }

  confirmLogout(): void {
    this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        title: "Fazer logout?",
        message: "Deseja realmente sair?",
        onConfirm: () => {
          this.userService.logout();
          this.dialog.closeAll();
        }
      }
    });
  }
}
