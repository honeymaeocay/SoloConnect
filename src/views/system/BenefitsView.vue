<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
//import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Use Pinia Store
//const authStore = useAuthUserStore()

// Load Variables
const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <div class="benefits-view">
        <h1 class="text-center">Benefits Under the Expanded Solo Parents Welfare Act of 2022</h1>
        <p class="text-center">
          The Philippines has expanded benefits for solo parents under Republic Act No. 11861,
          enhancing support to address their unique challenges and providing comprehensive
          assistance.
        </p>
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                1. Financial Assistance
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Solo parents earning below the minimum wage receive a monthly allowance of PHP
                  1,000.
                </li>
                <li>
                  Discounts and VAT exemptions on baby essentials such as milk, diapers, vaccines,
                  and medicines for children up to six years old.
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                2. Leave Entitlements
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Seven days of paid parental leave annually, available to solo parents who have
                  worked for at least six months.
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                3. Educational Support
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Full scholarships for children of solo parents in basic, higher, and technical
                  education institutions
                </li>
                <li>
                  Priority access to educational programs offered by the Department of Education
                  (DepEd), Commission on Higher Education (CHED), and Technical Education and Skills
                  Development Authority (TESDA).
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                4. Healthcare and Social Services
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Automatic coverage under the National Health Insurance Program (PhilHealth), with
                  premium contributions paid by the national government.
                </li>
                <li>
                  Access to psychosocial services, including counseling and peer support groups, to
                  address emotional and mental health needs.
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                5. Livelihood and Housing Assistance
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Participation in livelihood programs and skills training to enhance employment
                  opportunities.
                </li>
                <li>
                  Housing benefits, including access to public housing projects with liberal payment
                  terms, managed by the National Housing Authority (NHA).
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                6. Legal and Workplace Protections
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Legal protections against discrimination in the workplace based on solo parent
                  status.
                </li>
                <li>
                  Flexible work arrangements to help solo parents balance work and family
                  responsibilities.
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <v-hover>
          <template #default="{ isHovering, props }">
            <v-card
              class="mx-auto"
              max-width="600"
              v-bind="props"
              :color="isHovering ? 'orange lighten-2' : 'white'"
              elevation="5"
            >
              <v-card-text class="text-center font-weight-bold text-h6">
                7. Additional Programs
              </v-card-text>
              <v-card-text class="text-justify">
                <li>
                  Program SOLO, an initiative by the Department of Social Welfare and Development
                  (DSWD), offers additional emotional support, alternative care arrangements for
                  children, and efforts to combat stigma and discrimination against solo parents.
                </li>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <br />
        <p class="text-center">
          To access these benefits, solo parents must obtain a Solo Parent ID from their local
          government units (LGUs). This ID serves as proof of eligibility required to avail of the
          various benefits and services provided under the law.
        </p>
      </div>
    </template>
  </AppLayout>
</template>
