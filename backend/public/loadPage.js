export function initUrl(page){
    const newUrl = `/${page.replace(/\.html$/, '')}`;
    history.pushState({}, '', newUrl);
}

export function restUrl(page) {
    const newPage = page;
    const newUrl = `/${page.replace(/\.html$/, '')}`;
    console.log('load url....');
    history.pushState({}, '', newUrl);
    window.location.href = `/${newPage}`;
}


export function loadUrl(page,pushState=true) {
    const newPage = page;
    const newUrl = `/${page.replace(/\.html$/, '')}`;
    if(pushState)history.pushState({}, '', newUrl);
    window.location.href = `/${newPage}`;
}
 export function updateUrl(page){
    console.log('update url.....');
    if (page === 'index.html') page = 'home.html';
    const newUrl = `/${page.replace(/\.html$/, '')}`;
    if (window.location.pathname !== newUrl) {
        history.pushState({}, '', newUrl);
    }
 }

