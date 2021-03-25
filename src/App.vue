<template>
	<div id="app">
		<router-view class="main"></router-view>
	</div>
</template>

<script></script>

<style>
	@import "assets/css/base.css";
	#app {
		height: 100%;
	}
	.main {
		/* background: #4c055e; */
		/* background-image: url("./assets/img/btbg.jpg"); */
		background-image: url("./assets/img/bg.jpg");
		background-size: 100% 100%;
		/* background: #ffffff; */
		overflow: hidden;
	}
</style>
