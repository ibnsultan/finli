# Finli - Financial Dashboard

A modern, responsive financial dashboard built with HTML, CSS (Tailwind), and vanilla JavaScript. Features beautiful charts, wallet management, analytics, and user settings.

## Features

- **Dashboard**: Overview of financial metrics with interactive charts
- **My Wallet**: Manage cards and view transaction history
- **Analytics**: Detailed financial analytics with spending breakdowns
- **Settings**: User profile management and preferences
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Interactive Charts**: Built with Chart.js for data visualization

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Chart.js for data visualization
- Font Awesome for icons

## Color Palette

- **Primary**: `#355FE5` (Blue)
- **Secondary**: `#232323` (Dark Gray)
- **Accent/Background**: `#EDF2F7` (Light Gray)

## File Structure

```
Finli/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── inspiration/        # Reference design images
    ├── Screenshot 2025-07-08 024427.png
    ├── Screenshot 2025-07-08 024449.png
    ├── Screenshot 2025-07-08 024504.png
    └── Screenshot 2025-07-08 024603.png
```

## Installation & Usage

1. **Clone or download** the project files
2. **Open** `index.html` in any modern web browser
3. **Navigate** between different sections using the sidebar menu

No build process or dependencies are required - just open and run!

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

1. **Build CSS** (one-time):
   ```bash
   npm run build
   ```

2. **Development with CSS watching**:
   ```bash
   npm run dev
   ```

3. **Start the web server**:
   ```bash
   npm run serve
   ```
   Or for development with CSS building:
   ```bash
   npm run dev-server
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run build` - Build the CSS from Tailwind
- `npm run dev` - Watch for CSS changes and rebuild automatically
- `npm run serve` - Start the web server to serve the build files
- `npm run dev-server` - Build CSS and start the web server

## Features Breakdown

### Dashboard
- Financial overview cards (Total Balance, Income, Expenses, Savings)
- Interactive balance chart
- Recent transactions table
- Quick transfer functionality

### My Wallet
- Wallet balance display with growth indicators
- Multiple card management
- Quick action buttons (Deposits, Send, Receive, Invoice, Check Out)
- Money flow visualization
- Currency conversion tools

### Analytics
- Detailed financial metrics
- Spending breakdown with donut chart
- Income analysis with bar charts
- Savings tracking with progress indicators
- Upgrade to PRO section

### Settings
- Personal information management
- Profile picture upload
- Address and contact details
- Settings categories (Profile, Security, Billing, Privacy, FAQs, Terms)
- Theme preferences

## Responsive Design

The dashboard is fully responsive and adapts to different screen sizes:
- **Desktop**: Full sidebar navigation with multi-column layouts
- **Tablet**: Optimized spacing and adjusted grid layouts
- **Mobile**: Collapsible sidebar and stacked content

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Colors
Update the CSS variables in `styles.css`:
```css
:root {
    --primary: #355FE5;
    --secondary: #232323;
    --accent: #EDF2F7;
}
```

### Charts
Modify chart data and styling in `script.js` within the respective chart initialization functions.

### Content
Update text content, amounts, and user data directly in `index.html`.

## Performance Optimizations

- Optimized images and icons
- Efficient CSS with Tailwind utilities
- Minimal JavaScript footprint
- Lazy loading for charts
- Smooth animations and transitions

## Future Enhancements

- Dark mode support
- Real API integration
- Advanced filtering and search
- Export functionality
- More chart types and data visualizations
- User authentication
- Multi-currency support

## License

This project is for educational and demonstration purposes. Feel free to use and modify as needed.

## Credits

- Design inspiration from modern fintech applications
- Icons by Font Awesome
- Charts powered by Chart.js
- Styling with Tailwind CSS
