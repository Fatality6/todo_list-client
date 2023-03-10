import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to={"/"}>
        <span className="flex justify-center items-center text-lg text-white p-1">
          To Do List
        </span>
      </Link>

      <div className="flex justify-center item-center text-xs text-white">
        {isAuth ? (
          <div>
            <span className="mx-6">Admin</span>
            <button
              className="bg-gray-600 px-4 py-2 rounded-sm"
              onClick={logoutHandler}
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="bg-gray-600 px-4 py-2 rounded-sm">
            войти
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
