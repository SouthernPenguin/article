<template>
  <div>
    <h1>固定列表格</h1>
    <el-table :data="tableData" style="width: 100%" ref="tableRef" border>
      <el-table-column prop="name" label="姓名" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <el-input
            @keydown.up.native="move(-1, 0, scope.$index, 'address')"
            @keydown.down.native="move(1, 0, scope.$index, 'address')"
            @keydown.left.native="move(0, -1, scope.$index, 'address')"
            @keydown.right.native="move(0, 2, scope.$index, 'address')"
            v-model="scope.row.address"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="number" label="数量">
        <template slot-scope="scope">
          <el-input v-model="scope.row.number" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱">
        <template slot-scope="scope">
          <el-input
            @keydown.up.native="move(-1, 0, scope.$index, 'email')"
            @keydown.down.native="move(1, 0, scope.$index, 'email')"
            @keydown.left.native="move(0, -2, scope.$index, 'email')"
            @keydown.right.native="move(0, 1, scope.$index, 'email')"
            v-model="scope.row.email"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="phoneNumber" label="手机号">
        <template slot-scope="scope">
          <el-input
            @keydown.up.native="move(-1, 0, scope.$index, 'phoneNumber')"
            @keydown.down.native="move(1, 0, scope.$index, 'phoneNumber')"
            @keydown.left.native="move(0, -1, scope.$index, 'phoneNumber')"
            @keydown.right.native="move(0, 0, scope.$index, 'phoneNumber')"
            v-model="scope.row.phoneNumber"
            placeholder="请输入内容"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="phoneNumber" label="性别">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sex" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      timeout: null,
      columns: [null, 'address', null, 'email', 'phoneNumber'],
      tableData: [
        { name: 'A', address: '地址A', number: 1, email: 'a.qq', phoneNumber: '', sex: '' },
        { name: 'B', address: '地址B', number: 2, email: 'b.qq', phoneNumber: '', sex: '' },
        { name: 'C', address: '地址C', number: 3, email: 'c.qq', phoneNumber: '', sex: '' },
        { name: 'D', address: '地址D', number: 4, email: '', phoneNumber: '', sex: '' },
        { name: 'E', address: '地址E', number: 5, email: '', phoneNumber: '', sex: '' },
      ],
    };
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  methods: {
    /**
     * 键盘方向键移动
     * @param {*} vertical 垂直方向
     * @param {*} horizontal 水平方法
     * @param {*} index 表格索引
     * @param {*} columnFile 列名
     */
    move(vertical, horizontal, index, columnFile) {
      const rowIndex = index + vertical;
      const columnIndex = this.columns.indexOf(columnFile) + horizontal;
      console.log(rowIndex, columnIndex, 'columnIndex');
      // 控制在上下左右移动时，在需要移动的输入框内
      if (rowIndex >= 0 && rowIndex < this.tableData.length && columnIndex >= 1) {
        this.$nextTick(() => {
          const el = this.$refs['tableRef'].$refs.bodyWrapper.querySelector(
            `tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1}) input`
          );
          el.focus();
          this.timeout = setTimeout(() => {
            el.select();
          });
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
