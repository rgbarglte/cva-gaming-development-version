<template>
     
    <component v-for="item in dom">
        <template v-if="item.tag == 'img'">
            <img :src="item.src" :class="item.class" />
        </template>
        
         <component v-if="item.tag !== 'img'"   :is="item.tag"   v-model="item.content"  :contenteditable="true" :class="item.class">
           {{item.content}} 
        </component>
    </component>

    <div class="col-12">
        <select v-model="addtarget">
            <option v-for="(item, index) in blocks" :value="item">
            {{item.type}}
            </option>
        </select>
        <button @click.prevent="add()">add</button>
    </div>
</template>

<script> 
 
export default {
   
    data() {
        return {
            addtarget: '',
            dom : [],
            blocks : [
            {
                    type : "heading",
                    tag: 'h1',
                    tags : ['h1','h2','h3','h4','h5'], 
                    class : [{
                        tag : 'h1',
                        class : ['h1-test']
                    },{
                        tag : 'h2',
                        class : ['h2-test']
                    },{
                        tag : 'h3',
                        class : ['h3-test']
                    }],
                    class_custom : [],
                    content : 'Content here heading', 
                },
                {
                    type : "paragraph",
                    tag : 'p',
                    tags : ['p'],
                    class : [{
                        tag : 'p',
                        class : ['p-test']
                    }],
                    class_custom : [],
                    content : 'Minim eu eiusmod occaecat quis irure veniam fugiat ex sint ea voluptate quis pariatur. Aliqua consequat ex in exercitation elit laboris. Lorem amet ut in voluptate. Occaecat eu eiusmod ipsum nulla sint non nostrud consectetur quis ut.', 
                },
                {
                    type : "image",
                    tag : 'img',
                    tags : ['img'],
                    class : [{
                        tag : 'img',
                        class : ['img-test']
                    }],
                    class_custom : [],
                    src : 'https://apexcharts.com/wp-content/themes/apexcharts/img/apexcharts-logo-trimmed.svg', 
                },
            ]
        };
    },
    created() { 
    },
    computed: {
         
    },
    methods: { 
        selectClassByTag(block,tagselected) {
            console.log('test',block.class,tagselected)
            block.class.forEach(element => {
                if(element.tag == tagselected) {
                    console.log('return',element.class)
                      return Array(element.class)
                }
            })
        },
        add() {
            // var newBlock = this.addtarget;
            // newBlock.class = this.selectClassByTag(newBlock,newBlock.tag),

            this.dom.push(this.addtarget);

            console.log(this.dom)
        }
    },
}; 
</script>