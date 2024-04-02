import { db } from "@/app/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
type Article = {
    title: string;
    owner: string;
    id: string;
    collection: string;
  };
export async function getArticle(searchTerm: string): Promise<Article[]> {
    try {
      // Specify the collections to search in
      const collectionNames = ['Featured Dashboard'];
  
      // Fetch documents from each collection in parallel
      const querySnapshots = await Promise.all(
        collectionNames.map((collectionName) =>
          getDocs(query(collection(db, collectionName)))
        )
      );
  
      // Use an array to store unique articles
      const uniqueArticles: Article[] = [];
  
      querySnapshots.forEach((querySnapshot, index) => {
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
  
          // Check if the article title or state includes the search term
          if (
            (docData.title &&
              docData.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
            (docData.owner &&
              docData.owner.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          ) {
            // Add the article data to the array
            uniqueArticles.push({ id: doc.id, title: docData.title, owner: docData.owner ,collection: collectionNames[index] });
          }
        });
      });
  
      return uniqueArticles;
    } catch (error) {
      throw error;
    }
  }
  interface CollectionRoutes {
    [key: string]: string;
  }
  export const collectionRoutes: CollectionRoutes = {
    FeaturedDashboard: '/pages/Articles',
  };