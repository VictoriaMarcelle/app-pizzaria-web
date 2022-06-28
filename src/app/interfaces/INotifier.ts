export default interface INotifier {
  message: string;
  type: 'success' | 'warning' | 'error' | 'default' | 'info';
}
