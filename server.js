require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Configurar CORS - aceita múltiplos domínios
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['*'];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (Postman, curl, etc)
    if (!origin) return callback(null, true);
    
    // Se está configurado com '*', permite tudo
    if (allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // Verifica se o origin está na lista permitida
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar transporter do nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Rota de teste
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando' });
});

// Rota para enviar email
app.post('/send-email', async (req, res) => {
  try {
    const { name, companyName, cnpj, email, phone, employeeCount } = req.body;

    // Validação dos dados
    if (!name || !companyName || !cnpj || !email || !phone || !employeeCount) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Email dos destinatários (do .env)
    const recipients = process.env.EMAIL_RECIPIENTS
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    if (recipients.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Nenhum destinatário configurado'
      });
    }

    // Formato do email
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients,
      replyTo: email,
      subject: `Nova solicitação de cotação - ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #001952; border-bottom: 2px solid #001952; padding-bottom: 10px;">
            Nova Solicitação de Cotação
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #001952;">Informações da Empresa</h3>
            
            <p><strong>Nome Completo:</strong> ${name}</p>
            <p><strong>Nome da Empresa:</strong> ${companyName}</p>
            <p><strong>CNPJ:</strong> ${cnpj}</p>
            <p><strong>Email para Contato:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefone:</strong> ${phone}</p>
            <p><strong>Quantidade de Funcionários:</strong> ${employeeCount}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>Este email foi enviado automaticamente pelo formulário de contato.</p>
          </div>
        </div>
      `,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado com sucesso:', info.messageId);

    res.json({
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar email. Tente novamente mais tarde.',
      error: error.message
    });
  }
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

