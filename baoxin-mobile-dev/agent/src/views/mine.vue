<template>
	<div class="mine">
		<!-- <transition :name="names"> -->
			<router-view id="mine"></router-view>
		<!-- </transition> -->
	</div>
</template>
<script>
	
	window.addEventListener("resize", function () {
		if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
			console.log(document.activeElement)
			window.setTimeout(function () {
				document.activeElement.scrollIntoView(true)
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	})
	
	export default {
		data:function(){
			return {
				names:'left'
			}
		},
		watch: {
			$route(to, from) {
				if (to.meta.index < from.meta.index) {
					this.names = 'right'
				} else {
					this.names = 'left'
				}
			}
		},
	}
</script>

<style>
	.wxCode {
		width: 70%;
		display: block;
		margin: 6px auto 20px auto;
	}

	.center {
		width: 95%;
	}

	#mine {
		/* margin-bottom: 40px; */
		position: relative;
		top: 0;
		left: 0;
		/* padding-bottom: 2.133333rem 160/75 */
	}

	.wxCodeTitle {
		text-align: center;
	}

	.left-enter {
		transform: translateX(100%);
	}

	.left-enter-active,
	.left-leave-active {
		transition: .7s;
	}

	.left-leave-to {
		transform: translateX(-100%);
	}

	.right-enter {
		transform: translateX(-100%);
	}

	.right-enter-active,
	.right-leave-active {
		transition: 1s;
	}

	.right-leave-to {
		transform: translateX(100%);
	}
</style>
