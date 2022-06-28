import { NotifierOptions } from "angular-notifier";

export const NOTIFIER_CONFIG: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 24
    },
    vertical: {
      position: 'top',
      distance: 24
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true
  }
};

export const JWT_LOCAL_STORAGE = 'Pizzaria@Jwt';
export const USER_LOCAL_STORAGE = 'Pizzaria@Me';

export const TAMANHOS_PIZZAS = [
  { label: 'Pequena', value: 'PEQUENA' },
  { label: 'Média', value: 'MEDIA' },
  { label: 'Grande', value: 'GRANDE' },
  { label: 'Família', value: 'FAMILIA' }
];
