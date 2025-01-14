
const checkLocalStorage = (msg_id, checkLocalStorageInterval) => {
    clearInterval(checkLocalStorageInterval);
};

const startInterval = (msg_id) => {
    let checkLocalStorageInterval;

    const promise = new Promise((resolve, reject) => {
        checkLocalStorageInterval = setInterval(() => {
            var currentPayload = checkLocalStorage(msg_id, checkLocalStorageInterval);
            resolve(currentPayload);
        }, 5000);
    });

    return { promise, intervalId: checkLocalStorageInterval };
};

export { startInterval };