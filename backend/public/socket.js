const url = 'https://realtimechat-7aqr.onrender.com';

export function getSocketId() {
    const socket = io('http://localhost:4000');
    return new Promise((resolve, reject) => {
        if (socket) {
            socket.on('connect', () => {
                resolve(socket.id);
            });

            socket.on('connect_error', (error) => {
                reject(new Error('Socket connection failed: ' + error.message));
            });
        } else {
            reject(new Error('Socket instance is not initialized.'));
        }
    });
}