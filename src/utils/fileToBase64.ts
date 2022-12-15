export function convertFileToBase_64(file: any) {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        let imgResult: unknown = null;
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
}