function displayResults(responseJson) {
    $('.results').empty();
    console.log(responseJson);
    for (let i = 0; i < responseJson.length; i++) {
        $('.results').append(
            `<ul class="resultsList">
                <li><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></li>
            </ul>`
        )
    };
    $('.results').removeClass('hidden');
}

function getResults(searchTerm) {
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.results').html(`<p id="js-error-message" class="error-message">Something went wrong: ${err.message}</p>`)
            $('.results').removeClass('hidden');
        });      
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#userSearch').val();
        getResults(searchTerm);
        $('#userSearch').val("");
    })
}

$(watchForm);