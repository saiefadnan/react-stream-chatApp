export async function authorization(token){
    console.log('authorize...');
    if (!token) {
        window.location.href = '/login';
    } else {
        try {
            const response = await fetch('/chat', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                window.location.href = '/login';
                throw new Error('Token verification failed');
            }
            history.replaceState({}, '', '/chat');
            const chatPageContent = await response.text();
            document.open();
            document.write(chatPageContent);
            document.close();
        } catch (error) {
            console.error(error);
            window.location.href = '/login';
        }
    }
}
