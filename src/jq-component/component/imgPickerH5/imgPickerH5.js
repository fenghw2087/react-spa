/**
 **create by 2087, Mon Apr 23 2018
 **/

import $ from 'jquery';

import './less/imgPickerH5.less';
import uploadFile from "../../util/lib/uploadFile";

export default class ImgPickerH5 {
    constructor({ outer, maxImgs=3, imgs=[] }) {
        if(!(outer instanceof $) || (outer instanceof $ && outer.length !== 1)) throw new Error('Table param outer must be one length jqueryDom');
        this.imgs = imgs;
        this.maxImgs = maxImgs;
        this.outer = outer;
        this._init();
    }

    setImgs =(imgs)=> {
        this.imgs = imgs;
        this._renderImgs();
    };

    getImgs =()=> {
        return this.imgs;
    };

    _bindEvent = () => {
        const that = this;
        this.outer.on('click','.add-new-img-btn-c',function () {
            $(this).next().trigger('click');
        }).on('change','input[type="file"]',function () {
            that._uploadImg(this.files[0],that.imgs.length);
            that._resetFile();
        }).on('click','.drag-upload-img-item-c',function () {
            const index = $(this).data('index');

        })
    };

    _uploadImg =(file,index)=> {
        const _url =window.URL.createObjectURL(file);
        this._renderNewImgs(_url);
        this.dealImage(_url, {
            quality : 1
        }, (base)=>{
            const fd = new FormData();
            fd.append('file',this.convertBase64UrlToBlob(base),file.name);
            setTimeout(()=>{
                uploadFile({
                    url:'buildingContract/uploadFile',
                    fd,
                    onprogress:( ()=>{
                        const imgC = this.outer.find('.drag-upload-img-item-c').eq(index);
                        const progress = imgC.find('.drag-upload-progress');
                        const bar = progress.find('.drag-upload-progress-bar');
                        const text = progress.find('.drag-upload-progress-text');
                        return (e)=>{
                            const _p = Math.round(e.loaded/e.total*100);
                            bar.width(_p+'%');
                            text.text(_p+'%');
                            if(_p>=100){
                                setTimeout(()=>{
                                    progress.remove();
                                },100);
                            }
                        }
                    })(),
                    success:(data)=>{
                        if(data.success){
                            this.imgs[index] = data.data;
                        }
                    }
                })
            },100);
        });
    };

    _renderHtml =()=> {
        this.outer.html(`<div class="drag-upload-outer"></div>`);
        this._renderImgs();
    };

    _renderImgs =()=> {
        this.outer.html([...this.imgs.map((v,i)=>{
            return this._renderImg(v,i)
        }),this._renderAddBtn()].join(''));
    };

    _renderAddBtn =()=> {
        let isShow = this.maxImgs > this.imgs.length;
        return `<div class="add-new-img-btn-c" style="display: ${isShow?'inline-block':'none'}">+</div><input type="file" style="display: none" />`
    };

    _resetFile =()=> {
        this.outer.find('.add-new-img-btn-c').next().remove().end().after(`<input type="file" style="display: none" />`)
    };

    _renderImg =(url,index,isIn)=> {
        return `<div class="drag-upload-img-item-c${isIn?' drag-upload-img-in':''}" data-index="${index}"><img src="${url}" />
${isIn?`<div class="drag-upload-progress"><div class="drag-upload-progress-bar" style="width: 0"></div><div class="drag-upload-progress-text">0%</div></div>`:``}
</div>`;
    };

    _renderNewImgs =(url)=> {
        this.imgs.push(url);
        if(this.imgs.length === this.maxImgs){
            this.outer.find('.add-new-img-btn-c').hide();
        }
        this.outer.find('.add-new-img-btn-c').before(this._renderImg(url,this.imgs.length-1,true));
        setTimeout(()=>{
            this.outer.find('.drag-upload-img-in').removeClass('drag-upload-img-in');
        },0);
    };

    dealImage =(path, obj, callback)=>{
        const img = new Image();
        img.src = path;
        img.onload = function(){
            const that = this;
            // 默认按比例压缩
            let w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            let quality = 0.7;  // 默认图片质量为0.7
            //生成canvas
            let canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            // 创建属性节点
            const anw = document.createAttribute("width");
            anw.nodeValue = w;
            const anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            const base64 = canvas.toDataURL('image/jpeg', quality );
            canvas = null;
            // 回调函数返回base64的值
            callback(base64);
        }
    };
    /**
     * 将图片转化为blob格式
     * @param urlData 图片url
     * @returns {*} blob数据
     */
    convertBase64UrlToBlob =(urlData)=>{
        const bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        return new Blob( [ab] , {type : 'image/png'});
    };

    _init = () => {
        this._renderHtml();
        this._bindEvent();
    }
}
