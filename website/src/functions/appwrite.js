const { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, appwriteClient, appwriteDatabases } = require('../index.js');
const { ID, Query } = require('node-appwrite');

async function addProblemCard(description, emailCreator, languageFlag) {
    try {
        let response = await appwriteDatabases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            ID.unique(),
            { description, emailCreator, languageFlag }
        );

        return { status: 1, response: response };
    } catch (AppwriteException) {
        return { status: AppwriteException.code, response: AppwriteException.message };
    }
}

async function listAllProblemsCard(languageFilter) {
    try {
        let response;
        
        if(languageFilter === "0") {
            response = await appwriteDatabases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID);
        } else {
            response = await appwriteDatabases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [
                Query.equal('languageFlag', languageFilter)
            ]);
        }

        return { status: 1, response: response };
    } catch (AppwriteException) {
        return { status: AppwriteException.code, response: AppwriteException.message };
    }
}

module.exports = {
    addProblemCard,
    listAllProblemsCard,
}