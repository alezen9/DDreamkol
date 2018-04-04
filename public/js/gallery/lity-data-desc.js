$(document).on('lity:ready', function(event, $lightbox, $triggeringElement) {
    $lightbox.find('.lity-content').append('<p class="description">' + $triggeringElement.data('desc') + '</p>');
});