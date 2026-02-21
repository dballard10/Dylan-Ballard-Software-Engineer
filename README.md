# Dylan Ballard - Portfolio

Portfolio and job search tool for Dylan Ballard, Full-Stack Software Engineer. Built with React, TypeScript, and Vite.

## 🚀 Features

- **Modern Tech Stack**: Built with React, TypeScript, and Vite for component-based architecture and type safety
- **Professional Design**: Clean, dark theme with gradient accents and company/university logos
- **Logo Integration**: Custom logos for companies/universities, real technology logos from Simple Icons CDN
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, animations, and hover effects
- **Contact Form**: Functional contact form with email integration
- **Accessibility**: Keyboard navigation and focus management
- **Performance**: Optimized assets and fast loading

## 🛠️ Built With

- **React**: Component-based UI library for building user interfaces
- **TypeScript**: Type-safe JavaScript with enhanced development experience
- **Vite**: Modern build tool for fast development and optimized builds
- **CSS3**: Modern styling with Flexbox and CSS Grid
- **Lucide Icons**: Beautiful, consistent iconography
- **Inter Font**: Professional typography from Google Fonts
- **Professional Logos**: Custom SVG logos for companies/universities, real technology logos via CDN

## 📱 Sections

### Hero Section

- Professional introduction with tagline "Build.Deploy.Scale."
- Call-to-action buttons for contact and resume download
- Animated profile placeholder

### About

- Brief professional summary and personal introduction

### Experience

- Timeline layout with company logos (Eigennet, Freddie Mac)
- Detailed bullet points of achievements and responsibilities
- Professional logo integration for visual appeal

### Education

- University logos (George Mason University, James Madison University)
- Degree information with dates
- Clean card-based layout

### Skills & Technologies

- Real technology logos from Simple Icons CDN (React, TypeScript, Python, AWS, etc.)
- Organized by category: Frontend, Backend, Cloud & DevOps, Tools
- Interactive skill tags with hover effects that reveal original logo colors

### Projects

- Featured projects: Cinetik and Chess Opening Guide
- Technology stack visualization with real logos from Simple Icons CDN
- Project descriptions with live demo links
- Hover effects reveal original technology logo colors

### Contact

- Contact information with social links
- Functional contact form that opens default email client
- Location and professional links

## 🎨 Design Features

- **Color Scheme**: Dark theme with blue (#3b82f6) and purple (#8b5cf6) accents
- **Typography**: Inter font family for clean, readable text
- **Logo Integration**: Professional SVG logos for companies, universities, and technologies
- **Animations**: Smooth scroll animations and hover effects
- **Layout**: CSS Grid and Flexbox for responsive design
- **Icons**: Lucide icon library for consistent UI elements

## 📁 File Structure

```
├── index.html                    # Main HTML file (React root)
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Main React application component
│   ├── styles.css               # CSS styling and responsive design
│   ├── components/              # React components
│   │   ├── Hero.tsx            # Hero section component
│   │   ├── About.tsx           # About section component
│   │   ├── Experience.tsx      # Experience section component
│   │   ├── Education.tsx       # Education section component
│   │   ├── Skills.tsx          # Skills section component
│   │   ├── Projects.tsx        # Projects section component
│   │   ├── Contact.tsx         # Contact form component
│   │   └── Footer.tsx          # Footer component
│   └── hooks/                   # Custom React hooks
│       ├── useScrollAnimations.ts # Scroll animation hook
│       └── useNotification.ts   # Notification system hook
├── tsconfig.json                # TypeScript configuration
├── assets/
│   └── logos/
│       ├── companies/           # Company logos (Eigennet, Freddie Mac)
│       └── universities/        # University logos (GMU, JMU)
├── public/
│   └── DylanBallardResume2025.pdf  # Resume PDF
├── package.json                 # Project dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Documentation
```

## 📧 Contact Form

The contact form uses a mailto: link approach that:

- Validates form input client-side
- Opens the user's default email client
- Pre-fills subject and body with form data
- Shows success/error notifications

For production use, consider integrating with:

- Netlify Forms
- Formspree
- EmailJS
- Custom backend API

## 🎯 Customization

### Adding New Company/University Logos

1. Create SVG files in the appropriate `assets/logos/` subdirectory
2. Update the HTML to reference the new logo
3. Adjust CSS if needed for sizing and positioning

### Technology Logos

Technology logos are automatically loaded from the Simple Icons CDN:

- Real, official logos from major tech companies
- Always up-to-date and consistent styling
- Replace the CDN URLs in the HTML if you want different technology logos

### Colors

Modify the CSS custom properties in `src/styles.css`:

```css
:root {
  --primary-blue: #3b82f6;
  --primary-purple: #8b5cf6;
  --dark-bg: #0f172a;
  --card-bg: #1e293b;
}
```

### Content

Update personal information in `index.html`:

- Hero section text and tagline
- Experience and education details
- Skills and project information
- Contact information

### Styling

Customize the design by modifying `src/styles.css`:

- Section backgrounds and spacing
- Typography and font sizes
- Animation timings and effects
- Responsive breakpoints

## 📱 Mobile Optimization

The website is fully responsive with:

- Mobile-first CSS approach
- Flexible grid layouts that stack on mobile
- Touch-friendly button sizes
- Optimized typography scaling
- Logo layouts that adapt to smaller screens

## 🔧 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- JavaScript ES6+ features used
- Progressive enhancement approach

## 🚀 Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel

1. Connect your repository to Vercel
2. Build settings are automatically detected

### GitHub Pages

1. Run `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 🤝 Acknowledgments

- Logo designs: Custom SVG logos for professional appearance
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Color palette inspired by Tailwind CSS
- Built with [Vite](https://vitejs.dev/) for modern development experience

---

**Dylan Ballard** - Software Engineer  
📧 dylanballard55@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/dballard55) | [GitHub](https://github.com/dballard10)  
📍 Reston, VA
