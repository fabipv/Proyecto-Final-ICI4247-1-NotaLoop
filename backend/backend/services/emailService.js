// backend/services/emailService.js (Versión para CommonJS)

const { Resend } = require('resend');
// No es necesario 'dotenv.config()' aquí porque ya se carga en app.js

// Inicializa el cliente de Resend con tu API Key.
// La clave API se obtiene de process.env porque dotenv ya la cargó.
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Función para enviar un correo electrónico de recuperación de contraseña.
 * @param {string} userEmail - La dirección de correo electrónico del usuario.
 * @param {string} recoveryLink - El enlace único para restablecer la contraseña.
 * @returns {Promise<{success: boolean, message: string}>} - Objeto indicando el éxito o fracaso.
 */
async function sendRecoveryEmail(userEmail, recoveryLink) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'TuAppName <onboarding@resend.dev>', // REMPLAZA si tienes un dominio verificado en Resend (ej. 'TuAppName <noreply@tudominio.com>')
            to: [userEmail], // El destinatario del correo
            subject: 'Recuperación de Contraseña para TuAppName', // Asunto del correo
            html: `
                <h1>Hola,</h1>
                <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
                <p>Haz clic en el siguiente enlace para restablecerla:</p>
                <p><a href="${recoveryLink}">${recoveryLink}</a></p>
                <p>Si no solicitaste esto, ignora este correo.</p>
                <p>Este enlace expirará en 1 hora.</p>
            `, // Contenido HTML del correo
        });

        if (error) {
            console.error('Error al enviar el correo con Resend:', error);
            // Puedes loguear detalles adicionales si la API de Resend los proporciona
            // console.error('Detalles del error de Resend:', error.message, error.name, error.statusCode);
            return { success: false, message: 'Error al enviar el correo de recuperación.' };
        }

        console.log('Correo de recuperación enviado exitosamente por Resend:', data);
        return { success: true, message: 'Correo de recuperación enviado exitosamente.' };

    } catch (err) {
        console.error('Excepción inesperada al enviar el correo:', err);
        return { success: false, message: 'Ocurrió un error inesperado al intentar enviar el correo.' };
    }
}

// Exporta la función para que pueda ser importada y usada en otros módulos
module.exports = { sendRecoveryEmail };