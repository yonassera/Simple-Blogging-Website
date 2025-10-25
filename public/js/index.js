const addPostPanel = document.querySelector(".add-post-panel-m");
const editPostPanel = document.querySelector(".edit-post-panel");
const deletePostPanel = document.querySelector(".confirm-delete-panel");
const deleteBtn = document.querySelectorAll(".delete-btn");
const cancel = document.querySelectorAll(".cancel");
const editBtn = document.querySelectorAll(".edit-btn");
const addPost = document.querySelectorAll(".post-btn");
const navBar = document.querySelector(".page-link");
const overlay = document.querySelector(".overlay");
const navBtn = document.getElementById("nav-btn");
const titleBox = document.getElementById("title-e");
const postBox = document.getElementById("post-e");
const authorBox = document.getElementById("author-e");
const submitEdited = document.getElementById("submit-edited");
const editingForm = document.getElementById("edit-form");
const yesDelete = document.getElementById("yes-delete");
const deletingForm = document.getElementById("delete-form");
const html = document.documentElement;
const body = document.body;

const todoDeletingForm = document.querySelectorAll(".todoDeletingForm");
const delTodo = document.querySelectorAll(".del-todo");

let activePanel = null;
let bodyScroll = null;
let htmlScroll = null;
let id = null;

function lockScroll() {
  html.classList.add("no-scroll");
  body.classList.add("no-scroll");
}

function unlockScroll() {
  html.classList.remove("no-scroll");
  body.classList.remove("no-scroll");
}

function onlyOverlayPressed(event) {
  if (event.target === overlay) {
    resetOverlay();
  }
}

function resetOverlay() {
  htmlScroll = html.classList.contains("no-scroll");
  bodyScroll = body.classList.contains("no-scroll");

  if (overlay.classList.contains("active")) overlay.classList.remove("active");
  if (overlay.classList.contains("whiten")) overlay.classList.remove("whiten");
  if (activePanel) activePanel.classList.remove("active");
  if (htmlScroll || bodyScroll) unlockScroll();
  overlay.removeEventListener("click", onlyOverlayPressed);
}

navBtn.addEventListener("click", () => {
  resetOverlay();
  overlay.classList.add("active");
  navBar.classList.add("active");
  overlay.addEventListener("click", onlyOverlayPressed);
  activePanel = navBar;
  lockScroll();
});

addPost.forEach((btn) => {
  btn.addEventListener("click", () => {
    resetOverlay();
    overlay.classList.add("active");
    addPostPanel.classList.add("active");
    overlay.classList.add("whiten");
    activePanel = addPostPanel;
    lockScroll();
  });
});

editBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    resetOverlay();
    overlay.classList.add("active");
    editPostPanel.classList.add("active");
    activePanel = editPostPanel;
    overlay.addEventListener("click", onlyOverlayPressed);
    lockScroll();

    titleBox.value = event.currentTarget.dataset.title;
    postBox.value = event.currentTarget.dataset.post;
    authorBox.value = event.currentTarget.dataset.author;
    id = event.currentTarget.dataset.id;
  });
});

deleteBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    resetOverlay();
    overlay.classList.add("active");
    deletePostPanel.classList.add("active");
    activePanel = deletePostPanel;
    overlay.addEventListener("click", onlyOverlayPressed);
    lockScroll();

    id = event.currentTarget.dataset.id;
  });
});

delTodo.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    id = event.currentTarget.dataset.id;
    if (id)
      todoDeletingForm.forEach((form) => {
        form.action = `/delete/todo/${id}`;
      });
  });
});

submitEdited.addEventListener("click", () => {
  if (id) editingForm.action = `/edit/post/${id}`;
});

yesDelete.addEventListener("click", () => {
  if (id) deletingForm.action = `/delete/post/${id}`;
});

cancel.forEach((btn) => {
  btn.addEventListener("click", resetOverlay);
});
