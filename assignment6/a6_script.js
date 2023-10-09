$(document).ready(function() {
    var songsData;
    var showingSongs = false;

    $.getJSON('heavymetal.json', function(data) {
        songsData = data;
    });

    function showSongs() {
        var tableBody = $('#songTableBody');
        tableBody.empty();

        $.each(songsData, function(index, song) {
            var row = $('<tr>');
            row.append('<td>' + song.title + '</td>');
            row.append('<td>' + song.artist + '</td>');
            row.append('<td>' + song.album + '</td>');
            row.append('<td>' + song.year + '</td>');
            row.append('<td><button class="showDescriptionButton metal-button" data-index="' + index + '">Show Description</button></td>');
            tableBody.append(row);
        });

        $('.showDescriptionButton').on('click', function() {
            var index = $(this).data('index');
            var description = songsData[index].description;

            $('#description').text(description);
            $('#popup').fadeIn();
        });
    }

    $('#toggleSongsButton').on('click', function() {
        if (showingSongs) {
            $('#songTableBody').empty();
            $(this).text('Show Songs');
        } else {
            showSongs();
            $(this).text('Hide Songs');
        }
        showingSongs = !showingSongs;
    });

    $('#goBackButton').on('click', function() {
        $('#popup').fadeOut();
    });
});