<template lang="pug">
  span.arrow
    svg(width="18px" height="18px" xmlns="http://www.w3.org/2000/svg")
      path(
        class="st9"
        fill="#000000"
        d="M16.99 1h.4V.6h-.4V1zM1.71 1V.6H.964l.412.621L1.71 1zm15.28.203h-.4v.4h.4v-.4zm.01 0h.4v-.4H17v.4zm0 15.194l-.221.334.62.412v-.745H17zm-3.66-2.43h-.4v.214l.179.12.221-.334zm0-6.788h.4v-.97l-.684.688.284.282zM3.588 17l-.284.282.284.286.284-.286L3.588 17zM1 14.394l-.284-.282-.28.282.28.282.284-.282zm9.641-9.71l.284.282.677-.682h-.96v.4zm-6.487 0l-.333.221.118.179h.215v-.4zM16.99.6H1.71v.8h15.28V.6zm.4.603V1h-.8v.203h.8zm-.39-.4h-.01v.8H17v-.8zm.4 15.595V1.203h-.8v15.194h.8zM13.119 14.3l3.66 2.43.442-.666-3.66-2.43-.442.666zm-.179-7.12v6.788h.8V7.179h-.8zM3.872 17.282l9.752-9.821-.568-.564-9.752 9.821.568.564zM.716 14.676l2.588 2.606.568-.564-2.588-2.606-.568.564zm9.642-10.274l-9.642 9.71.568.564 9.641-9.71-.568-.564zm-6.204.682h6.487v-.8H4.154v.8zM1.376 1.221l2.445 3.684.666-.442L2.043.779l-.667.442z"
        )
</template>

<script class="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Arrow extends Vue{};
</script>

<style lang="sass">
.arrow
  display: block
  position: absolute
  top: 25%
  right: -40px

  .desktop &
    transform: translate(-100%, 100%)
    opacity: 0
    transition: transform .25s,opacity .35s

  .desktop .project__link:hover &
    transform: translate(0, 0)
    opacity: 1
</style>
