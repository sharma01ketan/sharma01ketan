<script>
import Column1 from "../components/Column1.vue";
import Column2 from "../components/Column2.vue";
import Plane1 from "../components/work/plane/plane2.vue";
import Plane2 from "../components/work/plane/plane1.vue";
import { ref, onMounted } from 'vue';

export default {
  title: "Home",
  emits: ["hoverIn", "hoverOut"],
  components: {
    Column1,
    Column2,
    Plane1,
    Plane2,
  },
  setup() {
    const leftScrollRef = ref(null);
    const rightScrollRef = ref(null);
    const leftColumnRef = ref(null);
    
    onMounted(() => {
      // Sync scroll positions
      const syncScroll = () => {
        if (rightScrollRef.value && leftScrollRef.value) {
          leftScrollRef.value.scrollTop = rightScrollRef.value.scrollTop;
        }
      };

      if (rightScrollRef.value) {
        rightScrollRef.value.addEventListener('scroll', syncScroll);
      }

      // Handle wheel events on left column
      if (leftColumnRef.value) {
        leftColumnRef.value.addEventListener('wheel', (e) => {
          e.preventDefault();
          if (rightScrollRef.value) {
            rightScrollRef.value.scrollBy({
              top: e.deltaY,
              behavior: 'auto'
            });
          }
        }, { passive: false });
      }
    });
    
    return {
      leftScrollRef,
      rightScrollRef,
      leftColumnRef
    };
  }
};
</script>

<template>
  <div class="app-container">
    <!-- Left column -->
    <div class="column left-column" ref="leftColumnRef">
      <div class="content-scroll non-interactive" ref="leftScrollRef">
        <div class="content-section">
          <Column2 @hoverIn="$emit('hoverIn')" @hoverOut="$emit('hoverOut')" />
        </div>
        <div class="content-section">
          <Plane2 @hoverIn="$emit('hoverIn')" @hoverOut="$emit('hoverOut')" />
        </div>
      </div>
    </div>
    
    <!-- Right column -->
    <div class="column right-column">
      <div class="content-scroll" ref="rightScrollRef">
        <div class="content-section">
          <Column1 @hoverIn="$emit('hoverIn')" @hoverOut="$emit('hoverOut')" />
        </div>
        <div class="content-section">
          <Plane1 @hoverIn="$emit('hoverIn')" @hoverOut="$emit('hoverOut')" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.column {
  flex: 1;
  height: 100vh;
  position: relative;
}

.left-column {
  background-color: #f05545;
}

.right-column {
  background-color: #212121;
}

.content-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.content-scroll::-webkit-scrollbar {
  display: none;
}

.non-interactive {
  pointer-events: none;
}

.content-section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
}

@media only screen and (max-width: 1070px) {
  .app-container {
    flex-direction: column;
  }
  
  .column {
    width: 100%;
    height: 50vh;
  }
  
  .content-section {
    height: 50vh;
  }
}

@media only screen and (max-width: 540px) {
  /* Mobile styles */
}
</style>