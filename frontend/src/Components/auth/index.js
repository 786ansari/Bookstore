import Login from "./authentication/login";
import Signup from "./authentication/signup";
const Authentication = (props) => {
  return (
    <>
      <Login
        isOpenLogin={props?.isOpenLogin}
        setIsOpenSingup={props?.setIsOpenSingup}
        setIsOpenLogin={props?.setIsOpenLogin}
        modalClose={props?.modalClose}
      />
      <Signup
        isOpenSingup={props?.isOpenSingup}
        setIsOpenSingup={props?.setIsOpenSingup}
        setIsOpenLogin={props?.setIsOpenLogin}
        modalClose={props?.modalClose}
      />
    </>
  );
};
export default Authentication;
