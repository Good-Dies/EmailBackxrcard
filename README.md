# EmailBack - Backend para Envio de Emails

Backend Node.js para receber formulários e enviar emails com notificações.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Nodemailer** - Envio de emails
- **CORS** - Permissões de acesso
- **dotenv** - Variáveis de ambiente

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Fly.io (para deploy)
- Servidor SMTP (Gmail, SendGrid, etc)

## ⚙️ Configuração Local

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd emailback
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=noreply@xrempresas.com.br
EMAIL_RECIPIENTS=contato@xrempresas.com.br,comercial@xrempresas.com.br
FRONTEND_URL=http://localhost:3001,https://www.xrcard.com.br,https://xr-card.vercel.app
PORT=3000
```

4. **Execute o servidor**
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📧 Configuração do SMTP

### Gmail
1. Ative a verificação em duas etapas
2. Gere uma senha de app em: https://myaccount.google.com/apppasswords
3. Use a senha gerada no `SMTP_PASSWORD`

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=sua-chave-api
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=seu-usuario
SMTP_PASSWORD=sua-senha
```

## 🌐 Deploy no Fly.io

1. **Instale o Fly CLI**
```bash
curl -L https://fly.io/install.sh | sh
```

2. **Faça login**
```bash
fly auth login
```

3. **Configure as variáveis de ambiente no Fly.io**
```bash
fly secrets set SMTP_HOST=smtp.gmail.com
fly secrets set SMTP_PORT=587
fly secrets set SMTP_SECURE=false
fly secrets set SMTP_USER=seu-email@gmail.com
fly secrets set SMTP_PASSWORD=sua-senha-de-app
fly secrets set SMTP_FROM=noreply@xrempresas.com.br
fly secrets set EMAIL_RECIPIENTS=contato@xrempresas.com.br,comercial@xrempresas.com.br
fly secrets set FRONTEND_URL=http://localhost:3001,https://www.xrcard.com.br,https://xr-card.vercel.app
fly secrets set NODE_ENV=production
```

4. **Faça o deploy**
```bash
fly deploy
```

5. **Verifique o status**
```bash
fly status
```

## 📡 API Endpoints

### GET /health
Verifica se o servidor está funcionando.

**Resposta:**
```json
{
  "status": "ok",
  "message": "Servidor funcionando"
}
```

### POST /send-email
Envia email com os dados do formulário.

**Request Body:**
```json
{
  "name": "João Silva",
  "companyName": "Empresa XYZ",
  "cnpj": "12.345.678/0001-90",
  "email": "joao@empresa.com",
  "phone": "(11) 99999-9999",
  "employeeCount": "50"
}
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "message": "Email enviado com sucesso!",
  "messageId": "..."
}
```

**Resposta de Erro:**
```json
{
  "success": false,
  "message": "Erro ao enviar email. Tente novamente mais tarde.",
  "error": "..."
}
```

## 🔧 Integração com Frontend

Atualize seu componente `ModalForm` para enviar os dados:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const formData = {
    name: e.target.name.value,
    companyName: e.target.companyName.value,
    cnpj: e.target.cnpj.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    employeeCount: e.target.employeeCount.value
  };

  try {
    const response = await fetch('https://seu-backend.fly.dev/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Email enviado com sucesso!');
      onClose();
    } else {
      alert('Erro ao enviar email: ' + data.message);
    }
  } catch (error) {
    alert('Erro ao enviar email. Tente novamente.');
  }
};
```

## 📝 Licença

ISC

