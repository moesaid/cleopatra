# Navbar Component

A responsive navigation bar component with dropdown menus for user profile, notifications, and messages.

## Features

- 🎨 Responsive design (mobile & desktop)
- 📱 Mobile toggle menu
- 🔔 Notification dropdown
- 💬 Messages dropdown
- 👤 User profile dropdown
- ⚡ Smooth animations

## Usage

### Import

```javascript
import { initNavbar } from '@/components/ui/navbar';

// Initialize the navbar
initNavbar();
```

### HTML Template

Include the navbar HTML in your page:

```html
<!-- Include navbar.html or copy the markup -->
```

### Styles

Import the navbar styles:

```scss
@import '@/components/ui/navbar/navbar.scss';
```

## Configuration

The navbar can be customized by modifying the HTML template:

- **Logo**: Update the logo image source
- **User Info**: Change user name and avatar
- **Menu Items**: Add or remove navigation links
- **Dropdowns**: Customize notification and message items

## Dependencies

- Tailwind CSS
- Font Awesome icons (for icons)

## Standalone Usage

This component can be used independently in any project:

1. Copy the `navbar/` folder to your project
2. Import the JavaScript and styles
3. Include the HTML template
4. Initialize with `initNavbar()`

## Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="navbar.css">
</head>
<body>
  <!-- Include navbar HTML here -->
  
  <script type="module">
    import { initNavbar } from './navbar.js';
    initNavbar();
  </script>
</body>
</html>
```
