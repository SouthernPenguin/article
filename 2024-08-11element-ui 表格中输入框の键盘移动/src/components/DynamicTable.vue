<template>
  <div>
    <h1>动态列表格</h1>

    <div style="text-align: left">隐藏列</div>

    <ul :key="index" v-for="(item, index) in tableColumn">
      <li style="display: flex">
        <div style="width: 50px">
          <i v-show="index !== 0" class="el-icon-caret-top" @click="btnSort(index, item, 0)" />
          <i v-show="index !== tableColumn.length - 1" class="el-icon-caret-bottom" @click="btnSort(index, item, 1)" />
        </div>
        <!-- <div>
          <el-input v-model="item.width" type="number" size="mini" />
        </div> -->
        <div style="width: 200px; display: flex">
          {{ item.title }}
          <el-switch v-model="item.display" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
        </div>
      </li>
    </ul>

    <div style="text-align: left">
      多选列
      <el-switch v-model="isSelection" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    </div>

    <br />
    <br />
    <br />

    <el-table :data="tableData" style="width: 100%" ref="report-table" border>
      <el-table-column type="selection" width="55" v-if="isSelection"></el-table-column>
      <template v-for="(item, index) in tableColumn">
        <el-table-column v-if="item.display" :label="item.title" :key="index" :prop="item.fieldName">
          <template slot-scope="scope">
            <el-input
              v-if="item.inputType === 'input'"
              v-model="scope.row[item.fieldName]"
              placeholder="请输入内容"
              @keydown.up.native="move(-1, 0, scope.$index, item.fieldName)"
              @keydown.down.native="move(1, 0, scope.$index, item.fieldName)"
              @keydown.left.native="
                move(
                  0,
                  nextMoveFile(tableColumn, tableNeedMoveFieldNames, item.fieldName, -1),
                  scope.$index,
                  item.fieldName
                )
              "
              @keydown.right.native="
                move(
                  0,
                  nextMoveFile(tableColumn, tableNeedMoveFieldNames, item.fieldName, 1),
                  scope.$index,
                  item.fieldName
                )
              "
            />
            <el-input
              v-else-if="item.inputType === 'textarea'"
              type="textarea"
              v-model="scope.row[item.fieldName]"
              placeholder="请输入内容"
              @keydown.up.native="move(-1, 0, scope.$index, item.fieldName)"
              @keydown.down.native="move(1, 0, scope.$index, item.fieldName)"
              @keydown.left.native="
                move(
                  0,
                  nextMoveFile(tableColumn, tableNeedMoveFieldNames, item.fieldName, -1),
                  scope.$index,
                  item.fieldName
                )
              "
              @keydown.right.native="
                move(
                  0,
                  nextMoveFile(tableColumn, tableNeedMoveFieldNames, item.fieldName, 1),
                  scope.$index,
                  item.fieldName
                )
              "
            />
            <span v-else>{{ scope.row[item.fieldName] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DynamicTable',
  data() {
    return {
      timeout: null,
      isSelection: false,
      tableNeedMoveFieldNames: ['phoneNumber', 'email', 'address'],
      tableData: [
        { name: 'A', address: '地址A', number: 1, email: 'a.qq', phoneNumber: '', sex: '男' },
        { name: 'B', address: '地址B', number: 2, email: 'b.qq', phoneNumber: '', sex: '女' },
        { name: 'C', address: '地址C', number: 3, email: 'c.qq', phoneNumber: '', sex: '女' },
        { name: 'D', address: '地址D', number: 4, email: '', phoneNumber: '', sex: '男' },
        { name: 'E', address: '地址E', number: 5, email: '', phoneNumber: '', sex: '男' },
      ],
      // 模拟动态列
      tableColumn: [
        {
          title: '性别',
          fieldName: 'sex',
          width: '105',
          sort: 0,
          display: true,
        },
        {
          title: '手机号',
          fieldName: 'phoneNumber',
          width: '105',
          sort: 1,
          display: true,
          inputType: 'textarea',
        },
        {
          title: '邮箱',
          fieldName: 'email',
          width: '105',
          sort: 2,
          display: true,
          inputType: 'input',
        },
        {
          title: '数量',
          fieldName: 'number',
          width: '105',
          sort: 3,
          display: true,
        },
        {
          title: '地址',
          fieldName: 'address',
          width: '105',
          sort: 4,
          display: true,
          inputType: 'input',
        },
        {
          title: '姓名',
          fieldName: 'name',
          width: '105',
          sort: 5,
          display: true,
        },
      ],
    };
  },
  methods: {
    destroyed() {
      clearTimeout(this.timeout);
    },
    /**
     * 输入框获取焦点
     * @param {*} refName 元素节点
     * @param {*} rowIndex 行索引
     * @param {*} columnIndex 列索引
     */
    moveFocus(refName, rowIndex, columnIndex) {
      this.$nextTick(() => {
        const element =
          this.$refs[refName].$refs.bodyWrapper.querySelector(
            `tr:nth-child(${rowIndex}) td:nth-child(${columnIndex}) input`
          ) ||
          this.$refs[refName].$refs.bodyWrapper.querySelector(
            `tr:nth-child(${rowIndex}) td:nth-child(${columnIndex}) textarea`
          );
        if (!element) {
          return;
        }
        this.timeout = setTimeout(() => {
          element.select();
        });
        element.focus();
      });
    },

    /**
     * 返回列索引
     * @param {*} column 表格显示列
     * @param {*} field 字段
     * @returns number
     */
    returnCloumnIndex(column, field) {
      if (column.length && field) {
        return column
          .filter((item) => item.display)
          .map((item) => item.fieldName)
          .indexOf(field);
      }
      return 0;
    },

    /**
     * 键盘方向键移动
     * @param {*} vertical 垂直方向
     * @param {*} horizontal 水平方法
     * @param {*} index 表格索引
     * @param {*} columnFile 列名
     */
    move(vertical, horizontal, index, columnFile) {
      let rowIndex = index + vertical;
      let columnIndex = 0;
      columnIndex = this.returnCloumnIndex(this.tableColumn, columnFile) + horizontal;
      // console.log(rowIndex, columnIndex + (this.isSelection ? 2 : 1));
      if (rowIndex >= 0 && rowIndex < this.tableData.length && columnIndex >= 0) {
        this.moveFocus('report-table', rowIndex + 1, columnIndex + (this.isSelection ? 2 : 1));
      }
    },

    /**
     *
     */
    // 左右边界
    returnColumnIndex() {
      this.tableColumn;
    },

    /**
     * 获取下上两个字段中间相隔多少步长
     * @param {*} column 表格显示列
     * @param {*} needMoveFiles 需要移动的字段
     * @param {*} file 当前字段
     * @param {*} horizontal 水平移动 left：-1 right：1
     */
    nextMoveFile(column, needMoveFiles, file, horizontal) {
      // 获取页面上显示的列表字段
      const showLists = column.filter((item) => item.display).map((item) => item.fieldName);
      // 需要移动的字段
      const needMoveFile = showLists.filter((item) => needMoveFiles.includes(item));

      // 当前按下去的字段
      const findNowFileIndex = needMoveFile.indexOf(file);

      // 移动到下一个字段
      const nextFile = needMoveFile[findNowFileIndex + horizontal];
      // 需要移动的步数，
      const nowFileIndex = showLists.indexOf(file); // 当前按下字段索引
      const nextFileIndex = showLists.indexOf(nextFile); // 移动到下一个字段的索引
      const step = nextFileIndex - nowFileIndex;
      return step;
    },

    // 改变列配置排序
    btnSort(index, row, flag) {
      // 向上移动
      if (flag === 0) {
        if (index > 0) {
          const row = this.tableColumn[index - 1];
          this.tableColumn.splice(index - 1, 1);
          this.tableColumn.splice(index, 0, row);
        }
      } else if (flag === 1) {
        // 向下移动
        if (index < this.tableColumn.length) {
          const row = this.tableColumn[index + 1];
          this.tableColumn.splice(index + 1, 1);
          this.tableColumn.splice(index, 0, row);
        }
      }
      this.$forceUpdate();
      this.tableColumn.forEach((item, index) => {
        item.sort = index;
      });
    },
  },
};
</script>
