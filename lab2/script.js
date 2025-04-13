let lastDeletedTask = null;
let activeList = "low";

function switchList(priority) {
    activeList = priority;
  
    document.querySelectorAll(".task-table").forEach((table) => {
      table.style.display = "none";
    });
    document.getElementById(`task-table-${priority}`).style.display = "table";
  
    const buttons = document.querySelectorAll("#priority-menu button");
    buttons.forEach((btn) => btn.classList.remove("active"));
  
    const activeBtn = document.querySelector(`#priority-menu button[onclick="switchList('${priority}')"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }
  

function addTask(taskText = null, createdAt = null, completedAt = null, wasCompleted = false, priority = null) {
    const input = document.getElementById("task-input");
    const prioritySelect = document.getElementById("priority-select");
    const selectedPriority = priority || prioritySelect.value;
    const taskValue = taskText || input.value.trim();

    if (taskValue === "") {
        alert("Nie można dodać pustego zadania.");
        return;
    }

    const created = createdAt || new Date();
    const createdFormatted = formatDate(created);
    const tableBody = document.getElementById(`task-list-${selectedPriority}`);
    const row = document.createElement("tr");

    const taskCell = document.createElement("td");
    taskCell.textContent = taskValue;

    const createdCell = document.createElement("td");
    createdCell.textContent = createdFormatted;

    const completedCell = document.createElement("td");
    completedCell.classList.add("completed-date");
    completedCell.textContent = completedAt ? formatDate(completedAt) : "";

    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-button");

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        const confirmed = confirm("Czy na pewno chcesz usunąć to zadanie?");
        if (confirmed) {
        lastDeletedTask = {
            taskText: taskCell.textContent,
            createdAt: created,
            completedAt: row.classList.contains("completed") ? new Date() : null,
            wasCompleted: row.classList.contains("completed"),
            priority: selectedPriority
        };
        row.remove();
        document.getElementById("undo-button").disabled = false;
        }
    });

    deleteCell.appendChild(deleteBtn);

    row.addEventListener("click", function () {
        row.classList.toggle("completed");
        completedCell.textContent = row.classList.contains("completed") ? formatDate(new Date()) : "";
    });

    row.appendChild(taskCell);
    row.appendChild(createdCell);
    row.appendChild(completedCell);
    row.appendChild(deleteCell);

    if (wasCompleted) {
        row.classList.add("completed");
    }

    tableBody.appendChild(row);
    if (!taskText) input.value = "";
}

function formatDate(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function filterTasks(query) {
    const rows = document.querySelectorAll(`#task-table-${activeList} tbody tr`);
    const lowerQuery = query.toLowerCase();
  
    if (lowerQuery === "") {
      rows.forEach((row) => row.classList.remove("highlighted-task"));
      return;
    }
  
    rows.forEach((row) => {
      const taskText = row.cells[0].textContent.toLowerCase();
      if (taskText.includes(lowerQuery)) {
        row.classList.add("highlighted-task");
      } else {
        row.classList.remove("highlighted-task");
      }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const exampleTasks = [
      { taskText: "Oddać projekt do klienta", priority: "high" },
      { taskText: "Umówić wizytę u dentysty", priority: "high" },
      { taskText: "Zapłacić rachunki za prąd i internet", priority: "high" },
      { taskText: "Spakować dokumenty do urzędu", priority: "high" },
      { taskText: "Przygotować prezentację na spotkanie", priority: "high" },
  
      { taskText: "Kupić składniki na obiad", priority: "medium" },
      { taskText: "Wysłać CV na ofertę pracy", priority: "medium" },
      { taskText: "Uzupełnić dane w profilu LinkedIn", priority: "medium" },
      { taskText: "Zarezerwować bilety na weekend", priority: "medium" },
      { taskText: "Napisać wiadomość do znajomego w sprawie wyjazdu", priority: "medium" },
  
      { taskText: "Przesadzić rośliny", priority: "low" },
      { taskText: "Posprzątać folder „Pobrane”", priority: "low" },
      { taskText: "Zrobić backup zdjęć", priority: "low" },
      { taskText: "Obejrzeć zaległy odcinek serialu", priority: "low" },
      { taskText: "Wypróbować nową aplikację do planowania dnia", priority: "low" }
    ];
  
    exampleTasks.forEach(task => {
      addTask(task.taskText, new Date(), null, false, task.priority);
    });
});
  

document.getElementById("undo-button").addEventListener("click", function () {
    if (!lastDeletedTask) return;
    addTask(
        lastDeletedTask.taskText,
        lastDeletedTask.createdAt,
        lastDeletedTask.completedAt,
        lastDeletedTask.wasCompleted,
        lastDeletedTask.priority
    );
    lastDeletedTask = null;
    document.getElementById("undo-button").disabled = true;
});

switchList(activeList);
