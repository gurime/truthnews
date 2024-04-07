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
const collectionNames = [
'Featured Dashboard',
'Headline Dashboard',
'Opinion Dashboard',
'Politics Dashboard',
'Music Dashboard',
'Technology Dashboard',
'Sports Dashboard',
//Home Page stops here
'Featured Technology',
'Technology',
//Tech page stops here
'Featured Politics',
'Politics',
//Politics page stops here
'Featured Opinion',
'Opinion',
//Opinion page stops here
'Featured Music',
'Music',
//Music page stops here
'Featured Sports',
'Sports',
//Sports page stops here
'Featured Military',
'Military',
//Military page stops here
'Featured Crime',
'Crime',
//Crime page stops here
'Featured Economy',
'Economy',
//Economy page stops here
'Featured Immigration',
'Immigration',
//Immigration page stops here
'Featured Business',
'Business',
//Business page stops here
'Featured Video Games',
'Video Games',
//Video Games page stops here
'Featured Entertainment',
'Entertainment',
//Entertainment page stops here
'Featured Fashion',
'Fashion',
//Fashion page stops here
'Featured Education',
'Education',
//Education page stops here
'Featured U.N. (United Nations)',
'U.N. (United Nations)',
//U.N. page stops here
'Featured Terrorism',
'Terrorism',
//Terrism page stops here
'Featured World Economy',
'World Economy',
//Economy page stops here
'Featured Scandals',
'Scandals',
//Scandals page stops here
'Featured Mexico',
'Mexico',
//Mexico page stops here
'Featured South America',
'South America',
//South America page stops here
'Featured Europe',
'Europe',
//Europe page stops here
'Featured Asia',
'Asia',
//Asia page stops here
'Featured Africa',
'Africa'
//Africa page stops here
];
  
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
  
// Check if the article title or owner includes the search term
if (
(docData.title &&
docData.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
(docData.owner &&
docData.owner.toLowerCase().includes(searchTerm.toLowerCase().trim()))
) 
{uniqueArticles.push({ id: doc.id, title: docData.title, owner: docData.owner ,collection: collectionNames[index] });}
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
HeadlineDashboard: '/pages/Articles',
OpinionDashboard: '/pages/Articles',
PoliticsDashboard: '/pages/Articles',
TechnologyDashboard: '/pages/Articles',
MusicDashboard: '/pages/Articles',
SportsDashboard: '/pages/Articles',
FeaturedMusic: '/pages/Articles',
Music: '/pages/Articles',
FeaturedTechnology: '/pages/Articles',
Technology: '/pages/Articles',
FeaturedOpinion: '/pages/Articles',
Opinion: '/pages/Articles',
FeaturedPolitics: '/pages/Articles',
Politics: '/pages/Articles',
FeaturedSports: '/pages/Articles',
Sports: '/pages/Articles',
FeaturedMilitary: '/pages/Articles',
Military: '/pages/Articles',
FeaturedCrime: '/pages/Articles',
Crime: '/pages/Articles',
FeaturedEconomy: '/pages/Articles',
Economy: '/pages/Articles',
FeaturedImmigration: '/pages/Articles',
Immigration: '/pages/Articles',
FeaturedBusiness: '/pages/Articles',
Business: '/pages/Articles',
FeaturedVideoGames: '/pages/Articles',
VideoGames: '/pages/Articles',
FeaturedEntertainment: '/pages/Articles',
Entertainment: '/pages/Articles',
FeaturedFashion: '/pages/Articles',
Fashion: '/pages/Articles',
FeaturedEducation: '/pages/Articles',
Education: '/pages/Articles',
FeaturedUN: '/pages/Articles',
UN: '/pages/Articles',
FeaturedTerrorism: '/pages/Articles',
Terrorism: '/pages/Articles',
FeaturedWorldEconomy: '/pages/Articles',
WorldEconomy: '/pages/Articles',
FeaturedScandals: '/pages/Articles',
Scandals: '/pages/Articles',
FeaturedMexico: '/pages/Articles',
Mexico: '/pages/Articles',
FeaturedSouthAmerica: '/pages/Articles',
SouthAmerica: '/pages/Articles',
FeaturedEurope: '/pages/Articles',
Europe: '/pages/Articles',
FeaturedAsia: '/pages/Articles',
Asia: '/pages/Articles',
FeaturedAfrica: '/pages/Articles',
Africa: '/pages/Articles'
};