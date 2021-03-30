<template lang="pug">
  client-only
    .app(
      ref="app"
    )
      ProgressBar(
        :value="progress"
      )
      Nuxt
</template>

<script lang="ts">
import Vue from 'vue';
import Component, {mixins} from 'vue-class-component';
import sizeTricks from '@/mixins/sizeTricks';
import deviceDetector from '@/mixins/deviceDetector';
import ProgressBar from '~/components/ProgressBar.vue';

import '@/assets/styles/common.sass';

@Component({
  components: {
    ProgressBar
  }
})
export default class Project extends mixins(sizeTricks, deviceDetector) {
  progress: number = 0;
  $refs!: {
    app: HTMLElement
  }

  beforeMount () {
    window.addEventListener('scroll', this.onScroll);
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
  mounted() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    this.isMobile
      ? document.body.classList.add('mobile')
      : document.body.classList.add('desktop');
  }
  private onScroll (): void {
    const progress = this.$refs.app.getBoundingClientRect().top * -1 /
      (this.$refs.app.scrollHeight - window.innerHeight);

    if (progress > 1) {
      this.progress = 1
    } else if (progress < 0) {
      this.progress = 0
    } else {
      this.progress = progress
    }
  }
}
</script>
