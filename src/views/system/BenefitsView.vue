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
      <keep-alive>
        <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
      </keep-alive>
    </template>

    <template #content>
      <div class="benefits-view">
        <h1 class="text-center my-4 font-weight-bold benefits-title">
          Benefits Under the Expanded Solo Parents Welfare Act of 2022
        </h1>
        <p class="text-center mb-5 px-4 benefits-description">
          The Philippines has expanded benefits for solo parents under Republic Act No. 11861,
          enhancing support to address their unique challenges and providing comprehensive
          assistance.
        </p>

        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="4" v-for="(benefit, index) in benefits" :key="index">
              <v-hover>
                <template #default="{ isHovering, props }">
                  <v-card
                    class="mx-auto mb-4"
                    max-width="400"
                    v-bind="props"
                    :color="isHovering ? 'orange lighten-2' : 'white'"
                    elevation="7"
                  >
                    <v-card-title class="text-center font-weight-bold text-h6 card-title">
                      <v-icon left>{{ benefit.icon }}</v-icon>
                      <span class="card-title-text">{{ benefit.title }}</span>
                    </v-card-title>
                    <v-card-text class="text-justify px-4 card-text">
                      <ul>
                        <li v-for="(item, idx) in benefit.items" :key="idx">{{ item }}</li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>

        <!-- <p class="text-center mt-5 px-4">
          To access these benefits, solo parents must obtain a Solo Parent ID from their local
          government units (LGUs). This ID serves as proof of eligibility required to avail of the
          various benefits and services provided under the law.
        </p> -->
      </div>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        {
          title: '1. Financial Assistance',
          icon: 'mdi-cash',
          items: [
            'Solo parents earning below the minimum wage receive a monthly allowance of PHP 1,000.',
            'Discounts and VAT exemptions on baby essentials such as milk, diapers, vaccines, and medicines for children up to six years old.',
          ],
        },
        {
          title: '2. Leave Entitlements',
          icon: 'mdi-calendar',
          items: [
            'Seven days of paid parental leave annually, available to solo parents who have worked for at least six months.',
          ],
        },
        {
          title: '3. Educational Support',
          icon: 'mdi-school',
          items: [
            'Full scholarships for children of solo parents in basic, higher, and technical education institutions.',
            'Priority access to educational programs offered by DepEd, CHED, and TESDA.',
          ],
        },
        {
          title: '4. Healthcare and Social Services',
          icon: 'mdi-hospital',
          items: [
            'Automatic coverage under PhilHealth, with premium contributions paid by the national government.',
            'Access to psychosocial services, including counseling and peer support groups.',
          ],
        },
        {
          title: '5. Livelihood and Housing Assistance',
          icon: 'mdi-home',
          items: [
            'Participation in livelihood programs and skills training to enhance employment opportunities.',
            'Access to public housing projects with liberal payment terms, managed by NHA.',
          ],
        },
        {
          title: '6. Legal and Workplace Protections',
          icon: 'mdi-gavel',
          items: [
            'Legal protections against workplace discrimination based on solo parent status.',
            'Flexible work arrangements to balance work and family responsibilities.',
          ],
        },
        {
          title: '7. Additional Programs',
          icon: 'mdi-account-group',
          items: [
            'Program SOLO by DSWD provides emotional support, alternative care arrangements, and efforts to combat stigma and discrimination.',
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.benefits-view {
  padding: 20px;
}

.benefits-title {
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.benefits-description {
  font-size: 1.1rem;
  color: #34495e;
}

.v-card {
  transition: transform 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.v-card:hover {
  transform: scale(1.05);
}

.card-title {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-title-text {
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
}

.v-card-title .v-icon {
  margin-right: 10px;
}
</style>
