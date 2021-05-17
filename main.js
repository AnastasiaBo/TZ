class UserService {
    /* Не нужно объявлять переменные var username, var password внутри класса, т.к.для того, чтобы сконструировать класс нужно указать параметры в свойстве constructor.
Если подразумевалось то, что поля должны быть приватными, то нужно использовать префикс #; */

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    //В методе get username нужно обратиться к свойству через this, т.к.контекстом вызова является новый объект;
    get username() {
        return this.username;
    }
    //throw "You are not allowed to get password" должен быть записан в формате: throw new error('You are not allowed to get password'); 
    get password() {
        throw "You are not allowed to get password";
    }

    //Нужно указать параметры для дальнейшей передачи данных и использовать бэктики в url

    static authenticate_user(usernameUrl, passwordUrl) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://examples.com/api/user/authenticate?username=${usernameUrl}&password=${passwordUrl}`, true);
        xhr.responseType = 'json';
        // Для установки соединения необходимо послать запрос
        xhr.send();


        //const result = false заменить на let, т.к.в условии меняется значение
        let result = false;


        // В условии xhr.status !== '200' убрать кавычки

        xhr.onload = function () {
            if (xhr.status !== 200) {
                result = xhr.response;
            } else {
                result = true;
            }
        };

        return result;
    }
};


//Не использовать form, т.к. есть id у login
$('#login').click(function () {

    //Для дальнейшей работы кода нужно получить значения из input
    var username = $('#username').val();
    var password = $('#password').val();
    // Нельзя вызвать UserService без new
    const user = new UserService(username, password);
    var res = user.authenticate_user();
    if (res == true) {
        document.location.href = '/home';
    } else {
        alert(res.error);
    }
}
}); //лишние скобки
