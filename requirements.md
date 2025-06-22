# REQUIREMENTS.md

## 🔧 Technical Requirements

### Frontend

- React Native with Expo for cross-platform development
- React Native Web for web compatibility
- Functional Tab Navigation using internal logic (no external libraries)
- Styled using custom stylesheets and reusable components

### Backend (Supabase)

- Supabase setup with the following tables:
  - `users` (id, email, password, userType [farmer, investor, buyer], name, avatar)
  - `produce` (id, name, description, price, image\_url, farmer\_id)
  - `farmers` (id, user\_id, bio, location)
  - `investments` (id, investor\_id, produce\_id, amount, status)
  - `messages` (id, sender\_id, receiver\_id, content, timestamp)

### Authentication

- Supabase email/password authentication
- Session management
- Role-based UI access (farmer, investor, buyer)

### Payment Integration (Paystack)

- Deposit funds for investment
- Withdraw earnings
- View transaction history

#### Paystack Setup

- Create Paystack account
- Generate public/private keys
- Use Paystack APIs to:
  - Initialize transactions
  - Verify transactions
  - Check balances (optional)

Example:

```js
fetch('https://api.paystack.co/transaction/initialize', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: user.email,
    amount: 50000
  })
});
```

### API Examples

#### Supabase CRUD

```js
// Fetch produce list
const { data, error } = await supabase.from('produce').select('*');

// Create investment
await supabase.from('investments').insert([
  { investor_id: user.id, produce_id: item.id, amount: 10000 }
]);
```

---

## 🌍 Environment Variables

Create a `.env` file for sensitive keys:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key
```

---

## 📷 Image Assets Required

- Farm produce images (cassava, yam, maize, etc.)
- Farmer profile pictures
- App logo and splash screen
- Icons for tabs (Home, Market, Invest, Messages)

---

## 🔗 External Services

- **Supabase** (Database, Auth, Realtime)
- **Paystack** (Payments)
- **Expo** (App hosting, development)
- **Figma** (Design reference)

---

## 🧰 Developer Tools

- VS Code
- Expo CLI
- Git + GitHub
- Postman (for testing Paystack endpoints)

---

## ✅ Validation Checklist

-

