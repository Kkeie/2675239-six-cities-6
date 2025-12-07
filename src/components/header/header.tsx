import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/action.ts';

type headerProps = {
  isMain: boolean;
}

function Header({isMain}: headerProps) : JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const favoriteCount = useAppSelector((state) => state.allOffers.filter((offer) => offer.isFavorite).length);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isMain && 'header__logo-link--active'}`} to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && user ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#" onClick={handleSignOut}>
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
