import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setToken } from '../reducers/token';


export const useToken = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handler = (res) => {
    if (res === "expired") {
      history.replace("/login")
      return;
    } else if (res.data['access_token']) {
      // 토큰값을 새로 받아왔다면 갱신한다
      dispatch(setToken(res.data.access_token))
    }
  }
  return handler
}