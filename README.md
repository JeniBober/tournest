# TourNest

TourNest is a web application that helps real estate agents create and manage property tour schedules. With TourNest, agents can input property information, generate a schedule of properties to tour, and export the schedule to PDF.

## Features

- Input property details (address, price, bedrooms/bathrooms, square footage, etc.)
- Display properties on a Google Maps interface
- Sort properties by viewing time
- Export tour schedule to PDF
- Simple, intuitive interface

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tournest.git
   cd tournest
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

   > **Note:** You can obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- Next.js - React framework
- TypeScript - Type-safe JavaScript
- Tailwind CSS - Utility-first CSS framework
- Zustand - State management
- Google Maps API - Map integration
- react-to-pdf - PDF export functionality

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Maps API](https://developers.google.com/maps)
