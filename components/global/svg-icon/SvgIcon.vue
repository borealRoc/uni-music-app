<template>
	<svg :class="iconClass" aria-hidden="true">
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
	export default {
		name: "icon",
		props: {
			iconType: {
				type: String,
				required: true
			},
			iconStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		computed: {
			iconName() {
				return `#icon-${this.iconType}`
			},
			iconClass() {
				if (this.iconStyle) {
					return `icon ${this.iconStyle}`
				}
				return `icon`
			}
		}
	}
</script>

<style>
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
</style>