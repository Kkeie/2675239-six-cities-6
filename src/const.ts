export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
