<template>
  <div v-if="this.$route.path === '/'">
    <router-view />
  </div>
  <div v-else>
    <div id="db-wrapper" :class="toggleSideBar ? 'toggled' : ''">
      <NavbarVertical />
      <div id="page-content">
        <Header @toogle-sidebar="toogleSidebar" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import NavbarVertical from "./components/NavbarVertical.vue";

@Component({
  components: {
    Header,
    NavbarVertical,
  },
})
export default class App extends Vue {
  toggleSideBar = false;
  toogleSidebar(): void {
    this.toggleSideBar = !this.toggleSideBar;
  }
}
</script>
