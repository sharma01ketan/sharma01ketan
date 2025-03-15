<script>
export default {
  title: "Plane1",
  emits: ["hoverIn", "hoverOut"],
  methods: {
    g(url) {
      window.open(url);
    },
    changeTheme() {
      const current = window.localStorage.getItem("t");
      const html = document.querySelector("html");
      let newTheme;
      if (!current) {
        // initial theme config
        if (html.classList.contains("dark")) {
          newTheme = "light";
        } else {
          newTheme = "dark";
        }
      } else if (current == "light") {
        newTheme = "dark";
      } else if (current == "dark") {
        newTheme = "light";
      }
      window.localStorage.setItem("t", newTheme);
      html.classList.remove("dark");
      html.classList.add(newTheme);
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<template>
  <div class="column">
    <div class="image-container">
      <img class="plane-image" src="/public/assets/work/plane-icon.svg" />
    </div>
  </div>
</template>

<style scoped>
.column {
  background: var(--accent);
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}


.plane-image {
  transform: scale(1);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 300px; /* Default width */
  height: 300px; /* Default height */
}

.change-theme {
  fill: var(--bg-primary);
  opacity: 0.25;
  position: absolute;
  top: 2vw;
  left: 2vw;
  top: clamp(1rem, 2vw, 3rem);
  left: clamp(1rem, 2vw, 3rem);
  width: 1.7rem;
  height: 1.7rem;
  transition: color 0.2s, opacity 0.2s;
}

.change-theme:hover {
  fill: white;
  opacity: 1;
}

.image-container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  opacity: 1;
  transform: var(--animation-initial);
  animation: var(--animation);
  animation-delay: 0.8s;
  user-select: none;
  justify-items: center;
  align-items: center;
  position: relative;
}

.rotating-image {
  max-width: 60vw;
  max-height: 40vh;
  border-radius: 100%;
  height: 40vh;
  width: 40vh;
  transform: rotate(0) scale(1.3);
  animation: rotate-intro 2s 1 ease-out, rotate 90s 2s infinite linear;
  transform-origin: center center;
  will-change: transform;
  z-index: 1;
}

.avatar {
  position: absolute;
  max-width: 50vw;
  max-height: 30vh;
  border-radius: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: scale(1);
  z-index: 2;
}

/* .image-container:hover .avatar {
  opacity: 1;
}

.image-container:hover .rotating-image {
  animation-play-state: paused;
} */

@media only screen and (max-width: 1070px) {
  .column {
    min-height: 100%;
    height: 40vh;
  }
  .plane-image {
    width: 100px;
    height: 100px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0) scale(1.3);
  }
  100% {
    transform: rotate(960deg) scale(1.3);
  }
}

@keyframes rotate-intro {
  0% {
    transform: rotate(0) scale(1.3);
  }
  100% {
    transform: rotate(720deg) scale(1.3);
  }
}

g[id] {
  cursor: pointer;
}

g[id] > path {
  transition: fill-opacity 0.2s;
}

g[id]:hover > path {
  fill-opacity: 1 !important;
}
</style>
