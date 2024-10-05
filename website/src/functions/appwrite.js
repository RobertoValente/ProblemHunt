const { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, appwriteClient, appwriteDatabases } = require('../index.js');
const { ID, Query } = require('node-appwrite');
const cryto = require('crypto');

async function addProblemCard(description, emailCreator, languageFlag) {
    try {
        let tempSecret = cryto.randomBytes(16).toString('hex');
        
        let response = await appwriteDatabases.createDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            ID.unique(),
            { 
                description: description, 
                emailCreator: emailCreator, 
                languageFlag: languageFlag, 
                secret: tempSecret
            }
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
            response = await appwriteDatabases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [
                Query.orderDesc("$createdAt")
            ]);
        } else {
            response = await appwriteDatabases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [
                Query.equal('languageFlag', languageFilter),
                Query.orderDesc("$createdAt")
            ]);
        }

        return { status: 1, response: response };
    } catch (AppwriteException) {
        return { status: AppwriteException.code, response: AppwriteException.message };
    }
}

async function likeProblemCard(documentId) {
    try {
      
        let response = await appwriteDatabases.updateDocument(
            APPWRITE_DATABASE_ID,
            APPWRITE_COLLECTION_ID,
            documentId,
            {
                likes:  +1,
            }
        );

        return { status: 1, response: response };
    } catch (AppwriteException) {
        return { status: AppwriteException.code, response: AppwriteException.message };
    }
}

module.exports = {
    addProblemCard,
    listAllProblemsCard,
    likeProblemCard,
}