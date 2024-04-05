import { db } from "@/app/firebase/firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";

export async function getArticle(id: string): Promise<any | null> {
  const collectionRefs: any[] = [
    doc(db, 'Featured Dashboard', id),
    doc(db, 'Featured Music', id),
  ];

  try {
    for (const ref of collectionRefs) {
      const snapshot: DocumentSnapshot = await getDoc(ref);

      if (snapshot.exists()) {
        return snapshot.data();
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
