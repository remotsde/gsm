import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import { appConfig } from '../config/app';
import type { RepairTicket } from '../types';

const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error('QR Code Generierungsfehler:', error);
    throw error;
  }
};

const createTicketPage = (doc: jsPDF, ticket: RepairTicket, qrCodeData: string, copyType: 'Kundenausfertigung' | 'Werkstattausfertigung') => {
  // Set background color to white
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

  // Add professional header with blue accent
  doc.setFillColor(25, 118, 210);
  doc.rect(0, 0, doc.internal.pageSize.width, 40, 'F');
  
  // Company Logo and Header
  doc.addImage(qrCodeData, 'PNG', 165, 45, 30, 30);
  
  // Company details with improved typography
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('RepairPro GmbH', 15, 25);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Professionelle Gerätereparatur', 15, 35);

  // Company contact details
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(10);
  doc.text([
    appConfig.company.address,
    `Tel: ${appConfig.company.phone}`,
    `E-Mail: ${appConfig.company.email}`
  ], 15, 55);

  // Document type indicator
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(15, 85, 180, 25, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(25, 118, 210);
  doc.text(copyType, 20, 100);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Auftragsnummer: ${ticket.id}`, 20, 107);

  // Date and Status
  const currentDate = new Date(ticket.createdAt).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Datum: ${currentDate}`, 130, 100);

  // Status badge
  const statusText = translateStatus(ticket.status);
  doc.setFillColor(...getStatusColor(ticket.status));
  doc.roundedRect(130, 103, 60, 7, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(statusText, 135, 108);

  // Customer Information Section
  doc.setTextColor(25, 118, 210);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Kundeninformationen', 15, 130);
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  createInfoTable(doc, [
    { label: 'Name', value: ticket.customerInfo.name },
    { label: 'Telefon', value: ticket.customerInfo.phone },
    { label: 'E-Mail', value: ticket.customerInfo.email }
  ], 140);

  // Device Information Section
  doc.setTextColor(25, 118, 210);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Geräteinformationen', 15, 180);
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  createInfoTable(doc, [
    { label: 'Typ', value: translateDeviceType(ticket.deviceInfo.type) },
    { label: 'Marke', value: ticket.deviceInfo.brand },
    { label: 'Modell', value: ticket.deviceInfo.model },
    { label: 'Seriennummer', value: ticket.deviceInfo.serialNumber },
    { label: 'Zustand', value: ticket.deviceInfo.condition }
  ], 190);

  // Repair Information Section
  doc.setTextColor(25, 118, 210);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Reparaturinformationen', 15, 230);
  
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Problem description with proper wrapping
  const problemLines = doc.splitTextToSize(ticket.repairInfo.problemDescription, 170);
  doc.text('Problembeschreibung:', 15, 245);
  doc.text(problemLines, 15, 255);

  // Required Parts in styled box
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(15, 270, 180, 25, 3, 3, 'F');
  doc.text('Benötigte Teile:', 20, 280);
  doc.text(ticket.repairInfo.requiredParts, 20, 290);

  // Warranty Information if applicable
  if (ticket.repairInfo.warranty) {
    doc.setFillColor(232, 245, 233);
    doc.roundedRect(15, 300, 180, 20, 3, 3, 'F');
    doc.setTextColor(46, 125, 50);
    doc.text('Garantie:', 20, 310);
    doc.text(ticket.repairInfo.warrantyPeriod, 20, 318);
  }

  // Terms & Conditions
  doc.setTextColor(25, 118, 210);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Geschäftsbedingungen', 15, 335);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const terms = appConfig.company.terms.split('\n');
  let yPos = 345;
  terms.forEach((term) => {
    doc.text(term, 15, yPos);
    yPos += 8;
  });

  // Signature section
  createSignatureSection(doc, currentDate);

  // Footer
  createFooter(doc);
};

const createInfoTable = (doc: jsPDF, items: Array<{label: string, value: string}>, startY: number) => {
  const colWidth = 85;
  const rowHeight = 12;
  let currentY = startY;

  items.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${item.label}:`, 15, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(item.value, 15 + colWidth/2, currentY);
    currentY += rowHeight;
  });
};

const createSignatureSection = (doc: jsPDF, currentDate: string) => {
  const pageHeight = doc.internal.pageSize.height;
  
  // Signature boxes with improved styling
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(250, 250, 250);
  
  // Customer signature
  doc.roundedRect(15, pageHeight - 60, 80, 30, 3, 3, 'FD');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Unterschrift Kunde', 35, pageHeight - 35);
  
  // Technician signature
  doc.roundedRect(105, pageHeight - 60, 80, 30, 3, 3, 'FD');
  doc.text('Unterschrift Techniker', 120, pageHeight - 35);
  
  // Date
  doc.setFontSize(8);
  doc.text(`Datum: ${currentDate}`, 15, pageHeight - 20);
};

const createFooter = (doc: jsPDF) => {
  const pageHeight = doc.internal.pageSize.height;
  
  // Add subtle separator line
  doc.setDrawColor(230, 230, 230);
  doc.line(15, pageHeight - 15, 195, pageHeight - 15);
  
  // Footer text with improved layout
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text(appConfig.company.name, 15, pageHeight - 8);
  doc.text(appConfig.company.address, 80, pageHeight - 8);
  doc.text(`Tel: ${appConfig.company.phone}`, 160, pageHeight - 8);
};

const getStatusColor = (status: string): [number, number, number] => {
  switch (status) {
    case 'new':
      return [33, 150, 243]; // Blue
    case 'in_progress':
      return [255, 152, 0]; // Orange
    case 'ready':
      return [76, 175, 80]; // Green
    case 'closed':
      return [158, 158, 158]; // Gray
    default:
      return [158, 158, 158];
  }
};

export const printTicket = async (ticket: RepairTicket, format: 'print' | 'pdf' = 'print'): Promise<void> => {
  try {
    const doc = new jsPDF();
    const qrCodeData = await generateQRCode(ticket.id);

    // Create customer copy
    createTicketPage(doc, ticket, qrCodeData, 'Kundenausfertigung');
    
    // Add new page for workshop copy
    doc.addPage();
    createTicketPage(doc, ticket, qrCodeData, 'Werkstattausfertigung');

    if (format === 'pdf') {
      doc.save(`reparaturauftrag-${ticket.id}.pdf`);
    } else {
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      
      // Create an iframe for printing
      const printFrame = document.createElement('iframe');
      printFrame.style.display = 'none';
      document.body.appendChild(printFrame);
      
      printFrame.onload = () => {
        if (printFrame.contentWindow) {
          printFrame.contentWindow.print();
          
          // Cleanup after printing
          setTimeout(() => {
            document.body.removeChild(printFrame);
            URL.revokeObjectURL(url);
          }, 1000);
        }
      };
      
      printFrame.src = url;
    }
  } catch (error) {
    console.error('Druck/PDF-Generierungsfehler:', error);
    throw new Error('Dokument konnte nicht erstellt werden');
  }
};

function translateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    new: 'Neu',
    in_progress: 'In Bearbeitung',
    ready: 'Fertig',
    closed: 'Abgeschlossen'
  };
  return statusMap[status] || status;
}

function translateDeviceType(type: string): string {
  const typeMap: Record<string, string> = {
    phone: 'Handy',
    computer: 'Computer',
    tablet: 'Tablet'
  };
  return typeMap[type] || type;
}