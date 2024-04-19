var main = function (toDoObjects) {
  "use strict";

  var toDos = toDoObjects.map(function (toDo) {
    return toDo.description;
  });

  Array.from(document.querySelectorAll(".tabs a span")).forEach(function (
    element
  ) {
    element.addEventListener("click", function () {
      var content, input, button, i;

      Array.from(document.querySelectorAll(".tabs a span")).forEach(function (
        el
      ) {
        el.classList.remove("active");
      });
      element.classList.add("active");
      document.querySelector("main .content").innerHTML = "";

      if (
        element.parentElement === document.querySelector(".tabs a:nth-child(1)")
      ) {
        content = document.createElement("ul");
        for (i = toDos.length - 1; i >= 0; i--) {
          content.appendChild(document.createElement("li")).textContent =
            toDos[i];
        }
      } else if (
        element.parentElement === document.querySelector(".tabs a:nth-child(2)")
      ) {
        content = document.createElement("ul");
        toDos.forEach(function (todo) {
          content.appendChild(document.createElement("li")).textContent = todo;
        });
      } else if (
        element.parentElement === document.querySelector(".tabs a:nth-child(3)")
      ) {
        var tags = [];

        toDoObjects.forEach(function (toDo) {
          toDo.tags.forEach(function (tag) {
            if (tags.indexOf(tag) === -1) {
              tags.push(tag);
            }
          });
        });
        console.log(tags);

        var tagObjects = tags.map(function (tag) {
          var toDosWithTag = [];

          toDoObjects.forEach(function (toDo) {
            if (toDo.tags.indexOf(tag) !== -1) {
              toDosWithTag.push(toDo.description);
            }
          });

          return { name: tag, toDos: toDosWithTag };
        });

        tagObjects.forEach(function (tag) {
          var tagName = document.createElement("h3");
          tagName.textContent = tag.name;
          content = document.createElement("ul");

          tag.toDos.forEach(function (description) {
            var li = document.createElement("li");
            li.textContent = description;
            content.appendChild(li);
          });

          document.querySelector("main .content").appendChild(tagName);
          document.querySelector("main .content").appendChild(content);
        });
      } else if (
        element.parentElement === document.querySelector(".tabs a:nth-child(4)")
      ) {
        input = document.createElement("input");
        input.className = "description";
        var inputLabel = document.createElement("p");
        inputLabel.textContent = "Description: ";
        var tagInput = document.createElement("input");
        tagInput.className = "tags";
        var tagLabel = document.createElement("p");
        tagLabel.textContent = "Tags: ";
        button = document.createElement("button");
        button.textContent = "+";

        button.addEventListener("click", function () {
          var description = input.value,
            tags = tagInput.value.split(",");

          toDoObjects.push({ description: description, tags: tags });

          toDos = toDoObjects.map(function (toDo) {
            return toDo.description;
          });

          input.value = "";
          tagInput.value = "";
        });

        content = document.createElement("div");
        content.appendChild(inputLabel);
        content.appendChild(input);
        content.appendChild(tagLabel);
        content.appendChild(tagInput);
        content.appendChild(button);
      }

      document.querySelector("main .content").appendChild(content);

      return false;
    });
  });

  document.querySelector(".tabs a:first-child span").click();
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("todos.json")
    .then((response) => response.json())
    .then((toDoObjects) => main(toDoObjects));
});
