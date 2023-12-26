import { BehaviorSubject } from "rxjs";

export class UserServiceStub {
    isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    username: BehaviorSubject<string> = new BehaviorSubject<string>('');

    userRegister = () => { };
    userLogin = () => { };
    userLogout = () => { };
    userDataChange = () => { };
    userPasswordChange = () => { };
    getUserData = () => { };
    setUserLoggedIn = () => { };
    setUsername = () => { };
    getUserToken = () => { };
};
