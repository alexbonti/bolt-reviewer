import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: "AIzaSyBFfotS4afXgJCzg-lFYdLpWCr8APwysBw",
      authDomain: "researcher-assist.firebaseapp.com",
      projectId: "researcher-assist",
      storageBucket: "researcher-assist.firebasestorage.app",
      messagingSenderId: "768886808205",
      appId: "1:768886808205:web:38b2ed9c49dd5287d10cc4",
      measurementId: "G-2CFSDNQ6H5"
    };

    const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);
