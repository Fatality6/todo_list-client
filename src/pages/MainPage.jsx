import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../components/Modal";
import { TaskItem } from "../components/TaskItem";
import { getAllTasks, tasks } from "../redux/features/task/taskSlice";

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [select, setSelect] = useState("0");
  const taskArr = useSelector(tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks(select));
  }, [dispatch, select]);

  //pagination
  const tasksPerPage = 3;
  const totalPages = Math.ceil(taskArr?.length / tasksPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const tasksToDisplay = taskArr?.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-center items-center gap-10 flex-wrap">
      <select
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className="text-gray-600 p-1 rounded-md bg-gray-200"
      >
        <option value="0">Сортировать по:</option>
        <option value="username_asc">Имя по возрастанию</option>
        <option value="username_desc">Имя по убыванию</option>
        <option value="email_asc">Email по возрастанию</option>
        <option value="email_desc">Email по убыванию</option>
        <option value="completed_first">Сначала выполненные</option>
        <option value="in_progress_first">Сначала в процессе</option>
      </select>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {tasksToDisplay?.map((el) => {
          return (
            <TaskItem
              key={el._id}
              username={el.username}
              email={el.email}
              text={el.text}
              completed={el.completed}
              editedByAdmin={el.editedByAdmin}
              id={el._id}
            />
          );
        })}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-sky-600" : "bg-gray-400"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        className="bg-gray-400 py-2 px-4 w-[400px] rounded-md hover:bg-gray-300 duration-300"
        onClick={() => setIsOpen(true)}
      >
        Создать новую задачу
      </button>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        text={text}
        setText={setText}
      />
    </div>
  );
};
