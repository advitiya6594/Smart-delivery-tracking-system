# Smart Delivery Management System

## Overview
The Smart Delivery Management System is a modern dashboard designed for efficient delivery partner management and intelligent order assignments. This application simplifies operations by providing tools for partner management, order tracking, and performance monitoring.

---

## Deliverables
1. **GitHub Repository**
2. **Working Demo**
3. **README Documentation**
4. **API Documentation**

---

## Data Types

### Delivery Partner
```typescript
type DeliveryPartner = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  currentLoad: number; // max: 3
  areas: string[];
  shift: {
    start: string; // HH:mm
    end: string;   // HH:mm
  };
  metrics: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
  };
};
```

### Order
```typescript
type Order = {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  area: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'assigned' | 'picked' | 'delivered';
  scheduledFor: string; // HH:mm
  assignedTo?: string; // partner ID
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
```

### Assignment
```typescript
type Assignment = {
  orderId: string;
  partnerId: string;
  timestamp: Date;
  status: 'success' | 'failed';
  reason?: string;
};
```

### Assignment Metrics
```typescript
type AssignmentMetrics = {
  totalAssigned: number;
  successRate: number;
  averageTime: number;
  failureReasons: {
    reason: string;
    count: number;
  }[];
};
```

---

## Required Features

### 1. Partner Management
- Partner registration form
- Partner list view
- Profile editing
- Area management
- Shift scheduling

### 2. Order Processing
- Orders dashboard
- Status tracking
- Assignment history
- Performance metrics

### 3. Assignment System
- Smart order assignments
- Assignment metrics tracking

---

## Required Pages

### Dashboard (`/`)
- Key metrics cards
- Active orders map
- Partner availability status
- Recent assignments

### Partners (`/partners`)
```typescript
type PartnersPageProps = {
  partners: DeliveryPartner[];
  metrics: {
    totalActive: number;
    avgRating: number;
    topAreas: string[];
  };
};
```

### Orders (`/orders`)
```typescript
type OrdersPageProps = {
  orders: Order[];
  filters: {
    status: string[];
    areas: string[];
    date: string;
  };
};
```

### Assignment Dashboard (`/assignments`)
```typescript
type AssignmentPageProps = {
  activeAssignments: Assignment[];
  metrics: AssignmentMetrics;
  partners: {
    available: number;
    busy: number;
    offline: number;
  };
};
```

---

## API Routes

### Partner Routes
- `GET /api/partners`: Fetch all delivery partners.
- `POST /api/partners`: Add a new delivery partner.
- `PUT /api/partners/[id]`: Update a partner’s details.
- `DELETE /api/partners/[id]`: Remove a delivery partner.

### Order Routes
- `GET /api/orders`: Fetch all orders.
- `POST /api/orders/assign`: Assign an order to a delivery partner.
- `PUT /api/orders/[id]/status`: Update the status of an order.

### Assignment Routes
- `GET /api/assignments/metrics`: Fetch assignment performance metrics.
- `POST /api/assignments/run`: Trigger a smart order assignment process.

---

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Supabase account for the database

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   ```
2. Navigate to the project directory:
   ```bash
   cd smart-delivery-management-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser at `http://localhost:8080`.

### Deploying on Vercel
1. Push the repository to GitHub.
2. Log in to [Vercel](https://vercel.com/).
3. Click on "+ New Project" and import your GitHub repository.
4. Configure build settings (Root Directory: `./`).
5. Add Supabase project URL and the Anon Key.
6. Click "Deploy".
7. Access the deployed application through the provided URL.

---

## License
This project is licensed under the [MIT License](LICENSE).
