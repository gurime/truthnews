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
"Featured Dashboard", 
"Headline Dashboard", 
"Opinion Dashboard", 
"Politics Dashboard", 
"Music Dashboard", 
"Technology Dashboard", 
"Sports Dashboard", 
"Military Dashboard", 
"Crime Dashboard", 
"Economy Dashboard", 
"Immigration Dashboard", 
"Business Dashboard", 
"Video Games Dashboard", 
"Entertainment Dashboard", 
"Fashion Dashboard", 
"Education Dashboard", 
"United Nations Dashboard", 
"Terrorism Dashboard", 
"World Economy Dashboard", 
"Scandals Dashboard", 
"Mexico Dashboard", 
"South America Dashboard", 
"Europe Dashboard", 
"Asia Dashboard", 
"Africa Dashboard",
//Home Page stops here
'Featured Technology',
'Headline Technology',
'Opinion Technology',
'GPU Technology',
'CPU Technology',
'Cybersecurity Technology',
'Machine Learning Technology',
'Emerging Technology',
'Consumer Technology',
'Green Technology',
'Enterprise Technology',
'Blockchain Technology',
'Health Technology',
'Space Technology',
//Tech page stops here
'Featured Politics',
'Headline Politics',
'Opinion Politics',
'Local Politics',
'National Politics',
'International Politics',
'Election Politics',
'Economic Politics',
'Enviromental Politics',
'Social Politics',
'Education Politics',
//Politics page stops here
'Featured Opinion',
'Headline Opinion',
'Guest Opinion',
'Cultural Opinion',
'Technology Opinion',
'Economic Opinion',
'Enviromental Opinion',
'Social Opinion',
'Educational Opinion',
//Opinion page stops here
'Featured Music',
'Headline Music',
'Opinion Music',
'Industry Music',
'Technology Music',
'Events Music',
'Culture Music',
'Video Music',
'Interview Music',
//Music page stops here
'Featured Sports',
'Headline Sports',
'Opinion Sports',
'Featured Sports',
'Headline Sports',
'Opinion Sports',
"Featured Sports",
"Headline Sports",
"Opinion Sports",
"Stats Sports",
"Fantasy Sports",
"Gear Sports",
"Guest Sports",
"Interview Sports",
"E-Sports",
//Sports page stops here
'Featured Military',
'Headline Military',
'Opinion Military',
'Local Military',
'National Military',
'International Military',
'Technology Military',
'Veterans Military',
//Military page stops here
'Featured Crime',
'Headline Crime',
'Opinion Crime',
" Financial Crime",
" Property Crime",
" Unsolved Crime",
//Crime page stops here
'Featured Economy',
'Headline Economy',
'Opinion Economy',
'Market Economy',
'Goverment Economy',
//Economy page stops here
'Featured Immigration',
'Headline Immigration',
'Opinion Immigration',
" Border Immigration",
" Refugee Immigration",
" Politics Immigration",
" Global Immigration",
//Immigration page stops here
'Featured Business',
'Headline Business',
'Opinion Business',
'Enterprise Business',
'Global Business',
'Small Business',
'Leadership Business',
//Business page stops here
'Featured Video Games',
'Headline Video Games',
'Opinion Video Games',
" Video Games Deals",
"Playstation Gaming",
"Xbox Gaming",
"Nintendo Gaming",
"PC Gaming",
"Mobile Gaming",
"Hardware Gaming",
"Indie Gaming",
//Video Games page stops here
'Featured Entertainment',
'Headline Entertainment',
'Opinion Entertainment',
'Industry Entertainment',
'Fan Entertainment',
'Awards Entertainment',
'Movie Entertainment',
'TV Entertainment',
//Entertainment page stops here
'Featured Fashion',
'Headline Fashion',
'Opinion Fashion',
"Seasonal Trends",
"Celebrity Styles",
"Fashion Events",
"Fashion Reviews",
"Fashion Industry News",
"Fashion Interviews",
"Fashion Technology",
//Fashion page stops here
'Featured Education',
'Headline Education',
'Opinion Education',
"Higher Education",
"K-12 Education",
"Education Funding",
"International Education",
"Special Education",
//Education page stops here
'Featured U.N. (United Nations)',
'Headline U.N.',
'Opinion U.N.',
"Peacekeeping Operations",
"Human Rights Initiatives",
"Climate Action",
"U.N. General Assembly",
"Humanitarian Efforts",
"U.N. Agencies",
"Refugee Assistance",
"Women and Gender Equality",
//U.N. page stops here
'Featured Terrorism',
'Headline Terrorism',
'Opinion Terrorism',
"Global Terrorism Trends",
"Terrorism and Security",
"Terrorist Organizations",
"Terrorism Financing",
"Domestic Terrorism",
"International Terrorism",
"Cyberterrorism",
//Terrism page stops here
'Featured World Economy',
'Headline World Economy',
'Opinion World Economy',
"Global Market Trends",
"International Trade",
"Economic Growth",
"Currency Exchange",
"Economic Forecasts",
"Sustainable Economic Practices",
"Global Inflation",
"Economic Sanctions",
"Global Supply Chain",
//Economy page stops here
'Featured Scandals',
'Headline Scandals',
'Opinion Scandals',
"Political Scandals",
"Corporate Scandals",
"Financial Scandals",
"Sports Scandals",
"Scandals in Education",
"Entertainment Scandals",
"Religious Scandals",
"Healthcare Scandals",
"International Scandals",
"Fashion Scandals",
"Military Scandals",
//Scandals page stops here
'Featured Mexico',
'Headline Mexico',
'Opinion Mexico',
"Mexican Politics",
"Mexican Economy",
"Mexican Culture",
"Tourism in Mexico",
"Mexican Education",
"Mexican Healthcare",
"U.S.-Mexico Relations",
"Mexican Environment",
"Mexican History",
"Mexican Sports",
"Social Issues in Mexico",
//Mexico page stops here
'Featured South America',
'Headline South America',
'Opinion South America',
"South America Politics",
"South America Economy",
"Education in South America",
"South America Education",
"South America Culture",
"South America Technology",
//South America page stops here
'Featured Europe',
'Headline Europe',
'Opinion Europe',
"Europe Politics",
"Europe Economy",
"Europe Technology",
"Europe Sports",
"Europe Culture",
'Eastern Europe',
'Western Europe',
'Northern Europe',
'Southern Europe',

