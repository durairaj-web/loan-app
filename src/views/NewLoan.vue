<template>
  <div class="container-fluid px-6 py-4">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <!-- Page header -->
        <div>
          <div class="border-bottom pb-4 mb-4 ">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold">New Loan</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-8">
      <div class="col-xl-12 col-lg-12 col-md-12 col-12">
        <!-- card -->
        <div class="card">
          <!-- card body -->
          <div class="card-body">
            <div>
              <form
                @submit.prevent="handleSubmit"
                enctype="multipart/form-data"
              >
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="location"
                    class="col-sm-4 col-form-label
                          form-label"
                    >Product Type</label
                  >
                  <div class="col-md-8 col-12">
                    <select
                      class="form-select"
                      name="product"
                      v-model="loan.productType"
                      v-validate="'required'"
                      @change="
                        onProductChange();
                        calcMortage();
                      "
                    >
                      <option value="" selected>Select</option>
                      <option
                        v-for="productType in productTypes"
                        :value="productType.id"
                        :key="productType.id"
                      >
                        {{ productType.name }}
                      </option>
                    </select>
                    <span v-if="errors.has('product')" class="text-danger">
                      {{ errors.first("product") }}
                    </span>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="email"
                    class="col-sm-4 col-form-label
                          form-label"
                    >Loan Amount</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Loan Amount"
                      name="amount"
                      v-model="loan.loanAmount"
                      v-validate="'required'"
                      v-money
                      @input="calcMortage"
                    />
                    <span v-if="errors.has('amount')" class="text-danger">
                      {{ errors.first("amount") }}
                    </span>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="phone"
                    class="col-sm-4 col-form-label
                          form-label"
                    >Interest Rate</label
                  >
                  <div class="col-md-8 col-12">
                    <span>{{ interestRate }}</span>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="location"
                    class="col-sm-4 col-form-label form-label"
                    >Terms</label
                  >
                  <div class="col-md-8 col-12">
                    <select
                      class="form-select"
                      name="terms"
                      v-model="loan.terms"
                      v-validate="'required'"
                      @change="calcMortage"
                    >
                      <option value="" selected>Select</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                    </select>
                    <span v-if="errors.has('terms')" class="text-danger">
                      {{ errors.first("terms") }}
                    </span>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="phone"
                    class="col-sm-4 col-form-label
                          form-label"
                    >Monthly Amortization</label
                  >
                  <div class="col-md-8 col-12">
                    <span>{{ monthlyAmortization.replace(/SGD/g, "S$") }}</span>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="email"
                    class="col-sm-4 col-form-label
                          form-label"
                    >Documents</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="file"
                      class="form-control"
                      name="documents"
                      v-validate="
                        'required|ext:jpeg,jpg,png,pdf,doc,docx,xls,xlsx'
                      "
                      @change="onFileSelected"
                    />
                    <span v-if="errors.has('documents')" class="text-danger">
                      {{ errors.first("documents") }}
                    </span>
                  </div>
                </div>
                <!-- row -->
                <div class="mt-6 row">
                  <div class="col-md-8">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="loading"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      <span>Submit</span>
                    </button>
                  </div>
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
              </form>
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
import LoanService from "@/services/LoanService";
import { amort, currencyFormat } from "../global/helpers";
const Auth = namespace("Auth");
@Component
export default class NewLoan extends Vue {
  @Auth.State("user")
  private currentUser!: any;

  private productTypes = null;
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }

    LoanService.getProductTypes().then((response) => {
      this.productTypes = response.data;
    });
  }

  private interestRate = "";
  onProductChange(): void {
    if (this.loan.productType == 1) {
      this.interestRate = "1.5";
    } else if (this.loan.productType == 2) {
      this.interestRate = "1.8";
    } else {
      this.interestRate = "";
    }
  }

  private monthlyAmortization = "";
  calcMortage(): void {
    let loanAmount = 0;
    if (this.loan.loanAmount !== undefined) {
      loanAmount = this.loan.loanAmount.replace(/[S$,]/g, "");
    }

    if (
      loanAmount > 0 &&
      this.interestRate !== "" &&
      this.loan.terms !== undefined
    ) {
      const monthlyAmortization = amort(
        Number(loanAmount),
        Number(this.interestRate),
        Number(this.loan.terms)
      );
      this.monthlyAmortization = currencyFormat(monthlyAmortization);
    }
  }

  private selectedFile = "";
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  private loan: any = {};
  private loading = false;
  private message = "";
  handleSubmit(): void {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      let loanAmount: string | number = "";
      if (this.loan.loanAmount !== undefined) {
        loanAmount = Number(this.loan.loanAmount.replace(/[S$,]/g, ""));
        if (loanAmount < 1) {
          this.message = "Loan amount should be greater than zero.";
          this.loading = false;
          return;
        }
      }

      if (
        this.loan.productType &&
        this.loan.loanAmount &&
        this.loan.terms &&
        this.selectedFile
      ) {
        this.loan.userId = this.currentUser.id;
        this.loan.loanAmount = loanAmount;
        this.loan.interestRate = this.interestRate;
        LoanService.createLoan(this.loan, this.selectedFile).then(
          (data) => {
            this.$router.push("/loans");
            Vue.$toast.open("You loan form has been submitted successfully!");
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
