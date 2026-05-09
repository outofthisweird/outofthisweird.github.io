(function () {
  var target = document.querySelector("[data-typewriter]");

  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var originalNodes = Array.prototype.map.call(target.childNodes, function (node) {
    return node.cloneNode(true);
  });
  var minSpeed = Number(target.getAttribute("data-typewriter-min-speed")) || 80;
  var maxSpeed = Number(target.getAttribute("data-typewriter-max-speed")) || 130;
  var cursor = document.createElement("span");
  var skipRequested = false;
  var finished = false;

  cursor.className = "typewriter-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = "|";

  if (maxSpeed < minSpeed) {
    maxSpeed = minSpeed;
  }

  function randomSpeed() {
    return minSpeed + Math.floor(Math.random() * (maxSpeed - minSpeed + 1));
  }

  function pauseFor(character) {
    if (!character || /\s/.test(character)) {
      return 0;
    }

    var speed = randomSpeed();

    if (/[.!?。！？…]/.test(character)) {
      return speed * 8;
    }

    if (/[,;:，、]/.test(character)) {
      return speed * 4;
    }

    return speed;
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function showOriginal() {
    target.innerHTML = "";
    originalNodes.forEach(function (node) {
      target.appendChild(node.cloneNode(true));
    });
  }

  function finishNow() {
    if (finished) {
      return;
    }

    skipRequested = true;
    showOriginal();
    target.appendChild(cursor);
    target.classList.remove("is-typing");
    target.classList.add("is-typed");
    target.removeAttribute("aria-busy");
    finished = true;
  }

  async function typeText(source, parent) {
    var value = source.nodeValue || "";
    var text = document.createTextNode("");

    parent.appendChild(text);
    parent.appendChild(cursor);

    if (!value.trim()) {
      text.nodeValue = value;
      return;
    }

    for (var index = 0; index < value.length; index += 1) {
      if (skipRequested) {
        return;
      }

      text.nodeValue += value.charAt(index);
      await wait(pauseFor(value.charAt(index)));
    }
  }

  async function typeNode(source, parent) {
    var copy;

    if (skipRequested) {
      return;
    }

    if (source.nodeType === Node.TEXT_NODE) {
      await typeText(source, parent);
      return;
    }

    if (source.nodeType === Node.ELEMENT_NODE) {
      copy = source.cloneNode(false);
      parent.appendChild(copy);

      if (source.childNodes.length) {
        copy.appendChild(cursor);

        for (var index = 0; index < source.childNodes.length; index += 1) {
          await typeNode(source.childNodes[index], copy);
        }
      }

      parent.appendChild(cursor);
      return;
    }

    parent.insertBefore(source.cloneNode(true), cursor);
  }

  async function typeAll() {
    target.classList.add("is-typing");
    target.setAttribute("aria-busy", "true");
    target.innerHTML = "";
    target.appendChild(cursor);

    for (var index = 0; index < originalNodes.length; index += 1) {
      await typeNode(originalNodes[index], target);
    }

    if (!skipRequested) {
      target.classList.remove("is-typing");
      target.classList.add("is-typed");
      target.removeAttribute("aria-busy");
      finished = true;
    }
  }

  target.addEventListener("click", finishNow);
  document.addEventListener("keydown", function (event) {
    if (!target.classList.contains("is-typing")) {
      return;
    }

    if (event.key === " " || event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      finishNow();
    }
  });

  typeAll();
}());
