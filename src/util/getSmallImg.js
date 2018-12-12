/**
 * 从七牛获取缩略图
 * @param src
 * @param type
 * @param width
 * @returns {*}
 */
const getSmallImg=(src,type,width)=>{
    if(!src) return src;
    let height = 0;
    if(!width){
        if(type === 3){
            width = 500;
            height = 400;
        }else if(type === 2){
            width = 240;
            height = 200;
        }else {
            width = 120;
            height = 100;
        }
    }
    return src+'?imageView2/3/w/'+width+'/h/'+height
};

export default getSmallImg;
