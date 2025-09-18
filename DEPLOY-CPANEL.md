# Como fazer deploy no cPanel

## Pré-requisitos
- Conta de hospedagem com cPanel
- Acesso ao File Manager ou FTP

## Passos para instalação

### 1. Fazer o build da aplicação
No seu computador local, execute:
```bash
npm run build
```
Isso criará uma pasta `dist/` com os arquivos prontos para produção.

### 2. Upload dos arquivos
1. Acesse o cPanel da sua hospedagem
2. Abra o **File Manager**
3. Navegue até a pasta `public_html/` (ou a pasta do seu domínio)
4. **Importante**: Delete todos os arquivos existentes na pasta (se houver)
5. Faça upload de **TODOS** os arquivos da pasta `dist/` para `public_html/`
   - Inclua o arquivo `.htaccess` (pode estar oculto)
   - Inclua todas as pastas: `assets/`, etc.

### 3. Configuração de permissões
- Certifique-se que as permissões das pastas estão em **755**
- Certifique-se que as permissões dos arquivos estão em **644**

### 4. Configuração do .htaccess
O arquivo `.htaccess` já foi criado automaticamente e inclui:
- Redirecionamento para SPA (Single Page Application)
- Headers de segurança
- Compressão Gzip
- Cache control

### 5. Verificação
Após o upload, acesse seu domínio. O site deve carregar normalmente.

## Estrutura final no cPanel
```
public_html/
├── .htaccess
├── index.html
├── launch-logo.png
├── launch-preview.png
├── robots.txt
└── assets/
    ├── index-[hash].css
    ├── index-[hash].js
    └── outros arquivos...
```

## Problemas comuns
- **Página em branco**: Verifique se todos os arquivos foram enviados
- **404 ao navegar**: Certifique-se que o arquivo `.htaccess` está presente
- **Arquivos não carregam**: Verifique as permissões dos arquivos

## Atualizações futuras
Para atualizar o site:
1. Faça `npm run build` novamente
2. Delete os arquivos antigos do `public_html/`
3. Faça upload dos novos arquivos da pasta `dist/`