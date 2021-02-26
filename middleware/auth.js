export default ({ store, redirect, route }) => {
    const name = route.name;
    if(!store.getters['user/userIsLoggedIn']) {
        redirect(`/login?frompage=${name}`);
    }
}