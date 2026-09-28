# 🐾 Site Estética Canina Mary Jane

Landing page mobile-first para petshop com identidade visual roxo e rosa.

---

## 🎁 Este é um Presente!

Este site foi criado como presente. Algumas informações precisam ser personalizadas antes do uso.

---

## ✅ O Que Está Pronto

- ✨ Design responsivo mobile-first
- 🎨 Identidade visual roxo (#7e22ce) e rosa (#fbcfe8)
- 🖼️ Mascote integrada (cachorrinha com laços)
- 📸 Galeria de clientes
- 🔄 Seção de antes/depois
- ⭐ Avaliações estilo Google Maps
- 💬 Botão flutuante do WhatsApp
- 📱 Menu hambúrguer para mobile

---

## 📝 O Que Precisa Personalizar

Antes de usar, atualize em `src/App.jsx`:

### 1. WhatsApp (Linha ~21)
```javascript
const whatsappNumber = "5511999999999"; // ← Trocar pelo número real
```

### 2. Telefone no Footer (Linha ~397)
```javascript
<span>(11) 99999-9999</span> // ← Trocar
```

### 3. Endereço Completo (Linha ~406)
```javascript
Rua das Flores, 123
Jardim Exemplo - São Paulo, SP
CEP: 01234-567
// ← Trocar pelo endereço real
```

### 4. Redes Sociais (Linhas ~553-571)
```javascript
href="https://instagram.com" // ← Instagram real
href="https://facebook.com"  // ← Facebook real
```

---

## 🚀 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar em: http://localhost:5173
```

---

## 📅 Agendamento Online (Futuro)

O código está preparado para adicionar agendamento online quando tiver acesso ao email.

**Opções disponíveis:**
1. **Calendly** (mais popular)
2. **Google Calendar** (100% grátis)
3. **Setmore** (melhor plano grátis)

**Como implementar:**
1. Leia `booking_setup_guide.md`
2. Escolha uma plataforma
3. Configure (15-30 min)
4. Atualize o código conforme instruções em `App.jsx`

---

## 📁 Estrutura

```
mary-jane-petshop/
├── src/
│   ├── App.jsx          # Componente principal (site completo)
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── public/
│   ├── mascote.png      # Logo/mascote
│   ├── pet1.jpg         # Galeria
│   ├── pet2.png         # Galeria
│   ├── antes.png        # Antes/Depois
│   └── depois.png       # Antes/Depois
└── index.html           # HTML base
```

---

## 🎨 Identidade Visual

**Cores:**
- Roxo primário: `#7e22ce`
- Rosa secundário: `#fbcfe8`

**Fontes:**
- Títulos: Dancing Script (cursiva)
- Corpo: Quicksand (arredondada)

---

## 📦 Deploy

Para colocar online, pode usar:
- **Vercel** (grátis, recomendado)
- **Netlify** (grátis)
- **GitHub Pages**

```bash
npm run build
# Upload da pasta dist/
```

---

## 💝 Feito com Amor

Criado com muito carinho para a Estética Canina Mary Jane! 🐕💜

**Dúvidas?** Entre em contato com quem desenvolveu este site.
