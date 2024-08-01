## Pantry Tracker
This project is a pantry management application that allows users to keep track of pantry items by adding or removing items and updating their quantities. The project uses Next.js as the frontend framework, Material UI for the UI components, and Firebase as the backend service. This app has a responsive design and updates the database as any items are added or removed from the pantry. 

## Features
- Add items to the pantry
- Remove items from the pantry
- Search items from the pantry
  
## How to deploy locally on your computer:

1. Clone this repository
   
3. Set up a new Firebase project on the Firebase console.
   
5. Create a .env file and add these environment variables to your .env file:
    ```bash
  FIREBASE_API_KEY=YOUR_API_KEY
  FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
  FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
  FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
  FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
  FIREBASE_APP_ID=YOUR_APP_ID
  ```
4. Replace the values using values from your Firebase project configuration.

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

