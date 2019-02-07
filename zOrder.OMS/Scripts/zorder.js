/*Bildirim yapılacak text bu fonksiyona gelir.*/
function zotify(text) {
    $.notify({
        icon: 'fa fa-info',
        message: text
    },
        {
            type: 'info',
            timer: 2000
        });
}
