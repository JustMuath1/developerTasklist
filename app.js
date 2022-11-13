window.addEventListener("load", () => {
  const form = document.getElementById("adding-list-form");
  const input = document.querySelector("#new-task-input");
  const listEle = document.querySelector("#tasks-container");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // prevent from refreshing the page
    const task = input.value;

    if (task) {
      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      task_el.appendChild(task_content_el);

      const taskInput_el = document.createElement("textarea");
      taskInput_el.classList.add("text");
      taskInput_el.classList.add("draggable");
      // taskInput_el.classList.add("text-wrap");
      taskInput_el.value = task;
      taskInput_el.setAttribute("readonly", "readonly");
      taskInput_el.setAttribute("draggable", "true");
      task_content_el.appendChild(taskInput_el);

      // taskInput_el.type = "text";

      const taskActions_el = document.createElement("div");
      taskActions_el.classList.add("actions");

      const taskEdit_el = document.createElement("button");
      taskEdit_el.classList.add("edit");
      taskEdit_el.innerHTML = "Edit";

      const taskDelete_el = document.createElement("button");
      taskDelete_el.classList.add("delete");
      taskDelete_el.innerHTML = "Delete";

      taskActions_el.appendChild(taskEdit_el);
      taskActions_el.appendChild(taskDelete_el);

      task_el.appendChild(taskActions_el);

      listEle.appendChild(task_el);

      taskInput_el.style.height = `${taskInput_el.scrollHeight}px`;

      input.value = "";

      taskInput_el.addEventListener("dblclick", (e) => {
        taskInput_el.removeAttribute("readonly");
        taskInput_el.focus();
        taskEdit_el.innerText = "Save";
      });

      // shortcut for editing the task
      taskInput_el.addEventListener("keypress", (e) => {
        if (e.key == "Enter" && e.shiftKey == true) {
          taskInput_el.setAttribute("readonly", "readonly");
          taskEdit_el.innerText = "Edit";
          Swal.fire("Good job!", "You Task has been updated!", "success");
        }
      });

      // press outside the task will return the edit button
      document.body.addEventListener(
        "click",
        (e) => {
          if (e.target.closest(".edit")) return;
          taskInput_el.setAttribute("readonly", "readonly");
          taskEdit_el.innerText = "Edit";
        },
        (once = "true")
      );
      // Edit and Delete functionality
      taskEdit_el.addEventListener("click", () => {
        if (taskEdit_el.innerText.toLocaleLowerCase() === "edit") {
          taskInput_el.removeAttribute("readonly");
          taskInput_el.focus();
          taskEdit_el.innerText = "Save";
        } else {
          taskInput_el.setAttribute("readonly", "readonly");
          taskEdit_el.innerText = "Edit";
          Swal.fire("Good job!", "You Task has been updated!", "success");
        }
      });

      taskDelete_el.addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            listEle.removeChild(task_el);
          }
        });
      });
      Swal.fire("Good job!", "Task Have Been Added!", "success");
    } else if (!task) {
      Swal.fire({
        icon: "error",
        title: "Oops... You didn't enter a task 😒",
      });
    }
  });
});
