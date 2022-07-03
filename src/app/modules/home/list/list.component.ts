import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { TAMANHOS_PIZZAS } from 'src/app/config/constants';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'tamanho', 'qtdFatias', 'valor', 'actions'];
  dataSource: any = [];
  isLoading = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog,
    private notifications: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.getDataSource();
  }

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

  private getDataSource() {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (e) => {
        if(e.status === 401) {
          this.userService.logout();
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });

  }

  refreshDataSource() {
    this.getDataSource();
  }

  convertToCurrency(value: number) {
    return `R$ ${value.toFixed(2)}`;
  }

  convertToSize(label: string) {
    return TAMANHOS_PIZZAS.find(v => v.value === label)?.label;
  }

  async deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (v) => {
        this.notifications.notify({ message: 'Produto excluído com sucesso', type: 'success' });
        this.getDataSource();
      },
      error: (e) => {
        if(e.status === 401) {
          this.userService.logout();
        } else {
          const message = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
          this.notifications.notify({ message: message, type: 'error' });
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
