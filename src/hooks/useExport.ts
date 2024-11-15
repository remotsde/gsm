import { useCallback } from 'react';
import { notify } from '../utils/notifications';

export function useExport() {
  const exportToCSV = useCallback((data: any[], filename: string) => {
    try {
      if (!data.length) {
        throw new Error('No data to export');
      }

      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => 
          headers.map(header => 
            JSON.stringify(row[header] || '')
          ).join(',')
        )
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      notify.success('Export completed successfully');
    } catch (error) {
      notify.error('Failed to export data');
      console.error('Export error:', error);
    }
  }, []);

  return { exportToCSV };
}