//Europe page stops here
'Featured Asia',
'Headline Asia',
'Opinion Asia',
"Featured Asia",
"Headline Asia",
"Opinion Asia",
"Asia Politics",
"Asia Economy",
"Asia Technology",
"Asia Culture",
"Asia Tourism",
"Asia Education",
"South Asia",
"Southeast Asia",
"East Asia",
"Central Asia",
//Asia page stops here
'Featured Africa',
'Headline Africa',
'Opinion Africa',
"Africa Politics",
"Africa Economy",
"Africa Technology",
"Africa Culture",
"Africa Tourism",
"Africa Education",
"Northern Africa",
"Western Africa",
"Eastern Africa",
"Southern Africa",
"Central Africa",
//Africa page stops here
"Featured Pride",
"Headline Pride",
// Pride page stops here
];
  
    // Fetch documents from each collection in parallel
    const querySnapshots = await Promise.all(
      collectionNames.map((collectionName) =>
        getDocs(query(collection(db, collectionName)))
      )
    );

    // Use a Map to store unique articles, with the article ID as the key
    const uniqueArticlesMap = new Map<string, Article>();

    querySnapshots.forEach((querySnapshot, index) => {
      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        // Check if the article title or owner includes the search term
        if (
          (docData.title &&
            docData.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
          (docData.owner &&
            docData.owner.toLowerCase().includes(searchTerm.toLowerCase().trim()))
        ) {
          const article: Article = {
            id: doc.id,
            title: docData.title,
            owner: docData.owner,
            collection: collectionNames[index]
          };

          // Only add the article if it's not already in the Map
          if (!uniqueArticlesMap.has(article.id)) {
            uniqueArticlesMap.set(article.id, article);
          }
        }
      });
    });

    // Convert the Map values to an array
    return Array.from(uniqueArticlesMap.values());
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
//Home page stops here
FeaturedMusic: '/pages/Articles',
HeadlineMusic: '/pages/Articles',
//Music page stops here
FeaturedTechnology: '/pages/Articles',
HeadlineTechnology: '/pages/Articles',
//Technology page stops here
FeaturedOpinion: '/pages/Articles',
HeadlineOpinion: '/pages/Articles',
//Opinion page stops here
FeaturedPolitics: '/pages/Articles',
HeadlinePolitics: '/pages/Articles',
//Politics page stops here
FeaturedSports: '/pages/Articles',
HeadlineSports: '/pages/Articles',
//Sports page stops here
FeaturedMilitary: '/pages/Articles',
HeadlineMilitary: '/pages/Articles',
//Military page stops here
FeaturedCrime: '/pages/Articles',
HeadlineCrime: '/pages/Articles',
//Crime page stops here
FeaturedEconomy: '/pages/Articles',
HeadlineEconomy: '/pages/Articles',
//Economy page stops here
FeaturedImmigration: '/pages/Articles',
HeadlineImmigration: '/pages/Articles',
//Immigration page stops here
FeaturedBusiness: '/pages/Articles',
HeadlineBusiness: '/pages/Articles',
//Business page stops here
FeaturedVideoGames: '/pages/Articles',
HeadlineVideoGames: '/pages/Articles',
//Video games page stop here
FeaturedEntertainment: '/pages/Articles',
HeadlineEntertainment: '/pages/Articles',
//Entertainment page stopsm here
FeaturedFashion: '/pages/Articles',
HeadlineFashion: '/pages/Articles',
//Fashion page stops here
FeaturedEducation: '/pages/Articles',
HeadlineEducation: '/pages/Articles',
//Education page stops here
FeaturedUN: '/pages/Articles',
HeadlineUN: '/pages/Articles',
//UN page stops here
FeaturedTerrorism: '/pages/Articles',
HeadlineTerrorism: '/pages/Articles',
//Terrorism page stops here
FeaturedWorldEconomy: '/pages/Articles',
HeadlineWorldEconomy: '/pages/Articles',
//World Economy
FeaturedScandals: '/pages/Articles',
HeadlineScandals: '/pages/Articles',
//Scandals page stops here
FeaturedMexico: '/pages/Articles',
HeadlineMexico: '/pages/Articles',
//Mexico page stops here
FeaturedSouthAmerica: '/pages/Articles',
HeadlineSouthAmerica: '/pages/Articles',
//South America page stops here
FeaturedEurope: '/pages/Articles',
HeadlineEurope: '/pages/Articles',
//Europe page stops here
FeaturedAsia: '/pages/Articles',
HeadlineAsia: '/pages/Articles',
//Asia page stops here
FeaturedAfrica: '/pages/Articles',
HeadlineAfrica: '/pages/Articles',
// Africa page stos here
FeaturedPride: '/pages/Articles',
HeadlinePride: '/pages/Articles'
//Pride page stps here
};