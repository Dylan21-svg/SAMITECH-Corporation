import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDocFromServer, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firebaseProjectMeta = {
  projectId: firebaseConfig.projectId,
  databaseId: firebaseConfig.firestoreDatabaseId,
  storageBucket: firebaseConfig.storageBucket,
};
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

function withTimeout<T>(promise: Promise<T>, ms = 4500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Cloud Storage request timed out')), ms)
    ),
  ]);
}

export async function uploadFileToCloudStorage(
  file: File,
  folder = 'samitech-media'
): Promise<string | null> {
  try {
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .slice(0, 80);
    const storageRef = ref(storage, `${folder}/${Date.now()}-${safeName}`);
    await withTimeout(uploadBytes(storageRef, file, { contentType: file.type || 'image/webp' }));
    return await withTimeout(getDownloadURL(storageRef));
  } catch (err) {
    console.warn('Cloud Storage file upload fallback:', err);
    return null;
  }
}

export async function uploadJsonSnapshotToStorage(
  path: string,
  payload: unknown
): Promise<string | null> {
  try {
    const storageRef = ref(storage, path);
    const jsonString = JSON.stringify(payload, null, 2);
    await withTimeout(
      uploadString(storageRef, jsonString, 'raw', {
        contentType: 'application/json',
      })
    );
    return await withTimeout(getDownloadURL(storageRef));
  } catch (err) {
    console.warn('Cloud Storage snapshot fallback:', err);
    return null;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

void testConnection();
