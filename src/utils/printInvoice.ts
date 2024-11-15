import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import QRCode from 'qrcode';
import { Invoice } from '../types';
import { appConfig } from '../config/app';

const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error('QR Code Generierungsfehler:', error);
    throw error;
  }
};

export const printInvoice = async (invoice: Invoice): Promise<void> => {
  try {
    const doc = new jsPDF();
    const qrCodeData = await generateQRCode(invoice.id);
    
    // Header
    doc.addImage(qrCodeData, 'PNG', 170, 10, 25, 25);
    doc.setFont('helvetica');
    
    // Company details
    doc.setFontSize(20);
    doc.text(appConfig.company.name, 15, 20);
    doc.setFontSize(10);
    doc.text(appConfig.company.address, 15, 30);
    doc.text(`Tel: ${appConfig.company.phone}`, 15, 35);
    doc.text(`E-Mail: ${appConfig.company.email}`, 15, 40);

    // Invoice details
    doc.setFontSize(16);
    doc.text(`Rechnung #${invoice.id}`, 15, 60);
    
    doc.setFontSize(10);
    const currentDate = new Date(invoice.createdAt).toLocaleDateString('de-DE');
    doc.text(`Datum: ${currentDate}`, 15, 70);
    doc.text(`Fällig bis: ${new Date(invoice.dueDate).toLocaleDateString('de-DE')}`, 15, 75);

    // Customer Information
    doc.setFillColor(240, 240, 240);
    doc.rect(15, 85, 180, 8, 'F');
    doc.setFontSize(12);
    doc.text('Kundeninformationen', 20, 91);
    doc.setFontSize(10);
    doc.text(`Name: ${invoice.customerInfo.name}`, 20, 105);
    doc.text(`Adresse: ${invoice.customerInfo.address || '-'}`, 20, 110);
    doc.text(`Telefon: ${invoice.customerInfo.phone}`, 20, 115);
    doc.text(`E-Mail: ${invoice.customerInfo.email}`, 20, 120);

    // Items table
    doc.setFontSize(12);
    doc.text('Rechnungspositionen', 15, 135);
    
    const tableColumns = [
      'Pos.',
      'Artikel',
      'Menge',
      'Einzelpreis',
      'Gesamt'
    ];
    
    const tableRows = invoice.items.map((item, index) => [
      (index + 1).toString(),
      item.name,
      item.quantity.toString(),
      `${item.unitPrice.toFixed(2)} €`,
      `${item.total.toFixed(2)} €`
    ]);

    doc.autoTable({
      startY: 140,
      head: [tableColumns],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: { fillColor: [66, 139, 202] }
    });

    // Labor charges
    if (invoice.labor.length > 0) {
      const laborY = (doc as any).lastAutoTable.finalY + 10;
      doc.text('Arbeitsleistungen', 15, laborY);
      
      const laborColumns = [
        'Beschreibung',
        'Stunden',
        'Stundensatz',
        'Gesamt'
      ];
      
      const laborRows = invoice.labor.map(labor => [
        labor.description,
        labor.hours.toString(),
        `${labor.ratePerHour.toFixed(2)} €`,
        `${labor.total.toFixed(2)} €`
      ]);

      doc.autoTable({
        startY: laborY + 5,
        head: [laborColumns],
        body: laborRows,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 5 },
        headStyles: { fillColor: [66, 139, 202] }
      });
    }

    // Totals
    const totalsY = (doc as any).lastAutoTable.finalY + 10;
    const totalsX = 140;
    
    doc.text('Zwischensumme:', totalsX, totalsY);
    doc.text(`${invoice.subtotal.toFixed(2)} €`, 190, totalsY, { align: 'right' });
    
    doc.text('MwSt. (19%):', totalsX, totalsY + 5);
    doc.text(`${invoice.tax.toFixed(2)} €`, 190, totalsY + 5, { align: 'right' });
    
    doc.setFontSize(12);
    doc.text('Gesamtbetrag:', totalsX, totalsY + 12);
    doc.text(`${invoice.total.toFixed(2)} €`, 190, totalsY + 12, { align: 'right' });

    // Notes
    if (invoice.notes) {
      doc.setFontSize(10);
      doc.text('Anmerkungen:', 15, totalsY + 25);
      doc.text(invoice.notes, 15, totalsY + 30);
    }

    // Payment information
    doc.setFontSize(10);
    doc.text('Zahlungsinformationen:', 15, totalsY + 45);
    doc.text('Bitte überweisen Sie den Betrag unter Angabe der Rechnungsnummer.', 15, totalsY + 50);
    doc.text('Bankverbindung:', 15, totalsY + 55);
    doc.text('IBAN: DE12 3456 7890 1234 5678 90', 15, totalsY + 60);
    doc.text('BIC: DEUTDEBBXXX', 15, totalsY + 65);

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.text(appConfig.company.name, 15, pageHeight - 20);
    doc.text(appConfig.company.address, 15, pageHeight - 15);
    doc.text(`Tel: ${appConfig.company.phone} | E-Mail: ${appConfig.company.email}`, 15, pageHeight - 10);

    if (invoice.status === 'draft') {
      // Add watermark for draft
      doc.setFontSize(72);
      doc.setTextColor(200, 200, 200);
      doc.text('ENTWURF', 45, 160, { angle: 45 });
    }

    // Output
    if (invoice.status === 'draft') {
      doc.save(`rechnung-entwurf-${invoice.id}.pdf`);
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
          
          // Cleanup
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