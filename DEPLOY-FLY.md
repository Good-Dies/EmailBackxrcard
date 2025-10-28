# 🚀 Guia de Deploy no Fly.io

## ✅ Checklist Pré-Deploy

Verifique se todos os arquivos estão presentes:

- ✅ `fly.toml` - Configuração do Fly.io
- ✅ `package.json` - Dependências e scripts
- ✅ `server.js` - Servidor principal
- ✅ `.gitignore` - Arquivos ignorados
- ✅ `.dockerignore` - Arquivos ignorados no Docker

## 📦 Passos para Deploy

### 1. Instalar o Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

### 2. Fazer Login

```bash
fly auth login
```

### 3. Configurar as Variáveis de Ambiente

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

### 4. Fazer o Deploy

```bash
fly deploy
```

### 5. Verificar o Status

```bash
fly status
```

### 6. Ver Logs

```bash
fly logs
```

## 🔍 Verificar se Deploy Funcionou

Acesse:
```
https://emailback.fly.dev/health
```

Deveria retornar:
```json
{
  "status": "ok",
  "message": "Servidor funcionando"
}
```

## 🔧 Comandos Úteis

### Ver variáveis de ambiente:
```bash
fly secrets list
```

### Atualizar uma variável:
```bash
fly secrets set SMTP_USER=outro-email@gmail.com
```

### Ver logs em tempo real:
```bash
fly logs -a emailback
```

### SSH no container:
```bash
fly ssh console
```

### Escalar máquina:
```bash
fly scale count 2
```

### Reiniciar app:
```bash
fly apps restart emailback
```

## 🐛 Troubleshooting

### Erro: "not authorized"
```bash
fly auth login
```

### App não inicia:
```bash
fly logs  # Verifique os logs
```

### Problema com CORS:
Verifique se `FRONTEND_URL` está configurado corretamente.

### Email não envia:
Verifique os logs para erros do SMTP:
```bash
fly logs
```

## 📝 Notas Importantes

- O app usa buildpacks (não precisa Dockerfile)
- Está configurado para região `gru` (São Paulo)
- Porta interna: 3000
- HTTPS forçado
- Máquina ligada 24/7 (auto_stop_machines = false)

## 💰 Custos

- Tier gratuito: 256MB RAM, compartilhado
- Upgrade para 512MB se necessário

## 🔄 Próximos Deploys

Para atualizar o app, basta rodar:
```bash
fly deploy
```

O Fly.io detectará mudanças e atualizará automaticamente!

