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
      console.log(`💾 Saving search: "${searchQuery}" for user ${userId}`);
      console.log(`🔑 Saving with userId: "${userId}" (type: ${typeof userId})`);

      const searchData = {
        userId,
        searchQuery,
        location: { lat, lon },
        cafesFound,
        timestamp: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), searchData);

      console.log(`✅ Search history saved successfully with ID: ${docRef.id}`);
      console.log(`📝 Saved data:`, { userId, searchQuery, cafesFound });
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
      console.log(`🔑 userId type: ${typeof userId}, length: ${userId?.length}`);

      const searchHistoryRef = collection(db, this.COLLECTION_NAME);

      // TEMPORARY: Query without orderBy to test if index is the issue
      // TODO: Restore orderBy after creating Firebase index
      const q = query(
        searchHistoryRef,
        where('userId', '==', userId),
        // orderBy('timestamp', 'desc'),  // ← COMMENTED OUT - needs composite index
        limit(maxResults)
      );

      console.log('🔍 Executing Firestore query...');
      const querySnapshot = await getDocs(q);
      console.log(`📦 Query returned ${querySnapshot.size} documents`);

      const history = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SearchHistoryItem));

      // TEMPORARY: Sort in memory since we can't use orderBy without index
      history.sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA; // DESC (newest first)
      });

      console.log(`✅ Found ${history.length} search history items:`,
        history.map(h => `"${h.searchQuery}" (${h.cafesFound} cafes)`)
      );

      return history;
    } catch (error: any) {
      console.error('❌ Error getting search history:', error);

      // Check if it's a Firebase index error
      if (error?.message?.includes('index')) {
        console.error('🔥 FIREBASE INDEX REQUIRED!');
        console.error('Create index at: https://console.firebase.google.com/project/weather-f2f43/firestore/indexes');
        console.error('Index needed: Collection=searchHistory, Fields=[userId(Asc), timestamp(Desc)]');
      }

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

      const deletePromises = querySnapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);

      console.log('✅ Search history cleared');
    } catch (error) {
      console.error('❌ Error clearing search history:', error);
      throw error;
    }
  }
}