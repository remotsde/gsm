import { useCallback } from 'react';
import { notify } from '../utils/notifications';
import { useTranslation } from './useTranslation';

export function usePrint() {
  const { t } = useTranslation();

  const printElement = useCallback((elementId: string, title: string) => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(t('Element not found'));
      }

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error(t('Could not open print window'));
      }

      const styles = `
        <style>
          @media print {
            body { 
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
            }
            table { 
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1rem;
            }
            th, td { 
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th { 
              background-color: #f8f9fa;
              font-weight: bold;
            }
            @page {
              size: A4;
              margin: 2cm;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      `;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title}</title>
            ${styles}
          </head>
          <body>
            ${element.outerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for images to load before printing
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        notify.success(t('Print job sent successfully'));
      }, 500);

    } catch (error) {
      console.error('Print error:', error);
      notify.error(t('Failed to print document'));
    }
  }, [t]);

  return { printElement };
}