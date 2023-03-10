import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import {
  clear,
  successTask,
  updateTask,
} from "../redux/features/task/taskSlice";

export const TaskItem = ({
  username,
  email,
  text,
  completed,
  editedByAdmin,
  id,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(text);
  const { status } = useSelector((state) => state.task);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const update = () => {
    if (!newText) {
      toast.error("задача не должна быть пустой");
      setNewText(text);
      setEditMode(false);
    }
    if (newText === text) setEditMode(false);
    if (newText && newText !== text) {
      try {
        const updatedTask = { id, newText };
        dispatch(updateTask(updatedTask));
        setEditMode(false);
        toast(status);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (status === "Нет доступа") {
      dispatch(logout());
      dispatch(clear());
      navigate("/login");
    }
  }, [status, navigate, dispatch]);

  const success = () => {
    try {
      dispatch(successTask(id));
      toast.success("Задача выполнена!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-[250px] w-[300px] text-gray-200 rounded-md bg-sky-600 mt-10 hover:shadow-lg hover:bg-sky-700 cursor-pointer gap-2 p-2">
      <div className="absolute top-2 left-3">
        {completed ? "выполнено" : "в процессе"}
      </div>
      <div className="absolute bottom-2 right-3">
        {editedByAdmin && <div>отредактировано</div>}
      </div>
      {isAuth && !completed && (
        <button
          className="absolute top-2 right-3 bg-gray-400 hover:bg-green-600 duration-300 px-1 rounded-sm"
          onClick={success}
        >
          выполнено
        </button>
      )}
      <div className="mt-10">Автор: {username}</div>
      <div>Email: {email}</div>
      {!editMode && (
        <div
          className="bg-white/10 p-2 rounded-md overflow-auto mb-4"
          onClick={() => {
            if (isAuth) setEditMode(true);
          }}
        >
          {text}
        </div>
      )}
      {editMode && (
        <textarea
          value={newText}
          autoFocus={true}
          onBlur={update}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Введите текст задачи"
          className="px-2 w-full rounded-md border-2 border-sky-200 bg-gray-400 overflow-auto"
        ></textarea>
      )}
    </div>
  );
};
