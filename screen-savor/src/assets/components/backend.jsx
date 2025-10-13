import { Client, Databases, ID, Query } from 'appwrite'



const client = new Client()
    .setEndpoint()
    .setProject()

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use Appwrite SDK to check if the search term exists in the database
    try {
        const result = await database.listDocuments(, , [
            Query.equal('searchTerm', searchTerm),
        ])

        // 2. If it does, update the count
        if(result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(, , doc.$id, {
                count: doc.count + 1,
            })
            // 3. If it doesn't, create a new document with the search term and count as 1
        } else {
            await database.createDocument(, , ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    } catch (error) {
        console.error(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(, , [
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}