# Walkthrough - Tailwind Migration & Monster Toggle

I have successfully migrated the project to use a local Tailwind CSS installation and added a toggle for the Monster Panel.

## Changes

### 1. Tailwind CSS Migration
- **Installed Dependencies**: `tailwindcss@3.4.17`, `postcss`, `autoprefixer`.
- **Configuration**: Created `tailwind.config.js` and `postcss.config.js`.
- **Cleanup**: Removed the Tailwind CDN script and the incorrect `index.css` link from `index.html`.

### 2. Monster Panel Toggle
- **New Feature**: Added a "Monsters" toggle switch in the top-right corner of the login page.
- **Layout Logic**: 
  - When the toggle is **OFF**, the Monster Panel is hidden, and the Login Form expands to full width with a smooth transition.
  - When the toggle is **ON**, the layout returns to the original split view.
- **Styling**: The toggle button has been styled with sharp corners (`rounded-sm`) to match the "square" aesthetic of the rest of the application.
- **Implementation**: Modified `LoginPage.tsx` to manage state and `LoginForm.tsx` to accept a width prop.

### 3. Background Animation
- **Dynamic Background**: The background dots now move diagonally and pulse in size.
- **Implementation**: Added `backgroundMove` and `backgroundPulse` keyframe animations to `global.css`.
- **Effect**: Creates a seamless, infinite, and dynamic background effect.

### 4. Watermark
- **Visual Enhancement**: Added a large, subtle "VN" watermark behind the monsters in the `MonsterPanel`.
- **Styling**: Uses a very large font size (`text-[300px]`), low opacity (`text-black/[0.03]`), and a slight rotation (`-rotate-12`) to create a branded background element.

### 5. API Integration
- **Backend Routing**: Created `.htaccess` and `router.php` in `/api` to handle requests in both production and local development.
- **Frontend Proxy**: Configured `vite.config.ts` to proxy `/api` requests to `http://localhost:8000`.
- **Services**: Implemented `ApiServices.ts` and `AuthServices.ts` in the frontend to handle API communication.

### 6. Installation & Admin Flow
- **Install Page**: Created `InstallPage.tsx` to handle the initial setup (creating the admin user). It matches the site's design style.
- **Admin Page**: Created `AdminPage.tsx` as a simple dashboard for the logged-in admin user.
- **Routing Logic**: Updated `App.tsx` to check the installation status on load.
  - Redirects to `/install` if not installed.
  - Redirects to `/login` if installed but not logged in.
  - Redirects to `/admin` if logged in.
- **Login Integration**: Updated `LoginForm.tsx` to use `AuthService.login` and redirect to the admin dashboard upon success.
- **Monster Panel on Install Page**: Refactored `InstallPage.tsx` to include the `MonsterPanel` and toggle functionality, creating a consistent experience across both Login and Install pages. Extracted form logic to `InstallForm.tsx`.

## Verification Results

### Automated Tests
- `npm run dev` should now serve the application with local Tailwind styles.
- **Note**: You may need to restart your development server for the new PostCSS configuration to take effect.

### Manual Verification
- **Installation Flow**:
  - Ensure the backend is running (`cd ../api && php -S localhost:8000 router.php`).
  - Open the app. If not installed, you should be redirected to `/install`.
  - **Verify Monster Panel**: Check that the monsters are visible on the Install page and the toggle works.
  - Fill out the form and click "Install".
  - You should be redirected to `/login`.
- **Login Flow**:
  - Enter the credentials you just created.
  - Click "Login".
  - You should be redirected to `/admin`.
- **Admin Dashboard**:
  - Verify the dashboard loads and displays the welcome message.
  - Click "Logout" to return to the login page.
