import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db = inject(Firestore);

  async getCollection(collectionPath: string, docId: string) {
    const docRef = doc(this.db, collectionPath, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async addDocument(collectionPath: string, data: any) {
    const docRef = await addDoc(collection(this.db, collectionPath), data);
    return docRef.id;
  }

  async updateDocument(
    collectionPath: string,
    docId: string,
    field: string,
    data: any
  ) {
    const ref = doc(this.db, collectionPath, docId);
    await updateDoc(ref, {
      [field]: data,
    });
  }

  async deleteDocument(collectionPath: string, docId: string) {
    await deleteDoc(doc(this.db, collectionPath, docId));
  }

  async deleteField(collectionPath: string, docId: string, field: string) {
    const ref = doc(this.db, collectionPath, docId);
    await updateDoc(ref, {
      [field]: deleteField(),
    });
  }

  async setDocWithId(collectionPath: string, docId: string, data: any) {
    await setDoc(doc(this.db, collectionPath, docId), data);
  }
}
