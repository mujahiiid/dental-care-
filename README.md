# Dental Care Egypt

Premium Arabic website demo for a modern dental clinic in Egypt. The experience
combines a polished clinic landing page with a dedicated appointment booking
flow designed for desktop, tablet, and mobile.

## Highlights

- Arabic-first, right-to-left interface
- Premium responsive landing page
- Dedicated `/booking` appointment flow
- Service, date, and time selection
- Client-side validation and booking confirmation
- Accessible navigation and interaction states

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page or
[http://localhost:3000/booking](http://localhost:3000/booking) for the booking
experience.

## Demo booking storage

The current demo stores submitted appointments in the visitor's browser using
`localStorage`. A production deployment should connect the form to a secure
database or an approved clinic workflow before accepting real patient data.
