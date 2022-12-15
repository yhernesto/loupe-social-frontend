<template>
  <app-card-section-wrapper
    :card-section="cardInfluencersTable"
    @selected="reEmit"
  >
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleCols"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-italic bg-primary text-white aumentedFontSize headerAligment"
          >
            {{ col.label }} <q-icon
              size="24px"
              :name="col.icon"
            />
          </q-th>
        </q-tr>
      </template>
      <template #body-cell-usernameCol="props">
        <q-td :props="props">
          <div class="row q-gutter-none q-pr-xl">
            <div class="col">
              <!-- <div> -->
              <q-avatar>
                <!-- <q-img :src="props.row.profile_pic_url">
										<template v-slot:error> -->
                <div
                  class="row"
                  style="height: 50%;"
                >
                  {{ props.row.username[0].toLocaleUpperCase() }}
                </div>
                <!-- </template>
									</q-img> -->
              </q-avatar>
              <!-- </div> -->
            </div>
            <div
              class="col cursor-pointer"
              @click="goToInstagram(props.row.username)"
            >
              <span class="aumentedFontSize">{{ props.row.fullname }}</span>
              <br>
              <span><i>{{ props.row.username }}</i></span>
            </div>
          </div>
        </q-td>
      </template>
    </q-table>
  </app-card-section-wrapper>
</template>
<script lang="ts">
import { defineComponent, reactive, /*onMounted,*/ watch } from 'vue';
import { ICardInfluencers, IInfluencerRow } from './InfluencersTable';
import CardSectionWrapper from '@/components/cardSectionWrapper/CardSectionWrapper.vue';
import { useI18n } from 'vue-i18n'

export default defineComponent({
	name: 'InfluencersTable',
	components: {
        'app-card-section-wrapper': CardSectionWrapper
    },
	props:{
		cardInfluencersTable: {
		type: Object as () => ICardInfluencers,
		required: true
		},
	},
	emits: ['selected'],
	setup (props, { emit }) {
    const { t } = useI18n({ useScope: 'global' })

		const visibleCols = ["usernameCol", "postsCol", "followersCol", "mentionsCol", "likesCol", "commentsCol" ]
		const columns = [
			{
				name: 'usernameCol',
				required: true,

				label: t('dashboard-top-influencers-name'),

				align: 'left',
				field: (row: IInfluencerRow) => row.username,
				format: (val: string) => `${val}`,
				sortable: true,
				icon: '',
        style: ''
			},

			{ name: 'fullnameCol', label: 'User name', field: 'fullname', visible: false,style: 'font-size: 16px'},
			{ name: 'imageCol', label: 'Icon Profile', field: 'profile_pic_url', visible: false}, 
			{ name: 'postsCol', label: t('dashboard-top-influencers-global-post'), field: 'posts', visible: true, style: 'font-size : 16px'}, 
			{ name: 'followersCol',  label: t('dashboard-top-influencers-global-followers'), field: 'followers', sortable: true, style: 'font-size: 16px' },
			{ name: 'mentionsCol',  label: t('dashboard-top-influencers-hashtag-uses'), field: 'hashtagMentions', sortable: true, style: 'font-size: 16px'},
			{ name: 'likesCol', label: t('dashboard-top-influencers-related-likes'), field: 'likesByHashtag', sortable: true, style: 'font-size: 16px'},
			{ name: 'commentsCol', label: t('dashboard-top-influencers-hashtag-related'), field: 'commentsByHashtag', sortable: true, style: 'font-size: 16px'}
		]
		
		const rows: Array<IInfluencerRow> = reactive([]);

		const goToInstagram = (userName: string) => {
			window.open(`https://www.instagram.com/${userName}/`);
		}

		const reEmit = function (buttonSelected: string):void{
				emit('selected', buttonSelected)
			}

    watch(
        () => props.cardInfluencersTable.rows,
        () => {
            const newRows = props.cardInfluencersTable.rows
            rows.splice(0, rows.length, ...newRows)
        },
        { immediate: true, deep: true },
    );

		return {
			columns,
			rows,
			visibleCols,

			/**
			 * Methods 
			 */
			goToInstagram,
			reEmit
		}
	}
	})
</script>
<style>
.headerAligment{
  text-align: end !important;
}
</style>