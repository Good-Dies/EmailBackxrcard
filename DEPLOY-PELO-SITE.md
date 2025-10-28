# 🌐 Deploy pelo Site do Fly.io

## 📝 Passo a Passo no Dashboard Web

### 1. Criar Conta no Fly.io
Acesse: https://fly.io

### 2. Criar Novo App
- Clique em "Create App"
- Escolha um nome (ex: `emailback`)
- Região: São Paulo (gru)

### 3. Conectar Repositório Git
- Vá em "Source"
- Conecte seu repositório GitHub/GitLab
- Ou faça upload dos arquivos

### 4. Configurar Variáveis de Ambiente
No dashboard, vá em **Secrets** e adicione:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_SECURE = false
SMTP_USER = seu-email@gmail.com
SMTP_PASSWORD = sua-senha-de-app
SMTP_FROM = noreply@xrempresas.com.br
EMAIL_RECIPIENTS = contato@xrempresas.com.br,comercial@xrempresas.com.br
FRONTEND_URL = http://localhost:3001,https://www.xrcard.com.br,https://xr-card.vercel.app
NODE_ENV = production
PORT = 3000
```

### 5. Definir Configuração de Build
No arquivo `fly.toml` (já existe no projeto), está configurado:
- Usa buildpacks automático
- Porta: 3000
- HTTPS ativado
- Região: gru (São Paulo)

### 6. Deploy
- No dashboard, vá em "Deployments"
- Clique em "Deploy"
- O Fly.io vai automaticamente:
  - Detectar que é Node.js
  - Instalar dependências
  - Iniciar o servidor

## 🎯 Vantagens do Dashboard
- ✅ Não precisa instalar CLI
- ✅ Interface visual
- ✅ Fácil configuração de secrets
- ✅ Ver logs em tempo real
- ✅ Monitoramento de recursos
- ✅ Escalabilidade com um clique

## 📊 Após o Deploy
Acesse: `https://emailback.fly.dev`

Verifique o health check:
```
https://emailback.fly.dev/health
```

## 🔧 Configurações Importantes no Dashboard

### Secrets (Variáveis de Ambiente)
- Vá em Settings → Secrets
- Adicione todas as variáveis listadas acima
- Clique em "Save"

### Domínio Customizado (Opcional)
- Vá em Settings → Domains
- Adicione seu domínio personalizado
- Configure o DNS conforme instruções

### Monitoramento
- Veja CPU, RAM, e network usage
- Configure alerts se necessário
- Monitor logs em tempo real

## ⚠️ Importante
- Configure TODOS os secrets antes do deploy
- O app não vai funcionar sem as variáveis SMTP
- Use senha de app do Gmail (não senha normal)

## 🚀 Próximos Passos
1. Acesse https://fly.io
2. Faça login/cadastro
3. Crie novo app
4. Configure secrets
5. Faça deploy
6. Teste o endpoint /health
7. Integre no seu frontend!

