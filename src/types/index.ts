export interface User {
  id: string;
  name: string;
  role: 'admin' | 'technician' | 'receptionist';
  email: string;
  phone?: string;
  avatar?: string;
  position?: string;
  department?: string;
  joinDate?: string;
  skills?: string[];
}

export interface Part {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  quantity: number;
  minQuantity: number;
  supplier: string;
  location: string;
  lastOrdered?: string;
  compatibility: string[];
  image?: string;
}

export interface Invoice {
  id: string;
  ticketId: string;
  customerInfo: CustomerInfo;
  items: InvoiceItem[];
  labor: LaborCharge[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
  paymentMethod?: string;
  paymentDate?: string;
  dueDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  partId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface LaborCharge {
  description: string;
  hours: number;
  ratePerHour: number;
  total: number;
}

export interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  company?: string;
  taxId?: string;
}

export interface DeviceInfo {
  type: 'phone' | 'computer' | 'tablet';
  brand: string;
  model: string;
  serialNumber: string;
  condition: string;
}

export interface RepairInfo {
  problemDescription: string;
  diagnosis?: string;
  solution?: string;
  requiredParts: string;
  technicalNotes?: string;
  warranty: boolean;
  warrantyPeriod: string;
  estimatedCompletionDate?: string;
  completedDate?: string;
  technicianId?: string;
}

export interface RepairTicket {
  id: string;
  customerId: string;
  deviceId: string;
  status: 'new' | 'in_progress' | 'ready' | 'closed';
  priority: 'low' | 'medium' | 'high';
  customerInfo: CustomerInfo;
  deviceInfo: DeviceInfo;
  repairInfo: RepairInfo;
  estimatedCost: number;
  estimatedTime: string;
  createdAt: string;
  updatedAt: string;
}