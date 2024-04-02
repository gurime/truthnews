import { db } from "@/app/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export async function getArticle(searchTerm: string) {
try {
// Specify the collections to search in
const collectionNames = ['Apartments','Houses','NewConstruction' ,'Motel','Featured Houses','Featured Apartments'
];
    
// Fetch documents from each collection in parallel
const querySnapshots = await Promise.all(
collectionNames.map(collectionName =>
getDocs(query(collection(db, collectionName)))
)
);
    
// Process the query snapshots and filter articles based on the search term
const data: { collection: string; id: string; }[] = [];

querySnapshots.forEach((querySnapshot, index) => {
querySnapshot.forEach(doc => {
const docData = doc.data();

// Check if the article title includes the search term
if (
  (
    docData.title && docData.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) || (
    docData.state && docData.state.toLowerCase().includes(searchTerm.toLowerCase().trim())
  ) 
) {
  // Add the article data to the result
  data.push({ collection: collectionNames[index], id: doc.id, ...docData });
}
});
});
    
// Return the filtered articles
return data;
} catch (error) {
throw error;
}
}

export const collectionRoutes = {
  Apartments: '/pages/Articles',

};