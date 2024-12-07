document.addEventListener("astro:page-load", function () {
    const form = document.getElementById('contact-form');
    if (form) {
        const btn = document.getElementById('button');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validación básica del formulario
        const name = form.elements['from_name'].value.trim();
        const email = form.elements['email_id'].value.trim();
        const message = form.elements['message'].value.trim();

        if (!name || !email || !message) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        btn.textContent = 'Enviando...';

        email.sendForm('default_service', 'template_us2ety4', this)
            .then(() => {
                btn.textContent = 'Enviar';
                alert('¡Correo enviado con éxito!');
                form.reset();
            }, (err) => {
                btn.textContent = 'Enviar';
                handleError(err);
            });
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleError(err) {
        let errorMessage = 'Ha ocurrido un error al enviar el correo. ';

        if (err.status === 400) {
            errorMessage += 'Por favor, verifique los datos ingresados.';
        } else if (err.status === 500) {
            errorMessage += 'Problema con el servidor. Intente más tarde.';
        } else {
            errorMessage += 'Por favor, inténtelo de nuevo.';
        }

        alert(errorMessage);
        console.error('Error detallado:', JSON.stringify(err));
    }
}
});