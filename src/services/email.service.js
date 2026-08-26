// src/services/email.service.js
const { Resend } = require('resend');
require('dotenv').config();

// Inicializamos Resend con tu variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

const sendRecoveryEmail = async (toEmail, newPassword, nombuser) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'GestApp <no-reply@macrocorpsystem.com>', 
            to: [toEmail],
            subject: '🔑 Recuperación de Contraseña - GestApp 👶🍼',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #FFF0F2; margin: 0; padding: 20px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 15px rgba(233, 30, 99, 0.1);">
                    <tr>
                        <td align="center" style="background-color: #85268D; padding: 30px 20px;">
                            <!-- Usamos tu URL pública para que el correo sea ultra liviano y Gmail no lo corte -->
                            <img src="https://macrocorpsystem.com/logogestanew.png" alt="GestApp Logo" width="100" style="display: block; border-radius: 50%; border: 4px solid #FFFFFF;">
                            <h1 style="color: #FFFFFF; margin: 15px 0 0 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">GestApp</h1>
                            <p style="color: #FFD6E7; margin: 5px 0 0 0; font-size: 14px;">Tomando el hierro que necesitas refuerzas el amor a tu bebe.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px 30px; text-align: center;">
                            <h2 style="color: #78284A; font-size: 22px; margin-bottom: 20px;">¡Hola ${nombuser}, futura mamá!</h2>
                            <p style="color: #501A31; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                Hemos recibido una solicitud para recuperar tu contraseña. Aquí tienes tu nueva clave temporal de 4 dígitos:
                            </p>
                            <div style="background-color: #FFF0F5; border: 2px dashed #85268D; border-radius: 15px; padding: 20px; margin: 0 auto; width: 60%;">
                                <span style="font-size: 36px; font-weight: bold; color: #85268D; letter-spacing: 8px;">
                                    ${newPassword}
                                </span>
                            </div>
                            <p style="color: #8C7A87; font-size: 14px; margin-top: 30px; line-height: 1.5;">
                                Usa esta contraseña para iniciar sesión en la aplicación. Si tú no solicitaste este cambio, por favor ignora este correo.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #FAFAFA; padding: 20px; border-top: 1px solid #EEEEEE;">
                            <p style="color: #A0AEC0; font-size: 12px; margin: 0;">
                                © ${new Date().getFullYear()} GestApp. Todos los derechos reservados.<br>
                            </p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `
        });

        // SI RESEND DETECTA UN ERROR (EJ: DOMINIO NO VALIDO O LIMITE ALCANZADO), ESTO LO HACE VISIBLE
        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
};

module.exports = { sendRecoveryEmail };