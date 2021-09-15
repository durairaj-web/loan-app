<template>
  <!-- Sidebar -->
  <nav class="navbar-vertical navbar">
    <div class="nav-scroller">
      <!-- Brand logo -->
      <a class="navbar-brand" href="/dashboard">
        <h3 class="text-light">Mortgage Loan</h3>
      </a>

      <!-- Navbar nav -->
      <ul class="navbar-nav flex-column" id="sideNavbar">
        <li class="nav-item">
          <router-link
            :class="[
              this.$route.path === '/dashboard' ? 'active' : '',
              'nav-link has-arrow',
            ]"
            to="/dashboard"
          >
            <i class="nav-icon icon-xs me-2 bi bi-columns-gap"></i> Dashboard
          </router-link>
        </li>

        <!-- Nav item -->
        <li class="nav-item">
          <a
            :class="[
              this.$route.path === '/new-loan' || this.$route.path === '/loans'
                ? 'active'
                : 'collapsed',
              'nav-link has-arrow',
            ]"
            href="#!"
            data-bs-toggle="collapse"
            data-bs-target="#navPages"
            aria-expanded="false"
            aria-controls="navPages"
          >
            <i class="nav-icon icon-xs me-2 bi bi-file-text"></i> Loans
          </a>

          <div
            id="navPages"
            :class="[
              this.$route.path === '/new-loan' || this.$route.path === '/loans'
                ? 'show'
                : '',
              'collapse',
            ]"
            data-bs-parent="#sideNavbar"
          >
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link
                  :class="[
                    this.$route.path === '/new-loan' ? 'active' : '',
                    'nav-link has-arrow',
                  ]"
                  to="/new-loan"
                >
                  <i class="nav-icon icon-xs me-2 bi bi-plus-lg"></i> New Loan
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :class="[
                    this.$route.path === '/loans' ? 'active' : '',
                    'nav-link has-arrow',
                  ]"
                  to="/loans"
                >
                  <i class="nav-icon icon-xs me-2 bi bi-card-checklist"></i> All
                  Loans
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NavbarVertical extends Vue {}
</script>
