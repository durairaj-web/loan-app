<template>
  <div class="header">
    <!-- navbar -->
    <nav class="navbar-classic navbar navbar-expand-lg">
      <a id="nav-toggle" href="#">
        <i
          class="nav-icon icon-xs me-2 bi bi-list"
          @click="$emit('toogle-sidebar')"
        ></i>
      </a>

      <!--Navbar nav -->
      <ul class="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
        <!-- List -->
        <li class="dropdown ms-2">
          <a
            class="rounded-circle"
            href="#"
            role="button"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="avatar avatar-md avatar-indicators avatar-online">
              <img
                alt="avatar"
                src="../assets/images/avatar/avatar.jpg"
                class="rounded-circle"
              />
            </div>
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownUser"
          >
            <div class="px-4 pb-0 pt-2">
              <div class="lh-1 ">
                <h5 class="mb-1 text-center">{{ currentUser.name }}</h5>
              </div>
              <div class=" dropdown-divider mt-3 mb-2"></div>
            </div>

            <ul class="list-unstyled">
              <li>
                <a class="dropdown-item" href="" @click.prevent="logOut">
                  <i
                    class="me-2 icon-xxs dropdown-item-icon"
                    data-feather="power"
                  ></i
                  >Sign Out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");
@Component
export default class Header extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  @Auth.Action
  private signOut!: () => void;

  logOut() {
    this.signOut();
    this.$router.push("/");
  }
}
</script>
