# EcoRoute Mobile App

A React Native prototype for eco-friendly route planning, built with Expo and Expo Router.

---

 🚀 Quick Start

1. Install dependencies
   ```bash
   npm install
   ```

2. Run the app
   ```bash
   npx expo start
   ```
   - Open in Android/iOS simulator or Expo Go as prompted.

3. Mock Server
   - No separate mock server is required. Mock data is loaded directly from a local JSON file.

---

 📦 Mock Data
- Location: `assets/routes.json`
- Loading Method:
  - The app imports mock route data directly using ES module import:
    ```js
    import routesData from '@/assets/routes.json';
    ```
  - No network request is made; this ensures instant, reliable access to mock data for development and testing.

---

 🛠️ Design Decisions
- Framework: React Native (Expo) for rapid cross-platform development.
- Navigation: [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing and modern navigation patterns.
- State Management: React hooks and context (no heavy libraries for simplicity).
- Networking: Direct import of mock data; ready for swap to `axios`/`fetch` for real API.
- Project Structure:
  - `/app/(tabs)/` — main screens (Input, Results)
  - `/assets/` — static assets, including `routes.json`
  - `/components/` — reusable UI widgets
  - `/constants/`, `/hooks/` — theming and utilities
- Styling: Consistent spacing, accessible touch targets, and clear feedback for loading/errors.

---

 🚧 Next Steps: Roadmap to Production
To evolve EcoRoute into a production-grade app, several enhancements are recommended:

- Real API Integration: Replace the local JSON import with API calls using `axios` or `fetch`. Implement error handling, loading states, and retry logic for robust networking.
- Caching & Offline Support: Add local caching (e.g., with AsyncStorage or react-query) to improve performance and enable offline access to recent routes.
- Authentication: Integrate secure user authentication (OAuth, JWT, or Firebase Auth) to personalize routes and save user preferences.
- Map Features: Expand the Map Preview screen with real route polylines, live location, and interactive markers using `react-native-maps`.
- Testing: Add unit and integration tests for components, screens, and services to ensure reliability.
- CI/CD: Set up continuous integration and deployment pipelines (e.g., GitHub Actions, Expo EAS) for automated testing and app delivery.
- Accessibility & UX: Further refine accessibility, animations, and polish for a delightful user experience.

By following this roadmap, EcoRoute can become a scalable, secure, and user-friendly app ready for real-world deployment.
