<template lang="pug">
  ul.main-nav
    NavItem(
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      :isActive="item.isActive"
      :text="item.text"
      )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import NavItem from '~/components/helpers/NavItem.vue';

@Component({
  components: {
    NavItem
  }
})

export default class Nav extends Vue {
  items = []

  created() {
    fetch('https://raw.githubusercontent.com/oksanalyakhova/pf-nuxt/main/static/data/nav.json')
      .then(res => res.json())
      .then(items => {
        this.items = items
      })
  }
}
</script>

<style scoped lang="sass">

</style>
