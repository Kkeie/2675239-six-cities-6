import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
