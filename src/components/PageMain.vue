<template>
    <div class="page-main">
        <div>
            <input type="file" @change="handleFileChange" />
            <button @click="recognizeText">Recognize Text</button>
            <div>{{ this.players }}</div>
        </div>
    </div>
</template>

<script>
import Tesseract from 'tesseract.js';

export default {
    name: "PageMain",
    data() {
        return {
            recognizedText: '',
            imageFile: null,
            languages: ['eng', 'rus'],
            bufferI: 0,

            players: [],
        };
    },
    methods: {
        Player(name, murder, death, data) {
            this.players.push({ name: name, murder: [murder], death: [death], data: [data]});
        },
        addDataPlayer( idPlayer, murder, death, data ) {
            this.players[idPlayer].murder.push(murder);
            this.players[idPlayer].death.push(death);
            this.players[idPlayer].data.push(data);
        },
        handleFileChange(event) {
            this.imageFile = event.target.files[0];
        },
        async recognizeText() {
            if (this.imageFile) {
                let result = await Tesseract.recognize(this.imageFile, this.languages.join('+'));

                if(this.players.length != 0) {
                    // TODO всегда будет работать 
                    for (let index = 0; index < result.data.lines.length; index++) {
                        for (let index1 = 0; index1 < this.players.length; index1++) {
                            // ТОДО добавить сюда проверку на дату
                            if(this.players[index1].name == result.data.lines[index].words[0].text) {
                                // TODO поставил кастыль в виде двойки для теста DATE = 2
                                let bufferNumber2 = this.players[index1].data.findIndex(element => element == 2);
                                if(bufferNumber2 == -1) {
                                    // TODO ПОдставить настоящии данные
                                    this.addDataPlayer(index1, result.data.lines[index].words[6].text, result.data.lines[index].words[7].text, 2);
                                }
                            }
                        }
                    }

                    for (let index3 = 0; index3 < result.data.lines.length; index3++) {
                        let bufferNumber = this.players.findIndex(element => element.name == result.data.lines[index3].words[0].text);
                        if(bufferNumber == -1) {
                            this.Player(result.data.lines[index3].words[0].text, result.data.lines[index3].words[6].text, result.data.lines[index3].words[7].text, 123);
                        }
                    }
                }
                // TODO при первой записи в объект
                if(this.players.length == 0) {
                    for (let indexThe = 0; indexThe < result.data.lines.length; indexThe++) {
                        this.Player(result.data.lines[indexThe].words[0].text, result.data.lines[indexThe].words[6].text, result.data.lines[indexThe].words[7].text, 123);
                        console.log("Добавил Новое В первый раз имя Name + Data =:" + result.data.lines[indexThe].words[0].text);
                    }
                }
            }
        }
    }
}

</script>

<style scoped>
    
</style>