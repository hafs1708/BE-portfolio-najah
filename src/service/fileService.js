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

export default {
    createFolder
}