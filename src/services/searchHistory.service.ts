import { collection, addDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface SearchHistoryItem {
  id?: string;
  userId: string;
  searchQuery: string;
  location: {
    lat: number;
    lon: number;
  };
  cafesFound: number;
  timestamp: Timestamp;
}

export class SearchHistoryService {
  private static COLLECTION_NAME = 'searchHistory';

  static async saveSearch(
    userId: string,
    searchQuery: string,
    lat: number,
    lon: number,
    cafesFound: number
  ): Promise<void> {
    try {
      await addDoc(collection(db, this.COLLECTION_NAME), {
        userId,
        searchQuery,
        location: { lat, lon },
        cafesFound,
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error saving search history:', error);
      throw error;
    }
  }

  static async getUserHistory(userId: string, maxResults: number = 10): Promise<SearchHistoryItem[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SearchHistoryItem));
    } catch (error) {
      console.error('Error getting search history:', error);
      throw error;
    }
  }
}
