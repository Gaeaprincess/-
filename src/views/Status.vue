<template>
	<div id="main">
		<el-card>
			<Code-Editor2
				:value="value"
				:language="language"
                @input="input"
			></Code-Editor2>
		</el-card>
	</div>
</template>

<script>
	// import Header from './components/Header.vue'
	// import CodeEditor from './components/CodeEditor.vue'
	// import CodeEditor1 from './components/CodeEditor1.vue'
	import CodeEditor2 from '@/components/CodeEditor2.vue'
	export default {
		name: 'main',
		components: {

			CodeEditor2
		},
		data() {
			return {
				value: '',
				language: 'c++'
			}
		},
        methods: {
            input(item) {
            console.log(item);
        }
        }

	}
</script>

<style scoped>
	#main {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: '楷体';
	}
	/deep/ .el-card {
		padding: 20px;
		margin: 20px;
	}
	p {
		margin: 20px 0;
		text-align: left;
		font-size: 20px;
		color: #409eff;
	}
</style>
