import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { isAvailable, date, time, food, movie, excitement } = req.body;

      // Configura el transporte de nodemailer con las variables de entorno
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,  // Obtiene el correo desde las variables de entorno
          pass: process.env.EMAIL_PASS,  // Obtiene la contraseña desde las variables de entorno
        },
      });

      // Configura el correo
      const mailOptions = {
        from: process.env.EMAIL_USER,  // El correo desde el que se enviará
        to: 'Keenscy10@gmail.com', // El correo al que deseas enviar los resultados
        subject: 'Resultados de la Propuesta de Cita',
        text: `
          ¡Aquí están los resultados!

          Disponibilidad: ${isAvailable ? 'Sí' : 'No'}
          Fecha: ${date}
          Hora: ${time}
          Comida seleccionada: ${food.join(', ')}
          Película: ${movie}
          Nivel de emoción: ${excitement}/100
        `,
      };

      // Enviar el correo
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: '¡Resultados enviados con éxito!' });

    } catch (error: unknown) {  // Usamos 'unknown' para el tipo de error
      // Verificamos si el error es una instancia de 'Error'
      if (error instanceof Error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({
          message: 'Hubo un error al enviar los resultados.',
          error: error.message,  // Muestra el mensaje detallado del error
        });
      } else {
        // Si no es un error de tipo Error, lo manejamos aquí
        console.error('Error desconocido:', error);
        return res.status(500).json({ message: 'Hubo un error al enviar los resultados.' });
      }
    }
  } else {
    // Si el método no es POST
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
