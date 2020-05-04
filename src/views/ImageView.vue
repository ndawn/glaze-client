<template lang="pug">
    section.image-section
        header.header
            h1.image-name {{ imageName }}
        img.image(:src="imageURL")
        footer.footer
            .container
                input.image-url-input(:value="imageURL")
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'

@Component({
    name: 'ImageView'
})
export default class ImageView extends Vue {
    @Prop({
        required: true
    })
    public id!: string;

    imageURL: string = '';
    imageName: string = '';

    beforeMount () {
        axios.get(`/api/images/${this.id}`).then((response: AxiosResponse) => {
            this.imageName = response.data.name;
            console.log(response);
            this.imageURL = response.request.responseURL.split('/', 3).join('/') + response.data.url;
        })
    }
}
</script>

<style lang="scss" scoped>
.image-section {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .header {
        width: 100%;
        height: 5rem;
        background: #3e3e3e;

        .image-name {
            margin: 0;
            text-align: center;
            line-height: 5rem;
            color: white;
        }
    }

    .image {
        width: 100%;
        height: calc(100vh - 2 * 5rem);
        object-fit: contain;
    }

    .footer {
        width: 100%;
        height: 5rem;
        background: #3e3e3e;

        .container {
            display: flex;
            margin: auto;
            padding: 0 5rem;
            max-width: 1200px;
            height: 100%;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;

            .image-url-input {
                padding: 0.75rem;
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                font-size: 1.1rem;
                outline: none;
                border: none;
                border-bottom: 3px solid #f14f2c;
                border-radius: 0;
                color: white;
                background: none;
            }
        }
    }
}
</style>
