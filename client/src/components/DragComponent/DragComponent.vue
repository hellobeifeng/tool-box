<template>
	<div id="main">
  <h1>Vue Draggable</h1>
  <div class="drag">
    <h2>List 1 Draggable</h2>
    <draggable v-model="list" class="dragArea" :options="{group:'people'}" @start="drag" @end="drop" :move="checkMove">
      <div class='select-item' v-for="element in list" :key=element.name>{{element}}</div>
    </draggable>
    <h2>List 2 Draggable</h2>
    <!-- <draggable v-model="groups" class="dragArea" :options="{group:'group'}" @start="drag" @end="drop" :move="checkMove">
      <div v-for="(item, index2) in groups" :key=index2>
        {{item.name}}
      </div>
    </draggable> -->
    <draggable v-model="groups" class="dragArea" :options="{group:'group'}" @start="drag" @end="drop" :move="checkMove">
      <div v-for="(item, index2) in groups" :key=index2>
        <draggable  v-model="item.data" class="dragArea2" :options="{group:'people'}" @start="drag" @end="drop" :move="checkMove">
          <div class='select-item' v-for="(subItem, index1) in item.data" :key=index1>{{subItem}}</div>
        </draggable>
      </div>
    </draggable>
    <div>

    </div>
  </div>
  <div class="normal">
    <h2>List 1 v-for</h2>
    <div>
        <div v-for="element in list" :key=element.name>{{element.name}}</div>
      </div>

    <h2>List 2 v-for</h2>
    <div>
        <div v-for="element in groups" :key=element.name>{{element.name}}</div>
    </div>
  </div>
</div>

</template>
<script>
	import draggable from 'vuedraggable'
export default {
  data () {
    return {
      list: ['John', 'Joao', 'Jean', 'Juan', 'Edgard', 'Johnson'],
      groups: [{
        name: '测试分组1',
        data: ['11', 33]
      }, {
        name: '测试分组2',
        data: ['22', 44]
      }]
    }
  },
  methods: {
    drag () {

    },
    checkMove () {

    },
    drop (evt) {
      console.log(evt)
      if (evt.oldIndex !== evt.newIndex) {
        console.log('## evt', evt)
        console.log('## list', this.list)
        console.log('## list2', this.groups)
      } else {
        console.log('## 别闹')
      }
    }
  },
  components: {
    draggable
  }
}
</script>
<style scoped>
.normal {
  background-color: grey;
}

.drag {
  border: 1px solid #eee
}
.dragArea {
  padding: 100px;
  min-height: 10px;
}
.dragArea2 {
  display: inline-block;
  height: 100px;
  width: 400px;
  min-height: 80px;
  min-width: 100px;
  background-color: green;
  border: 2px solid #eee
}


	.select-item {
		background-color: #5bc0de;
		display: inline-block;
		text-align: center;
		border-radius: 3px;
		margin-right: 10px;
		cursor: pointer;
		padding: 6px 20px;
		color: #fff;
  }
</style>
