import fs from 'fs/promises';

const createFolder = async (folderName) => {
    try {
        // coba akses folder
        await fs.access(folderName);
    } catch (error) {
        // kalo gagal, maka buat folder
        await fs.mkdir(folderName);
    }
}

const removeFile = async (file) => {
    try {
        await fs.rm('./' + file);
    } catch (error) {
        // throw (error);
    }
}

export default {
    createFolder,
    removeFile
}