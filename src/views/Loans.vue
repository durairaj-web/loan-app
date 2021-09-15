<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <!-- Page header -->
        <div>
          <div class="border-bottom pb-4 mb-4 ">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">Loans</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-12 col-lg-12 col-md-12 col-12">
      <!-- card -->
      <div class="card">
        <!-- card body -->
        <div class="card-body">
          <b-row class="mb-3">
            <b-col md="3">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <div class="table-responsive">
                <b-table
                  striped
                  hover
                  outlined
                  :items="loans"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                >
                  <template v-slot:cell(created_at)="data">{{
                    getFormatTime(data.item.created_at)
                  }}</template>
                  <template v-slot:cell(interest_rate)="data">{{
                    data.item.interest_rate + "%"
                  }}</template>
                  <template v-slot:cell(principal_approved)="data">{{
                    getCurrencyFormat(data.item.principal_approved)
                  }}</template>
                  <template v-slot:cell(loan_amount)="data">{{
                    getCurrencyFormat(data.item.loan_amount)
                  }}</template>
                  <template v-slot:cell(amortization)="data">{{
                    getCurrencyFormat(data.item.amortization)
                  }}</template>
                  <template v-slot:cell(documents)="data">
                    <a
                      href=""
                      @click.prevent="downloadFile(data.item.documents)"
                      >{{ data.item.documents }}</a
                    >
                  </template>
                </b-table>
              </div>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import LoanService from "@/services/LoanService";
import { formatTime, currencyFormat } from "../global/helpers";
const Auth = namespace("Auth");
@Component
export default class Loans extends Vue {
  private loans = "";
  @Auth.State("user")
  private currentUser!: any;
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    LoanService.getLoans(this.currentUser.id).then((response) => {
      this.loans = response.data.data;
    });
  }

  filter = "";
  perPage = 10;
  currentPage = 1;
  fields = [
    "loan_id",
    {
      key: "created_at",
      label: "Submitted Date",
    },
    "product_type",
    "interest_rate",
    "principal_approved",
    {
      key: "loan_amount",
      label: "Request Loan Amount",
    },
    {
      key: "amortization",
      label: "Monthly Amortization",
    },
    "terms",
    "documents",
  ];
  get rows(): number {
    return this.loans.length;
  }

  downloadFile(fileName: string): void {
    LoanService.donwloadFile(fileName);
  }

  getFormatTime(time: string): string {
    return formatTime(time);
  }

  getCurrencyFormat(value: number): string {
    const formattedCurrency = currencyFormat(value);
    return formattedCurrency.replace(/SGD/g, "S$");
  }
}
</script>
