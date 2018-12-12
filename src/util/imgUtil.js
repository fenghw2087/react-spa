/**
 * 图片压缩处理函数
 * @param file 图片file数据
 * @param obj 图片参数 width height quality
 * @param callback 完成回掉，传出blob数据
 */
export const dealImage =(file, obj, callback)=>{
    const path =window.URL.createObjectURL(file);
    const img = new Image();
    img.src = path;
    img.onload = function(){
        const that = this;
        // 默认按比例压缩
        let w = that.width,
            h = that.height,
            scale = w / h;
        obj.width = obj.width>w?w:obj.width;
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
        callback(convertBase64UrlToBlob(base64));
    }
};
/**
 * 将图片转化为blob格式
 * @param urlData 图片url
 * @returns {*} blob数据
 */
const convertBase64UrlToBlob =(urlData)=>{
    const bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/jpeg'});
};
