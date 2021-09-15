<template>
  <!-- container -->
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center g-0 min-vh-100">
      <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-6">
              <h3 class="text-center">Mortgage Loan</h3>
            </div>
            <!-- Form -->
            <form @submit.prevent="handleLogin">
              <!-- Username -->
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  name="email"
                  placeholder="Email address here"
                  v-model="user.email"
                  v-validate="'required|email'"
                  data-vv-as="email"
                />
                <span v-if="errors.has('email')" class="text-danger">
                  {{ errors.first("email") }}
                </span>
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="**************"
                  v-model="user.password"
                  v-validate="'required'"
                />
                <span v-if="errors.has('password')" class="text-danger">
                  {{ errors.first("password") }}
                </span>
              </div>
              <div>
                <!-- Button -->
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    <span>Login</span>
                  </button>
                </div>
                <div class="d-grid">
                  <span
                    v-if="message"
                    class="alert alert-danger mt-3"
                    role="alert"
                  >
                    {{ message }}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private user: any = { email: "", password: "" };
  private loading = false;
  private message = "";

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/dashboard");
    }
  }

  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }
      if (this.user.email && this.user.password) {
        this.login(this.user).then(
          (data) => {
            this.$router.push("/dashboard");
            Vue.$toast.open("You're now logged in!");
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );
      }
    });
  }
}
</script>
