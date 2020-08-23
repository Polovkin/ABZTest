var formData = new FormData();
// file from input type='file'
var fileField = document.querySelector('input[type="file"]');
formData.append('position_id', 2);
formData.append('name', 'Jhon');
formData.append('email', 'Jhon@gmail.com');
formData.append('phone', '+380955388485');
formData.append('photo', fileField.files[0]);
let a;
a.fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
    {
        method: 'POST',
        body: formData,
        headers: {
            'Token': token, // get token with GET api/v1/token method
        },
    })
    .then(function (response) {
        return response.json();
    }).then(function (data) {
    console.log(data);
    if (data.success) { // process success response
    } else { // proccess server errors
    }
}).catch(function (error) {
// proccess network errors
    console.log(error);
});
