import { db } from "@/app/firebase/firebase";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";

export async function getArticle(id: string): Promise<any | null> {
const collectionRefs: any[] = [
doc(db, 'Featured Dashboard', id),
doc(db, 'Headline Dashboard', id),
doc(db, 'Opinion Dashboard', id),
doc(db, 'Technology Dashboard', id),
doc(db, 'Music Dashboard', id),
doc(db, 'Sports Dashboard', id),
doc(db, 'Politics Dashboard', id),
doc(db, 'Featured Technology', id),
doc(db, 'Technology', id),
doc(db, 'Featured Politics', id),
doc(db, 'Politics', id),
doc(db, 'Featured Opinion', id),
doc(db, 'Opinion', id),
doc(db, 'Featured Sports', id),
doc(db, 'Sports', id),
doc(db, 'Featured Music', id),
doc(db, 'Music', id),
doc(db, 'Featured Military', id),
doc(db, 'Military', id),
doc(db, 'Featured Crime', id),
doc(db, 'Crime', id),
doc(db, 'Featured Economy', id),
doc(db, 'Economy', id),
doc(db, 'Featured Immigration', id),
doc(db, 'Immigration', id),
doc(db, 'Featured Business', id),
doc(db, 'Business', id),
doc(db, 'Featured Video Games', id),
doc(db, 'Video Games', id),
doc(db, 'Featured Entertainment', id),
doc(db, 'Entertainment', id),
doc(db, 'Featured Fashion', id),
doc(db, 'Fashion', id),
doc(db, 'Featured Education', id),
doc(db, 'Fashion', id),
doc(db, 'Featured U.N. (United Nations)', id),
doc(db, 'U.N.', id),
doc(db, 'Featured Terrorism', id),
doc(db, 'Terrorism', id),
doc(db, 'Featured World Economy', id),
doc(db, 'World Economy', id),
doc(db, 'Featured Scandals', id),
doc(db, 'Scandals', id),
doc(db, 'Featured Mexico', id),
doc(db, 'Mexico', id),
doc(db, 'Featured South America', id),
doc(db, 'South America', id),
doc(db, 'Featured Europe', id),
doc(db, 'Europe', id),
doc(db, 'Featured Asia', id),
doc(db, 'Asia', id),
doc(db, 'Featured Africa', id),
doc(db, 'Africa', id),
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
