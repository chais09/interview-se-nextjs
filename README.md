# Sensor Management Application (Next.js)

This project is a **full-stack Next.js application** built as part of a take-home technical assessment.  
It provides an interface for **viewing, searching, adding, and removing sensors** associated with a data center location.

The current implementation focuses on the **San Diego data center** and demonstrates a clean, extensible approach that can be expanded to support multiple locations in the future.

---

## 🚀 Live Demo

**Frontend (Vercel):**  
https://interview-se-nextjs.vercel.app/

---

## 🏗️ Architecture Overview

### Frontend
- **Framework:** Next.js (App Router)
- **UI Libraries:**
  - Ant Design (Modal, List, Buttons, Inputs)
  - AG Grid (data grid for selected sensors)
- **Styling:** Tailwind CSS + Ant Design styles
- **Rendering Model:** Client Components for interactive views

### Backend
- **API Layer:** Next.js API routes
- **Key Endpoints:**
  - `GET /api/sensors/selected`  
    Returns all sensors currently selected for the data center
  - `GET /api/sensors/search`  
    Searches sensors by keyword (name, device type, label, ID, IP address)
  - `POST /api/sensors/selection`  
    Persists add/remove sensor selection changes

### Database
- **Database:** PostgreSQL
- **Hosting:** Neon (serverless Postgres)  
  https://neon.com/
- **Access Pattern:** Database queries are executed server-side via API routes only

### Deployment
- **Hosting Platform:** Vercel
- **Reason:** Native support for Next.js App Router, API routes, and server rendering
- **Environment Variables:** Managed via Vercel dashboard

---

## 📦 Data Model 

```ts
interface Sensor {
  sensorId: string;
  deviceType: string;
  deviceId: string;
  deviceLabel: string;
  ipAddress: string;
  sensorLabel: string;
  sensorType: string;
  sensorUnit: string;
  isSelected: boolean;
}
```

---

## 🔄 Application Flow
### Selected Sensors Page (Main Page)
- Displays all selected sensors for the San Diego data center
- Shows:
    - Data center name
    - Total selected sensor count
    - A sortable and filterable data grid

- Data is loaded from the backend via:
```GET /api/sensors/selected```

---

### Search / Add Sensors Modal
- Opened via “Search / Add Sensors” button
- On initial open:
    - Automatically loads the first 10 sensors without requiring a search
- Users can:
    - Search sensors by keyword (sensor name, device type, label, ID, or IP address)
    - Add or remove sensors by clicking Add / Remove

- UI immediately reflects pending changes

---

### Save Changes

- Clicking Save Changes:
    - Persists add/remove actions to the database
    - Updates the isSelected flag accordingly
    - Refreshes the main page to reflect the latest selected sensors

---

## ⚙️ Environment Setup
### Required Environment Variables
For local development, create a .env.local file:
```
DATABASE_URL=your_neon_postgres_connection_string
```

For production, the same variable is configured in Vercel → Environment Variables.


### 🧪 Local Development
```
npm install
npm run dev
```
Then open:
```
http://localhost:3000
```

## 🧠 Assumptions

The dataset is assumed to be scoped to a single data center (San Diego) for this assessment.

The data model and API design allow easy extension to multiple data centers in the future.

Sensor selection state is persisted using an isSelected flag for simplicity.

---

## 📈 Possible Enhancements

- Multi-data-center support
- Server-side pagination for large datasets
- Role-based access control
- Audit logging for sensor selection changes
- Bulk add/remove operations

---

## 📜 Summary

This project demonstrates a practical, production-oriented solution for managing sensor selection using Next.js, PostgreSQL, and modern UI libraries, with a focus on clarity, maintainability, and real-world usability.


## Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://chais09.github.io"><img src="https://avatars.githubusercontent.com/u/55682227?v=4?s=100" width="100px;" alt=""/><br /><sub><b>chais09</b></sub></a><br /> <a href="https://github.com/chais09/interview-se-nextjs/commits?author=chais09" title="Code">💻</a></td>
  </tr>
</table>