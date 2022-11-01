export const isEmpty = value => value.trim().length === 0;

export function showAlert(){
    const alert = document.querySelector('.erro-alert');
    alert.style.display = 'block';
    setTimeout(() => alert.remove(), 2000);
}
