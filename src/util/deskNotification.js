import { Modal } from 'antd';

/**
 * 浏览器消息提示
 * @param title
 * @param msg
 * @param icon
 * @param onClick
 * @param onError
 * @param onShow
 * @param onClose
 * @returns {boolean}
 */
const showMsgNotification=({title, msg, icon, onClick=()=>{}, onError=()=>{}, onShow=()=>{}, onClose=()=>{}})=> {
    const options = {
        body: msg,
        icon: icon||"image_url"
    };
    const Notification = window.Notification || window.mozNotification || window.webkitNotification;
    if (Notification && Notification.permission === "granted") {
        const instance = new Notification(title, options);
        instance.onclick = ()=>{
            instance.close();
            onClick();
        };
        instance.onerror = onError;
        instance.onshow = onShow;
        instance.onclose = onClose;
    } else if (Notification && Notification.permission !== "denied") {
        Notification.requestPermission(function(status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            // If the user said okay
            if (status === "granted") {
                const instance = new Notification(title, options);
                instance.onclick = ()=>{
                    instance.close();
                    onClick();
                };
                instance.onerror = onError;
                instance.onshow = onShow;
                instance.onclose = onClose;
            } else {
                return false
            }
        });
    } else {
        Modal.confirm({
            title: '打开消息通知',
            content: '建议您打开浏览器消息，以便能接收到实时消息推送',
            onOk:()=> {

            },
            onCancel() {
            },
            okText:'如何打开？',
            cancelText:'绝不打开，不再提示该消息',
            maskClosable:false
        });
        return false;
    }
};

export default showMsgNotification;
