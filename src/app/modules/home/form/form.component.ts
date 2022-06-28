import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { ProductService } from 'src/app/services/product/product.service';
import { TAMANHOS_PIZZAS } from 'src/app/config/constants';
import { UserService } from 'src/app/services/user/user.service';
import { getInputError, maxLength, minLength, required } from 'src/app/utils/Validators';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormCompoment implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  tamanhosProduto: any[] = TAMANHOS_PIZZAS;
  productId = 0;
  isView = false;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private notifications: NotificationsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.form = this.formBuilder.group({
      nome: ['', [required, minLength(12), maxLength(50)]],
      descricao: ['', [required]],
      valor: ['', [required]],
      tamanho: ['', [required]],
      qtdFatias: ['', [required]]
    });

    if(id) {
      this.productId = id;
      this.isView = this.activatedRoute.snapshot.url[1].path === 'visualizar';
      this.getScheduleById(id);
    }
  }

  register() {
    if (this.form.valid) {
      const product = this.form.getRawValue();
      this.isLoading = true;

      if(this.productId){
        this.productService.updateProduct(this.productId, product).subscribe({
          next: (v) => {
            this.notifications.notify({ message: 'Produto alterado com sucesso', type: 'success' });
            this.router.navigate(['/home']);
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
      } else {

        this.productService.saveProduct(product).subscribe({
          next: (v) => {
            this.notifications.notify({ message: 'Produto criado com sucesso', type: 'success' });
            this.router.navigate(['/home']);
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

    this.formSubmitted = true;
  }

  private getScheduleById(id: number) {
    this.isLoading = true;

    this.productService.getById(this.productId).subscribe({
      next: (product: any) => {
        this.form = this.formBuilder.group({
          nome: [product.nome, [required]],
          descricao: [product.descricao, [required]],
          valor: [product.valor, [required]],
          tamanho: [product.tamanho, [required]],
          qtdFatias: [product.qtdFatias, [required]]
        });
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
    })
  }

  getErrors(name: string, label = name) {
    return getInputError(this.formSubmitted, this.form.get(name), label);
  }

  goBack() {
    this.router.navigate(['/home']);
    return false;
  }
}
