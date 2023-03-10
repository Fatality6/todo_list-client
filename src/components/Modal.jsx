import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createTask } from "../redux/features/task/taskSlice";
import { validate } from "../utils/validate";

export const Modal = ({
  isOpen,
  setIsOpen,
  username,
  setUsername,
  email,
  setEmail,
  text,
  setText,
}) => {
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  const handlerSubmit = () => {
    const errors = validate(username, email, text);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        dispatch(createTask({ username, email, text }));
        setIsOpen(false);
        setUsername("");
        setEmail("");
        setText("");
        toast("Задача создана");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (formErrors.username) toast.error(formErrors.username);
    if (formErrors.email) toast.error(formErrors.email);
    if (formErrors.text) toast.error(formErrors.text);
  }, [formErrors]);

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30">
          <Dialog.Panel className="flex flex-col justify-center items-center gap-2 bg-sky-100 p-2 rounded-lg h-[350px] w-[350px]">
            <Dialog.Title className="text-sky-800 text-lg ">
              Создание новой задачи
            </Dialog.Title>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-8 p-2 w-full"
            >
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ваше имя"
                className={`px-2 rounded-md w-full border-2 ${formErrors.username ? "border-red-500" : ""}`}
              ></input>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                className={`px-2 rounded-md border-2 ${formErrors.email ? "border-red-500" : ""}`}
              ></input>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст задачи"
                className={`px-2 rounded-md border-2 h-[100px] ${formErrors.text ? "border-red-500" : ""}`}
              ></textarea>
              <div className="flex justify-center">
                <button
                  onClick={handlerSubmit}
                  className="bg-sky-600 text-white py-1 px-2 rounded-md hover:bg-sky-500 duration-300"
                >
                  Создать
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
