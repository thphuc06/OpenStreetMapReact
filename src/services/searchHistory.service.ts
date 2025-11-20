import { collection, addDoc, query, where, orderBy, limit, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
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

  /**
   * Save search history
   * Firestore Structure (FLAT): 
   * searchHistory/
   *   └─ {autoId}/
   *      ├─ userId: "QgFG6JEAirRuCsgDoqrhIPXEPP22"
   *      ├─ searchQuery: "Quận 1"
   *      ├─ location: { lat: 10.775, lon: 106.699 }
   *      ├─ cafesFound: 5
   *      └─ timestamp: November 20, 2025...
   */
  static async saveSearch(
    userId: string,
    searchQuery: string,
    lat: number,
    lon: number,
    cafesFound: number
  ): Promise<void> {
    try {
      console.log(`💾 Saving search: "${searchQuery}" for user ${userId}`);

      const searchData = {
        userId,
        searchQuery,
        location: { lat, lon },
        cafesFound,
        timestamp: Timestamp.now(),
      };

      await addDoc(collection(db, this.COLLECTION_NAME), searchData);

      console.log('✅ Search history saved successfully');
    } catch (error) {
      console.error('❌ Error saving search history:', error);
      // Don't throw - we don't want to break the main search flow
    }
  }

  /**
   * Get user's search history (most recent first)
   * Query by userId field, order by timestamp, limit to 3
   */
  static async getUserHistory(userId: string, maxResults: number = 3): Promise<SearchHistoryItem[]> {
    try {
      console.log(`📚 Loading search history for user: ${userId} (limit: ${maxResults})`);

      const searchHistoryRef = collection(db, this.COLLECTION_NAME);

      // Query: where userId matches, order by timestamp desc, limit to maxResults
      const q = query(
        searchHistoryRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);

      const history = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SearchHistoryItem));

      console.log(`✅ Found ${history.length} search history items:`,
        history.map(h => `"${h.searchQuery}" (${h.cafesFound} cafes)`)
      );

      return history;
    } catch (error) {
      console.error('❌ Error getting search history:', error);
      console.error('Error details:', error);

      // Return empty array instead of throwing
      return [];
    }
  }

  /**
   * Clear all search history for a user (optional - for future use)
   */
  static async clearUserHistory(userId: string): Promise<void> {
    try {
      const searchHistoryRef = collection(db, this.COLLECTION_NAME);
      const q = query(searchHistoryRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      console.log('✅ Search history cleared');
    } catch (error) {
      console.error('❌ Error clearing search history:', error);
      throw error;
    }
  }
}