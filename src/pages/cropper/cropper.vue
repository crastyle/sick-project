<template>
    <div class="cropperPage">
        <header>
            <button class="header-button success-btn" id="J-submit" @click="upload">保存</button>
            <h1 class="title">图片上传</h1>
            <button class="header-button upload-btn">选取</button>
            <input type="file" id="upload" class="upload" @change="change">
        </header>
        <div id="image-area">
            <img src="" alt="" id="viewPic">
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import './cropper.scss';
</style>

<script src="./cropper">
    
</script>