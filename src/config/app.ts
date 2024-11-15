export const appConfig = {
  name: 'RepairPro',
  logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xNCAxMmgtNCIvPjxwYXRoIGQ9Ik0xMiAxNHYtNCIvPjxwYXRoIGQ9Ik0xMiAyMmE5IDkgMCAxIDAtOS05IDkgOSAwIDAgMCA5IDl6Ii8+PC9zdmc+',
  supportEmail: 'support@repairpro.de',
  version: '1.0.0',
  defaultLanguage: 'de',
  company: {
    name: 'RepairPro GmbH',
    address: 'Reparaturstraße 123, 10115 Berlin',
    phone: '+49 30 123456',
    email: 'info@repairpro.de',
    terms: `1. Alle Reparaturen unterliegen unseren Standard-Garantiebedingungen.
2. Die Datensicherung liegt in der Verantwortung des Kunden.
3. Nicht abgeholte Geräte nach 30 Tagen führen zu Lagergebühren.
4. Die Zahlung ist bei Fertigstellung der Reparatur fällig.`
  },
  roles: {
    admin: 'Administrator',
    technician: 'Techniker',
    receptionist: 'Empfang',
  },
  translations: {
    // Success messages
    'Print job sent successfully': 'Druckauftrag erfolgreich gesendet',
    'PDF downloaded successfully': 'PDF erfolgreich heruntergeladen',
    'Failed to print ticket': 'Drucken des Auftrags fehlgeschlagen',
    'Failed to generate PDF': 'PDF-Generierung fehlgeschlagen',
    'Preparing ticket for printing...': 'Bereite Auftrag zum Drucken vor...',
    'Generating PDF...': 'Generiere PDF...',
    'Status updated successfully': 'Status erfolgreich aktualisiert',
    'Failed to update status': 'Statusaktualisierung fehlgeschlagen',
    'Ticket not found': 'Auftrag nicht gefunden',
    'Back to Tickets': 'Zurück zu den Aufträgen',
    'Processing...': 'Verarbeitung...',
    'Download PDF': 'PDF herunterladen',
    'Print Ticket': 'Auftrag drucken',
    'Status Management': 'Statusverwaltung',
    'Last updated': 'Zuletzt aktualisiert',
    
    // General translations
    'Dashboard': 'Dashboard',
    'Customers': 'Kunden',
    'Devices': 'Geräte',
    'Repair Tickets': 'Reparaturaufträge',
    'Inventory': 'Inventar',
    'Reports': 'Berichte',
    'Settings': 'Einstellungen',
    'Support': 'Support',
    'Add Customer': 'Kunde hinzufügen',
    'Add Device': 'Gerät hinzufügen',
    'New Ticket': 'Neuer Auftrag',
    'Add Item': 'Artikel hinzufügen',
    'Search...': 'Suchen...',
    'Logout': 'Abmelden',
    'Name': 'Name',
    'Email': 'E-Mail',
    'Phone': 'Telefon',
    'Status': 'Status',
    'Actions': 'Aktionen',
    'View Details': 'Details anzeigen',
    'Print': 'Drucken',
    'Export': 'Exportieren',
    'Cancel': 'Abbrechen',
    'Save': 'Speichern',
    'Delete': 'Löschen',
    'Edit': 'Bearbeiten',
    'Create': 'Erstellen',
    'Update': 'Aktualisieren',
    'Back': 'Zurück',
    'Next': 'Weiter',
    'Submit': 'Absenden',
    'Close': 'Schließen',

    // Status translations
    'new': 'Neu',
    'in_progress': 'In Bearbeitung',
    'ready': 'Fertig',
    'closed': 'Abgeschlossen',

    // Dashboard translations
    'Active Repairs': 'Aktive Reparaturen',
    'Completed Today': 'Heute abgeschlossen',
    'Recent Tickets': 'Aktuelle Aufträge',
    'View all': 'Alle anzeigen',
    'No recent tickets': 'Keine aktuellen Aufträge',

    // Ticket details translations
    'Customer Information': 'Kundeninformationen',
    'Device Information': 'Geräteinformationen',
    'Repair Information': 'Reparaturinformationen',
    'Problem Description': 'Problembeschreibung',
    'Required Parts': 'Benötigte Teile',
    'Technical Notes': 'Technische Notizen',
    'Warranty': 'Garantie',
    'Estimated Cost': 'Geschätzte Kosten',
    'Estimated Time': 'Geschätzte Zeit',
    'Created': 'Erstellt',
    'Last Updated': 'Zuletzt aktualisiert',

    // Device translations
    'Brand': 'Marke',
    'Model': 'Modell',
    'Serial Number': 'Seriennummer',
    'Condition': 'Zustand',
    'Type': 'Typ',
    'Price': 'Preis',
    'Quantity': 'Menge',
    'Category': 'Kategorie',
    'Min Quantity': 'Mindestmenge',
    'Low Stock': 'Geringer Bestand',
    'Out of Stock': 'Nicht vorrätig',
    'In Stock': 'Vorrätig',

    // Report translations
    'Revenue': 'Umsatz',
    'Profit': 'Gewinn',
    'Expenses': 'Ausgaben',
    'Total Repairs': 'Gesamte Reparaturen',
    'Successful Repairs': 'Erfolgreiche Reparaturen',
    'Customer Satisfaction': 'Kundenzufriedenheit',
    'Popular Services': 'Beliebte Dienstleistungen',
    'Device Types': 'Gerätetypen',

    // Support translations
    'Support Ticket': 'Support-Ticket',
    'Create Support Ticket': 'Support-Ticket erstellen',
    'Subject': 'Betreff',
    'Priority': 'Priorität',
    'Description': 'Beschreibung',
    'Contact Information': 'Kontaktinformationen',
    'Business Hours': 'Geschäftszeiten',
    'Monday - Friday': 'Montag - Freitag',
    'Saturday': 'Samstag',
    'Need immediate help?': 'Benötigen Sie sofortige Hilfe?',
    'Our support team typically responds within 2 hours during business hours.': 'Unser Support-Team antwortet normalerweise innerhalb von 2 Stunden während der Geschäftszeiten.',
    'Low': 'Niedrig',
    'Medium': 'Mittel',
    'High': 'Hoch',
    'Support Email': 'Support E-Mail',
    'Company Phone': 'Firmennummer',

    // Settings translations
    'Company Information': 'Firmeninformationen',
    'Display Settings': 'Anzeigeeinstellungen',
    'Dark Mode': 'Dunkelmodus',
    'Toggle dark mode': 'Dunkelmodus umschalten',

    // Device types
    'phone': 'Handy',
    'computer': 'Computer',
    'tablet': 'Tablet',

    // Categories
    'screens': 'Bildschirme',
    'batteries': 'Akkus',
    'parts': 'Ersatzteile',
    'accessories': 'Zubehör',

    // Auth messages
    'Login successful': 'Anmeldung erfolgreich',
    'Invalid credentials': 'Ungültige Anmeldedaten',
    'Login failed': 'Anmeldung fehlgeschlagen',
    'Logged out successfully': 'Erfolgreich abgemeldet',
    'Registration successful': 'Registrierung erfolgreich',
    'Registration failed': 'Registrierung fehlgeschlagen',
    'Passwords do not match': 'Passwörter stimmen nicht überein'
  }
};