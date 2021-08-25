import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setToken } from "reducers/token";

export const useToken = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handler = (res) => {
    if (!!!res) return
    if (res === "expired") {
      // refresh token만료
      history.replace("/");
      return "fail"
    } else if (res === "error") {
      alert("잘못된 접근입니다.");
      return "fail"
    } else if (res.status === 201) {
      // 토큰값을 새로 받아왔다면 갱신한다
      dispatch(setToken(res.data.access_token));
    }
  };
  return handler;
};
