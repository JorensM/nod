export const getLastFolderInPath = (path) => {
    return path.split(/\/|\\/g).pop();
}

export const getFirstFolderInPath = (path) => {
    return path.split(/.+\/|\\/g).shift();
}