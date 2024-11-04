import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA2v_MefrbY01EDxCNGTfmX8_wPCrQSnb4',
  authDomain: 'app-tareas-e8e08.firebaseapp.com',
  databaseURL: 'https://app-tareas-e8e08-default-rtdb.firebaseio.com',
  projectId: 'app-tareas-e8e08',
  storageBucket: 'app-tareas-e8e08.firebasestorage.app',
  messagingSenderId: '664035128537',
  appId: '1:664035128537:web:5cc731df43a7f58073bac8',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
