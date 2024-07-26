import {initializeApp} from "firebase/app";
import { getStorage } from 'firebase/storage';

import serviceAccount from './permissions.json' with { type: 'json' };


const app = initializeApp(serviceAccount);
const storage = getStorage(app);

export { storage };