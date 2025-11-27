import { getLastFolderInPath } from "./util.js";
import BaseClient from "./client.js";

const folders = [
    {
        fullPath: 'a/b/c/d',
        name: 'd'
    },
    {
        fullPath: 'd/f/e',
        name: '123'
    }
]

const folder = BaseClient.getSharedFolderByNetworkPath(folders, 'd');

console.log(BaseClient.deriveSharedFileLocalPathByNetworkPath(folder.fullPath, 'd/e/f/a'));