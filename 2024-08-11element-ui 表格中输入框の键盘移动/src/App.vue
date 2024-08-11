<template>
  <div id="app">
    <StaticStateTable />
    <DynamicTable />
  </div>
</template>

<script>
import StaticStateTable from './components/StaticStateTable.vue';
import DynamicTable from './components/DynamicTable.vue';

export default {
  name: 'App',
  components: {
    StaticStateTable,
    DynamicTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
