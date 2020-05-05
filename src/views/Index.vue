<template lang="pug">
    section.index-section(@dragenter.stop="onDragEnter")
        img.bg.bg-left(src="../assets/bg_left.png" alt="")
        img.bg.bg-right(src="../assets/bg_right.png" alt="")
        .container
            .logo
                img.icon(src="../assets/logo_icon.png" alt="")
                img.text(src="../assets/logo_text.png" alt="")
            - var br = '<br />'
            p.paragraph
                | Upload an image by pressing the button below,!{br}pasting an URL, using API or simply drop it here.
            input.file-input(type="file" ref="file" @change="onFileInputChange")
            button.choose-file-button(type="button" @click="$refs.file.click()")
                unicon(name="image-upload" fill="white" style="vertical-align: sub; margin-right: 8px")
                | Select image
            input.url-input(type="text" placeholder="Paste URL" @paste.prevent="onPaste")
        .drag-n-drop-overlay(:class="{active: isDragging}")
            .border-box
                unicon(name="image-upload" fill="white" width="64px" height="64px")
                p Drop the image here
            .drop-box(
                @dragenter.prevent="onDragEnter"
                @dragleave.stop="onDragLeave"
                @drop.prevent="onDrop"
            )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios, {AxiosResponse} from 'axios'

@Component({
  name: 'Index'
})
export default class Index extends Vue {
    isDragging: boolean = false;

    onPaste (event: ClipboardEvent) {
        console.log(event);

        const url = event.clipboardData?.getData('text/plain') || '';

        console.log(url);

        if (this.isValidURL(url)) {
            axios.post('/api/upload_url/', {url}).then((response: AxiosResponse) => {
                this.$router.push(`/image/${response.data.id}`);
            });
        }
    }

    onFileInputChange (event: Event) {
        console.log(event);

        const fileInput = <HTMLInputElement> event.target;

        if ((fileInput.files !== null) && (fileInput.files.length > 0)) {
            axios.post(
                '/api/upload/',
                fileInput.files[0],
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Content-Disposition': `form-data; name="file"; filename="${fileInput.files[0].name}"`
                    }
                }
            ).then((response: AxiosResponse) => {
                this.$router.push(`/image/${response.data.id}`);
            });
        }
    }

    onDragEnter (event: DragEvent) {
        this.isDragging = true;
    }

    onDragLeave (event: DragEvent) {
        this.isDragging = false;
    }

    onDrop (event: DragEvent) {
        this.isDragging = false;

        axios.post(
            '/api/upload/',
            event.dataTransfer!.files[0],
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Content-Disposition': `form-data; name="file"; filename="${event.dataTransfer!.files[0].name}"`
                }
            }
        ).then((response: AxiosResponse) => {
            this.$router.push(`/image/${response.data.id}`);
        });
    }

    isValidURL (str: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }

    beforeMount () {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: string) => {
            window.addEventListener(eventName, (event: Event) => event.preventDefault());
        })
    }
}
</script>

<style lang="scss" scoped>
.index-section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .bg {
        position: absolute;

        &.bg-left {
            bottom: 0;
            left: 0;
            width: 30%;
        }

        &.bg-right {
            top: 0;
            right: 0;
            width: 30%;
        }
    }

    .container {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        max-width: 1200px;
        box-sizing: border-box;
        height: 100%;
        margin: auto;
        padding: 0 128px;

        .logo {
            display: flex;
            align-items: center;
            height: 100px;

            .icon {
                height: 100%;
            }

            .text {
                padding-left: 1em;
                height: 64%;
            }
        }

        .paragraph {
            margin-top: 128px;
            margin-bottom: 64px;
            text-align: center;
            font-size: 1.2rem;
            color: #cccccc;
        }

        .file-input {
            display: none;
        }

        .choose-file-button {
            padding: 0 32px;
            height: 64px;
            outline: none;
            border: none;
            border-radius: 32px;
            font-size: 1.1rem;
            box-shadow: 0 6px 8px 12px rgba(45, 45, 45, 0.6);
            color: white;
            background: linear-gradient(30deg, #ff6417, #d50909, #86004c);
            cursor: pointer;
        }

        .url-input {
            margin-top: 24px;
            padding: 12px;
            text-align: center;
            font-size: 1.1rem;
            outline: none;
            border: none;
            border-bottom: 3px solid #f14f2c;
            border-radius: 0;
            color: #777777;
            background: none;
        }
    }

    .drag-n-drop-overlay {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);

        &.active {
            display: block;
        }

        .border-box {
            display: flex;
            position: absolute;
            top: 32px;
            right: 32px;
            bottom: 32px;
            left: 32px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 3px dashed white;
            border-radius: 16px;
            color: white;
        }

        .drop-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
