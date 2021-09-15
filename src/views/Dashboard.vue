<template>
  <div>
    <div class="bg-primary pt-10 pb-21"></div>
    <div class="container-fluid mt-n22 px-6">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <!-- Page header -->
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="mb-2 mb-lg-0">
                <h3 class="mb-0 fw-bold text-white">Server Diagnostic</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <!-- card -->
          <div class="card rounded-3">
            <!-- card body -->
            <div class="card-body">
              <!-- heading -->
              <div
                class="d-flex justify-content-between align-items-center
                mb-3"
              >
                <div>
                  <h4 class="mb-0">Number of CPUs</h4>
                </div>
                <div
                  class="icon-shape icon-md bg-light-primary text-primary
                  rounded-1"
                >
                  <i class="bi bi-cpu fs-4"></i>
                </div>
              </div>
              <!-- project number -->
              <div>
                <h1 class="fw-bold">{{ content.no_of_cpu }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <!-- card -->
          <div class="card rounded-3">
            <!-- card body -->
            <div class="card-body">
              <!-- heading -->
              <div
                class="d-flex justify-content-between align-items-center
                mb-3"
              >
                <div>
                  <h4 class="mb-0">Home directory</h4>
                </div>
                <div
                  class="icon-shape icon-md bg-light-primary text-primary
                  rounded-1"
                >
                  <i class="bi bi-folder-symlink  fs-4"></i>
                </div>
              </div>
              <!-- project number -->
              <div>
                <h1 class="fw-bold">{{ content.home_dir }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <!-- card -->
          <div class="card rounded-3">
            <!-- card body -->
            <div class="card-body">
              <!-- heading -->
              <div
                class="d-flex justify-content-between align-items-center
                mb-3"
              >
                <div>
                  <h4 class="mb-0">Server OS</h4>
                </div>
                <div
                  class="icon-shape icon-md bg-light-primary text-primary
                  rounded-1"
                >
                  <i class="bi bi-server fs-4"></i>
                </div>
              </div>
              <!-- project number -->
              <div>
                <h1 class="fw-bold">{{ content.type }}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 mt-6">
          <!-- card -->
          <div class="card rounded-3">
            <!-- card body -->
            <div class="card-body">
              <!-- heading -->
              <div
                class="d-flex justify-content-between align-items-center
                mb-3"
              >
                <div>
                  <h4 class="mb-0">Server Uptime</h4>
                </div>
                <div
                  class="icon-shape icon-md bg-light-primary text-primary
                  rounded-1"
                >
                  <i class="bi bi-clock-history fs-4"></i>
                </div>
              </div>
              <!-- project number -->
              <div>
                <h1 class="fw-bold">{{ content.uptime }}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import DashboardService from "@/services/DashboardService";
const Auth = namespace("Auth");
@Component
export default class Dashboard extends Vue {
  private content = "";
  @Auth.State("user")
  private currentUser!: any;

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    DashboardService.getSystemInfo().then((response) => {
      this.content = response.data.data;
    });
  }
}
</script>
