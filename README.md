# SupportFlow - Conversational AI Dashboard

A modern, mobile-optimized dashboard for AI-powered customer support management.

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Agent Management**: Create and manage AI agents with custom settings
- **Call History**: View detailed conversation logs and analytics
- **Knowledge Base**: Manage AI agent knowledge and responses
- **Phone Numbers**: Configure phone number integrations
- **Real-time Analytics**: Dashboard with call metrics and performance data

## Mobile Optimization

This application has been fully optimized for mobile devices with:

### 📱 Mobile-First Design
- Responsive layouts that adapt from mobile to desktop
- Touch-friendly interactions with minimum 44px touch targets
- Optimized typography and spacing for mobile screens
- Hardware-accelerated animations and smooth scrolling

### 🎯 Mobile Navigation
- Collapsible hamburger menu on mobile devices
- Slide-out navigation with overlay for mobile
- Desktop sidebar navigation for larger screens
- Breadcrumb navigation for better UX

### 📊 Responsive Components
- **Dashboard**: 4-column grid on desktop, stacked on mobile
- **Agent Management**: List/detail view with mobile-optimized navigation
- **Call History**: Card-based layout for mobile, table layout for desktop
- **Charts**: Horizontal scrolling and responsive scaling
- **Forms**: Mobile-optimized input fields with proper keyboard handling

### � Technical Optimizations
- **Viewport Configuration**: Proper mobile viewport settings
- **Touch Optimization**: Disabled unwanted zoom and tap highlights
- **Performance**: Optimized for 60fps on mobile devices
- **iOS Compatibility**: Handles iPhone notch and safe areas
- **PWA Ready**: Can be installed as a mobile app

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd supportflow-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

```bash
# Start development server with hot reload
npm run dev

# The app will be available at http://localhost:3000
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom mobile-first breakpoints
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Language**: TypeScript for type safety
- **Build Tool**: Next.js built-in bundler

## Mobile Testing

The application has been optimized and tested for:

- **iOS Safari**: 12.0+
- **Android Chrome**: 80+
- **Samsung Internet**: 10.0+
- **Mobile Firefox**: 68+

### Testing Guidelines

1. Test on various device sizes (320px to 768px width)
2. Verify touch targets are at least 44px
3. Check horizontal scrolling on narrow screens
4. Validate text readability at different zoom levels
5. Test orientation changes
6. Verify iOS Safari compatibility

## Performance

- **First Contentful Paint**: < 2.5s on 3G
- **Largest Contentful Paint**: < 4.0s on 3G
- **Cumulative Layout Shift**: < 0.1
- **Touch Responsiveness**: < 100ms

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/       # Dashboard layout group
│   ├── globals.css        # Global styles with mobile optimizations
│   └── layout.tsx         # Root layout with mobile viewport
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Sidebar, MobileNavigation)
│   ├── dashboard/         # Dashboard-specific components
│   ├── agents/            # Agent management components
│   ├── call-history/      # Call history components
│   ├── knowledge-base/    # Knowledge base components
│   └── phone-numbers/     # Phone number management components
└── lib/                   # Utility functions
```

## Configuration

### Tailwind CSS
The project uses custom Tailwind configuration with mobile-first breakpoints:

```typescript
screens: {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
  // Mobile-first breakpoints
  'mobile': {'max': '767px'},
  'tablet': {'min': '768px', 'max': '1023px'},
  'desktop': {'min': '1024px'},
}
```

### Mobile Viewport
```typescript
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple devices
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue on the GitHub repository.

---

**Note**: This application is optimized for mobile devices and provides a seamless experience across all screen sizes. The mobile-first approach ensures excellent performance and usability on smartphones and tablets.
