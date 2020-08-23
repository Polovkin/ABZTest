var formData = new FormData();
var fileField = document.querySelector('input[type="file"]');

formData.append('position_id', 2)
formData.append('name', 'Jhon')
formData.append('email', 'Jhon@gmail.com')
formData.append('phone', '+380955388485')
formData.append('photo', fileField.files[0]);

fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
    {
        method: 'POST',
        body: formData,
        headers: {
            'Token': token,
        },
    })
    .then(function (response) {
        return response.json();
    }).then(function (data) {
    console.log(data);
    if (data.success) {
    } else {
    }
}).catch(function (error) {

    console.log(error);
});
