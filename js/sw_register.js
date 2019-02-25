// Check if Service Workers are supported by the browser first
if(navigator.serviceWorker) {
    // First step: RGISTER Service Workers when the widow loads
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('../sw_cached_app.js')
        .then(registerObj => console.log(registerObj))
        .catch(errObj => console.log(errObj));
    });
}
