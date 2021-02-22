/* eslint-disable */
<template>
  <div class="home">
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
/* eslint-disable */


export default {
  sockets: {
    re1 (val) {
      console.log('test1',val)
    }
  },
  name: 'Home',
  components: {
    // HelloWorld
  },
  methods: {

  },
 created(){
   console.log('created~');
   
 },
 mounted() {
   
   this.$socket.emit('chat message',520)
   this.$socket.emit('callme',1)
  //  this.$socket.on('test1',function(msg){
  //   console.log(msg)
  //  })
  //  console.log(this.$socket.on())
 },
  
}
</script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
</style>
