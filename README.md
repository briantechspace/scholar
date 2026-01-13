# Scholar WhatsApp Bot 🤖

Scholar is a **self-hosted WhatsApp Multi-Device bot** built using **Baileys (Web-based)**.  
Each user hosts their **own bot instance** on a panel (Pterodactyl), links their **own WhatsApp number**, and runs the bot independently.

❌ No WhatsApp Cloud API  
❌ No QR scanning  
✅ Pairing-code login (8-digit)  
✅ Works on Pterodactyl  
✅ Start command: `npm start`

---

## 🚀 Features (Core)

- `.menu` – full interactive menu with footer buttons
- `.setownername` – change displayed owner name
- `.vv` – retrieve & reuse view-once media
- `.autoviewstatus on/off` – auto view WhatsApp statuses
- `welcome` – auto welcome new group members
- Buttons:
  - ❤️ Support
  - 📺 Tutorials
  - 📢 Follow Channel
  - 📞 Contact Brian

> All features listed above work **without external APIs**.

---

## 🧰 Requirements

- Node.js **v18 or higher**
- A WhatsApp account (number)
- A hosting panel (Pterodactyl recommended)

---

## 📦 Installation (Pterodactyl)

1. Download the project as a **ZIP** from GitHub  
2. Create a **NodeJS server** in Pterodactyl  
3. Upload the ZIP file  
4. **Unarchive** it  
5. Make sure files are in the **root directory**
6. Set **startup command** to:

```bash
npm start
